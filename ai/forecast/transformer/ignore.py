from torch.utils.data import Dataset, DataLoader
import torch
import torch.nn as nn
import torch.optim as optim
import pandas as pd
from datetime import datetime, timedelta

data = pd.read_csv(
    "/workspaces/castly/server/seed/data/test.csv")


# class Transformer(nn.Module):
#     def __init__(self, seq_len=5):
#         super().__init__()
#         self.seq_len = seq_len
#         self.embedding = nn.Linear(1, 16)
#         encoder_layer = nn.TransformerEncoderLayer(16, 2)
#         self.transformer = nn.TransformerEncoder(encoder_layer, 1)
#         self.out = nn.Linear(16, 1)

#     def forward(self, x):
#         x = self.embedding(x)
#         x = self.transformer(x)
#         x = self.out(x)
#         return x

#     def sequences(self, values):
#         X, y = [], []
#         for i in range(len(values) - self.seq_len):
#             X.append(values[i:i+self.seq_len])
#             y.append(values[i+self.seq_len])
#         if len(X) == 0:
#             return None, None
#         X = torch.tensor(X, dtype=torch.float32).unsqueeze(-1).permute(1, 0, 2)
#         y = torch.tensor(y, dtype=torch.float32).unsqueeze(0)
#         return X, y


# transformer = Transformer()
# criterion = nn.MSELoss()
# optimiser = optim.Adam(transformer.parameters(), lr=0.01)

# values = [v for v in data['price'].values]  # ensure numeric
# dates = [datetime.fromisoformat(d)
#          for d in data['date'].values]  # convert to datetime

# n_forecast = 1
# forecast_values = []
# forecast_dates = []

# for _ in range(n_forecast):
#     X_train, y_train = transformer.sequences(values[-20:])
#     print(X_train, y_train)
#     transformer.train()
#     for _ in range(10):
#         optimiser.zero_grad()
#         output = transformer(X_train)
#         loss = criterion(output[-1], y_train.squeeze(0))
#         loss.backward()
#         optimiser.step()

#     # Predict next value
#     transformer.eval()
#     x_input = torch.tensor(values[-transformer.seq_len:],
#                            dtype=torch.float32).unsqueeze(1).unsqueeze(-1)
#     with torch.no_grad():
#         next_value = transformer(x_input)[-1].item()

#     # Append forecasted value
#     values.append(next_value)
#     forecast_values.append(next_value)

#     # Compute next date
#     next_date = dates[-1] + timedelta(days=1)
#     dates.append(next_date)
#     forecast_dates.append(next_date.date().isoformat())


# print(forecast_values)


class TransformerDataset(Dataset):
    def __init__(self, values: list, seq_len: int = 5, history: int = 0) -> None:
        self.history = history
        self.values = values[-self.history:]
        self.seq_len = seq_len

    def __len__(self):
        return len(self.values) - self.seq_len

    def __getitem__(self, idx):
        X = self.values[idx: idx + self.seq_len]
        y = self.values[idx + self.seq_len]
        X = torch.tensor(
            X, dtype=torch.float32).unsqueeze(-1)
        y = torch.tensor(y, dtype=torch.float32)
        return X, y


class TransformerModel(nn.Module):
    def __init__(self, seq_len: int = 5, d_model: int = 16, nhead: int = 2, num_layers: int = 1) -> None:
        super().__init__()
        self.seq_len = seq_len
        self.embedding = nn.Linear(1, out_features=d_model)
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model, nhead=nhead)
        self.transformer = nn.TransformerEncoder(
            encoder_layer, num_layers=num_layers)
        self.out = nn.Linear(d_model, 1)

    def forward(self, X: torch.Tensor) -> torch.Tensor:
        X = self.embedding(X)
        X = self.transformer(X)
        X = self.out(X)
        return X


transformer = TransformerModel()
criterion = nn.MSELoss()
optimiser = optim.Adam(transformer.parameters())

values = [v for v in data['price'].values]  # ensure numeric
dates = [datetime.fromisoformat(d)
         for d in data['date'].values]

n_forecast = 10
epochs = 80
history = 10
forecast_values = []
forecast_dates = []

for _ in range(n_forecast):
    dataset = TransformerDataset(values, history=history)
    dataloader = DataLoader(dataset)
    for _ in range(epochs):
        transformer.train()
        for X_batch, y_batch in dataloader:
            optimiser.zero_grad()
            output = transformer(X_batch)
            loss = criterion(output[-1], y_batch.squeeze(0))
            loss.backward()
            optimiser.step()

    transformer.eval()
    x_input = torch.tensor(values[-transformer.seq_len:], dtype=torch.float32)\
        .unsqueeze(1).unsqueeze(-1)
    with torch.no_grad():
        next_value = transformer(x_input)[-1].item()

    values.append(next_value)
    forecast_values.append(next_value)

    next_date = dates[-1] + timedelta(days=1)
    dates.append(next_date)
    forecast_dates.append(next_date.date().isoformat())


print(forecast_values)

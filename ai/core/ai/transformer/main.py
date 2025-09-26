import torch.optim as optim
import torch.nn as nn
import torch
from datetime import datetime, timedelta
from torch.utils.data import DataLoader

from core.ai.transformer import TransformerModel
from core.ai.transformer import TransformerDataset
from schemas import PostBody


def transformer_forecast(post_body: PostBody) -> dict:
    transformer = TransformerModel()
    criterion = nn.MSELoss()
    optimiser = optim.Adam(transformer.parameters())

    dates = [datetime.fromisoformat(d) for d in post_body.dates]

    forecast_values = []
    forecast_dates = []

    for _ in range(post_body.n_forecast):
        dataset = TransformerDataset(
            post_body.values, history=post_body.history, seq_len=post_body.seq_len)
        dataloader = DataLoader(dataset, batch_size=post_body.batch_size)
        for _ in range(post_body.epochs):
            transformer.train()
            for X, y in dataloader:
                y = y.unsqueeze(-1)
                optimiser.zero_grad()
                y_pred = transformer(X)
                loss = criterion(y_pred, y)
                loss.backward()
                optimiser.step()

        transformer.eval()
        x_input = torch.tensor(
            post_body.values[-post_body.seq_len:], dtype=torch.float32).view(1, post_body.seq_len, 1)
        with torch.no_grad():
            next_value = transformer(x_input).item()

        post_body.values.append(next_value)
        forecast_values.append(next_value)

        next_date = dates[-1] + timedelta(days=1)
        dates.append(next_date)
        forecast_dates.append(next_date.date().isoformat())

    return {"dates": forecast_dates, "values": forecast_values}

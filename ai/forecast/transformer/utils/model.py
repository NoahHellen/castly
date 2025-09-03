import torch
import torch.nn as nn


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

    # def sequences(self, values: list) -> tuple[torch.tensor, torch.tensor]:
    #     X, y = [], []
    #     for i in range(len(values) - self.seq_len):
    #         X.append(values[i:i+self.seq_len])
    #         y.append(values[i+self.seq_len])
    #     if len(X) == 0:
    #         return None, None
    #     X = torch.tensor(X, dtype=torch.float32).unsqueeze(-1).permute(1, 0, 2)
    #     y = torch.tensor(y, dtype=torch.float32).unsqueeze(0)
    #     return X, y

import torch
import torch.nn as nn


class TransformerModel(nn.Module):
    def __init__(self, d_model: int = 16, nhead: int = 2, num_layers: int = 1) -> None:
        super().__init__()
        self.embedding = nn.Linear(1, out_features=d_model)
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model, nhead=nhead, batch_first=True)
        self.transformer = nn.TransformerEncoder(
            encoder_layer, num_layers=num_layers)
        self.out = nn.Linear(d_model, 1)

    def forward(self, X: torch.Tensor) -> torch.Tensor:
        X = self.embedding(X)
        X = self.transformer(X)
        X = self.out(X)
        X = X[:, -1, :]
        return X

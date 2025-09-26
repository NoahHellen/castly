import torch
from torch.utils.data import Dataset


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


# values = [
#     28.16, 26.44, 25.78, 25.94, 27.42, 28.23, 28.32, 28.19, 26.93, 28.09, 27.59, 27.32,
#     28.08, 27.54, 28.14, 28.55, 28.83, 29.07, 29.10, 28.48, 28.36, 28.80, 28.35, 28.58,
#     28.75, 28.68, 28.11, 27.27, 27.58, 27.40, 27.60, 27.70, 27.83, 30.01
# ]

# dataset = TransformerDataset(values=values, history=20)

# for i in range(len(dataset)):
#     X, y = dataset[i]
#     print(f"X: {X.squeeze().tolist()}, y: {y.item()}")

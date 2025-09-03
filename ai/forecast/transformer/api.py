from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils.model import TransformerModel
from utils.dataset import TransformerDataset
import torch.optim as optim
import torch.nn as nn
import torch
from datetime import datetime, timedelta
from torch.utils.data import DataLoader
from middlewares.cors import middleware

app = FastAPI()

middleware(app)


class PostBody(BaseModel):
    dates: list
    values: list


@app.post("/transformer")
async def transformer(post_body: PostBody) -> dict:
    transformer = TransformerModel()
    criterion = nn.MSELoss()
    optimiser = optim.Adam(transformer.parameters())

    values = post_body.values
    dates = [datetime.fromisoformat(d) for d in post_body.dates]

    n_forecast = 10
    epochs = 20
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

    return {"dates": forecast_dates, "values": forecast_values}

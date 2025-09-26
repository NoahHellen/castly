from pydantic import BaseModel


class PostBody(BaseModel):
    dates: list
    values: list
    n_forecast: int
    epochs: int
    history: int
    seq_len: int
    batch_size: int

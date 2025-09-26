from fastapi import APIRouter
from schemas import PostBody

from core.ai.transformer import transformer_forecast

router = APIRouter()


@router.post("/transformer")
async def transformer(post_body: PostBody) -> dict:
    return transformer_forecast(post_body)

from fastapi import APIRouter
from api.routes import bayes_router, ocr_router, transformer_router, root_router

routers = APIRouter()

for router in [root_router, bayes_router, ocr_router, transformer_router]:
    routers.include_router(router)

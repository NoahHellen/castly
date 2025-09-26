from fastapi import FastAPI
from api import routers
from core import middleware

app = FastAPI()

middleware(app)

app.include_router(routers)

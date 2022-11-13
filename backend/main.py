from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services import search_service

app = FastAPI(title= "Search Service")
app.include_router(search_service)
app.add_middleware(CORSMiddleware, allow_origins="*", allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials"], allow_credentials= True)


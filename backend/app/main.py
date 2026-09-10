from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, SessionLocal, engine
from .routers.profiles import auth_router, router as profiles_router
from .routers.quizzes import dashboard_router, router as quizzes_router
from .seed import seed_competencies


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_competencies(db)
    yield


app = FastAPI(
    title="StatIQ API",
    version="0.1.0",
    description="Backend foundation for the SIH26101 skill intelligence platform.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.include_router(auth_router)
app.include_router(profiles_router)
app.include_router(quizzes_router)
app.include_router(dashboard_router)


@app.get("/health", tags=["system"])
def health_check():
    return {"status": "ok", "database": "sqlite"}


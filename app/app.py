from fastapi import Depends, FastAPI, status, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.encoders import jsonable_encoder
import pandas as pd
from .tools import get_ticker_data
import plotly.graph_objects as go
import plotly.express as px
import json


from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/comment", response_class=HTMLResponse)
def read_comments(request: Request, db: Session = Depends(get_db)):
    data = crud.get_comments(db)
    return templates.TemplateResponse(
        "comments.html", {"request": request, "content": jsonable_encoder(data)}
    )


@app.post("/comment", status_code=status.HTTP_201_CREATED)
def post_comments(
    request: Request, comment: str = Form(...), db: Session = Depends(get_db)
):
    payload = schemas.CommentPayload(comment=comment)
    crud.post_comment(db, payload)
    data = crud.get_comments(db)
    return templates.TemplateResponse(
        "comments.html", {"request": request, "content": jsonable_encoder(data)}
    )


@app.get("/ticker-chart", response_class=HTMLResponse)
def get_ticker_chart(request: Request):
    data = get_ticker_data("1d", "BTCUSDT")

    df = pd.DataFrame(
        data,
        columns=[
            "x",
            "open",
            "high",
            "low",
            "close",
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
        ],
    )
    df["x"] = pd.to_datetime(df["x"], unit="ms")
    new_df = df[["x", "close", "high", "low", "open"]]

    data = json.dumps(jsonable_encoder(new_df.to_dict(orient="list")))

    return templates.TemplateResponse(
        "ticker_chart.html", {"request": request, "content": data}
    )


@app.get("/greed-and-fear", response_class=HTMLResponse)
def get_greed_and_fear(request: Request):
    return templates.TemplateResponse("greed_and_fear.html", {"request": request})

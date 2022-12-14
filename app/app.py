from fastapi import Depends, FastAPI, status, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

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
        "comments.html", {"request": request, "payload": data}
    )


@app.post("/comment", status_code=status.HTTP_201_CREATED)
def read_comments(
    request: Request, comment: str = Form(...), db: Session = Depends(get_db)
):
    # Note: pip install python-multipart
    payload = schemas.CommentPayload(comment=comment)
    crud.post_comment(db, payload)
    data = crud.get_comments(db)
    return templates.TemplateResponse(
        "comments.html", {"request": request, "payload": data}
    )


@app.get("/ticker-chart", response_class=HTMLResponse)
def get_ticker_chart(request: Request):
    return templates.TemplateResponse("ticker_chart.html", {"request": request})


@app.get("/greed-and-fear", response_class=HTMLResponse)
def get_greed_and_fear(request: Request):
    return templates.TemplateResponse("greed_and_fear.html", {"request": request})


@app.post("/api/comment", status_code=status.HTTP_201_CREATED)
def post_comment(payload: schemas.CommentPayload, db: Session = Depends(get_db)):
    return crud.post_comment(db, payload)


@app.get("/api/comment", status_code=status.HTTP_200_OK)
def get_comments(db: Session = Depends(get_db)):
    return crud.get_comments(db)

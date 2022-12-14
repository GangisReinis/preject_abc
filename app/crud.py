from sqlalchemy.orm import Session

from .models import Comment
from .schemas import CommentPayload


def get_comments(db: Session):
    return db.query(Comment).all()


def post_comment(db: Session, payload: CommentPayload):
    db_item = Comment(**payload.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    return db_item

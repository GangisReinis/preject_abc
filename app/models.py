from sqlalchemy import Column, Integer, String

from .database import Base


class Comment(Base):
    __tablename__ = "comment"

    id = Column(Integer, primary_key=True, index=True)
    comment = Column(String, index=True)

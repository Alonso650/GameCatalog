"""Data models"""
from operator import index
from . import db

class User(db.Model):
    """Data model for user accounts."""
    __tablename__ = 'users'
    id = db.Column(
        db.Integer,
        primary_key=True
    )
    username = db.Column(
        db.String(64),
        index=False,
        unique=True,
        nullable=False
    )
    email = db.Column(
        db.String(80),
        index=True,
        unique=True,
        nullable=False,
    )

    def __repr__(self):
        return '<User ()>'.format(self.username)
    

    
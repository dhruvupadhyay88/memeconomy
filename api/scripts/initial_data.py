from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db
import praw
from psaw import PushshiftAPI

api = PushshiftAPI()
reddit = praw.Reddit()

# subreddit = reddit.subreddit('wallstreetbets')

# for post in subreddit.top(limit=100):
#     print(post.title, post.id)




#submissions = api.search_submissions(after=)

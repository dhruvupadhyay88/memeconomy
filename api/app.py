from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from api import create_app, db

app = create_app()
with app.app_context():
        db.create_all()


class TodoModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(240))



@app.route('/api/yo', methods=['GET'])
def index():
    return {
        'name': 'Hello World'
    }


if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
#from api import create_app, db

#app = create_app()
#with app.app_context():
#        db.create_all()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:dhruv@localhost/memeconomy'
app.debug = True

db = SQLAlchemy(app)

class TodoModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(240), nullable=False)
    likes = db.Column(db.Integer, default=0)

    def __init__(self, id, content, likes):
        self.id = id
        self.content = content
        self.likes = likes

@app.route('/api/yo', methods=['GET'])
def index():
    return {
        'name': 'Hello World'
    }


if __name__ == '__main__':
    app.run(debug=True)

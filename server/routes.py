from flask import request, make_response
from flask import current_app as app
from .models import db, User

@app.route('/', methods=['GET'])
def records():
    """Create a user via query string parameters"""
    username = request.args.get('user')
    email = request.args.get('email')
    if username and email:
        existing_user = User.query.filter(
            User.username == username or User.email == email
        ).first()
        if existing_user:
            return make_response(
                f'(username) ({email}) already created!'
            )
        new_user = User(
            username = username,
            email = email,
        )
        # Create an instance of the User class
        db.session.add(new_user) # Adds new user record to database
        db.session.commit()
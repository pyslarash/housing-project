from flask_jwt_extended import JWTManager

def configure_jwt(app):
    from models import db, User

    def user_identity_lookup(user):
        username = user.get('username')
        user_obj = User.query.filter_by(username=username).first()
        if user_obj:
            return user_obj.id
        else:
            return None

    # Might want to keep it in the keys
    app.config['JWT_SECRET_KEY'] = 'brlBudeglbathI7rozlphophl8p9friwov+hucruchuchochltr6sin5cac6iwri'
    jwt = JWTManager(app)
    jwt.user_identity_loader(user_identity_lookup)
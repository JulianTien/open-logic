from flask import Flask

from config import DevelopmentConfig, ProductionConfig
from extensions import cors
from routes.runner_bp import runner_bp


def create_runner_app(config_class=None):
    if config_class is None:
        import os

        config_name = os.environ.get("FLASK_CONFIG", "production").lower()
        config_class = (
            ProductionConfig if config_name == "production" else DevelopmentConfig
        )

    app = Flask(__name__)
    app.config.from_object(config_class)
    config_class.validate()

    origins = app.config.get("CORS_ALLOWED_ORIGINS") or []
    if origins:
        cors.init_app(
            app,
            origins=origins,
            supports_credentials=app.config.get("CORS_SUPPORTS_CREDENTIALS", False),
        )
    else:
        cors.init_app(app)

    app.register_blueprint(runner_bp)
    return app


app = create_runner_app()


if __name__ == "__main__":
    import os

    try:
        port = int(os.environ.get("PORT", 8081))
    except ValueError:
        port = 8081

    print(f"Starting Open Logic Runner at http://127.0.0.1:{port}")
    app.run(host="0.0.0.0", port=port)

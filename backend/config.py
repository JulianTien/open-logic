import os


def _parse_allowed_origins():
    raw = os.environ.get("CORS_ALLOWED_ORIGINS", "").strip()
    if not raw:
        return []
    return [origin.strip() for origin in raw.split(",") if origin.strip()]


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ALLOWED_ORIGINS = _parse_allowed_origins()
    CORS_SUPPORTS_CREDENTIALS = bool(CORS_ALLOWED_ORIGINS)
    RUNNER_AUTH_TOKEN = os.environ.get('RUNNER_AUTH_TOKEN', '').strip()

    @staticmethod
    def validate():
        """Allow env-specific configs to enforce required settings."""
        return None

class DevelopmentConfig(Config):
    DEBUG = True
    SECRET_KEY = Config.SECRET_KEY or 'dev-secret-key-change-in-production'
    # Default to local sqlite for dev
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///openlogic.db'

class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

    @staticmethod
    def validate():
        missing = []
        if not ProductionConfig.SECRET_KEY:
            missing.append('SECRET_KEY')
        if not ProductionConfig.SQLALCHEMY_DATABASE_URI:
            missing.append('DATABASE_URL')
        if missing:
            raise RuntimeError(
                f"Missing required production environment variables: {', '.join(missing)}"
            )

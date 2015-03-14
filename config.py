class Config(object):
    DEBUG = False
    TESTING = False
    PLUGINS = [
        'soundcloud',
        'youtube',
    ]


class ProductionConfig(Config):
    DEBUG = False


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True

## Set Up
To set up, create .env file in the backend directory and set the following variables

- ENVIRONMENT_CONFIGURATION='backend.config.DevConfig' (For dev environment)
- SECRET_KEY = 'your random secret key'
- DEV_DATABASE_URL='postgresql://username@localhost/devline' (can be mysql instead of postgres)
- PROD_DATABASE_URL=''

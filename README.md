# Jobs BE

## To start the project follow below steps:

- Install NodeJS, if not installed (Require Node version >= 8.0.0)

```
	$ wget -qO- https://deb.nodesource.com/setup_10.x | bash -
	$ sudo apt-get install -y nodejs
```

- Install npm, if not installed (Require NPM version >= 6.0.0)

- To install the dependencies on development

```
	$ npm install
```

- To install the dependencies on production

```
	$ npm install --production
```

- Create .env file which should have these env variable [MONGODB_URI, JWT_SECRET_KEY, SERVICE_NAME].

- To run the application on developmnt environment

```
	$ npm run dev
```

- To run the application on production environment

```
	$ npm start
```

# Build the app using docker

- To build the image for this app

```
	$ docker build . -t jobs:latest
```

- To start the docker container

```
	$ docker run --rm -d --name <ANY_NAME> -p 3000:3000 jobs -e "MONGODB_URI=<MONGODB_URI>" -e "JWT_SECRET_KEY=<JWT_SECRET_KEY>" -e "SERVICE_NAME=<SERVICE_NAME>"
```

# Directory Structure

```
.
├── Dockerfile
├── Procfile
├── README.md
├── logs
│   ├── app.log
│   └── http.log
├── package-lock.json
├── package.json
├── src
│   ├── controllers
│   │   ├── applicant.js
│   │   ├── index.js
│   │   ├── job.js
│   │   └── user.js
│   ├── db.js
│   ├── models
│   │   ├── applicant.js
│   │   ├── index.js
│   │   ├── job.js
│   │   └── user.js
│   ├── routes.js
│   ├── server.js
│   ├── services
│   │   ├── index.js
│   │   └── mongodb.js
│   └── utils
│       ├── auth.js
│       ├── httpLog.js
│       ├── index.js
│       ├── validation.js
│       ├── validationSchema.js
│       └── winston.js
├── tests
│   ├── e2e
│   │   └── note
│   └── unit
│       ├── note
│       └── test.js
└── uploads
```

# API Documentation (Postman Collection)
```
https://documenter.getpostman.com/view/9244744/TVspnVcT
```

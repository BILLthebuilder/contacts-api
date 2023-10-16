# contacts-api

Simple api for creating,listing,editing and deleting contacts

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

- Nodejs/ npm

- Postman

### Installing

A step by step series of examples that tell you how to get a development environment running

- Clone the project repository

`git clone https://github.com/BILLthebuilder/contacts-api.git`

- Change the directory

`cd contacts-api`

- Install the dependencies

`npm install`

- Configure your local environment

```bash
cp .env.example .env
```

or

Create a `.env` file and copy details in `.env.example` to the `.env` file you created.

- To compile and run a production build

```bash
npm start
```

- To run a regular development build

```bash
npm run dev
```

### Test the API Endpoints

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5176138-03671abb-fd88-4214-a375-03f717bcf122?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D5176138-03671abb-fd88-4214-a375-03f717bcf122%26entityType%3Dcollection%26workspaceId%3Df99137e8-f0b4-4850-8b9e-2fa166538946)

#### Auth Endpoints

| Request | Endpoint              | Function                |
| ------- | --------------------- | ----------------------- |
| POST    | `/api/v1/signup` | Register a new user     |
| POST    | `/api/v1/login` | Login a registered user |

#### Contact endpoints

| Request | Endpoint                                        | Function             |
|---------|-------------------------------------------------|----------------------|
| POST    | `/api/v1/contacts/create`                       | Create a new contact |
| GET     | `/api/v1/contacts?limit=10&page=1`              | Get all contacts     |
| GET     | `/api/v1/contacts/{Id}`                         | Get a contact by ID  |
| PUT     | `/api/v1/contacts/{Id}`                         | Update a contact     |
| DELETE  | `/api/v1/contacts/{Id}`                         | Delete a contact     |

## Running the tests

- Run `npm test`

## Deployment

- coming soon

## Built With

- [Express](http://expressjs.com) - The web framework used

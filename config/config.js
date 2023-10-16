require('dotenv').config(); module.exports = {
  development: {
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASS_DEV,
    database: process.env.DB_DEV,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    secretKey: process.env.SECRET_KEY,
    secretIv: process.env.SECRET_IV,
    encryptionMethod: process.env.ECNRYPTION_METHOD,
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASS_TEST,
    database: process.env.DB_TEST,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      logging: false
    }
  }
};

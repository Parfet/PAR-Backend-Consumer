require("dotenv").config();

module.exports = {
  development: {
    database: process.env.DATABASE_PARFET || "par_db_dev",
    username: process.env.DB_USERNAME_PARFET || "smurf",
    password: process.env.DB_PASSWORD_PARFET || "",
    host: process.env.DB_HOST_PARFET || "127.0.0.1",
    dialect: process.env.DB_DIALECT_PARFET || "postgres",
    port: process.env.DB_PORT_PARFET || 5432,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    database: process.env.DATABASE_PARFET || "par_db_dev",
    username: process.env.DB_USERNAME_PARFET || "smurf",
    password: process.env.DB_PASSWORD_PARFET || "",
    host: process.env.DB_HOST_PARFET || "127.0.0.1",
    dialect: process.env.DB_DIALECT_PARFET || "postgres",
    port: process.env.DB_PORT_PARFET || 5432,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    database: process.env.TEST_DATABASE_PARFET || "par_db_dev",
    username: process.env.TEST_DB_USERNAME_PARFET || "smurf",
    password: process.env.TEST_DB_PASSWORD_PARFET || "",
    host: process.env.TEST_DB_HOST_PARFET || "127.0.0.1",
    dialect: process.env.TEST_DB_DIALECT_PARFET || "postgres",
    port: process.env.TEST_DB_PORT_PARFET || 5432,
    logging: false,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};

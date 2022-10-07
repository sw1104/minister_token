const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  // type: process.env.TYPEORM_CONNECTION,
  type: "mysql",
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  // username: process.env.TYPEORM_USERNAME,
  username: 'root',
  password: process.env.TYPEORM_PASSWORD,
  password: '1',
  database: process.env.TYPEORM_DATABASE,
  TIME_ZONE: process.env.TIME_ZONE
});

module.exports = {
  AppDataSource
};
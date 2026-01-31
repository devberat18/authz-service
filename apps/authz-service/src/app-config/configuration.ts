export default () => ({
  app: {
    name: process.env.APP_NAME,
    port: parseInt(process.env.APP_PORT || '3000', 10),
    env: process.env.NODE_ENV || 'development',
  },

  database: {
    url: process.env.DATABASE_URL,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DB,
  },

  authz: {
    amountApprovalThreshold: parseInt(
      process.env.AMOUNT_APPROVAL_THRESHOLD || '10000',
      10,
    ),
  },

  log: {
    level: process.env.LOG_LEVEL || 'debug',
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
});

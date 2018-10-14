import LambdaEnvVars from "lambda-env-vars";
const lambdaEnvVars = new LambdaEnvVars();

const CONFIG = {
  DatabaseConfig: {
    dbName: lambdaEnvVars.getDefaultDecryptedValue("DB_DATABASE"),
    dbUser: lambdaEnvVars.getDefaultDecryptedValue("DB_USER_NAME"),
    dbPass: lambdaEnvVars.getDefaultDecryptedValue("DB_PASSWORD"),
    dbHost: lambdaEnvVars.getDefaultDecryptedValue("DB_HOST"),
    dbPort: lambdaEnvVars.getDefaultDecryptedValue("DB_PORT"),
  },
  ShowConfig: {
    RECORD_SHOW_PER_PAGE: 1
  },
  GenreConfig: {
    RECORD_SHOW_PER_PAGE: 1
  },
  NotifyConfig: {
    RECORD_SHOW_PER_PAGE: 5
  }
}

export default CONFIG;

import LambdaEnvVars from "lambda-env-vars";
const lambdaEnvVars = new LambdaEnvVars();

const DatabaseConfig = {
  dbName: lambdaEnvVars.getDefaultDecryptedValue("DB_DATABASE"),
  dbUser: lambdaEnvVars.getDefaultDecryptedValue("DB_USER_NAME"),
  dbPass: lambdaEnvVars.getDefaultDecryptedValue("DB_PASSWORD"),
  dbHost: lambdaEnvVars.getDefaultDecryptedValue("DB_HOST"),
  dbPort: lambdaEnvVars.getDefaultDecryptedValue("DB_PORT"),
  schema: lambdaEnvVars.getDefaultDecryptedValue("DB_SCHEMA"),
};
const ShowConfig = {
  RECORD_SHOW_PER_PAGE: 1
}
export {DatabaseConfig, ShowConfig};

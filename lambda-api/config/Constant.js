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
  Common: {
    MSG_REQUIRE_CLIENT_ID: 'Client ID was required',
    MSG_ERROR_SERVER: 'Something Went Wrong'
  },
  ShowConfig: {
    RECORD_SHOW_PER_PAGE: 10,
    SQL_LIST_SHOW: 'SQL025.sql',
    SQL_LIST_SHOW_SCHEDULE: 'SQL027.sql'
  },
  GenreConfig: {
    SQL_LIST_GENRE: 'SQL002.sql',
    RECORD_SHOW_PER_PAGE: 10
  },
  NotifyConfig: {
    SQL_LIST_NOTIFY: 'SQL057.sql',
    RECORD_SHOW_PER_PAGE: 10
  },
  FolderSql: {
    PATH: 'sql',
    PRE_NAME: 'SQL',
    EXTENSION: '.sql'
  },
  CodeTemplate: {
    COMPLETE_REGISTER_TEMPORARY: 101,
    COMPLETE_REGISTER_MEMBER: 102,
    COMPLETE_UPDATE_MEMBER_INF: 103,
    RESET_PASSWORD: 107,
    COMPLETE_SETTING_PASSWORD: 103,
    COMPLETE_JOIN_GROUP: 108,
    COMPLETE_ORDER: 301
  },
  MailResult: {
    SEND_BOUNCE_SUCCESS: 1,
    SEND_BOUNCE_FAIL: 0,
    SEND_RESULT_SUCCESS: 1,
    SEND_RESULT_FAIL: 0,
    CODE_ACCEPT: 202
  }
}

export default CONFIG;

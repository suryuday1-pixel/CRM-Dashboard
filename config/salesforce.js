const jsforce = require('jsforce');
require('dotenv').config();

const conn = new jsforce.Connection({
  loginUrl: process.env.SALESFORCE_LOGIN_URL
});

async function loginToSalesforce() {
  try {
    await conn.login(
      process.env.SALESFORCE_USERNAME,
      process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_SECURITY_TOKEN
    );
    console.log('✅ Salesforce Connected Successfully!');
    return conn;
  } catch (error) {
    console.error('❌ Salesforce Connection Failed:', error.message);
    throw error;
  }
}

module.exports = { conn, loginToSalesforce };

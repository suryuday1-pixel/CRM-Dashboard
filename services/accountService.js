const { conn } = require('../config/salesforce');

async function getAllAccounts() {
  const result = await conn.query(
    `SELECT Id, Name, Industry, Phone, Type, CreatedDate FROM Account`
  );
  return result.records;
}

async function createAccount(accountData) {
  return await conn.sobject('Account').create(accountData);
}

async function updateAccount(id, fields) {
  return await conn.sobject('Account').update({ Id: id, ...fields });
}

async function deleteAccount(id) {
  return await conn.sobject('Account').destroy(id);
}

module.exports = { getAllAccounts, createAccount, updateAccount, deleteAccount };

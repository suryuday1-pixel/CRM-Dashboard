const { conn } = require('../config/salesforce');

// Fetch all Contacts
async function getAllContacts() {
  const result = await conn.query(
    `SELECT Id, FirstName, LastName, Email, AccountId, Phone, CreatedDate FROM Contact`
  );
  return result.records;
}

// Create Contact
async function createContact(contactData) {
  return await conn.sobject('Contact').create(contactData);
}

// Update Contact
async function updateContact(id, fields) {
  return await conn.sobject('Contact').update({ Id: id, ...fields });
}

// Delete Contact
async function deleteContact(id) {
  return await conn.sobject('Contact').destroy(id);
}

module.exports = { getAllContacts, createContact, updateContact, deleteContact };

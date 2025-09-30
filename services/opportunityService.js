const { conn } = require('../config/salesforce');

// Fetch all Opportunities
async function getAllOpportunities() {
  const result = await conn.query(
    `SELECT Id, Name, StageName, CloseDate, Amount, AccountId, CreatedDate 
     FROM Opportunity`
  );
  return result.records;
}

// Create Opportunity
async function createOpportunity(data) {
  return await conn.sobject('Opportunity').create(data);
}

// Update Opportunity
async function updateOpportunity(id, fields) {
  return await conn.sobject('Opportunity').update({ Id: id, ...fields });
}

// Delete Opportunity
async function deleteOpportunity(id) {
  return await conn.sobject('Opportunity').destroy(id);
}

module.exports = { getAllOpportunities, createOpportunity, updateOpportunity, deleteOpportunity };

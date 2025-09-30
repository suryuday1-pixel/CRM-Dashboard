const { conn } = require('../config/salesforce');

async function getAllLeads() {
  const result = await conn.query(
    `SELECT Id, FirstName, LastName, Email, Company, Phone, Status, CreatedDate 
     FROM Lead`
  );
  return result.records;
}
async function createLead(data) {
  return await conn.sobject('Lead').create(data);
}
async function updateLeadStatus(id, status) {
  return await conn.sobject('Lead').update({ Id: id, Status: status });
}
async function deleteLead(id) {
  return await conn.sobject('Lead').destroy(id);
}
// Stats query: total & recent count (last 7 days)
async function getLeadStats() {
  const [total, recent] = await Promise.all([
    conn.query('SELECT COUNT() FROM Lead'),
    conn.query('SELECT COUNT() FROM Lead WHERE CreatedDate = LAST_N_DAYS:7')
  ]);
  return {
    totalLeads: total.totalSize,
    recentLeads: recent.totalSize
  };
}

module.exports = { getAllLeads, createLead, updateLeadStatus, deleteLead, getLeadStats };

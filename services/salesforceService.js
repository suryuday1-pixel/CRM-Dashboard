const { conn } = require('../config/salesforce');

// CRUD Operations for Lead

async function getAllLeads() {
  const result = await conn.query(
    `SELECT Id, FirstName, LastName, Email, Company, Phone, Status, CreatedDate
     FROM Lead ORDER BY CreatedDate DESC LIMIT 50`
  );
  return result.records; 
}

async function createLead(leadData) {
  return await conn.sobject('Lead').create(leadData);
}

async function updateLeadStatus(id, status) {
  return await conn.sobject('Lead').update({ Id: id, Status: status });
}

async function deleteLead(id) {
  return await conn.sobject('Lead').destroy(id);
}

async function createLeadsBulk(leads) {
  return await conn.sobject('Lead').create(leads);
}

async function getLeadStats() {
  const [total, status, recent] = await Promise.all([
    conn.query('SELECT COUNT() FROM Lead'),
    conn.query('SELECT Status, COUNT(Id) recordCount FROM Lead GROUP BY Status'),
    conn.query('SELECT COUNT() FROM Lead WHERE CreatedDate = LAST_N_DAYS:7')
  ]);
  return {
    totalLeads: total.totalSize,
    recentLeads: recent.totalSize,
    leadsByStatus: status.records
  };
}
module.exports = {
  getAllLeads,
  createLead,
  updateLeadStatus,
  deleteLead,
  createLeadsBulk,
  getLeadStats
};

const salesforceService = require('../services/salesforceService');

// Get Leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await salesforceService.getAllLeads();
    res.json({ success: true, leads });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create Lead
exports.createLead = async (req, res) => {
  const { firstName, lastName, email, company, phone } = req.body;
  if (!firstName || !lastName || !email || !company) {
    return res.status(400).json({ success: false, error: 'Required fields: firstName, lastName, email, company' });
  }
  const leadData = {
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Company: company,
    Phone: phone || '',
    Status: 'Open - Not Contacted',
    LeadSource: 'Node.js API'
  };
  try {
    const result = await salesforceService.createLead(leadData);
    res.json({ success: true, leadId: result.id, data: leadData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Lead Status
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = [
    'Open - Not Contacted',
    'Working - Contacted',
    'Closed - Converted',
    'Closed - Not Converted'
  ];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid status.' });
  }
  try {
    await salesforceService.updateLeadStatus(id, status);
    res.json({ success: true, message: 'Lead status updated.', leadId: id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Lead
exports.deleteLead = async (req, res) => {
  const { id } = req.params;
  try {
    await salesforceService.deleteLead(id);
    res.json({ success: true, message: 'Lead deleted.', leadId: id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Bulk Lead Creation
exports.createLeadsBulk = async (req, res) => {
  const { leads } = req.body;
  if (!Array.isArray(leads) || leads.length === 0) {
    return res.status(400).json({ success: false, error: 'Please provide an array of leads' });
  }
  const processedLeads = leads.map(lead => ({
    FirstName: lead.firstName,
    LastName: lead.lastName,
    Email: lead.email,
    Company: lead.company,
    Phone: lead.phone || '',
    Status: 'Open - Not Contacted',
    LeadSource: 'Bulk Import'
  }));
  try {
    const results = await salesforceService.createLeadsBulk(processedLeads);
    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Lead Statistics
exports.leadStats = async (req, res) => {
  try {
    const stats = await salesforceService.getLeadStats();
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

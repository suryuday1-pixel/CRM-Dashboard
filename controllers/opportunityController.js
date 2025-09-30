const opportunityService = require('../services/opportunityService');

exports.getOpportunities = async (req, res) => {
  try {
    const opportunities = await opportunityService.getAllOpportunities();
    res.json({ success: true, opportunities });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createOpportunity = async (req, res) => {
  const { name, stageName, closeDate, amount, accountId } = req.body;
  if (!name || !stageName || !closeDate) {
    return res.status(400).json({ success: false, error: 'Required: name, stageName, closeDate' });
  }
  try {
    const data = {
      Name: name,
      StageName: stageName,
      CloseDate: closeDate,
      Amount: amount,
      AccountId: accountId
    };
    const result = await opportunityService.createOpportunity(data);
    res.json({ success: true, id: result.id, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateOpportunity = async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  try {
    await opportunityService.updateOpportunity(id, fields);
    res.json({ success: true, message: 'Opportunity updated.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  } this 
};

exports.deleteOpportunity = async (req, res) => {
  const { id } = req.params;
  try {
    await opportunityService.deleteOpportunity(id);
    res.json({ success: true, message: 'Opportunity deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


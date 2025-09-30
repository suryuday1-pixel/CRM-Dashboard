const accountService = require('../services/accountService');

exports.getAccounts = async (req, res) => {
  try { 
    const accounts = await accountService.getAllAccounts();
    res.json({ success: true, accounts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createAccount = async (req, res) => {
  const { name, industry, phone, type } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, error: 'Name required' });
  }
  try {
    const data = { Name: name, Industry: industry, Phone: phone, Type: type };
    const result = await accountService.createAccount(data);
    res.json({ success: true, id: result.id, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateAccount = async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  try {
    await accountService.updateAccount(id, fields);
    res.json({ success: true, message: 'Account updated.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    await accountService.deleteAccount(id);
    res.json({ success: true, message: 'Account deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



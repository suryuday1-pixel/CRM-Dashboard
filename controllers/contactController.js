const contactService = require('../services/contactService');

// List all contacts
exports.getContacts = async (req, res) => {
  try { 
    const contacts = await contactService.getAllContacts();
    res.json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new contact
exports.createContact = async (req, res) => {
  const { firstName, lastName, email, accountId, phone } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ success: false, error: 'Required: firstName, lastName, email' });
  }
  try {
    const data = { FirstName: firstName, LastName: lastName, Email: email, AccountId: accountId, Phone: phone };
    const result = await contactService.createContact(data);
    res.json({ success: true, id: result.id, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update contact fields
exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  try {
    await contactService.updateContact(id, fields);
    res.json({ success: true, message: 'Contact updated.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    await contactService.deleteContact(id);
    res.json({ success: true, message: 'Contact deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



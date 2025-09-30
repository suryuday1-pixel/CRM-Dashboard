const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.get('/leads', leadController.getLeads);
router.post('/leads', leadController.createLead);
router.put('/leads/:id/status', leadController.updateStatus);
router.delete('/leads/:id', leadController.deleteLead);
router.post('/leads/bulk', leadController.createLeadsBulk);
router.get('/leads/stats', leadController.leadStats);

// Optional: for health check
router.get('/health', (req, res) => res.json({ success: true, status: 'ok' }));

module.exports = router;

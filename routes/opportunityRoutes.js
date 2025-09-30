const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController');

router.get('/opportunities', opportunityController.getOpportunities);
router.post('/opportunities', opportunityController.createOpportunity);
router.put('/opportunities/:id', opportunityController.updateOpportunity);
router.delete('/opportunities/:id', opportunityController.deleteOpportunity);

module.exports = router;

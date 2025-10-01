const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const accountRoutes = require('./routes/accountRoutes');
const leadRoutes = require('./routes/leadRoutes');
const contactRoutes = require('./routes/contactRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const { loginToSalesforce } = require('./config/salesforce');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*', // Future me sirf extension origin daal dena
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

// ✅ Root endpoint (for Railway / sanity check)
app.get('/', (req, res) => {
  res.json({
    success: true,
    service: 'Salesforce Dashboard API',
    message: 'Welcome! Server is live 🚀',
    docs: '/api/health',
    timestamp: new Date().toISOString()
  });
});

// ✅ Health check endpoint (Extension ke liye)
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    status: 'online',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// ✅ API Routes
app.use('/api', (req, res, next) => {
  console.log(`➡️ API Request: ${req.method} ${req.originalUrl}`);
  next();
});
app.use('/api', accountRoutes);
app.use('/api', leadRoutes);
app.use('/api', contactRoutes);
app.use('/api', opportunityRoutes);

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// ✅ Start Server and Connect to Salesforce
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  try {
    await loginToSalesforce();
    console.log('✅ Connected to Salesforce. Ready to handle requests!');
    console.log('📱 Chrome Extension can now connect.');
  } catch (e) {
    console.error('❌ Salesforce credentials error:', e.message);
  }
});

// ✅ Graceful Shutdown
process.on('SIGINT', () => {
  console.log('🛑 Shutting down gracefully...');
  process.exit(0);
});
process.on('SIGTERM', () => {
  console.log('🛑 Terminated by platform...');
  process.exit(0);
});

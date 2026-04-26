const express = require('express');
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice
} = require('../controllers/user.controller.js');
const auth = require('../middleware/user.middleware.js');
const generateInvoicePDF = require('../utils/pdfGenerator.js');
const User = require('../models/user.model.js');
const Invoice = require('../models/invoice.model.js');

router.use(auth);

router.route('/').get(getInvoices).post(createInvoice);
router.route('/:id').get(getInvoice).put(updateInvoice).delete(deleteInvoice);

// PDF Route
router.get('/:id/pdf', auth, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ msg: 'Invoice not found' });
    if (invoice.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    
    const user = await User.findById(req.user.id).select('-password');
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`);
    
    generateInvoicePDF(invoice, user, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
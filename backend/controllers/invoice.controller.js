const Invoice = require('../models/invoice.model.js');

const generateInvoiceNumber = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  
  const lastInvoice = await Invoice.findOne({
    invoiceNumber: new RegExp(`^INV-${year}${month}-`)
  }).sort({ invoiceNumber: -1 });
  
  let sequence = '001';
  if (lastInvoice) {
    const lastSeq = parseInt(lastInvoice.invoiceNumber.split('-')[2]);
    sequence = String(lastSeq + 1).padStart(3, '0');
  }
  
  return `INV-${year}${month}-${sequence}`;
};

exports.createInvoice = async (req, res) => {
  try {
    const invoiceNumber = await generateInvoiceNumber();
    
    const invoice = new Invoice({
      ...req.body,
      user: req.user.id,
      invoiceNumber
    });
    
    if (invoice.items && invoice.items.length > 0) {
      let subtotal = 0;
      invoice.items.forEach(item => {
        item.amount = item.quantity * item.rate;
        subtotal += item.amount;
      });
      invoice.subtotal = subtotal;
      invoice.taxAmount = subtotal * (invoice.taxRate / 100);
      invoice.total = subtotal + invoice.taxAmount;
    }
    
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server error'});
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(invoices);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server error'});
  }
};

exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    
    if (!invoice) return res.status(404).json({ msg: 'Invoice not found' });
    if (invoice.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    
    res.status(200).json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server error'});
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    let invoice = await Invoice.findById(req.params.id);
    
    if (!invoice) return res.status(404).json({ msg: 'Invoice not found' });
    if (invoice.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    
    const updates = req.body;
    
    if (updates.items) {
      let subtotal = 0;
      updates.items.forEach(item => {
        item.amount = item.quantity * item.rate;
        subtotal += item.amount;
      });
      updates.subtotal = subtotal;
      const taxRate = updates.taxRate !== undefined ? updates.taxRate : invoice.taxRate;
      updates.taxAmount = subtotal * (taxRate / 100);
      updates.total = subtotal + updates.taxAmount;
    }
    
    invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    res.status(200).json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server error'});
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    
    if (!invoice) return res.status(404).json({ msg: 'Invoice not found' });
    if (invoice.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    
    await invoice.deleteOne();
    res.status(200).json({ msg: 'Invoice removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({msg:'Server error'});
  }
};
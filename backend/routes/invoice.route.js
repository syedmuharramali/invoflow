const express = require('express');
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice
} = require('../controllers/invoice.controller.js');
const auth = require('../middleware/user.middleware.js');

router.use(auth);

router.route('/').get(getInvoices).post(createInvoice);
router.route('/:id').get(getInvoice).put(updateInvoice).delete(deleteInvoice);

module.exports = router;
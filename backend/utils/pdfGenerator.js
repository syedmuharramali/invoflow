const PDFDocument = require('pdfkit');

const generateInvoicePDF = (invoice, business, res) => {
  const doc = new PDFDocument({ margin: 50, size: 'A4' });
  doc.pipe(res);

  // Header
  doc.fontSize(20).font('Helvetica-Bold').text(business.businessName || 'My Business', 50, 50);
  doc.fontSize(10).font('Helvetica').text(business.email || '', 50, 75);

  // Invoice Title
  doc.fontSize(16).font('Helvetica-Bold').text('INVOICE', 400, 50, { align: 'right' });
  doc.fontSize(10).font('Helvetica')
    .text(`Invoice #: ${invoice.invoiceNumber}`, 400, 70, { align: 'right' })
    .text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 400, 85, { align: 'right' });

  // Bill To
  doc.fontSize(12).font('Helvetica-Bold').text('Bill To:', 50, 140);
  doc.fontSize(10).font('Helvetica').text(invoice.clientName, 50, 155);

  // Table Header
  const tableTop = 230;
  doc.fontSize(10).font('Helvetica-Bold');
  doc.rect(50, tableTop, 515, 20).fill('#f3f4f6');
  doc.fillColor('#000000')
    .text('Description', 60, tableTop + 5)
    .text('Qty', 350, tableTop + 5, { width: 50, align: 'right' })
    .text('Rate', 400, tableTop + 5, { width: 60, align: 'right' })
    .text('Amount', 460, tableTop + 5, { width: 90, align: 'right' });
  doc.rect(50, tableTop, 515, 20).stroke();

  // Items
  let y = tableTop + 25;
  doc.font('Helvetica');
  invoice.items.forEach((item, index) => {
    if (index % 2 === 0) doc.rect(50, y - 5, 515, 20).fill('#f9fafb');
    doc.fillColor('#000000')
      .text(item.description, 60, y)
      .text(item.quantity.toString(), 350, y, { width: 50, align: 'right' })
      .text(`$${item.rate.toFixed(2)}`, 400, y, { width: 60, align: 'right' })
      .text(`$${item.amount.toFixed(2)}`, 460, y, { width: 90, align: 'right' });
    y += 20;
  });
  doc.rect(50, tableTop, 515, y - tableTop).stroke();

  // Totals
  const totalsX = 400;
  let totalsY = y + 20;
  doc.fontSize(10).font('Helvetica');
  doc.text('Subtotal:', totalsX, totalsY).text(`$${invoice.subtotal.toFixed(2)}`, 460, totalsY, { width: 90, align: 'right' });
  totalsY += 20;
  doc.text(`Tax (${invoice.taxRate}%):`, totalsX, totalsY).text(`$${invoice.taxAmount.toFixed(2)}`, 460, totalsY, { width: 90, align: 'right' });
  totalsY += 20;
  doc.font('Helvetica-Bold').text('Total:', totalsX, totalsY).text(`$${invoice.total.toFixed(2)}`, 460, totalsY, { width: 90, align: 'right' });
  doc.rect(totalsX, totalsY - 5, 165, 1).fill('#000000');

  doc.fontSize(8).font('Helvetica').text('Thank you for your business!', 50, 750, { align: 'center' });
  doc.end();
};

module.exports = generateInvoicePDF;
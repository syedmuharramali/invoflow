const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const userRouter=require("./routes/user.route.js");
const invoiceRouter=require("./routes/invoice.route.js")


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB is Connected'))
  .catch(err => {
    console.error(' MongoDB Connection Error:', err);
    process.exit(1);
  });

// Test Route
app.get('/', (req, res) => {
  res.send('InvoFlow API is running...');
});
app.use("/api/auth",userRouter);
app.use("/api/invoices",invoiceRouter)
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
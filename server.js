const express = require('express');
const { scheduleRecurringUpdates } = require('./utils/scheduler');
const expensesRouter = require('./routes/expenses');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Use the expenses routes
app.use('/expenses', expensesRouter);

// Schedule the recurring expense updates
scheduleRecurringUpdates();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

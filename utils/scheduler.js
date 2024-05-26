const axios = require('axios');
const cron = require('node-cron');

const STRAPI_URL = 'https://strapi.koders.in/expenses';

const updateRecurringExpenses = async () => {
  try {
    const response = await axios.get(STRAPI_URL);
    const expenses = response.data;

    const currentDate = new Date();

    expenses.forEach(async (expense) => {
      if (expense.frequency !== 'One-Time') {
        let incrementAmount = 0;
        const base = expense.base;

        switch (expense.frequency) {
          case 'Daily':
            incrementAmount = base;
            break;
          case 'Weekly':
            incrementAmount = currentDate.getDay() === 0 ? base : 0;
            break;
          case 'Monthly':
            incrementAmount = currentDate.getDate() === 1 ? base : 0;
            break;
          case 'Quarterly':
            incrementAmount = [1, 4, 7, 10].includes(currentDate.getMonth() + 1) && currentDate.getDate() === 1 ? base : 0;
            break;
          case 'Yearly':
            incrementAmount = currentDate.getMonth() === 0 && currentDate.getDate() === 1 ? base : 0;
            break;
          default:
            incrementAmount = 0;
        }

        if (incrementAmount > 0) {
          expense.amount += incrementAmount;
          await axios.put(`${STRAPI_URL}/${expense.id}`, { amount: expense.amount });
        }
      }
    });
  } catch (error) {
    console.error('Error updating recurring expenses:', error);
  }
};

const scheduleRecurringUpdates = () => {
  cron.schedule('0 0 * * *', updateRecurringExpenses);  // Run every day at midnight
};

module.exports = { scheduleRecurringUpdates };

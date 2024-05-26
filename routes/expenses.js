const express = require('express');
const axios = require('axios');

const router = express.Router();
const STRAPI_URL = 'https://strapi.koders.in/expenses';

// Create a new expense
router.post('/', async (req, res) => {
  try {
    const expense = req.body;
    const response = await axios.post(STRAPI_URL, expense);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(STRAPI_URL);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an expense by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const expense = req.body;
    const response = await axios.put(`${STRAPI_URL}/${id}`, expense);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an expense by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`${STRAPI_URL}/${id}`);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

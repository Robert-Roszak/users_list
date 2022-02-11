const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/users', async (req, res) => {
  try {
    const result = await axios.get('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data');
    if(!result) res.status(404).json({ users: 'Not found' });
    else res.json(result.data);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/userDelete', async (req, res) => {
  const user = req.body;
  try {
    const result = await axios.delete(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${user.id}`);
    if(!result) res.status(404).json({ users: 'Not found' });
    else {
      res.json(result.statusText);
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/userAdd', async (req, res) => {
  const user = req.body;
  try {
    const result = await axios.post(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/`, user);
    if(!result) res.status(404).json({ users: 'Not found' });
    else {
      res.json(result.data);
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.put('/userEdit', async (req, res) => {
  const user = req.body;
  try {
    const result = await axios.put(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${user.id}`);
    if(!result) res.status(404).json({ users: 'Not found' });
    else {
      res.json(result.status);
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;

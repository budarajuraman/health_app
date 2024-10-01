import express, { response } from 'express';
// const express = require('express');
const app = express();
const port = 3001;
import chatbot from './chatbot/index.js';
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.static('uploads'));

app.use(express.json());

app.post('/v2/api', async (req, res) => {
  let response = await chatbot(req.body.inpText);
  res.json({ message: response });
});

app.listen(port, () => {
  console.log(`App listening  on port ${port}`);
});

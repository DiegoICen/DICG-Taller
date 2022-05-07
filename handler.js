'use strict';
const serverless = require('serverless-http');
const express = require('express');
const AWS = require('aws-sdk');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));


const USERS_TABLE = process.env.USERS_TABLE

dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000'
});


app.get('/users', (req, res) => {
  res.send({
    data,
    err: null
  });
});

app.post('/user', (req, res) => {
  const {
    userId,
    name
  } = req.body;

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId,
      name
    }
  }

  dynamoDB.put(params, error => {
    if(error) return res.send({
      error
    });
    return res.send({
      userId, name
    })
  })

  
});

module.exports.generic = serverless(app);
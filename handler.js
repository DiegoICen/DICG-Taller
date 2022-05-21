'use strict';
const serverless = require('serverless-http');
const express = require('express');
const AWS = require('aws-sdk');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

const USERS_TABLE = process.env.USERS_TABLE;
const IS_OFFLINE = !!process.env.IS_OFFLINE;
const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;

if(IS_OFFLINE){
  dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  });

} else{
  dynamoDB = new AWS.DynamoDB.DocumentClient();
}




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

app.get('/user/:userId', (req, res) => {
  const{
    userId,
  } = req.params;

  /*const inCachUser = redis.get(`user-${userId}`)

  if(inCache){
    return res.send(JSON.parse(inCachUser));
  }*/

  const param = {

    TableName: USERS_TABLE,
    Item: {
      userId,
    }
  }

  /*dynamoDB.get(params, (error, result) => {
    if(result.Item){   
      const user = result.Item;
      redis.sent(`user-${userId}`, user, ONE_MINUTE);
      return res.send(user)
    }
  })  */

});

module.exports.generic = serverless(app);
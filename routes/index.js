var express = require('express');
var router = express.Router();
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

/* GET home page. */
router.get('/', async function(req, res, next){
  let my_file = await s3.getObject({ //Leser fra lageret
    Bucket: "cyclic-jade-fluffy-scorpion-eu-west-1",
    Key: "message.json"
  }).promise()

  const myMessage = JSON.parse(my_file.Body)?.message;

  res.json({ 
    status: 'success',
    result: myMessage
  });
});

router.post("/", async function(req, res){
  const {message} = req.body;
  const messageObj = {
    message:message
  }
  await s3.putObject({ //Skriver til lageret 
    Body: JSON.stringify(messageObj, null, 2),
    Bucket: "cyclic-jade-fluffy-scorpion-eu-west-1",
    Key: "message.json"
  }).promise()
  res.json({
    status: "success",
    message:message
  })
});

module.exports = router;

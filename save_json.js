const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

const save = async (myMessage) => {
  console.log("saving");
  await s3.putObject({
    Body: JSON.stringify(myMessage, null, 2),
    Bucket: "",
    Key: "message.json",
  }).promise()
};

module.exports = { save };
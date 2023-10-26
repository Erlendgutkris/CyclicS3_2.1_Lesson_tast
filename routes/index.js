var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next)=> {
  let my_file = await s3.getObject({
    Bucket: "",
    Key: "message.json"
  }).promise()

  const myMessage = JSON.parse(my_file.Body)?.myMessage;

  res.json({ 
    status: 'success',
    result: "result"
  });
});

router.post("/", async (req, res)=>{
  const {message} = req.body;
  await  save({
    myMessage:message
  });
  res.json({
    status: "success",
    myMessage: message
  });
});

module.exports = router;

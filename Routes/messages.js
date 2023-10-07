const express = require("express");
const { createMessage, showAllMessages } = require("../Controllers/message");
const router = express.Router();

router.route("/createmessage").post(createMessage);

router.route("/showmessages").get(showAllMessages);

module.exports = router;

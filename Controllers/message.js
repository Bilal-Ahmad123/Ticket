const { StatusCodes } = require("http-status-codes");
const Chat = require("../Models/Chat");
const Message = require("../Models/Message");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");

module.exports.createMessage = catchAsync(async (req, res, next) => {
  const { sender, reciever } = req.body;

  if (!sender || !reciever) {
    return next(
      new ErrorHandler("Sender and Reciever requured", StatusCodes.BAD_REQUEST)
    );
  }
  var chat = await Chat.findOne({
    users: { $all: [sender, reciever] },
  });
  if (!chat) {
    chat = await Chat.create({});
    chat.users.push(sender);
    chat.users.push(reciever);
    await chat.save();
  }
  const message = await Message.create(req.body);
  message.chat = chat._id;
  await message.save();

  await Chat.findByIdAndUpdate(chat._id, {
    latest: message._id,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    chat,
  });
});

module.exports.showAllMessages = catchAsync(async (req, res) => {
  const { sender, reciever } = req.query;
  const chat = await Chat.findOne({
    users: { $all: [sender, reciever] },
  });

  if (!chat) {
    return res.status(StatusCodes.OK).json({
      success: true,
      messages: [],
    });
  }

  const messages = await Message.find({ chat: chat._id });

  res.status(StatusCodes.OK).json({
    success: true,
    messages,
  });
});

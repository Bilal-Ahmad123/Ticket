const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const catchAsync = require("./catchAsync");
const ErrorHandler = require("./errorHandler");

module.exports.createToken = (user, res) => {
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  res.status(StatusCodes.OK).json({
    token,
  });
};

module.exports.verifyUser = catchAsync(async (req, res, nex, token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err.message);
    new ErrorHandler("Jwt expired", StatusCodes.REQUEST_TIMEOUT);
  }
});

const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb://localhost:27017/zeeshan", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongo Connection open");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;

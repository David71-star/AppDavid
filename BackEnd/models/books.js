const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    title: {
      type: String,
    },
    cover: {
      type: String,
    },
    readTime: {
      value: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    author: {
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
    },
  },
  { timestamps: true, statics: true }
);

module.exports = mongoose.model("booksModel", booksSchema, "books");

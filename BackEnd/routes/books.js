const express = require("express");
const books = express.Router();
const booksModel = require("../models/books");

//ESEGUO UNA CHIAMATA DI TIPO GET

books.get("/blogPost", async (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;
  try {
    const books = await booksModel
      .find()
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const totalBooks = await booksModel.countDocuments();
    res.status(200).send({
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(totalBooks / pageSize),
      books,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "internal server Error",
    });
  }
});

//ESEGUO UNA CHIAMATA DI TIPO POST

books.post("/blogPosts", async (req, res) => {
  const newBook = new booksModel(req.body);
  try {
    await newBook.save().res.status(201).send({
      statusCode: 201,
      message: "book saved",
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "internal server error",
    });
  }
});

module.exports = books;

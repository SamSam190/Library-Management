const express = require('express');
const router = express.Router();
const {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks
} = require('../controllers/bookController');

router.get('/search', searchBooks);

router.route('/')
    .get(getBooks)
    .post(addBook);

router.route('/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook);

module.exports = router;

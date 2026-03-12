const Book = require('../models/Book');

// @desc    Add a new book
// @route   POST /books
const addBook = async (req, res, next) => {
    try {
        const book = new Book(req.body);
        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400);
        } else if (error.code === 11000) {
            res.status(400);
            error.message = 'ISBN already exists';
        }
        next(error);
    }
};

// @desc    Get all book records
// @route   GET /books
const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

// @desc    Search book by title
// @route   GET /books/search
const searchBooks = async (req, res, next) => {
    try {
        const { title } = req.query;
        if (!title) {
            res.status(400);
            throw new Error('Please provide a title to search');
        }
        const books = await Book.find({ title: { $regex: title, $options: 'i' } });
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

// @desc    Get book by ID
// @route   GET /books/:id
const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404);
            error.message = 'Book not found';
        }
        next(error);
    }
};

// @desc    Update book details
// @route   PUT /books/:id
const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            const updatedBook = await Book.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            res.status(200).json(updatedBook);
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404);
            error.message = 'Book not found';
        } else if (error.name === 'ValidationError') {
            res.status(400);
        }
        next(error);
    }
};

// @desc    Delete book record
// @route   DELETE /books/:id
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Book removed' });
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404);
            error.message = 'Book not found';
        }
        next(error);
    }
};

module.exports = {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks
};

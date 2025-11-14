const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { validateBook } = require('../middleware/validate');

// GET routes
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);

// POST route
router.post('/', validateBook, booksController.createBook);

// PUT route
router.put('/:id', validateBook, booksController.updateBook);

// DELETE route
router.delete('/:id', booksController.deleteBook);

module.exports = router;
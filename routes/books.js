const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { isAuthenticated }= require('../middleware/authenticate');

// GET routes
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);

// POST route
router.post('/', isAuthenticated, booksController.createBook);

// PUT route
router.put('/:id', isAuthenticated, booksController.updateBook);

// DELETE route
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;
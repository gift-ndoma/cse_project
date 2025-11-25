const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const { isAuthenticated } = require('../middleware/authenticate');

// GET routes
router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getAuthorById);

// POST route
router.post('/', isAuthenticated, authorsController.createAuthor);

// PUT route
router.put('/:id', isAuthenticated, authorsController.updateAuthor);

// DELETE route
router.delete('/:id', isAuthenticated, authorsController.deleteAuthor);

module.exports = router;

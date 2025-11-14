const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res, next) => {
    try {
        const books = await mongodb.getDb().db().collection('books').find();    
        const booksList = await books.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(booksList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}   

const getBookById = async (req, res, next) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const book = await mongodb.getDb().db().collection('books').findOne({ _id: bookId });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }       
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }   
};

const createBook = async (req, res, next) => {
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            publishedYear: req.body.publishedYear,
            genre: req.body.genre,
            pageCount: req.body.pageCount,
            description: req.body.description,
            rating: req.body.rating,
            status: req.body.status
        };  
        const result = await mongodb.getDb().db().collection('books').insertOne(book);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }   
};

const updateBook = async (req, res, next) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const book = {
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            publishedYear: req.body.publishedYear,
            genre: req.body.genre,
            pageCount: req.body.pageCount,
            description: req.body.description,
            rating: req.body.rating,
            status: req.body.status
        };  
        const result = await mongodb.getDb().db().collection('books').replaceOne({ _id: bookId }, book);       
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }   
};

const deleteBook = async (req, res, next) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('books').deleteOne({ _id: bookId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }   
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};

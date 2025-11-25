const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all authors
const getAllAuthors = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('authors').find();
    const authors = await result.toArray();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching authors.' });
  }
};

// GET author by ID
const getAuthorById = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('authors')
      .find({ _id: authorId });

    const author = await result.toArray();

    if (!author[0]) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    res.status(200).json(author[0]);
  } catch (error) {
    res.status(500).json({ message: 'Invalid author ID.' });
  }
};

// CREATE author
const createAuthor = async (req, res) => {
  try {
    const newAuthor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthYear: req.body.birthYear,
      nationality: req.body.nationality
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('authors')
      .insertOne(newAuthor);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Failed to create author.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating author.' });
  }
};

// UPDATE author
const updateAuthor = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);

    const updatedAuthor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthYear: req.body.birthYear,
      nationality: req.body.nationality
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('authors')
      .replaceOne({ _id: authorId }, updatedAuthor);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Author not found or no changes made.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating author.' });
  }
};

// DELETE author
const deleteAuthor = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection('authors')
      .deleteOne({ _id: authorId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Author not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting author.' });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};

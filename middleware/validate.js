// Validation middleware for books
const validateBook = (req, res, next) => {
  const errors = [];
  const { title, author, isbn, publishedYear, genre, pageCount, rating, status } = req.body;

  // Required fields validation
  if (!title || title.trim() === '') {
    errors.push('Title is required');
  }

  if (!author || author.trim() === '') {
    errors.push('Author is required');
  }

  // ISBN validation (optional but must be valid format if provided)
  if (isbn && !/^(?:\d{10}|\d{13})$/.test(isbn.replace(/-/g, ''))) {
    errors.push('ISBN must be 10 or 13 digits');
  }

  // Published year validation
  if (publishedYear) {
    const year = parseInt(publishedYear);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1000 || year > currentYear) {
      errors.push(`Published year must be between 1000 and ${currentYear}`);
    }
  }

  // Genre validation
  const validGenres = ['fiction', 'non-fiction', 'mystery', 'sci-fi', 'fantasy', 'biography', 'history', 'romance', 'thriller', 'other'];
  if (genre && !validGenres.includes(genre.toLowerCase())) {
    errors.push(`Genre must be one of: ${validGenres.join(', ')}`);
  }

  // Page count validation
  if (pageCount) {
    const pages = parseInt(pageCount);
    if (isNaN(pages) || pages < 1 || pages > 10000) {
      errors.push('Page count must be between 1 and 10000');
    }
  }

  // Rating validation
  if (rating !== undefined && rating !== null) {
    const rate = parseFloat(rating);
    if (isNaN(rate) || rate < 1 || rate > 5) {
      errors.push('Rating must be between 1 and 5');
    }
  }

  // Status validation
  const validStatuses = ['available', 'checked-out', 'reserved'];
  if (status && !validStatuses.includes(status.toLowerCase())) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors 
    });
  }

  // Validation passed, continue to controller
  next();
};

// Validation middleware for authors
const validateAuthor = (req, res, next) => {
  const errors = [];
  const { name, birthYear, website } = req.body;

  // Required fields validation
  if (!name || name.trim() === '') {
    errors.push('Author name is required');
  }

  // Birth year validation
  if (birthYear) {
    const year = parseInt(birthYear);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1000 || year > currentYear) {
      errors.push(`Birth year must be between 1000 and ${currentYear}`);
    }
  }

  // Website validation (basic URL format)
  if (website && !/^https?:\/\/.+\..+/.test(website)) {
    errors.push('Website must be a valid URL starting with http:// or https://');
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors 
    });
  }

  // Validation passed, continue to controller
  next();
};

module.exports = {
  validateBook,
  validateAuthor
};
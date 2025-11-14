const router = require('express').Router();

router.use('/api-docs', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});
 
console.log('📍 About to load books routes...');
try {
  const booksRouter = require('./books');
  router.use('/books', booksRouter);
  console.log('✅ Books routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading books routes:', error);
}

module.exports = router;
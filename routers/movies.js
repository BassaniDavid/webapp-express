const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')
const moviesController = require('../controllers/moviesController');

// index
router.get('/', moviesController.index);

// show
router.get('/:slug', moviesController.show);

// store new review
router.post('/:id/reviews', moviesController.storeReview);

module.exports = router
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')

const moviesController = require('../controllers/moviesController');

// index
router.get('/', moviesController.index);

// show
router.get('/:id', moviesController.show);

// store new review
router.post('/:id/reviews', moviesController.storeReview);

//store new movie
router.post('/', upload.single('image'), moviesController.storeMovie);

module.exports = router
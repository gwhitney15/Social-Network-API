const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtId,
    newThought,
    updateThought,
    removeThought,
} = require('../../controllers/thought-controller');


router.route('/').get(getAllThoughts).post(newThought);

router.route('/:id').get(getThoughtId).put(updateThought).delete(removeThought);


module.exports = router;
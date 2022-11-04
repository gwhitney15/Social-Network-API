const router = require('express').Router();

const {
    getAllUsers,
    getUserId,
    createUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');


router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUserId).put(updateUser).delete(removeUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
module.exports = router;
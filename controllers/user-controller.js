
const Users = require("../models/user");
const Thought = require("../models/thought");

async function createUser(req, res) {
    try {
        const newUser = await Users.create(req.body);
        res.status(200).json(newUser);
    } catch (err) {
        console.error(err)
        res.status(500).json(err);
    };
};
async function getAllUsers(req, res) {
    const findAll = await Users.find({}).populate({ path: 'thoughts', select: '-__v' }).populate({ path: 'friends', select: '-__v' }).select('-__v')
    res.status(200).json(findAll)
};

async function getUserId({ params }, res) {
    const singleUser = await Users.findOne({ _id: params.id }).populate({ path: 'thoughts', select: '-__v' }).populate({ path: 'friends', select: '-__v' }).select('-__v')
    res.status(200).json(singleUser)

};
async function updateUser(req, res) {
    const userUpdate = await Users.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, runValidators: true })
    res.status(200).json(userUpdate)
};

async function removeUser({ params }, res) {
    const userRemove = await Users.findOneAndDelete({ _id: params.id })
    res.status(200).json(userRemove)
};

async function addFriend({ params }, res) {
    const friendAdd = await Users.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true }).populate({ path: 'friends', select: ('-__v') }).select('-__v')
    res.status(200).json(friendAdd)
};

async function removeFriend({ params }, res) {
    friendRemove = await Users.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true }).populate({ path: 'friends', select: '-__v' }).select('-__v')
    res.status(200).json(friendRemove)
}


module.exports = {
    createUser,
    getAllUsers,
    getUserId,
    updateUser,
    removeUser,
    addFriend,
    removeFriend,
} 
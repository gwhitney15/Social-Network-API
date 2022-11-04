const Users = require("../models/user");
const Thought = require("../models/thought");


async function newThought(req, res) {
    const createThought = await Thought.create(req.body)
    const thoughtUser = await Users.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: createThought._id } }, { new: true }).select('-__v').populate('thoughts');;
    res.status(200).json(thoughtUser);
};

async function getAllThoughts(req, res) {
    await Thought.find({}).populate({ path: 'reactions', select: '-__v' }).select('-__v').then(thoughtsData => res.json(thoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

async function getThoughtId({ params }, res) {
    await Thought.findOne({ _id: params.id }).populate({ path: 'reactions', select: '-__v' }).select('-__v').then(thoughtsData => {
        if (!thoughtsData) {
            res.status(404).json({ message: 'There are no thoughts with this ID' });
            return;
        }
        res.json(thoughtsData)
    })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
};

async function updateThought({ params, body }, res) {
    await Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true }).populate({ path: 'reactions', select: '-__v' }).select('-___v').then(thoughtsData => {
        if (!thoughtsData) {
            res.status(404).json({ message: 'There are no thoughts with this ID' });
            return;
        }
        res.json(thoughtsData);
    })
        .catch(err => res.json(err));
};
async function removeThought({ params }, res) {
    await Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtsData => {
            if (!thoughtsData) {
                res.status(404).json({ message: 'There are no thoughts with this ID' });
                return;
            }
            res.json(thoughtsData);
        })
        .catch(err => res.status(400).json(err));
};


module.exports = {
    newThought,
    getAllThoughts,
    getThoughtId,
    updateThought,
    removeThought,
};
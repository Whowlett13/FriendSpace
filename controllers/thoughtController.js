const { Thought, User} = require ("../models");

const thoughtController = {
    getThoughts(req, res) {
        Thought.find({})
        .populate({
            path: "reactions",
            select:"-_v"
        })
        .select('-_v')
        .sort({id: -1})
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err)=> {
            console.log(err);
            res.sendStatus(400);
        })
},
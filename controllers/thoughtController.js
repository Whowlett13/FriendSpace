const { Thought, User} = require ("../models");
const { db } = require("../models/User");

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
        });
},

getThoughBuyId({ params
}, res) {
    Thought.findOne({_id:params.id})
    .populate({
        path: "reactions"
        select: "-_v",
})
.select("-_v")
.then((dbThoughtData) => {
    if (!dbThoughtData){
        return res.status(404).json({message: "no thought found with this id!"});
    }
    res.josn(dbThoughtData);
});

},
const { Thought, User} = require ("../models");

//get all thoughts
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
//get thought by id
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
    res.json(dbThoughtData);
});

},
//create thought
createThought({params, body}, res){
    Thought.create(body)
    .then(({_id}) => {
        return User.findOneAndUpdate (
            { _id: body.userId},
            {$push: {thoughts: _id}},
            { new:true}
    );
    })
    .then((dbUserData) => {
        if (!dbUserData){
            return res.status(404).json({message: 'thought created but no user with this id!!'});


        }
        res.json({message: "thought created successfully!!"})
    })
    .catch((err) => res.json(err));
},

//update thought by id
updateThought({ params, body}, res) {
    Thought.findOneAndUpdate({_id: params.id}, body, {
        new:true,
        runValidators: true,
    })
    .then((dbThoughtData) => {
        if (!dbThoughtData) {
            res.status(404).json({ message: "No thought found with this id!" });
            return;
        } 
         res.json(dbThoughtData);
    })
  
    .catch((err) => res.json(err));
},
//delete thought

deleteThought([ params], res){
    Thought.findByIdAndDelete({ _id: params.id})
    .then((dbThoughtData) => {
        if (!dbThoughtData){
            return res.status(404).json({message: "No thought with this id found!"});

        }
        return User.findOneAndUpdate(
            {thoughts: params.id},
            {$pull: {
            thoughts: params.id
            }},
            {new: true}

        );

    })
    .then((dbUserData) => {
        if (!dbUserData){
            return res.status(404)
            .json({message: "Thought Created But No User With This Id Found!!"})
        }
        res.json({ message: "Thought Successfully Deleted!!"})
    })
    .catch((err) => res.json(err));

},

//adding reaction

addReaction({ params, body}, res){
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$addToSet: { reactions: body}}
        {new: true, runValidators: true}
    )
    .then((dbThoughtData) => {
if(!dbThoughtData){
    res.status(404).json({ message: "No Thought With This Id Found!!"});
    return;
}
res.json(dbThoughtData);
    })
    .catch((err) => res.json(err));

},
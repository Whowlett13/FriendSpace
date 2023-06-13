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
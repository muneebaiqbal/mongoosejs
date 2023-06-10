const mongoose = require("mongoose");
const validator = require("validator");

//connection creation and creating a new db
mongoose.connect("mongodb://localhost:27017/ttchannel", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connection successfull..."))
    .catch((err) => console.log(err));

//Schema
//A mongoose schema defines the structure of document,
//default values, validators,etc

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: [2, "minimum 2 letters"],
        maxlength: 30
    },
    ctype: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["frontend", "backend", "database"]
    },
    videos:
    {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("videos count should not be negative");
            }
        }
        // validate:{
        //     validator:function(value){
        //         return value.length < 0
        //     },
        //     message:"videos count should not be negative"
        // }
    },
    author: String,
    email: { 
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is inValid");
            }

        }
    },
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

//A mongoose model is a wrapper on the mongoose schema.
//A mongoose schema defines the structure of document,
//default values, validators,etc., whereas a mongoose model 
// provides an interface to the database for creating,
// querying, updating,deleting records, etc.

//collection creation
const Playlist = new mongoose.model("Playlist", playlistSchema);

//create document or insert

const createDocument = async () => {
    try {
        // const jsPlaylist = new Playlist({
        //     name: "javascript",
        //     ctype: "Front End",
        //     videos: 150,
        //     author: "Thapa Technical",
        //     active: true
        // })
        // const mongoPlaylist = new Playlist({
        //     name: "Mongo",
        //     ctype: "Database",
        //     videos: 10,
        //     author: "Thapa Technical",
        //     active: true
        // })
        // const expressPlaylist = new Playlist({
        //     name: "Express JS",
        //     ctype: "Back End",
        //     videos: 20,
        //     author: "Thapa Technical",
        //     active: true
        // })

        const mongoosePlaylist = new Playlist({
            name: "monogose js",
            ctype: "Database",
            videos: 5,
            author: "Thapa Technical",
            email: "thapa@gmail.co",
            active: true
        })
        const result = await Playlist.insertMany([mongoosePlaylist]);
        console.log(result);
    } catch (err) {
        console.log(err);
    }

}

createDocument();

const getDocument = async () => {
    try {
        const result = await Playlist
            .find({ author: "Thapa Technical" })
            .select({ name: 1 })
            .sort({ name: -1 });
        //.countDocuments();
        //.limit(1);
        console.log(result);
    } catch (err) {
        console.log(err);
    }

}


//getDocument();

//update the document
const updateDocument = async (_id) => {
    try {
        const result = await Playlist.findByIdAndUpdate({ _id }, {
            $set: {
                name: "Javascript"
            }
        }, {
            new: true,
            useFindAndModify: false
        }
        );
        console.log(result);
    } catch (err) {
        console.log(err);
    }

}

// updateDocument("63f604ddb0dff6170f7d2771")



//delete the document
// const deleteDocument = async (_id)=>{
//     try{
//     const result = await Playlist.findByIdAndDelete({_id});
//     console.log(result);
//     }catch(err){
//         console.log(err);
//     }
// }


// deleteDocument("63fb475035f7ea7f6d4eacbe");
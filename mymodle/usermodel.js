"use strict";



const mongoose = require("mongoose");
require("dotenv").config();
//mongodb://localhost:27017/books
mongoose.connect('mongodb://localhost:27017/books', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// module.exports = seedUserCollection;

module.exports = {
    getBooksHandler ,
    handleAddBook,
    handleDeleteBook,
    updateBookHandler,
};
const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
});

const userSchema = new mongoose.Schema({
  email: String,
  books: [bookSchema],
});

const bookModel = mongoose.model("Books", bookSchema);
const userModel = mongoose.model("User", userSchema);
//function for insert  user data (seeding)
function seedBooksCollection() {
  const cleanness = new bookModel({
    name: "Cleanness",
    description:
      "The casual grandeur of Garth Greenwell’s prose, unfurling in page-long paragraphs and elegantly garrulous sentences, tempts the vulnerable reader into danger zones: traumatic memories, extreme sexual scenarios, states of paralyzing heartbreak and loss. In the case of “Cleanness,” Greenwell’s third work of fiction, I initially curled up with the book, savoring the sensuous richness of the writing, and then I found myself sweating a little, uncomfortably invested in the rawness of the scene.",
      status:
      "https://media.newyorker.com/photos/5fc53eaac7dac80adfffcceb/master/w_1600%2Cc_limit/TNY-BestBooks2020-Greenwell.jpg",
  });

  const stranger = new bookModel({
    name: "Stranger Faces ",
    description:
      "In an age of totalizing theories, it’s nice to watch someone expertly pull a single idea through a needle’s eye. “Stranger Faces,” by Namwali Serpell, is one such exercise. The book’s catalytic inquiry—“what counts as a face and why?”—means to undermine the face, the way its expressive capabilities give it the cast of truth. ",
      status:
      "https://media.newyorker.com/photos/5fc53ead04d5eeb69d5bb23a/master/w_1600%2Cc_limit/TNY-BestBooks2020-Serpell.jpg",
  });

  // console.log(cleanness);
  // console.log(sherry);

  cleanness.save();
  stranger.save();
}
// seedBooksCollection ();
//  seedUserCollection ();
//data seeding
function seedUserCollection() {
  const mohammad = new userModel({
    email: "mohammadhayagneh96@gmail.com",
    books: [
      {
        name: "Want",
        description:
          "Strong uses the friendship as a tether, returning to it to mark time’s passing; her technique is so sophisticated that the murk of the present and the sharply remembered past hold seamlessly together. Her biggest triumph is the transmission of consciousness. I loved the tense pleasure of staying pressed close to her narrator’s mind, with its beguiling lucidity of thought and rawness of feeling. ",
          status:
          "https://media.newyorker.com/photos/5fc53ead0013a5ddc52c0dfc/master/w_1600%2Cc_limit/TNY-BestBooks2020-StegerStrong.jpg",
      },
      {
        name: "Cleanness",
        description:
          "The casual grandeur of Garth Greenwell’s prose, unfurling in page-long paragraphs and elegantly garrulous sentences, tempts the vulnerable reader into danger zones: traumatic memories, extreme sexual scenarios, states of paralyzing heartbreak and loss. In the case of “Cleanness,” Greenwell’s third work of fiction, I initially curled up with the book, savoring the sensuous richness of the writing, and then I found myself sweating a little, uncomfortably invested in the rawness of the scene.",
          status:
          "https://media.newyorker.com/photos/5fc53eaac7dac80adfffcceb/master/w_1600%2Cc_limit/TNY-BestBooks2020-Greenwell.jpg",
      },
      {
        name: "Stranger Faces ",
        description:
          "In an age of totalizing theories, it’s nice to watch someone expertly pull a single idea through a needle’s eye. “Stranger Faces,” by Namwali Serpell, is one such exercise. The book’s catalytic inquiry—“what counts as a face and why?”—means to undermine the face, the way its expressive capabilities give it the cast of truth. ",
          status:
          "https://media.newyorker.com/photos/5fc53ead04d5eeb69d5bb23a/master/w_1600%2Cc_limit/TNY-BestBooks2020-Serpell.jpg",
      },
    ],
  });

  mohammad.save();
}
function getBooksHandler(req, res) {
  let requestedUserEmail = req.query.email;
  userModel.find({ email: requestedUserEmail }, function (err, userData) {
    if (err) {
      console.log("something went wrong");
    } else {
      console.log(userData[0].books);
      res.send(userData[0].books);
    }
  });
}
function handleAddBook(req,res){
    console.log(req.body);
    let {name,description,status,email}=req.body;
    userModel.find({email:email},function(err,userData){
        if(err){
            res.send(err);
        }
        else
        {
            // console.log(userData[0].books);
            
            userData[0].books.push({
                name:name,
                description:description,
                status:status

            })
            userData[0].save();
            res.send(userData[0].books);
            
        }
    })
}
    // console.log(req.body);

    function handleDeleteBook(req,res){
        const {email} = req.query;
        const index = Number(req.params.index);
        userModel.find({email:email},(err,userData)=>{
            if(err)
            {
                console.log('something went wrong');
            }
            else
            {
                const newBookArr = userData[0].books.filter((book,idx)=>{
                    if(idx !== index)
                    {
                        return book;
                    }
                })
                userData[0].books = newBookArr;
                userData[0].save();
                res.send(userData[0].books);
                
            }
        })
    
    
    }
    function updateBookHandler(req,res){
      let {name,description,status,email}=req.body;
      const index = Number(req.params.index);
      userModel.findOne({email},(err,userData)=>{
          console.log('before splice',userData);
          userData.books.splice(index,1,{
              name:name,
              description:description,
              status:status
          })
          console.log('after splice',userData);
  
          userData.save();
          res.send(userData.books);
      })
  
      
  
  }
  
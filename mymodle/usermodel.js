const axios = require('axios');
const port = process.env.Port;
require(`dotenv`).config();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });










module.exports= userCollection;
module.exports= getbooksHandler;

const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String

});

const userSchema = new mongoose.Schema({
    email: String,
    books: [BookSchema]
});

const myuserModel = mongoose.model('User', userSchema);
const mybookModel = mongoose.model('Book', BookSchema);


function userCollection() {
    const Mohammad = new myuserModel({
        email: 'mohammadhayagneh96@gmail.com',
        books: [
            {
                name: 'Cleanness',
                description: 'The casual grandeur of Garth Greenwell’s prose, unfurling in page-long paragraphs and elegantly garrulous sentences, tempts the vulnerable reader into danger zones: traumatic memories, extreme sexual scenarios, states of paralyzing heartbreak and loss. In the case of “Cleanness,” Greenwell’s third work of fiction, I initially curled up with the book, savoring the sensuous richness of the writing, and then I found myself sweating a little, uncomfortably invested in the rawness of the scene.',
                status: 'https://media.newyorker.com/photos/5fc53eaac7dac80adfffcceb/master/w_1600%2Cc_limit/TNY-BestBooks2020-Greenwell.jpg'
            },
            {
                name: 'The Monocle Book of Gentle Living‏',
                description: 'is a handbook to help you think about how to reconnect, make good things happen, to do something you care about and discover nice places and',
                status: 'https://img.monocle.com/product/monocle-gentle-book-03-09-2022-5f5fd697e10c4.jpg?w=760&h=570&g=center&q=80'
            }
        ]

    })

    Mohammad.save();
}
// userCollection();



function getbooksHandler(req,res){
    let requestedUserEmail = req.query.email;
    myuserModel.find({email:requestedUserEmail },function(err,userData){
        if(err){
            console.log('something went wrong');
        }
        else
        {
            //   console.log(userData[0].books);
              res.send(userData[0].books);
        }
    })
}

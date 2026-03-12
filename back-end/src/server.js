import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';

const credentials = JSON.parse()(
    fs.readFileSync('./credentials.json')
)

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});


// const articleInfo = [
//   { name: 'learn-node', upvotes: 0, comments: [] },
//   { name: 'learn-react', upvotes: 0, comments: [] },
//   { name: 'mongodb', upvotes: 0, comments: [] },
// ]

const app = express();

app.use(express.json()); //Tells our server to parse incoming JSON data in the request body and make it available under req.body

let db;

async function connectToDb() {
    const uri = 'mongodb://127.0.0.1:27017/'; //Connection string to connect to the MongoDB server running on localhost

    const client = new MongoClient(uri, { 
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();

    db = client.db('full-stack-react-db'); 
}

//load data from mongodb
app.get('/api/articles/:name', async (req, res) => {
    const { name }= req.params; //Extract the name parameter from the request URL'')

    
    const article = await db.collection('articles').findOne({ name }); //Find the article with the matching name in the articles collection

    res.json(article); //Send the article info back to the client as a JSON response
});

//find the mathing article and increment the upvotes by 1, then send the updated article info back to the client
//Test in Postman by sending a POST request to http://localhost:8000/api/articles/learn-node/upvote
app.post('/api/articles/:name/upvote', async (req, res) => {
    const { name }= req.params; //Extract the name parameter from the request URL

    const updatedArticle = await db.collection('articles').findOneAndUpdate({name}, { 
        $inc: { upvotes: 1 }    //increment the upvotes $inc
    }, { 
        returnDocument: 'after' //Return the updated document after the update operation is applied
    }); 
    res.json(updatedArticle); //Send the updated article info back to the client as a JSON response
});


//Test in Postman by sending a POST request to http://localhost:8000/api/articles/learn-node/comments with the following JSON body:
// {
//     "postedBy": "John Doe",
//     "text": "This is a great article!"
// }
app.post('/api/articles/:name/comments', async (req, res) => {
    const {name} = req.params; 
    const {postedBy, text} = req.body; //Extract the postedBy and text properties from the request body
    const newComment = { postedBy, text };

    const updatedArticle = await db.collection('articles').findOneAndUpdate({name}, {
        $push: { comments: newComment } //Use the $push operator to add a new comment object to the comments array of the matching article document
    }, {
        returnDocument: 'after' //Return the updated document after the update operation is applied
    });
    res.json(updatedArticle); //Send  back to the client as a JSON response
});

async function startServer() {
    await connectToDb(); //Connect to the MongoDB database before starting the server

    app.listen(8000, function() {
    console.log('Server is listening on port 8000');
});
}

//start the server and listen on a port
startServer();





//create an end point - path can send request to and will send msg or data back 
// app.get('/hello', function(req, res) {
//     res.send('Hello from a get endpoint');
// });

// app.get('/hello/:name', function(req, res) {
//     res.send('Hello,' + req.params.name);
// });
    
// app.post('/hello', function(req, res) {
//     res.send('Hello,' + req.body.name +'from a post endpoint');
// });
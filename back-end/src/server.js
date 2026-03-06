import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

const articleInfo = [
  { name: 'learn-node', upvotes: 0, comments: [] },
  { name: 'learn-react', upvotes: 0, comments: [] },
  { name: 'mongodb', upvotes: 0, comments: [] },
]

const app = express();

app.use(express.json()); //Tells our server to parse incoming JSON data in the request body and make it available under req.body

//load data from mongodb
// app.get('/api/articles/:name', async (req, res) => {
//     const { name }= req.params; //Extract the name parameter from the request URL'')

//     const uri = 'mongodb://127.0.0.1:27017/'; //Connection string to connect to the MongoDB server running on localhost

//     const client = new MongoClient(uri, { 
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     });

//     await client.connect();

//     const db = client.db('full-stack-react-db'); 
//     const article = await db.collection('articles').findOne({ name }); //Find the article with the matching name in the articles collection

//     res.json(article); //Send the article info back to the client as a JSON response
// });

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

//find the mathing article and increment the upvotes by 1, then send the updated article info back to the client
app.post('/api/articles/:name/upvote', (req, res) => {
    const article = articleInfo.find(a => a.name === req.params.name); //Find the matching article
    
    article.upvotes += 1; //Increment the upvotes by 1

    // res.send('Hooray! The article ' + req.params.name + ' now has ' + article.upvotes + ' upvotes.');
    res.json(article); //Send the updated article info back to the client as a JSON response
});

app.post('/api/articles/:name/comments', (req, res) => {
    const {name} = req.params; 
    const {postedBy, text} = req.body; //Extract the postedBy and text properties from the request body

    const article = articleInfo.find(a => a.name === req.params.name); //Find the matching article
    article.comments.push({
        postedBy, 
        text
    }); //Add the new comment to the article's comments array

    res.json(article); //Send the updated article info back to the client as a JSON response
});

//start the server and listen on a port
app.listen(8000, function() {
    console.log('Server is listening on port 8000');
});
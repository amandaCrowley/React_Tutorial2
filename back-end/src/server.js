import express from 'express';

const app = express();

//create an end point - path can send request to and will send msg or data back 
app.get('/hello', function(req, res) {
    res.send('Hello World');
});

//start the server and listen on a port
app.listen(8000, function() {
    console.log('Server is listening on port 8000');
});

const express = require('express');                                         //including express
const httpHandler = require('./src/httpHandler');                           //including httpHandler file to use its functionality
const path = require('path');
const cors = require('cors');

const app = express();                                                      //calling constructor to make an object, app will allow us to control the server
const PORT = 3002;                                                          //declared some constants

//Middleware === use
app.use(cors());                                                            //calling constructor
app.use(express.static('Public'));                                          //we need to make a folder public here then the content in this folder will be visible //path.join(__dirname, )
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//app.get('/', httpHandler.sendRootPage);
app.get('/playlist', httpHandler.getPlaylist);
app.get('/track/:id', httpHandler.getTrack);
app.delete('/track/:id', httpHandler.deleteTrack);
app.post('/addtrack', httpHandler.addTrack);

app.listen(3002,() => console.log(`server started on port ${PORT}`));       //this line should be at the end, and with tick (``) we can write variable also inside tick
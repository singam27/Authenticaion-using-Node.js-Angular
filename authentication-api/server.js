const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db')

//Express API
const api= require('./routes/auth.routes');


//MongoDB Connection
mongoose.Promise= global.Promise;
mongoose.connect(dbConfig.db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected Succesfully")
},
error =>{
    console.log("Database cannot be connected: " + error);
    }
)

//Express Settings
const app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(cors());

//Server Static Resources

app.use('/public',express.static('public'));
app.use('/api',api);


//Defining Port
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log("Connected to port" + port);
})

//Express error handling

app.use(function(err,req,res,next){
    console.log(err)
});
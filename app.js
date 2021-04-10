const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

//Routes
app.use('/bonds', require('./routes/bonds'));
app.use('/users', require('./routes/users'));

app.get('/',(req, res)=>{
    res.send('We are home');
});

mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, () =>{
    console.log('connected to DBBBB!!');
})

// mongoose.connect('mongodb+srv://testuser:testpassword@cluster0.kpfbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, () => {
//         console.log('connected to DBBBB!!');
//     } )

//listen to server
app.listen(3000);
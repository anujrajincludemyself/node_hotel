const express = require('express')
const app = express();
const person = require('./models/person')
app.use(express.json());
const menuitem = require('./models/menuitem');
require('dotenv').config();


app.get('/',function(req, res){
       res.send('hi');
})

const port = process.env.port || 3000





const personroutes = require('./routes/personRoute')
app.use('/person' , personroutes)

const menuroutes = require('./routes/menuRoutes')
app.use('/menu',menuroutes)


app.listen(3000, ()=>{
    console.log('the server is listening');
});















// var age= notes.age;
// console.log(age)
// var result = notes.addsum(age+18, 10)
// console.log(result);




// var fs = require('fs')
// var os = require('os')


// let user = os.userInfo()
// console.log(user.username)

// fs.appendFile('greeting.txt', 'hi'+ user.username+ '\n' , ()=> {console.log('you are done')})
// const notes = require('./notes.js')
// var _ = require('lodash')

// var data = [23,23,'anuj','raj']

// var filter = _.uniq(data);
// console.log(filter);



// app.get('/chicken',function(req,res){
//     res.send('i love chicken');
// })
// app.get('/hot',function(req,res){
//  var typesofphotos ={
//     first:'b****',
//     second:'a**',
//     third:'biki**'
//  }
//     res.send(typesofphotos);
// })

// app.post('/item' , (res) => {
//     res.send('we got it anuj')  

// })
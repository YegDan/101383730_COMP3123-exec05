const express = require('express');
const app = express();
const router = express.Router();

const userData = (req,res,next)=>{
   req.user =  require('./user.json')
   next()
}
app.use(userData)
/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(__dirname +
     '/home.html');
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.json(req.user);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
//http://localhost:8081/login?uname=venus&passwrd=123v
router.get('/login', (req,res) => {
    const data = req.query
    const userData = req.user
    if(data.uname==userData.username && data.passwrd==userData.password){
      const generatedJson = { status: true,
         message: "User Is valid"}

      res.json(generatedJson)
    }
    else if(data.uname!=userData.username){
      const generatedJson = { status: false, 
        message: "User Name is invalid"}

      res.json(generatedJson)
    }
    else if(data.passwrd!=userData.password){
      const generatedJson = { status: false,
        message: "Password is invalid"}

      res.json(generatedJson)
    }
  // res.send('This is login router');
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
//http://localhost:8081/logout/username
router.get('/logout/:username', (req,res) => {
  const data = req.params

  // res.setHeader('Content-Type', 'text/html');
  res.send(`<b>${data.username} successfully logout.</b>`);
  
  
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));
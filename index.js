const express= require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

//Create Express APp Ojbect
const app = express();


//This load all the static asssets in the public folder, such include css file, images, js file(s)
app.use(express.static('public'));


//This tells Express that I want to use handlebars as my TEMPLATING ENGINE!!!!!!!!!!
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// This tells Express to parse all submitted form data into the body of the request object
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public')); 

//Routes

app.get("/",(req,res)=>{


    //load index.handlebars
    res.render("home")
});

//The below route handler is called to dispay the FORM page
app.get("/room",(req,res)=>{


    //load message.handlebars
    res.render("room")
});

app.get("/signup",(req,res)=>{


    //load message.handlebars
    res.render("signup")
});
//The below route handles is called to process the form when submitted!!!!!!
app.post("/messages",(req,res)=>{


    /*************SERVER SIDE VALIDATION *******************/
    const errors =[]; // array length is initially 0

    if(req.body.fullName=="")
    {
        errors.push("Please enter a full name")
    }

    if(req.body.email=="")
    {
        errors.push("Please enter an email")
    }


    if(req.body.phoneNo=="")
    {
        errors.push("Please enter a phone number")
    }
    
    if(req.body.message=="")
    {
        errors.push("Please enter a message")
    }


     /*************END SERVER SIDE VALIDATION *******************/


      //This means that there are errors therefore we want to re-render the current form
      if(errors.length > 0)
      {

          //Here we want to inject error message array into the message.handlebars file
          res.render("message",
          {
             message:errors 
          })
      }

      /*
        This means that there are no errors 
        Thus we want to send send sms, send email and re-direct the user
      */
      else
      {

         // SEND SMS TEXT 
      }
         

});

//Creates and Express Web Server that will "sit"
//in our web applicaiton and responds to routes on port 3000
const PORT=3000;
app.listen(PORT,()=>{

    console.log(`The Web Server started at PORT :${PORT}`);
});

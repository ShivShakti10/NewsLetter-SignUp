const express = require('express');
const bodyParser = require('body-parser');
const request = require('superagent');
const https = require('https');


const app = express();

app.use(express.static("/public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/" , function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    
    const firstName=(req.body.fname);
    const lastName=(req.body.lname);
   const email=(req.body.email);

    var data={
        member:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    request
        .post('https://us13.api.mailchimp.com/3.0/lists/3a3dbcaacf/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('363cf2565238083d2cad8baf3466602d-us13'))
        .send({
          'email_address': email,
          'status': 'subscribed',
          'merge_fields': {
            'FNAME': firstName,
            'LNAME': lastName
          }
        })
            .end(function(err, response) {
              if (response.status == 200) {
                res.sendFile( __dirname + "/success.html");
              } else {
                res.sendFile( __dirname + "/failure.html");
              }
          });

   
});
 
app.listen(3000, function(){
    console.log('listening on port 3000');
})

// API KEY
// 363cf2565238083d2cad8baf3466602d-us13

// List Id
// 3a3dbcaacf
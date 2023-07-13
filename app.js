//commands : npm init 
//npm install express body-parser request
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser"); 
const https = require("https");
const app = express();
// const router = express.Router();


 app.use(express.static("public2"));
app.use(bodyParser.urlencoded({ extended: true }));
// router.get('/', (req, res) => {
//     res.sendFile(__dirname + "signup.html");
// });


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/c387406251"
    const options = {
        method: "POST",
        auth: "saksham:2075fc6e2f30d126f7d994d38a7e905d-us21"}

const request2 = https.request(url, options, (response) => {
    if(response.statusCode===200){
        res.sendFile(__dirname+ "/success.html");}
    else{
        res.sendFile(__dirname+ "/failure.html");
        }
        response.on("data", (data) => {
        console.log(JSON.parse(data));
    });
});
    request2.write(jsonData);
    request2.end();
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});



//API KEY:2075fc6e2f30d126f7d994d38a7e905d-us21
//Audience ID: c387406251

// commands : npm init r
// npm install express body-parser request
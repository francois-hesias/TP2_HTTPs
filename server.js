const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
app.set("view engine", "ejs");
const options = {
    key: fs.readFileSync('/home/ubuntu/Desktop/NodeJS/CERT/key.pem'),
    passphrase: 'hesias',
    cert: fs.readFileSync('/home/ubuntu/Desktop/NodeJS/CERT/cert.pem')
};

app.use (express.static('./mirko'));
app.get('/toto', (req,res)=>{
    res.sendFile(__dirname +'/mirko/index.html');
    })

app.get('/utilisateurs', (req,res)=>{
    let listUsers;
        listUsers = [
            {nom : 'utilisateur1', age : 10},
            {nom : 'utilisateur2', age : 15},
            {nom : 'jacquouille', age : 2000}
        ];
        console.log(listUsers);
        let data = {title: "liste utilisateurs" , utilisateurs : listUsers} ;
        res.render('utilisateurs',data);
});
app.get('/', (req,res)=>{
       let listOffre = [
            {typeOffre : 'BASIC BUNDLE', description : 'oui oui oui oui oui oui', content : 'Lorem ipsum dolor sit amet.', prix: 24},
            {typeOffre : 'BUSINESS BUNDLE', description : 'oui oui oui oui oui oui', content : 'Lorem ipsum dolor sit amet.', prix: 99},
            {typeOffre : 'PREMIUM BUNDLE', description : 'oui oui oui oui oui oui', content : 'Lorem ipsum dolor sit amet.', prix: 199}
        ];
        res.render('index', {title: 'jaimelepain', offres : listOffre});
});
app.use(function(req, res, next) {
    res.status(404).send('404 NOT FOUND');
    });

https.createServer(options, app ).listen(8866);
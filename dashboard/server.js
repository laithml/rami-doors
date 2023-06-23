const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const {auth, db} = require('./config/Firebase');
const {
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut
} = require('firebase/auth');
const {doc, setDoc, updateDoc, getDoc, collection, getDocs, deleteDoc} = require('firebase/firestore');
const app = express();
const upload = multer();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use('/', require("./route/router"));


//login auth
app.post("/login", upload.none(), (req, res) => {
    const {email, password} = req.body;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed in successfully
            const user = userCredential.user;
            res.status(200).send({message: "Login successful"});
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(error);
            res.status(500).send({message: "Login failed"});
        });
});

app.post('/logout', upload.none(), (req, res) => {
    signOut(auth)
        .then(() => {
            res.sendStatus(200); // Sending 200 OK status
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(500); // Sending 500 Internal Server Error status
        });
});


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});


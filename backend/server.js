const express = require('express')
const app = express()
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs')
const helpers = require('./helpers');

//use express static folder
app.use(cors());
app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "svgfile"
})

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})

//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../frontend/public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, new Date().getTime() + file.originalname)
        // callBack(null, file.originalname + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage,
    fileFilter: helpers.imageFilter
});


app.post("/upload", upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("Only Svg file upload");
    } else {
        // var imgsrc = req.file.filename
        // console.log('imgesrc' + imgsrc)
        var createdDate = req.body.createdDate
        var imageName = req.file.filename
        console.log(imageName);
        var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
        var insertData = "INSERT INTO images(path, createdDate, imageName)VALUES(?,?,?)"
        db.query(insertData, [imgsrc, createdDate, imageName], (err, result) => {
            if (err) throw err
            res.status(200).json({ mess: "file uploaded" })
        })
    }
});

app.post('/showRole', (req, res) => {
    db.query(
        `SELECT * FROM roles`,
        (err, result) => {
            return res.json(result);
        })
})

app.post('/imageShow', (req, res) => {

    const { page, pageData, searchData } = req.body
    const showTotalData = page * pageData

    if (searchData) {
        db.query(
            `SELECT * FROM images WHERE imageName LIKE '%${searchData}%'`,
            (err, result) => {
                return res.json(result);
            })
    } else {
        db.query(
            `SELECT * FROM images LIMIT ${showTotalData}`,
            (err, result) => {
                return res.json(result);
            })
    }
})

app.post('/signUp', (req, res) => {

    const { email, password, isActive, isDelete, createdBy, createdDate, upDatedBy, updatedDate, roleId } = req.body

    db.query(`INSERT INTO users (email, password, isActive, isDelete, createdBy, createdDate, upDatedBy, updatedDate, roleId) VALUES (?,?,?,?,?,?,?,?,?)`,
        [email, password, isActive, isDelete, createdBy, createdDate, upDatedBy, updatedDate, roleId],
        (err, result) => {
            if (err) {
                res.status(400).json({ err: err, mess: 'Already Use Email' });
            }
            else {
                res.status(200).json({ mess: 'Successfully' });
            }
        }
    )
})


app.post('/remove/image', (req, res) => {

    const imageId = req.body.imageId;
    const path = '../frontend/public/images/' + req.body.file_src;

    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
        }

    })
    db.query(
        `DELETE FROM   images WHERE imageId='${imageId}'`,
        (err, result) => {
            if (result) {
                res.status(200).json({ mess: 'Successfully' });
            } else {
                res.status(400).json(err);
            }

        }
    )
})


app.post('/rename/imageFile', (req, res) => {

    const { fileName, newFileName, imageId, updatedDate } = req.body

    // Rename the file
    fs.rename('../frontend/public/images/' + fileName, '../frontend/public/images/' + newFileName, () => {
        console.log("\nFile Renamed!\n");

    });

    db.query(
        `UPDATE  images SET imageName='${newFileName}', updatedDate = '${updatedDate}'  WHERE imageId  = '${imageId}'`,
        (err, result) => {
            if (result) {
                res.status(200).json({ mess: 'Successfully' });
            } else {
                res.status(400).json(err);
            }

        }
    )
})

app.post('/user/login', (req, res) => {

    const { userEmail, userPassword } = req.body;

    db.query(
        `SELECT * FROM users WHERE email='${userEmail}' AND password='${userPassword}'`,
        (err, result) => {
            if (result.length > 0) {
                res.status(200).json({ mess: 'Successfully', data: result });
            } else if (result.length === 0) {
                res.json('Email and Password is wrong');
            } else if (err) {
                res.status(400).json(err);
            }

        }
    )
})



//create connection
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
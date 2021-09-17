var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Subject = require('./subject');


// CREATES A NEW USER
router.post('/', function (req, res, next) {
    Subject.create({
        titre : req.body.titre,
        description : req.body.description,
        }, 
        function (err, subject) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(subject);
        });
});

// RETURNS ALL THE Subjects IN THE DATABASE
router.get('/', function (req, res) {
    Subject.find({}, function (err, Subjects) {
        if (err) return res.status(500).send("There was a problem finding the Subjects.");
        res.status(200).send(Subjects);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    Subject.findById(req.params.id, function (err, subject) {
        if (err) return res.status(500).send("There was a problem finding the subject.");
        if (!subject) return res.status(404).send("No user found.");
        res.status(200).send(subject);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Subject.findByIdAndRemove(req.params.id, function (err, subject) {
        if (err) return res.status(500).send("There was a problem deleting the subject.");
        res.status(200).send("subject: "+ subject.titre +" was deleted.");
    });
});

//  ADD VOTE IN THE DATABASE
router.put('/:id', function (req, res) {
    Subject.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, subject) {
        if (err) return res.status(500).send("There was a problem updating the subject.");
        res.status(200).send(subject);
    });
});


module.exports = router;
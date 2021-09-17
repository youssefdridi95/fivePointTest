var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var subjectSchema = new Schema({

    titre: {
    type: String,
    require: false
},
description : {
    type: String,
    require: false
},
choix : [{
    vote: {
        type: Boolean,
        required: false
    },
        user: {
            type: Schema.ObjectId
     },
     timeStamp: {
        type: String,
         required: false
     }
 }]
});
module.exports = mongoose.model('subject', subjectSchema)
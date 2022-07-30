var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeValSchema = new Schema({
    val: String,
    time: Date
});

timeValSchema.pre('save',function(next){
    var currentDate = new Date();
    this.val = Math.floor(Math.random() * 100);
    this.time = currentDate;
    next();
})


var timeVal = mongoose.model('customer', timeValSchema)

module.exports = timeVal

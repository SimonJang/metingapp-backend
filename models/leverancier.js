/*
Model voor leveranciers
 */

var mongoose = require('mongoose');

var LeverancierSchema = new mongoose.Schema({
    naam: String,
    website: String,
    tariefplannen: [{groen: Boolean, extraVoorwaarden: String, naam: String, basisprijs: Number, id: Number}],
    id: Number
});

mongoose.model('Leverancier', LeverancierSchema);

module.exports = mongoose;

const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    id: { type: Types.ObjectId },
    autorId: { type: String },
    messageText: { type: String },
    to: { type: String },
    date: { type: Date, default: Date.now },
    sendDate: { type: String },
    process: { type: Boolean },
});

module.exports = model('Message', schema)


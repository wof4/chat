const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    id: { type: Types.ObjectId, ref: 'Messages' },
    to: [{ type: String }],
    messages: [{ type: String }],
});

module.exports = model('Dialog', schema)


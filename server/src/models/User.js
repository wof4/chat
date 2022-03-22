const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    id: { type: Types.ObjectId, ref: 'Dialogs' },
    name: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    avatar: { type: String },
    online: { type: Boolean },
    dialogs: [{ type: String }],
    communicationList: [{ type: String }],
    socketId: { type: String },
});

module.exports = model('User', schema)


const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    activated: {
        type: Boolean,
        default: true //TODO: production false
    },
    dialogs:
    {

    },
    coins:
        {
            type:Number,
            default:0
        },
    last_online:
        {
            type:Date,
            default: Date.now()
        }
});

module.exports = model('User', schema);
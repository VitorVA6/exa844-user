const mongoose = require('mongoose') 
const {Schema} = mongoose 

const UserSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema)
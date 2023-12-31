const mongoose = require('mongoose') 

const connectDb = () =>{
    mongoose.connect(process.env.DB_URI, {useNewUrlparser: true, useUnifiedTopology: true})
    .then(data => {
        console.log(`Conectado com o servidor: ${data.connection.host}`)
    }) 
    .catch(err => console.log(err))
} 

module.exports = connectDb
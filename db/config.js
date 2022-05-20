const mongoose = require('mongoose');

const conectarDB = async () => {

    try {

        await mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          
        })
        console.log('BD Conectada');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar BD');
       // process.exit(1); // Detenemos la app
    }

}

module.exports = {
    conectarDB
}
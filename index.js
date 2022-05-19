const express= require('express');
const cors= require('cors');
require('dotenv').config();
// levantamos  el servicio 
const app = express();

app.use(express.static('public'));


// usar cors
app.use(cors());

// Lectura y parseo del body 
app.use(express.json());

// ruutas 
app.use('/api/auth',require('./router/auth'))



// asignamos el puerto 

app.set('port',process.env.PORT || 4000);

//puerto y arranco el servidor 
app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto',app.get('port') )
})

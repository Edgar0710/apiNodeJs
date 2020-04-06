const express = require('express');
const morgan = require('morgan');
const app=express();
///////////////////////////////
/////////////////////////////
///settings////
app.set('port',process.env.PORT || 3000);
///middel were 
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());///permite usar formatos json
//////////rutas
//app.use('/dsm/personas',require('./routes/index'));
app.use('/dsm/productos',require('./routes/insert'));
////server
app.listen(app.get('port'),()=>{
 console.log('server in port '+app.get("port"));
});




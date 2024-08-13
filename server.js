const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar cualquier servicio de correo compatible
  auth: {
    user: 'lamarinabraford@gmail.com', // Tu correo electrónico
    pass: 'ajs50030' // Tu contraseña
  }
});

// Ruta para manejar el envío del formulario
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'lamarinabraford@gmail.com', // Tu correo electrónico donde recibirás las consultas
    subject: 'Nueva consulta del formulario de contacto',
    text: `Nombre: ${name}\nCorreo Electrónico: ${email}\nMensaje: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).send('Error al enviar el correo.');
    }
    console.log('Correo enviado:', info.response);
    res.send('Formulario recibido. ¡Gracias!');
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
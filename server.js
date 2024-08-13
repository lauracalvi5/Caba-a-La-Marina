const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar el formulario
app.post('/submit-form', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).send('Por favor completa todos los campos.');
    }

    // Configurar Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lamarinabraford@gmail.com', // Tu correo electrónico
            pass: 'dcbk aoar wvlb eibz' // Tu contraseña
        }
    });

    const mailOptions = {
        from: email,
        to: 'lamarinabraford@gmail.com', // Tu correo electrónico donde recibirás las consultas
        subject: 'Nueva consulta del formulario de contacto',
        text: `Nombre: ${nombre}\nCorreo Electrónico: ${email}\nMensaje: ${mensaje}`
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

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contacto.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en ${port}`);
});

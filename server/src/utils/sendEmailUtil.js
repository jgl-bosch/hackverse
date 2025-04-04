//Importar dependencias
import nodemailer from 'nodemailer';

//Importar utils
import generateErrorUtil from './generateErrorUtil.js';

//Obtenemos los valores necesarios para el transporter
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    generateErrorUtil(400, 'Faltan datos de SMTP');
}
//Creamos el transporter
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});
const sendEmailUtil = async (destinatario, asunto, htmlContenido) => {
    if (!destinatario || !asunto || !htmlContenido) {
        generateErrorUtil(400, 'Faltan datos al enviar el email');
    }
    try {
        //Creamos el correo que queremos enviar
        const mailOptions = {
            from: SMTP_USER,
            to: destinatario,
            subject: asunto,
            html: htmlContenido,
        };

        //Enviamos el email

        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error(err);

        generateErrorUtil(500, 'Error al enviar el correo');
    }
};

export default sendEmailUtil;

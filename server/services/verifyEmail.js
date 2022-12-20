import nodemailer from 'nodemailer'
import config from 'config';



async function verifyEmail(email, verificationKey){

    let verifyUrl
    if(config.get('mode') === dev){
        verifyUrl = `${config.get('server.baseUrl')}/api/verify/${verificationKey}`
    } else {
        verifyUrl = `${config.get('server.host')}/api/verify/${verificationKey}`
    }

    let transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
        user: 'belmint@mail.ru', // generated ethereal user
        pass: 'LFKfyWkSydJrkJuxVN2X', // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: '"Рекламная компания МЯТА" <belmint@mail.ru>', // sender address
        to: email, // list of receivers
        subject: "Подтверждение регистрации", // Subject line
        text: `Для подтверждения регистрации пройдите по ссылке ${config.get('server')['baseUrl']}/api/verify/${verificationKey}`, // plain text body
        html: `<a href=${config.get('server')['baseUrl']}/api/verify/${verificationKey}>ПОДТВЕРЖДЕНИЕ РЕГИСТРАЦИИ</a>`, // html body
    });
};

export { verifyEmail }
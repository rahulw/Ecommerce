const nodeMailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const sendMail = async (options) => {
    // Create Transporter
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chrishmoris201@gmail.com',
            pass: 'hnyswwqxmeizxtsq'
        }
    });

    // Read file & replace value in HTML file
    const templatePath = path.join(__dirname, '', './email.html');
    const dynamicTemplate = fs.readFileSync(templatePath, 'utf8');
    const populatedTemplate = dynamicTemplate
        .replace('{{ email }}', options.email)
        .replace('{{ url }}', options.url);

    // Email oprions
    const emailOptions = {
        from: 'chrishmoris201@gmail.com',
        to: options.email,
        subject: options.subject,
        html: populatedTemplate
    }

    await transporter.sendMail(emailOptions);
}

module.exports = sendMail;


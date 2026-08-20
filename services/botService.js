const nodemailer = require('nodemailer');
const twilio = require('twilio');

async function enviarEmailPedido(pedido, cliente) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: cliente.email,
      subject: \Pedido Confirmado - Franca Shoes #\\,
      html: \<h1>✅ Pedido Confirmado!</h1><p>Olá \, seu pedido foi recebido. Total: R\$ \</p>\
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado:', cliente.email);
    return true;
  } catch (error) {
    console.error('❌ Erro email:', error);
    return false;
  }
}

async function enviarWhatsAppPedido(pedido, cliente) {
  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    
    const mensagem = \🎉 PEDIDO CONFIRMADO!\n\nOlá \!\nID: \\nTotal: R\$ \\n\nObrigado!\\;

    await client.messages.create({
      from: \whatsapp:\\,
      to: \whatsapp:\\,
      body: mensagem
    });

    console.log('✅ WhatsApp enviado:', cliente.telefone);
    return true;
  } catch (error) {
    console.error('❌ Erro WhatsApp:', error);
    return false;
  }
}

async function dispararTodosBots(pedido, cliente) {
  console.log(\\n🤖 DISPARANDO BOTS PARA PEDIDO #\\n\);
  
  const email = await enviarEmailPedido(pedido, cliente);
  const whatsapp = await enviarWhatsAppPedido(pedido, cliente);
  
  console.log('✅ BOTS COMPLETADOS');
  console.log(\📧 Email: \\);
  console.log(\💬 WhatsApp: \\n\);
  
  return { email, whatsapp };
}

module.exports = { dispararTodosBots };

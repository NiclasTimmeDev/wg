// Dependecies.
require("dotenv").config();
const nodemailer = require("nodemailer");

/**
 * Send mail with password restoration link
 *
 * @param {String} email
 *   The email the link will be sent to.
 * @param {String} id
 *   The unique id that is stored in the DB.
 * @param {String} timestamp
 *   The timestamp that was created.
 *
 * @return null
 */
const forgotPassword = async (email, id, timestamp) => {
  const { testAccount, transporter } = await _createTestAccount();

  // Define mail content.
  const url = `${process.env.FRONTENDURL}/restore/${id}/${timestamp}`;
  const intro = "<h1>Forgot your password?</h1>";
  const body =
    "<p>You have five minutes to click the following link and restore your password.</p>";
  const link = `<div><a href='${url}' >${url}</a></div>`;
  const outro = "<p>We are looking forward to seeing you on the website.</p>";
  const greetings = "<div>Cheers!</div>";

  // Send mail via nodemailer.
  let info = await transporter.sendMail({
    from: "niclas.timm@gmx.de",
    to: email,
    subject: "Forgotten Password",
    text: `Forgot your password? You have five minutes to visit the following link and restore your password. ${url}. We are looking forward to seeing you on the website.`, // plain text body
    html: `${intro}${body}${link}${outro}${greetings}`, // html body
  });

  // Link that displays the mail.
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

const sendAdminMail = async (subject, body) => {
  const { testAccount, transporter } = await _createTestAccount();

  // Define mail content.
  subject = `Automated server Mail: ${subject}`;
  const intro = `<h1>This is an automatically generated mail by your server about the following topic: ${subject}</h1>`;
  const text = `<p>${body}</p>`;
  const greetings = "<div>Cheers,</div>";

  // Send mail via nodemailer.
  let info = await transporter.sendMail({
    from: "niclas.timm@gmx.de",
    to: "niclas.timm@gmx.de",
    subject: subject,
    text: `<h1>This is an automatically generated mail by your server about the following topic: ${subject}. ${text}`, // plain text body
    html: `${intro}${text}${greetings}`, // html body
  });

  // Link that displays the mail.
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

/**
 * Send invitation to email to join a group.
 *
 * @param {String} senderName
 *   The Name of the user who sent the invitation.
 * @param {String} senderEmail
 *   The Email of the user who sent the invitation.
 * @param {String} receiverEmail
 *   The email of the person who receives the Mail.
 * @param {String} uid
 *   A unique ID to identify the invitation
 * @param {String} customMessage
 *   A custom message from the sender that can be displayed in the mail.
 */
const sendInvitation = async (
  senderName,
  senderEmail,
  receiverEmail,
  uid,
  customMessage = ""
) => {
  const { testAccount, transporter } = await _createTestAccount();

  const intro = `<h1>${senderName} (E-Mail: ${senderEmail}) hat dich eingeladen, seiner / ihrer Gruppe bei WG-Share beizutreten.</h1>`;
  let customMsg = "";
  if (customMessage !== "") {
    customMsg = `Es wurde eine Nachricht für dich hinterlassen:</p><p>${customMessage}</p>`;
  }

  const linkDesc = `Klicke auf den folgenden Link, um der Gruppe beizutreten. Falls du noch keinen Account hast, musst du zunächst einen erstellen.`;
  const link = `<a href="${process.env.FRONTENDURL}/groups/accept/${uid}">${process.env.FRONTENDURL}/groups/accept/${uid}</a>`;

  const outro = "<p>Wir freuen uns auf dich :)</p>";
  const greetings = "<div>Cheers!</div>";

  // Send mail.
  let info = await transporter.sendMail({
    from: "niclas.timm@gmx.de",
    to: receiverEmail,
    subject: "Du hast eine Einladung erhalten!",
    text: `Du hast eine Einladung für WG-Share von ${senderName} (E-Mail: ${senderEmail}) erhalten, einer Gruppe bei WG-Share beizutreten. Klicke den folgenden Link, um die Einladung anzunehmen: ${process.env.FRONTENDURL}/groups/accept/${uid}`,
    html: `${intro}${customMsg}${linkDesc}${link}${outro}${greetings}`,
  });

  // Link that displays the mail.
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

const _createTestAccount = async () => {
  const testAccount = await nodemailer.createTestAccount();
  // Generate ethereal test account.
  // TODO: Change @demployment
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return { testAccount, transporter };
};

/**
 * The exported object.
 */
module.exports = {
  forgotPassword,
  sendAdminMail,
  sendInvitation,
};

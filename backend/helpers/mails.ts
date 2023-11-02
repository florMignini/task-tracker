import nodemailer from "nodemailer";
export interface personalInfoType {
  email: string;
  name: string;
  token: string;
}
export const registerVerification = async({email, name, token}: personalInfoType) => {
    const transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASSWORD
        }
      });

      const emailInfo = await transport.sendMail({
    from:`task-tracker app - <accounts@task-tracker.com> `,
        to: email,
        subject: `task-tracker app - verify your email account`,
        text: `Verify your email account`,
        html: 
        `
        <p> Hi! ${name} - verify your task-tracker account, click on the link below</p>

        <a href="${process.env.FRONTEND_URL}/confirm/${token}"> Verify Account</a>

        <p>If you did not create an account, no further action is required.
        You are receiving this email because this is an important message regarding your account.</p>
        `
})
};

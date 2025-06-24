import {MailtrapClient} from 'mailtrap'
import 'dotenv/config'

const mailtrapToken = process.env.MAILTRAP_TOKEN;
if (!mailtrapToken) {
  throw new Error("MAILTRAP_TOKEN environment variable is not set");
}

export const mailtrapClient = new MailtrapClient({
  token: mailtrapToken,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "devhan",
};

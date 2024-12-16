const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000
});

app.message('hello', async ({message, say}) => {
  console.log('XXX message:'); console.dir(message, { depth: 50 }); // XXX
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hi there <@${message.user}>!`
  });
});

app.action('button_click', async ({ body, ack, say }) => {
  console.log('XXX body:'); console.dir(body, { depth: 50 }); // XXX
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();

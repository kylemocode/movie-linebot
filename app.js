require('dotenv').config()
const linebot = require('linebot');
const { requestHandler } = require('./utils/requestHandler');

var bot = linebot({
	channelId: process.env.channelId,
	channelSecret: process.env.channelSecret,
	channelAccessToken: process.env.channelAccessToken
});

// event.message.text：使用者透過Line傳給Bot的文字訊息。
// event.reply()：這個方法能讓Bot回傳訊息給使用者。

// 當有人傳送訊息給Bot時
bot.on('message', async function (event) {
	// console.log(event);
	const responseText = await requestHandler(event.message.text);
	event.reply(responseText).then(function (data) {
		// 當訊息成功回傳後的處理
		console.log('success');
	}).catch(function (error) {
		// 當訊息回傳失敗後的處理
		console.log('fail')
	});
});

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', process.env.PORT || 3002, async function () {
	console.log('[BOT已準備就緒]');
});
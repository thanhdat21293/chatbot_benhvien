//var restify = require('restify');
var builder = require('botbuilder');
const express = require('express')
const app = express()

let port = 3978;
app.listen(port, function () {
   console.log('listening to http://localhost:' + port);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID || '21559585-532f-40d1-90f0-d34d34519ae0',
    appPassword: process.env.MICROSOFT_APP_PASSWORD || 'rp8diy4Y8ZgbGxRjVqGwADa'
});

// Listen for messages from users
app.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session, args) {
    session.send('Xin lỗi, Bot không hiểu \'%s\' là gì. Vui lòng gõ lại.', session.message.text);
});

//var bot = new builder.UniversalBot(connector);

var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/9a32c774-509b-45bc-b6f4-bc4cf288ca78?subscription-key=66efec890639470b967529f59ae34ecb&verbose=true&timezoneOffset=420&spellCheck=false&q=hi';
bot.recognizer(new builder.LuisRecognizer(model));


bot.dialog("road", [
        (session, args, next) => {
            console.log(args)
            if(args.intent && args.intent.entities && args.intent.entities.length > 0){
                next({respone: args.intent.entities[0].type})
            }
            else
                next({respone: 'Không tìm thấy địa điểm bạn muốn tìm.'})
        },
        (session, results) => {
            console.log(123, results.respone)
            session.send(results.respone)
        },
    ]).triggerAction({
        matches: "road"
});
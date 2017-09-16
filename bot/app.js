/**
 * Created by Ruslan on 6/12/2017.
 */
const restify = require('restify');
const builder = require('botbuilder');
const admin = require("firebase-admin");
const serviceAccount = require("./smart-dash-91823-firebase-adminsdk-w9q4d-05c48807d7.json");

// Setup Restify Server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
let connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
let bot = new builder.UniversalBot(connector, function (session){
    let msg = session.message.text;

    if (msg === "list all") {
        listAll().then((data) => {
            //TODO: format this data
            session.send(data);
        }).catch((data) => {
            session.send(data);
        });
    } if (msg === "list checked out") {
        listAll().then((data) => {
            //TODO: format this data
            session.send(data);
        }).catch((data) => {
            session.send(data);
        });
    } else {
        session.send("Sorry can't help you");
    }
});

function listAll () {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://smart-dash-91823.firebaseio.com"
    });

    // As an admin, the app has access to read and write all data, regardless of Security Rules
    let db = admin.database();
    let inventoryRef = db.ref("inventory");

    return new Promise(function (resolve, reject) {
        inventoryRef.on("value", function(snapshot) {
            resolve(snapshot.val());
        }, function (errorObject) {
            reject("The read failed: " + errorObject.code);
        });
    });
}

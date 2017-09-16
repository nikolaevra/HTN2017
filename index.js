const admin = require("firebase-admin");
const serviceAccount = require("./smart-dash-91823-firebase-adminsdk-w9q4d-05c48807d7.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://smart-dash-91823.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
let db = admin.database();
let usersRef = db.ref("inventory");

usersRef.child("r_pi").set({
    item_name: "Raspberry Pi",
    id: "1234567891",
    checked_out: true,
    description: "Raspberry Pi 3 w/ Wi-Fi"
});

// run-admin-setter.js
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-account.json"); // Make sure this is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// List of admin emails
const adminEmails = [
  "ashley.sajous@icloud.com",
  "mikemelenciano@gmail.com",
];

adminEmails.forEach((email) => {
  admin
    .auth()
    .getUserByEmail(email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, { admin: true });
    })
    .then(() => {
      console.log(`✅ Admin claim set for ${email}`);
    })
    .catch((error) => {
      console.error(`❌ Error setting admin claim for ${email}:`, error.message);
    });
});
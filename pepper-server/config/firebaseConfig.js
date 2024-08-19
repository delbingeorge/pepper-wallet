import admin from "firebase-admin";
import serviceAccount from "../pepper-wallet-firebase-adminsdk-3y6qh-883162853e.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
export { admin, db };

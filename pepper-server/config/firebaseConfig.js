import admin from "firebase-admin";
// import serviceAccount from "../pepperwallet-app-firebase-adminsdk-165ry-e3bdb60128.json" assert { type: "json" };
import serviceAccount from "../pepper-wallet-firebase-adminsdk-3y6qh-82963cf2e7.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
export { admin, db };

import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import serviceAccount from "./pepper-wallet-firebase-adminsdk-3y6qh-883162853e.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.post("/verify-token", async (req, res) => {
    const idToken = req.body.token;
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const userRecord = await admin.auth().getUser(uid);
        res.send({
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            photoURL: userRecord.photoURL,
            phoneNumber: userRecord.phoneNumber,
            emailVerified: userRecord.emailVerified,
            lastSignInTime: userRecord.metadata.lastSignInTime,
            creationTime: userRecord.metadata.creationTime,
        });
    } catch (error) {
        res.status(401).send("Unauthorized");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

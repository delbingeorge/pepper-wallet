import express from "express";
import { verifyToken, getUserRecord, addUserToDB } from "../services/firebaseService.js";

const authRoute = express.Router();

authRoute.post("/verify-token", async (req, res) => {
    const idToken = req.body.token;
    try {
        const decodedToken = await verifyToken(idToken);
        const uid = decodedToken.uid;
        const userRecord = await getUserRecord(uid);

        await addUserToDB(uid, userRecord);

        res.send({
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            photoURL: userRecord.photoURL,
            emailVerified: userRecord.emailVerified,
            lastSignInTime: userRecord.metadata.lastSignInTime,
            creationTime: userRecord.metadata.creationTime,
        });
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).send("Unauthorized");
    }
});

export default authRoute;

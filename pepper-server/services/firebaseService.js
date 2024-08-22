import { admin, db } from "../config/firebaseConfig.js";

export const verifyToken = async (idToken) => {
    return await admin.auth().verifyIdToken(idToken);
};

export const getUserRecord = async (uid) => {
    return await admin.auth().getUser(uid);
};

export const addUserToDB = async (uid, userRecord) => {
    const userRef = db.collection("users").doc(uid);
    await userRef.set(
        {
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            photoURL: userRecord.photoURL,
            emailVerified: userRecord.emailVerified,
            lastSignInTime: userRecord.metadata.lastSignInTime,
            creationTime: userRecord.metadata.creationTime,
        },
        { merge: true }
    );
};

export const addTransaction = async (collectionName, data) => {
    const ref = db.collection(collectionName).doc();
    await ref.set(data);
};

export const getAllTransactions = async (uid) => {
    const transactionRef = db.collection("transactions");
    const snapshot = await transactionRef.where("userId", "==", uid).get();

    if (snapshot.empty) {
        return [];
    }

    const transactions = [];
    snapshot.forEach((doc) => {
        transactions.push({ id: doc.id, ...doc.data() });
    });
    return transactions;
};

export const removeTransaction = async (transactionId) => {
    const ref = db.collection("transactions").doc(transactionId.id);
    await ref.delete();
};

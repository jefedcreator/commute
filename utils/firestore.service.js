const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const config = require("../config");
const fs = require("firebase-admin");

/////will help us handle real timeness of the apps
const firebaseConfig = {
  // apiKey: config.FIREBASE_API_KEY,
  // authDomain: config.FIREBASE_AUTH_DOMAIN,
  // projectId: config.FIREBASE_PROJECTID,
  // storageBucket: config.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: config.FIREBASE_MESSAGINGSENDERID,
  // appId: config.FIREBASE_APPID,
  // measurementId: config.FIREBASE_MEASUREMENTID
};

// initializeApp(firebaseConfig);
// const db = fs.firestore();

exports.writeToDb = async (collectionName, data, req, res) => {
  try {
    const collectionDb = db.collection(collectionName);
    const addedDataDoc = await collectionDb.add(data);
    await db.collection(collectionName).doc(addedDataDoc.id).update({
      id: addedDataDoc.id,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.getDocs = async (collectionName, docId, req, res) => {
  try {
    const currentDoc = db.collection(collectionName).doc(docId).get;
    return currentDoc;
  } catch (error) {
    res.status(400).send({
      statusCode: 400,
      status: "ERROR",
      message: error.message,
    });
  }
};

exports.getACollection = async (collectionName, req, res) => {
  try {
    const currentCollection = db.collection(collectionName);
    return currentCollection;
  } catch (error) {
    res.status(400).send({
      statusCode: 400,
      status: "ERROR",
      message: error.message,
    });
  }
};

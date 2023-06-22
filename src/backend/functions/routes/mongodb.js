import express from "express";
import pkg from "mongodb";
const {MongoClient} = pkg;
import {mongoConfig} from "../mongo.config.js";

// eslint-disable-next-line new-cap
const router = express.Router();

const {host, port, database} = mongoConfig;
const mongoURI = `mongodb://${host}:${port}/${database}`;

const connectToMongoDB = async () => {
  try {
    const myClient = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connexion à la bdd mongodb OK");
    const db = myClient.db(database);
    return db;
  } catch (err) {
    console.log("oups, problème dans la connexion avec la db");
    throw err;
  }
};

const addToMongoDB = async (myData) => {
  try {
    const db = await connectToMongoDB();
    await db.collection("test-messages").insertOne(myData);
    console.log("enregistrement dans mongoDB ok!");
  } catch (err) {
    console.log("oups, erreur dans le try catch addToMongoDb", err);
  }
};

router.get("/", async (req, res) => {
  try {
    const jsonConfirmation = {message: "tout s'est bien passé'"};

    const myMessage = "voici le retour du endpoint /GET api!";
    const myTimestamp = new Date();
    const dataFromServer = {message: myMessage, timestamp: myTimestamp};
    console.log("voici le message construit: ", dataFromServer);
    await addToMongoDB(dataFromServer);
    res.json(jsonConfirmation);
  } catch (err) {
    console.log("voici l'erreur pour /api: ", err);
    console.log("voici le message d'erreur pour /api: ", err.message);
  }
});

export default router;

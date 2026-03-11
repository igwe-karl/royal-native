import { getApp, getApps, initializeApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const FIREBASE_DB_URL =
  typeof process !== "undefined" ? process.env?.EXPO_PUBLIC_FIREBASE_DB_URL : undefined;

if (!FIREBASE_DB_URL) {
  throw new Error(
    "Missing EXPO_PUBLIC_FIREBASE_DB_URL. Add it to your .env file (and do not commit .env).",
  );
}

const firebaseConfig = {
  databaseURL: FIREBASE_DB_URL,
};

let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const database: Database = getDatabase(app);

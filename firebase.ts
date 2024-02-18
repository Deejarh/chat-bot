
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NUXT_API_KEY,
  authDomain: process.env.NUXT_AUTH_DOMAIN,
  databaseURL: process.env.NUXT_DB_URL,
  projectId: "deejarhbot",
  storageBucket: process.env.NUXT_ST_BUCKET,
  messagingSenderId: process.env.NUXT_SENDER_MEASUREMENT_ID,
  appId: process.env.NUXT_APP_ID,
  measurementId: process.env.NUXT_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db: Database = getDatabase(firebaseApp);

export default db 

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCMIRvjhHd6hzbpeSnplalffTVdi2CqjSc",
    authDomain: "netflix-eca52.firebaseapp.com",
    projectId: "netflix-eca52",
    storageBucket: "netflix-eca52.appspot.com",
    messagingSenderId: "619218526411",
    appId: "1:619218526411:web:06b15447501fd5d6577b4e",
    measurementId: "G-HV1TRKTPK8"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
//const analytics = getAnalytics(app);

export default storage

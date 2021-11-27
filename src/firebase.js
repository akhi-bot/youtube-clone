import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBOdEAahOUF751j83LikO5oAYQUJkyBD9E",
  authDomain: "akhi-bot-yt.firebaseapp.com",
  projectId: "akhi-bot-yt",
  storageBucket: "akhi-bot-yt.appspot.com",
  messagingSenderId: "52204607904",
  appId: "1:52204607904:web:eee2f0d7ad459dc78e6cc5",
  measurementId: "G-N9W6KF8FQD"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);

export default firebase.auth()
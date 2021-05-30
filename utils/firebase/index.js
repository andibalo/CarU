import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAVVQ-qfH12GFxRrhmBCknoAHx5wv4-scc",
  authDomain: "caru-aa28c.firebaseapp.com",
  projectId: "caru-aa28c",
  storageBucket: "caru-aa28c.appspot.com",
  messagingSenderId: "351141055960",
  appId: "1:351141055960:web:5e4f8024a492f5fcc476ad",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const storage = firebase.storage();

export { storage, firebase as default };

import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import "./App.css";
import { firebaseConfig } from "./firebase.config";

function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [user, setUser] = useState({
    isSignedIn: false,
    email: "",
    photo: "",
    name: "",
  });
  const handelGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        const { displayName, photoURL, email } = result.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signInUser);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  };
  const handelSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const signOutUser = {
          isSignedIn: false,
          name: "",
          photo: "",
          email: "",
        };
        setUser(signOutUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      {user.isSignedIn ? (
        <button onClick={handelSignOut} type="">
          Sign Out
        </button>
      ) : (
        <button onClick={handelGoogleSignIn} type="">
          Sign In with google
        </button>
      )}
      {user.isSignedIn && (
        <div>
          <h3>Welcome {user.name}</h3>
          <p>Email:{user.email}</p>
          <img src={user.photo} alt="" srcset="" />
        </div>
      )}
    </div>
  );
}

export default App;

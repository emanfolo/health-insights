import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  signInWithRedirect,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { app, db, auth } from "./firebase";
import { isMobile } from ".";

const handleUserProfile = async (user) => {
  const userRef = doc(db, "users", user.uid);

  try {
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      console.log("User profile created for:", user.displayName);
    }
  } catch (error) {
    console.error("Error handling user profile:", error);
    // Handle the error appropriately
  }
};

export const handleLogin = async () => {
  const provider = new GithubAuthProvider();
  if (isMobile()) {
    // Use signInWithRedirect for mobile devices
    try {
      await signInWithRedirect(auth, provider);
      // Redirect logic will be handled automatically after successful sign-in
    } catch (error) {
      console.error("Login redirect failed", error);
      // Handle errors here, such as displaying a notification
    }
  } else {
    // Use signInWithPopup for non-mobile devices
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info
      const user = result.user;
      // Call handleUserProfile to optimistically set user data client-side
      await handleUserProfile(user);
    } catch (error) {
      console.error("Login popup failed", error);
      // Handle errors here, such as displaying a notification
    }
  }
};

export const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("Logout successful");
    // Perform any cleanup or redirect
  } catch (error) {
    console.error("Logout failed", error);
  }
};

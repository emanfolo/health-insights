import {
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  signInWithRedirect,
  deleteUser,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
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
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export const deleteAccount = async () => {
  const user = auth.currentUser;

  if (!user) {
    console.log("No user is currently signed in.");
    return;
  }

  const reAuthenticateAndDelete = async () => {
    const provider = new GithubAuthProvider();
    try {
      // Re-authenticate the user
      await signInWithPopup(auth, provider);
      // Attempt to delete the user again
      await deleteUser(user);
      console.log("User account deleted successfully after re-authentication.");
      // Redirect or perform additional cleanup as needed
    } catch (error) {
      console.error("Failed to re-authenticate and delete user account", error);
      // Handle further errors, such as failing to re-authenticate
    }
  };

  try {
    await deleteUser(user);
    console.log("User account deleted successfully.");
  } catch (error) {
    console.error("Failed to delete user account", error);
    if (error.code === "auth/requires-recent-login") {
      console.log(
        "Re-authentication required. Prompting user to sign in again.",
      );
      await reAuthenticateAndDelete();
    } else {
      // Handle other errors appropriately
    }
  }
};

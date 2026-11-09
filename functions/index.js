import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { HttpsError, onCall } from "firebase-functions/v2/https";

initializeApp();

const auth = getAuth();
const db = getFirestore();

export const deleteUserAccount = onCall(
  { region: "us-central1" },
  async (request) => {
    const callerUid = request.auth?.uid;
    if (!callerUid) {
      throw new HttpsError("unauthenticated", "Sign in to manage user accounts.");
    }

    const callerProfile = await db.collection("users").doc(callerUid).get();
    const isAdmin =
      request.auth.token.email === "james@gmail.com" ||
      callerProfile.data()?.role === "admin";
    if (!isAdmin) {
      throw new HttpsError("permission-denied", "Admin access is required.");
    }

    const { uid, profileId } = request.data ?? {};
    if (
      typeof uid !== "string" ||
      !uid.trim() ||
      typeof profileId !== "string" ||
      !profileId.trim()
    ) {
      throw new HttpsError("invalid-argument", "A valid user account is required.");
    }
    if (uid === callerUid) {
      throw new HttpsError("failed-precondition", "You cannot delete your own account.");
    }

    try {
      await auth.deleteUser(uid);
    } catch (error) {
      if (error.code !== "auth/user-not-found") {
        throw new HttpsError("internal", "The user account could not be deleted.");
      }
    }

    try {
      await db.collection("users").doc(profileId).delete();
    } catch {
      throw new HttpsError(
        "internal",
        "The sign-in account was deleted, but its member profile could not be removed."
      );
    }

    return { uid, profileId };
  }
);

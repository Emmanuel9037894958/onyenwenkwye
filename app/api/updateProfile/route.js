// app/api/updateProfile/route.js
import { db, auth } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, fullName, email, currentPassword, newPassword } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID missing" }), { status: 400 });
    }

    // ✅ 1. Update profile info in Firestore
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      fullName,
      email,
      updatedAt: new Date().toISOString(),
    });

    // ✅ 2. Update password (if requested)
    if (newPassword && currentPassword) {
      const user = auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("🔥 Error updating profile:", error.message);
    return new Response(JSON.stringify({ error: "Failed to update profile", details: error.message }), { status: 500 });
  }
}

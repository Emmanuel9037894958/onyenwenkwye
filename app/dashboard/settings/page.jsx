"use client";
import { useState, useEffect } from "react";
import { Moon, Sun, UploadCloud, Save } from "lucide-react"; // Added Save and UploadCloud for better icons
import { db, storage, auth } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AccountSettingsPage({ userId: propUserId }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    notifications: true,
    theme: "light",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(propUserId || null);

  // ✅ Get userId from Firebase Auth or localStorage if not passed as prop
  useEffect(() => {
    if (propUserId) return;

    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        const stored = localStorage.getItem("user");
        if (stored) {
          const parsed = JSON.parse(stored);
          setUserId(parsed.uid || parsed.id || null);
        }
      }
    });

    return () => unsub();
  }, [propUserId]);

  // ✅ Load existing client data safely
  useEffect(() => {
    if (!userId) return;

    const fetchClient = async () => {
      try {
        const clientDocRef = doc(db, "Client", userId);
        const docSnap = await getDoc(clientDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({
            fullName: data.fullName || "",
            email: data.email || "",
            notifications: data.notifications ?? true,
            theme: data.theme || "light",
          });
          setAvatarUrl(data.avatarUrl || "");
        }
      } catch (error) {
        console.error("Error loading client data:", error);
      }
    };

    fetchClient();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("File too large (max 2MB).");
      return;
    }
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User not found. Please log in again.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const clientDocRef = doc(db, "Client", userId);
      let uploadedUrl = avatarUrl;

      // ✅ Upload avatar if changed
      if (avatar) {
        const storageRef = ref(storage, `avatars/${userId}-${Date.now()}`);
        const snapshot = await uploadBytes(storageRef, avatar);
        uploadedUrl = await getDownloadURL(snapshot.ref);
      }

      const docSnap = await getDoc(clientDocRef);

      if (!docSnap.exists()) {
        // ✅ Create new document
        await setDoc(clientDocRef, {
          ...form,
          avatarUrl: uploadedUrl,
          balance: 0,
          portfolio: [],
          isVerified: false,
          createdAt: serverTimestamp(),
        });
      } else {
        // ✅ Update existing document
        await updateDoc(clientDocRef, {
          ...form,
          avatarUrl: uploadedUrl,
        });
      }
      
      // Update avatar URL state only after successful upload/update
      if(uploadedUrl !== avatarUrl) {
          setAvatarUrl(uploadedUrl);
          setAvatar(null); // Clear the file object after successful upload
      }

      setMessage("✅ Profile saved successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      setMessage("❌ Failed to save profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 sm:p-12 mt-10 space-y-8 border border-gray-100 transform hover:shadow-indigo-300/50 transition duration-300">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-blue-500 mb-8 text-center tracking-tight">
        Client Account Settings ⚙️
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Avatar Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-8 border-b pb-6 border-gray-100">
          <div className="relative w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-indigo-400/50 shadow-lg transition duration-300 hover:scale-[1.02]">
            {avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                alt="New Avatar Preview"
                className="object-cover w-full h-full"
              />
            ) : avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Current Avatar"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-sm font-medium">No Avatar</span>
            )}
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 cursor-pointer">
                <UploadCloud size={32} className="text-white"/>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Profile Photo
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="hidden" // Hide default file input
            />
            <label 
                htmlFor="avatar-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 transform hover:-translate-y-0.5"
            >
                <UploadCloud size={16} className="mr-2"/> 
                {avatar ? "Change File" : "Upload New"}
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Max size 2MB. PNG or JPG only.
            </p>
          </div>
        </div>

        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group">
            <label className="block text-sm font-medium text-gray-600 group-focus-within:text-indigo-600 transition">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full mt-1 border border-gray-300 rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 hover:border-indigo-400 outline-none"
            />
          </div>
          <div className="group">
            <label className="block text-sm font-medium text-gray-600 group-focus-within:text-indigo-600 transition">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full mt-1 border border-gray-300 rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 hover:border-indigo-400 outline-none"
            />
          </div>
        </div>

        {/* Preferences - Notifications & Theme */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-4 border-t border-gray-100">
            {/* Notifications Toggle */}
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition duration-200 w-full sm:w-auto">
            <input
              type="checkbox"
              name="notifications"
              checked={form.notifications}
              onChange={handleChange}
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition duration-150"
            />
            <span className="text-sm font-medium text-gray-700">
                Enable email notifications
            </span>
          </label>

          {/* Theme Toggle */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">Theme Preference</span>
            <button
              type="button"
              onClick={() =>
                setForm((prevForm) => ({
                  ...prevForm,
                  theme: prevForm.theme === "dark" ? "light" : "dark",
                }))
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-md font-semibold transition duration-300 transform hover:scale-[1.05] ${
                form.theme === "dark"
                  ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                  : "bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50"
              }`}
            >
              {form.theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              {form.theme === "dark" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !userId}
          className={`w-full flex items-center justify-center py-3 rounded-xl font-extrabold text-lg transition duration-300 shadow-lg transform hover:-translate-y-1 ${
            loading || !userId
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <Save size={20} className="mr-2"/>
              Save Changes
            </>
          )}
        </button>

        {/* Message */}
        {message && (
          <p
            className={`text-center p-3 rounded-xl font-semibold transition duration-300 shadow-md ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
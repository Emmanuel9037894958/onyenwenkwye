"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, Edit3, User } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Delete a user
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", id));
        setUsers(users.filter((u) => u.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="p-6 text-gray-100 min-h-screen bg-gray-950">
      <h1 className="text-2xl font-bold text-green-400 mb-2 flex items-center gap-2">
        <User className="w-6 h-6 text-green-400" />
        Manage Users
      </h1>
      <p className="text-gray-400 mb-6">
        View, edit, or remove user accounts.
      </p>

      {loading ? (
        <div className="text-green-400">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-gray-500">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 border border-gray-800 rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-green-300 text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-800 hover:bg-gray-800/50"
                >
                  <td className="py-3 px-4">{user.fullName || "—"}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">
                    {user.role || "user"}
                  </td>
                  <td className="py-3 px-4 flex gap-3">
                    <button className="text-blue-400 hover:text-blue-300">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

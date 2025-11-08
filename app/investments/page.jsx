// "use client";
// import { useState } from "react";
// import { auth, db } from "@/lib/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// // ================= Investment Page (NOWPayments Only) =================
// export default function InvestmentsPage() {
//   const [form, setForm] = useState({ plan: "", amount: "" });
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleOpenModal = (e) => {
//     e.preventDefault();
//     if (!form.plan || !form.amount) return alert("Select plan & amount");
//     setModalOpen(true);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-6">
//         <h1 className="text-2xl font-bold text-center">Create New Investment</h1>

//         <form className="space-y-4" onSubmit={handleOpenModal}>
//           <select
//             name="plan"
//             value={form.plan}
//             onChange={handleChange}
//             className="border rounded-lg p-3 w-full focus:outline-none"
//             required
//           >
//             <option value="">Select Plan</option>
//             <option value="starter">Starter Plan</option>
//             <option value="pro">Pro Plan</option>
//             <option value="vip">VIP Plan</option>
//           </select>

//           <input
//             type="number"
//             name="amount"
//             placeholder="Amount"
//             value={form.amount}
//             onChange={handleChange}
//             className="border rounded-lg p-3 w-full focus:outline-none"
//             required
//           />

//           <button
//             type="submit"
//             className="bg-indigo-600 text-white p-3 rounded-lg w-full font-bold hover:bg-indigo-700 transition-shadow shadow-md"
//           >
//             Proceed to Pay
//           </button>
//         </form>
//       </div>

//       {modalOpen && (
//         <PaymentModal
//           plan={form.plan}
//           amount={form.amount}
//           onClose={() => setModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

// // ================= Payment Modal =================
// function PaymentModal({ plan, amount, onClose }) {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
//       <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
//         <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white rounded-xl shadow-lg p-4 w-72 text-center">
//           <h3 className="text-lg font-semibold">Investment Summary</h3>
//           <p className="mt-1">Plan: <span className="font-bold">{plan}</span></p>
//           <p className="mt-1">Amount: <span className="font-bold">${amount}</span></p>
//         </div>

//         <h2 className="text-2xl font-bold text-center text-gray-900 mt-12">
//           Pay with Crypto/USDT
//         </h2>

//         <NowPaymentsPay amount={amount} onClose={onClose} />
//       </div>
//     </div>
//   );
// }

// // ================= Save Payment to Firebase =================
// async function savePaymentToFirebase(paymentData) {
//   try {
//     const docRef = await addDoc(collection(db, "payments"), {
//       ...paymentData,
//       createdAt: serverTimestamp(),
//     });
//     console.log("✅ Payment saved with ID:", docRef.id);
//   } catch (error) {
//     console.error("❌ Error saving payment:", error);
//   }
// }

// // ================= NOWPayments Integration =================
// function NowPaymentsPay({ amount, onClose }) {
//   const handleNowPay = async () => {
//     const apiKey = process.env.NEXT_PUBLIC_NOWPAYMENTS_API_KEY;

//     if (!apiKey) {
//       alert("⚠️ NOWPayments API key missing in .env.local");
//       return;
//     }

//     try {
//       const response = await fetch("https://api.nowpayments.io/v1/invoice", {
//         method: "POST",
//         headers: {
//           "x-api-key": apiKey,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           price_amount: amount,
//           price_currency: "usd",
//           pay_currency: "btc",
//           order_id: "INV-" + Date.now(),
//           order_description: "Investment payment",
//           success_url: "http://localhost:3000/success",
//           cancel_url: "http://localhost:3000/cancel",
//           is_fee_paid_by_user: true,
//         }),
//       });

//       const data = await response.json();
//       if (data.invoice_url) {
//         alert("Redirecting to crypto payment...");

//         await savePaymentToFirebase({
//           user_id: 1,
//           amount: amount,
//           currency: "USD",
//           status: "pending",
//           reference: data.invoice_id || "crypto-" + Date.now(),
//           gateway: "nowpayments",
//         });

//         window.location.href = data.invoice_url;
//       } else {
//         alert("Error creating crypto payment: " + JSON.stringify(data));
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error creating crypto payment");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-3 mt-4">
//       <button
//         onClick={handleNowPay}
//         className="bg-green-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-green-700 shadow-md w-full"
//       >
//         Pay with Crypto
//       </button>
//       <button
//         onClick={onClose}
//         className="bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-bold hover:bg-gray-400 shadow-md w-full"
//       >
//         Cancel
//       </button>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// ================= Investment Page (NOWPayments Only) =================
export default function InvestmentsPage() {
  const [form, setForm] = useState({ plan: "", amount: "" });
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleOpenModal = (e) => {
    e.preventDefault();
    if (!form.plan || !form.amount) return alert("Select plan & amount");
    setModalOpen(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 p-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/40 shadow-4xl rounded-2xl p-8 w-full max-w-md space-y-6 text-white transition-transform transform hover:scale-[1.02]">
        <h1
          className="text-2xl font-extrabold text-center bg-clip-text text-transparent 
               bg-gradient-to-r from-teal-400 via-indigo-200 to-purple-600 
               drop-shadow-lg tracking-tight sm:text-5xl"
        >
          Create New Investment
        </h1>

        <form className="space-y-5" onSubmit={handleOpenModal}>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">
              Select Plan
            </label>
            <select
              name="plan"
              value={form.plan}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 text-gray-900 shadow-md"
              required
            >
              <option value="">Select Plan</option>
              <option value="starter">Starter Plan</option>
              <option value="pro">Pro Plan</option>
              <option value="vip">VIP Plan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">
              Enter Amount ($)
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={form.amount}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 text-gray-900 shadow-md"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg w-full font-bold hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all duration-300"
          >
            Proceed to Pay
          </button>
        </form>
      </div>

      {modalOpen && (
        <PaymentModal
          plan={form.plan}
          amount={form.amount}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

// ================= Payment Modal =================
function PaymentModal({ plan, amount, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="relative bg-white p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] w-full max-w-md space-y-6 transform transition-all scale-100">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg p-4 w-72 text-center">
          <h3 className="text-lg font-semibold">Investment Summary</h3>
          <p className="mt-1">
            Plan: <span className="font-bold">{plan}</span>
          </p>
          <p className="mt-1">
            Amount: <span className="font-bold">${amount}</span>
          </p>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-900 mt-12">
          Pay with Crypto / USDT
        </h2>

        <NowPaymentsPay amount={amount} onClose={onClose} />
      </div>
    </div>
  );
}

// ================= Save Payment to Firebase =================
async function savePaymentToFirebase(paymentData) {
  try {
    const docRef = await addDoc(collection(db, "payments"), {
      ...paymentData,
      createdAt: serverTimestamp(),
    });
    console.log("✅ Payment saved with ID:", docRef.id);
  } catch (error) {
    console.error("❌ Error saving payment:", error);
  }
}

function NowPaymentsPay({ amount, onClose }) {
  const handleNowPay = async () => {
    try {
      const res = await fetch("/api/createInvoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (data.invoice_url) {
        // Optional: save to Firebase before redirecting
        await savePaymentToFirebase({
          user_id: 1,
          amount,
          currency: "USD",
          status: "pending",
          reference: data.invoice_id || "crypto-" + Date.now(),
          gateway: "nowpayments",
        });

        window.location.href = data.invoice_url; // redirect client to invoice
      } else {
        alert("Error creating invoice: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <button
        onClick={handleNowPay}
        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-bold hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-300 w-full"
      >
        Pay with Crypto
      </button>
      <button
        onClick={onClose}
        className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-bold hover:bg-gray-300 transition-all w-full"
      >
        Cancel
      </button>
    </div>
  );
}

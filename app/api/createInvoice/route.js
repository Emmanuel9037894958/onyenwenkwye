export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, currency = "usd" } = body;

    const API_KEY = process.env.NOWPAYMENTS_API_KEY;

    if (!API_KEY) {
      return new Response(JSON.stringify({ error: "NOWPayments API key not set" }), { status: 500 });
    }

    const response = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: currency,
        pay_currency: "btc",
        order_id: "INV-" + Date.now(),
        order_description: "Investment payment",
        success_url: "https://your-live-site.com/success",
        cancel_url: "https://your-live-site.com/cancel",
        is_fee_paid_by_user: true,
      }),
    });

    const data = await response.json();

    // 🧩 Add this check:
    if (!response.ok) {
      console.error("NOWPayments API error:", data);
      return new Response(JSON.stringify({ error: data }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to create invoice" }), { status: 500 });
  }
}

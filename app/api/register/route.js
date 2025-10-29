export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ Replace with your actual InfinityFree PHP endpoint
    const phpApiUrl = "https://myinvestment.great-site.net/api/register.php";

    // 🔗 Send data to your external PHP backend
    const response = await fetch(phpApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // ⚡ Handle possible non-JSON responses safely
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: false, message: "⚠️ Invalid JSON from backend", raw: text };
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: response.ok ? 200 : 400,
    });
  } catch (error) {
    console.error("Error in register route:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error: " + error.message }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

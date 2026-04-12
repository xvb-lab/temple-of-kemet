// Temple of Kemet — Cloudflare Worker Leaderboard

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    // GET /leaderboard — top 10
    if (request.method === "GET" && url.pathname === "/leaderboard") {
      const raw = await env.KEMET_SCORES.get("leaderboard");
      const scores = raw ? JSON.parse(raw) : [];
      return new Response(JSON.stringify(scores), {
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    // POST /leaderboard — salva score
    if (request.method === "POST" && url.pathname === "/leaderboard") {
      const { name, score, level, socialClass } = await request.json();
      const raw = await env.KEMET_SCORES.get("leaderboard");
      let scores = raw ? JSON.parse(raw) : [];
      scores.push({
        name: (name || "Anonimo").substring(0, 20),
        score: Math.floor(score),
        level: Math.floor(level) || 1,
        socialClass: socialClass || "Schiavo",
        date: new Date().toISOString().split("T")[0],
      });
      scores.sort((a, b) => b.score - a.score);
      scores = scores.slice(0, 100);
      await env.KEMET_SCORES.put("leaderboard", JSON.stringify(scores));
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    // DELETE /leaderboard — reset
    if (request.method === "DELETE" && url.pathname === "/leaderboard") {
      await env.KEMET_SCORES.put("leaderboard", JSON.stringify([]));
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    return new Response("Temple of Kemet API", { headers: CORS });
  },
};

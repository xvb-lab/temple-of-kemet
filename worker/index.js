// Temple of Kemet — Cloudflare Worker Leaderboard
// KV namespace: XVB_STATS

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Preflight CORS
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    // GET /leaderboard — leggi top 10
    if (request.method === "GET" && url.pathname === "/leaderboard") {
      try {
        const raw = await env.XVB_STATS.get("leaderboard");
        const scores = raw ? JSON.parse(raw) : [];
        return new Response(JSON.stringify(scores), {
          headers: { ...CORS, "Content-Type": "application/json" },
        });
      } catch (e) {
        return new Response(JSON.stringify([]), {
          headers: { ...CORS, "Content-Type": "application/json" },
        });
      }
    }

    // POST /leaderboard — aggiungi score
    if (request.method === "POST" && url.pathname === "/leaderboard") {
      try {
        const body = await request.json();
        const { name, score, level } = body;

        if (!name || typeof score !== "number") {
          return new Response(JSON.stringify({ error: "Dati non validi" }), {
            status: 400,
            headers: { ...CORS, "Content-Type": "application/json" },
          });
        }

        // Leggi leaderboard esistente
        const raw = await env.XVB_STATS.get("leaderboard");
        let scores = raw ? JSON.parse(raw) : [];

        // Aggiungi nuovo score
        scores.push({
          name: name.substring(0, 20),
          score: Math.floor(score),
          level: Math.floor(level) || 1,
          date: new Date().toISOString().split("T")[0],
        });

        // Ordina per score decrescente, tieni top 100
        scores.sort((a, b) => b.score - a.score);
        scores = scores.slice(0, 100);

        // Salva
        await env.XVB_STATS.put("leaderboard", JSON.stringify(scores));

        return new Response(JSON.stringify({ ok: true, rank: scores.findIndex(s => s.name === name && s.score === Math.floor(score)) + 1 }), {
          headers: { ...CORS, "Content-Type": "application/json" },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: { ...CORS, "Content-Type": "application/json" },
        });
      }
    }

    // DELETE /leaderboard — reset (solo dev)
    if (request.method === "DELETE" && url.pathname === "/leaderboard") {
      await env.XVB_STATS.put("leaderboard", JSON.stringify([]));
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    return new Response("Temple of Kemet API", { headers: CORS });
  },
};

import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req: Request) => {
  // --- Handle CORS Preflight ---
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const { audioData, name } = await req.json();

    if (!audioData || !name) {
      return new Response(
        JSON.stringify({ error: "Missing audioData or name" }),
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
    }

    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing ElevenLabs API Key" }),
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
    }

    // --- Send request to ElevenLabs API ---
    const response = await fetch(
      "https://api.elevenlabs.io/v1/voices/clone",
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          files: [audioData],
        }),
      }
    );

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in cloneVoice:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }
});

// set access control type
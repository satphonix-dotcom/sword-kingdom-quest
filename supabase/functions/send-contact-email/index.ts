import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const client = new SmtpClient();

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();

    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: Deno.env.get("GMAIL_USER"),
      password: Deno.env.get("GMAIL_APP_PASSWORD"),
    });

    // Send to support
    await client.send({
      from: Deno.env.get("GMAIL_USER") || "",
      to: "support@swordkings.com",
      subject: `New Contact Form Submission from ${name}`,
      content: `
        New Contact Form Submission
        From: ${name} (${email})
        Message:
        ${message}
      `,
    });

    // Send confirmation to user
    await client.send({
      from: Deno.env.get("GMAIL_USER") || "",
      to: email,
      subject: "We received your message!",
      content: `
        Thank you for contacting us, ${name}!
        We have received your message and will get back to you as soon as possible.
        
        Best regards,
        The Sword Kings Team
      `,
    });

    await client.close();

    return new Response(
      JSON.stringify({ message: "Emails sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, serviceType, preferredDate, message }: BookingRequest = await req.json();

    // Send notification email to the business
    const businessEmailResponse = await resend.emails.send({
      from: "Optimus Customs <onboarding@resend.dev>",
      to: ["optimusxcustoms@gmail.com"],
      subject: `New Booking Request: ${serviceType} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">New Booking Request</h1>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #e74c3c; margin-top: 0;">Customer Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #e74c3c; margin-top: 0;">Service Details</h2>
            <p><strong>Service Type:</strong> ${serviceType}</p>
            <p><strong>Preferred Date:</strong> ${preferredDate}</p>
          </div>
          
          ${message ? `
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #e74c3c; margin-top: 0;">Project Details</h2>
            <p>${message}</p>
          </div>
          ` : ''}
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This booking request was submitted through the Optimus Customs website.
          </p>
        </div>
      `,
    });

    console.log("Business email sent successfully:", businessEmailResponse);

    // Send confirmation email to the customer
    const customerEmailResponse = await resend.emails.send({
      from: "Optimus Customs <onboarding@resend.dev>",
      to: [email],
      subject: "We received your booking request!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Thank You, ${name}!</h1>
          
          <p style="font-size: 16px; color: #555;">
            We've received your booking request for <strong>${serviceType}</strong> on <strong>${preferredDate}</strong>.
          </p>
          
          <p style="font-size: 16px; color: #555;">
            Our team will review your request and get back to you within 24 hours to confirm your appointment.
          </p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #e74c3c; margin-top: 0;">Your Request Summary</h2>
            <p><strong>Service:</strong> ${serviceType}</p>
            <p><strong>Preferred Date:</strong> ${preferredDate}</p>
            ${message ? `<p><strong>Project Details:</strong> ${message}</p>` : ''}
          </div>
          
          <div style="background: #e74c3c; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Contact Us</h3>
            <p>📞 (443) 477-1124</p>
            <p>📧 optimusxcustoms@gmail.com</p>
            <p>📍 Cherry Lane, Laurel MD, 20707</p>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Best regards,<br>
            <strong>The Optimus Customs Team</strong>
          </p>
        </div>
      `,
    });

    console.log("Customer confirmation email sent successfully:", customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        businessEmail: businessEmailResponse,
        customerEmail: customerEmailResponse 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

Deno.serve(handler);

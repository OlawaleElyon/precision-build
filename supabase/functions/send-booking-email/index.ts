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
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #00b4d8 0%, #0077b6 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">New Booking Request</h1>
          </div>
          
          <div style="padding: 30px;">
            <div style="background: rgba(0, 180, 216, 0.1); border: 1px solid rgba(0, 180, 216, 0.3); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #00b4d8; margin: 0 0 15px 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">Customer Information</h2>
              <p style="color: #e2e8f0; margin: 8px 0;"><strong style="color: #00b4d8;">Name:</strong> ${name}</p>
              <p style="color: #e2e8f0; margin: 8px 0;"><strong style="color: #00b4d8;">Email:</strong> <a href="mailto:${email}" style="color: #00b4d8;">${email}</a></p>
              <p style="color: #e2e8f0; margin: 8px 0;"><strong style="color: #00b4d8;">Phone:</strong> <a href="tel:${phone}" style="color: #00b4d8;">${phone}</a></p>
            </div>
            
            <div style="background: rgba(0, 180, 216, 0.1); border: 1px solid rgba(0, 180, 216, 0.3); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #00b4d8; margin: 0 0 15px 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">Service Details</h2>
              <p style="color: #e2e8f0; margin: 8px 0;"><strong style="color: #00b4d8;">Service Type:</strong> ${serviceType}</p>
              <p style="color: #e2e8f0; margin: 8px 0;"><strong style="color: #00b4d8;">Preferred Date:</strong> ${preferredDate}</p>
            </div>
            
            ${message ? `
            <div style="background: rgba(0, 180, 216, 0.1); border: 1px solid rgba(0, 180, 216, 0.3); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #00b4d8; margin: 0 0 15px 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">Project Details</h2>
              <p style="color: #e2e8f0; margin: 0;">${message}</p>
            </div>
            ` : ''}
            
            <p style="color: #64748b; font-size: 12px; margin-top: 30px; text-align: center;">
              This booking request was submitted through the Optimus Customs website.
            </p>
          </div>
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
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(90deg, #00b4d8 0%, #0077b6 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Thank You, ${name}!</h1>
          </div>
          
          <div style="padding: 30px;">
            <p style="font-size: 16px; color: #e2e8f0; line-height: 1.6;">
              We've received your booking request for <strong style="color: #00b4d8;">${serviceType}</strong> on <strong style="color: #00b4d8;">${preferredDate}</strong>.
            </p>
            
            <p style="font-size: 16px; color: #e2e8f0; line-height: 1.6;">
              Our team will review your request and get back to you within 24 hours to confirm your appointment.
            </p>
            
            <div style="background: rgba(0, 180, 216, 0.1); border: 1px solid rgba(0, 180, 216, 0.3); padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h2 style="color: #00b4d8; margin: 0 0 15px 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">Your Request Summary</h2>
              <p style="color: #e2e8f0; margin: 8px 0;"><strong style="color: #00b4d8;">Service:</strong> ${serviceType}</p>
              <p style="color: #e2e8f0; margin: 8px 0;"><strong style="color: #00b4d8;">Preferred Date:</strong> ${preferredDate}</p>
              ${message ? `<p style="color: #e2e8f0; margin: 8px 0;"><strong style="color: #00b4d8;">Project Details:</strong> ${message}</p>` : ''}
            </div>
            
            <div style="background: linear-gradient(90deg, #00b4d8 0%, #0077b6 100%); color: white; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h3 style="margin: 0 0 15px 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">Contact Us</h3>
              <p style="margin: 8px 0; font-size: 14px;">📞 (443) 477-1124</p>
              <p style="margin: 8px 0; font-size: 14px;">📧 optimusxcustoms@gmail.com</p>
              <p style="margin: 8px 0; font-size: 14px;">📍 Cherry Lane, Laurel MD, 20707</p>
            </div>
            
            <p style="color: #94a3b8; font-size: 14px; text-align: center; margin-top: 30px;">
              Best regards,<br>
              <strong style="color: #00b4d8;">The Optimus Customs Team</strong>
            </p>
          </div>
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

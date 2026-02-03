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

const sendEmail = async (to: string, subject: string, html: string) => {
  const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
  
  if (!SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY is not configured");
  }

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: "optimusxcustoms@gmail.com", name: "Optimus Customs" },
      subject: subject,
      content: [{ type: "text/html", value: html }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SendGrid API error: ${response.status} - ${errorText}`);
  }

  return { success: true, status: response.status };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, serviceType, preferredDate, message }: BookingRequest = await req.json();

    // Business notification email HTML
    const businessEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0a1628; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a1628; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, #0f1f35 0%, #162a46 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 180, 216, 0.15);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #00b4d8 0%, #0077b6 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;">OPTIMUS CUSTOMS</h1>
                    <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px; letter-spacing: 2px;">NEW BOOKING REQUEST</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    
                    <!-- Customer Info Card -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(0, 180, 216, 0.08); border: 1px solid rgba(0, 180, 216, 0.2); border-radius: 12px; margin-bottom: 20px;">
                      <tr>
                        <td style="padding: 25px;">
                          <h2 style="margin: 0 0 20px 0; color: #00b4d8; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid rgba(0, 180, 216, 0.2); padding-bottom: 10px;">👤 Customer Information</h2>
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 100px;">Name</td>
                              <td style="padding: 8px 0; color: #ffffff; font-size: 15px; font-weight: 600;">${name}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Email</td>
                              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00b4d8; font-size: 15px; text-decoration: none;">${email}</a></td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Phone</td>
                              <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #00b4d8; font-size: 15px; text-decoration: none;">${phone}</a></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Service Details Card -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(0, 180, 216, 0.08); border: 1px solid rgba(0, 180, 216, 0.2); border-radius: 12px; margin-bottom: 20px;">
                      <tr>
                        <td style="padding: 25px;">
                          <h2 style="margin: 0 0 20px 0; color: #00b4d8; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid rgba(0, 180, 216, 0.2); padding-bottom: 10px;">🚗 Service Details</h2>
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 120px;">Service Type</td>
                              <td style="padding: 8px 0; color: #ffffff; font-size: 15px; font-weight: 600;">${serviceType}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Preferred Date</td>
                              <td style="padding: 8px 0; color: #ffffff; font-size: 15px; font-weight: 600;">${preferredDate}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    ${message ? `
                    <!-- Project Details Card -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(0, 180, 216, 0.08); border: 1px solid rgba(0, 180, 216, 0.2); border-radius: 12px;">
                      <tr>
                        <td style="padding: 25px;">
                          <h2 style="margin: 0 0 15px 0; color: #00b4d8; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid rgba(0, 180, 216, 0.2); padding-bottom: 10px;">📝 Project Details</h2>
                          <p style="margin: 0; color: #e2e8f0; font-size: 15px; line-height: 1.6;">${message}</p>
                        </td>
                      </tr>
                    </table>
                    ` : ''}
                    
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background: rgba(0, 0, 0, 0.3); padding: 20px 30px; text-align: center;">
                    <p style="margin: 0; color: #64748b; font-size: 12px;">Submitted via Optimus Customs Website</p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Customer confirmation email HTML
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0a1628; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a1628; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, #0f1f35 0%, #162a46 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 180, 216, 0.15);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #00b4d8 0%, #0077b6 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;">OPTIMUS CUSTOMS</h1>
                    <p style="margin: 15px 0 0 0; color: rgba(255,255,255,0.95); font-size: 20px; font-weight: 500;">Thank You, ${name}!</p>
                  </td>
                </tr>
                
                <!-- Confirmation Message -->
                <tr>
                  <td style="padding: 40px 30px 20px 30px;">
                    <p style="margin: 0 0 15px 0; color: #e2e8f0; font-size: 16px; line-height: 1.7; text-align: center;">
                      We've received your booking request for <strong style="color: #00b4d8;">${serviceType}</strong> on <strong style="color: #00b4d8;">${preferredDate}</strong>.
                    </p>
                    <p style="margin: 0; color: #94a3b8; font-size: 15px; line-height: 1.7; text-align: center;">
                      Our team will review your request and get back to you within <strong style="color: #ffffff;">24 hours</strong> to confirm your appointment.
                    </p>
                  </td>
                </tr>
                
                <!-- Request Summary Card -->
                <tr>
                  <td style="padding: 10px 30px 30px 30px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(0, 180, 216, 0.08); border: 1px solid rgba(0, 180, 216, 0.2); border-radius: 12px;">
                      <tr>
                        <td style="padding: 25px;">
                          <h2 style="margin: 0 0 20px 0; color: #00b4d8; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid rgba(0, 180, 216, 0.2); padding-bottom: 10px;">📋 Your Request Summary</h2>
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding: 10px 0; color: #64748b; font-size: 13px; width: 120px;">Service</td>
                              <td style="padding: 10px 0; color: #ffffff; font-size: 15px; font-weight: 600;">${serviceType}</td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Preferred Date</td>
                              <td style="padding: 10px 0; color: #ffffff; font-size: 15px; font-weight: 600;">${preferredDate}</td>
                            </tr>
                            ${message ? `
                            <tr>
                              <td style="padding: 10px 0; color: #64748b; font-size: 13px; vertical-align: top;">Project Details</td>
                              <td style="padding: 10px 0; color: #e2e8f0; font-size: 15px; line-height: 1.5;">${message}</td>
                            </tr>
                            ` : ''}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Contact Card -->
                <tr>
                  <td style="padding: 0 30px 30px 30px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #00b4d8 0%, #0077b6 100%); border-radius: 12px;">
                      <tr>
                        <td style="padding: 25px;">
                          <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">📞 Contact Us</h2>
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding: 6px 0;">
                                <span style="color: rgba(255,255,255,0.9); font-size: 15px;">📱 (443) 477-1124</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 6px 0;">
                                <span style="color: rgba(255,255,255,0.9); font-size: 15px;">✉️ optimusxcustoms@gmail.com</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 6px 0;">
                                <span style="color: rgba(255,255,255,0.9); font-size: 15px;">📍 Cherry Lane, Laurel MD, 20707</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background: rgba(0, 0, 0, 0.3); padding: 25px 30px; text-align: center;">
                    <p style="margin: 0 0 5px 0; color: #94a3b8; font-size: 14px;">Best regards,</p>
                    <p style="margin: 0; color: #00b4d8; font-size: 16px; font-weight: 600;">The Optimus Customs Team</p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send notification email to the business
    const businessEmailResponse = await sendEmail(
      "optimusxcustoms@gmail.com",
      `New Booking Request: ${serviceType} from ${name}`,
      businessEmailHtml
    );
    console.log("Business email sent successfully:", businessEmailResponse);

    // Send confirmation email to the customer
    const customerEmailResponse = await sendEmail(
      email,
      "We received your booking request!",
      customerEmailHtml
    );
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

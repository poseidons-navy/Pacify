import { Resend } from 'resend';
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {password, email} = await request.json();
    const { data, error } = await resend.emails.send({
      from: 'Pacify <onboarding@resend.dev>',
      to: [email],
      subject: "Student Account",
      html: `
        <h1>Pacify Student Account Details</h1>
        <p>This is your password ${password}. Please do not share with anyone else</p>
        <p>Connect your wallet to your student account using the above password</p>
    `,
    });
    console.log("Email Sent", email);

    if (error) {
      return Response.json({ error });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}
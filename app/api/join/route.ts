import client from '@mailchimp/mailchimp_marketing';

const SERVER = process.env.SERVER;
const API_KEY = process.env.API_KEY;
const AUDIENCE_ID = process.env.AUDIENCE_ID;

function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required." }), {
      status: 400,
      headers: {
        'content-type': 'application/json',
      }
    })
  }

  if (!validateEmail(email)) {
    return new Response(JSON.stringify({ error: "Email is invalid." }), {
      status: 400,
      headers: {
        'content-type': 'application/json',
      }
    })
  }

  try {
    client.setConfig({
      apiKey: API_KEY,
      server: SERVER,
    });
    const response = await client.lists.addListMember(AUDIENCE_ID!, {
      email_address: email,
      status: "subscribed",
    });
    return new Response(JSON.stringify({ error: "" }), {
      status: 201,
      headers: {
        'content-type': 'application/json',
      }
    })
  } catch (error: any) {
    try {
      if (error.response.body.title === 'Member Exists') {
        return new Response(JSON.stringify({ error: "Member Exists" }), {
          status: 400,
          headers: {
            'content-type': 'application/json',
          }
        })
      }
    } catch (e) {
      return new Response(JSON.stringify({ error: error.message || error.toString() }), {
        status: 500,
        headers: {
          'content-type': 'application/json',
        }
      })
    }
  }
};
import client from '@mailchimp/mailchimp_marketing';

const SERVER = process.env.SERVER;
const API_KEY = process.env.API_KEY;
const AUDIENCE_ID = process.env.AUDIENCE_ID;

export async function GET(req: Request) {
  try {
    client.setConfig({
      apiKey: API_KEY,
      server: SERVER,
    });
    const rsp = await client.lists.getListMember(AUDIENCE_ID!, "", { count: 1 }) as any

    return new Response(JSON.stringify({ count: rsp.total_items }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      }
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || error.toString() }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      }
    })
  }
};
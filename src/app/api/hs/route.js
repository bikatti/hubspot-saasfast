import { NextResponse } from "next/server";

export async function GET(req) {

    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);
    const code = params.get('code');


    if (req.method === 'GET') {
        try {

            const response = await fetch('https://api.hubapi.com/oauth/v1/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    redirect_uri: process.env.APP_REDIRECT,
                    code: code
                })

            })

            if (response.status === 200) {
                const { access_token, refresh_token } = await response.json();
                const responseAppId = await fetch('https://api.hubapi.com/integrations/v1/me', {
                    headers: {
                        Authorization: 'Bearer ' + access_token
                    }
                })
                const getAppId = await responseAppId.json();
                const { portalId } = getAppId;
                
                return NextResponse.json({ portalId, access_token, refresh_token, });
            } else {
                return NextResponse.json({ error: 'Error authenticating the user' }, { status: 400 });
            }
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: 'Error server' }, { status: 500 })
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })

    }
}

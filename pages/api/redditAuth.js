// pages/api/redditAuth.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const REDDIT_API_URL = 'https://www.reddit.com/api/v1/access_token';

export default async function handler(req, res) {
    const { code } = req.query;

    const response = await axios.post(
        REDDIT_API_URL,
        new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://reddit-retriever.vercel.app/',
        }),
        {
        headers: {
            Authorization: `Basic ${Buffer.from(
            `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`
            ).toString('base64')}`,
            'User-Agent': process.env.REDDIT_USER_AGENT,
        },
        }
    );
    console.log(response.data)

    const { access_token, token_type } = response.data;

    res.status(200).json({ access_token, token_type });
}

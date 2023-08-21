import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const baseURL = 'https://graph.facebook.com/v17.0/';

// To get long term token from short term
// curl -i -X GET "?&&&"

const r = axios.create({ baseURL, 
    params: {
        access_token: process.env.ACCESS_TOKEN
    }
});

function createLongTermToken(token) {
    return axios.get('https://graph.facebook.com/oauth/access_token', {
        params: {
            grant_type: 'fb_exchange_token',
            client_id: process.env.APP_ID,
            client_secret: process.env.APP_SECRET,
            fb_exchange_token: token
        }
    }).then(r => r.data);
}

function getFacebookPages() {
    return r.get('me/accounts').then(r => r.data);
}

function getInstaAccountId(facebookPageId) {
    return r.get(facebookPageId, {
        params: {
          fields: 'instagram_business_account',
        },
    }).then(r => r.data);
}

function createMediaObjectContainer(instaId, image_url, caption) {
    return r.post(`${instaId}/media`, {
        image_url,
        caption
    }).then(r => r.data);
}

function publishMediaObjectContainer(instaId, creation_id) {
    return r.post(`${instaId}/media_publish`, {
        creation_id,
    }).then(r => r.data);
}


async function postToInstagram(imageUrl, caption) {
    const pages = await getFacebookPages();
    const insta = await getInstaAccountId(pages.data[pages.data.length - 1].id);
    const instaId = insta.instagram_business_account.id;
    console.log(pages, instaId)

    const mediaObjectContainer = await createMediaObjectContainer(instaId, imageUrl, caption);
    console.log('media', mediaObjectContainer);

    const result = await publishMediaObjectContainer(instaId, creation_id)

}

export { postToInstagram, createLongTermToken }; 

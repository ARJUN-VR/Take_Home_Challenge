import queryString from 'querystring'


export const generateAccessToken = async(code) => {
    try{

        const query = queryString.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            redirect_uri: 'http://localhost:4000/api/callback',
            code,
        });

        // Construct the URL with query parameters
        const url = `https://github.com/login/oauth/access_token?${query}`;

        // Make the request to GitHub to exchange the code for an access token
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            }
        });

        // Parse the JSON response
        const data = await response.json();

        return data.access_token


    }catch(err){
        console.log('ffrom generate accestoken', err)
    }
}

export const getUserData = async(access_token) => {
    try {

        console.log('accestoken', access_token)

        const userData = await fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                'Authorization': `token ${access_token}`,
                'Accept': 'application/json'
            }
        });

        return userData.json();
        
    } catch (error) {
        console.log(error)
    }
}
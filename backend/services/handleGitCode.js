import queryString from 'querystring'

// exchange the code for accessToken from github api
export const generateAccessToken = async(code) => {
    try{

        const query = queryString.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            redirect_uri: 'http://localhost:4000/api/callback',
            code,
        });

        // Constructing the URL with query parameters
        const url = `https://github.com/login/oauth/access_token?${query}`;

        //  request to GitHub to exchange the code for an access token
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            }
        });

        // Parse the JSON response
        const data = await response.json();

        return data.access_token


    }catch(error){
        console.log('from generate accestoken', err)
        throw error
    }
}


// fetch userdata from github using access token
export const getUserData = async(access_token) => {
    try {


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
        throw error
    }
}
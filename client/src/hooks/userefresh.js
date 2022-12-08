import axios from '../api/axios';
import useAuth from './useauth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const result = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(result.data.token);
            return {...prev, accessToken: result.data.token}
        });

        return result.data.token;
    }

   /* const refresh = () => {
        const configuration = {
            method: "get",
            url: "http://localhost:5050/refresh",
            withCredentials: true
        }

        axios(configuration)
        .then((result) => {
            setAuth(prev => {
                console.log(JSON.stringify(prev));
                console.log(result.data.token);
                return {...prev, accessToken: response.data.token}
            });

            return response.data.token
        })
    }*/

    return refresh;
};

export default useRefreshToken;
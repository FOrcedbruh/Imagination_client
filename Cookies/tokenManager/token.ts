//@ts-ignore
import Cookies from 'js-cookie';



export const AuthController = {
    setToken: (token: string) => {
        Cookies.set('token', token, { expires: 3});
    },

    getToken: () => {
        return Cookies.get('token');
    },

    logout: () => {
        Cookies.remove('token');
    }
}
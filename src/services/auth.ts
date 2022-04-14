import api from './api';

interface Response {
    access_token: string;
    err: object;
}

export async function signIn(email: string, password: string): Promise<Response> {
    try {
        const res = await api.post('login', { email, password });
        return res.data;
    } catch (err: any) {
        return err.data;
    }
}
import axios from 'axios';
import {format} from 'date-fns';
import {checkAuth} from '@/lib/error.ts';

const BACKEND_URL = 'http://localhost:3000';

export const registerUser = async (userData: object) => {
    return axios
        .post(`${BACKEND_URL}/users/register`, userData)
        .then(({data}) => data);
};

export const loginUser = async (credentials: object) => {
    return axios
        .post(`${BACKEND_URL}/auth/login`, credentials)
        .then(({data}) => data);
};

export const reqDev = async (data: object) => {
    return axios
        .post(`${BACKEND_URL}/users/request`, data)
        .then(({data}) => data);
};

export const updateProfile = async (userData: object) => {
    return axios
        .patch(`${BACKEND_URL}/users/update`, userData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(({data}) => data)
        .catch(checkAuth);
};

export const changePassword = async (password: string) => {
    return axios
        .post(`${BACKEND_URL}/auth/change_password`, {password}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(({data}) => data)
        .catch(checkAuth);
};

export const forgotPassword = async (email: string) => {
    return axios
        .post(`${BACKEND_URL}/auth/forgot`, {email})
        .then(({data}) => data);
};

export const linkAccess = async (token: string) => {
    return axios
        .post(`${BACKEND_URL}/auth/access`, {token})
        .then(({data}) => data);
};

export const linkVerify = async (token: string) => {
    return axios
        .post(`${BACKEND_URL}/auth/verify`, {token})
        .then(({data}) => data);
};

export const fetchKeys = async () => {
    return axios
        .get(`${BACKEND_URL}/auth/api_keys`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(({data}) => data)
        .catch(checkAuth);
};

export const genKey = async () => {
    return axios
        .put(`${BACKEND_URL}/auth/api_keys/generate`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(({data}) => data)
        .catch(checkAuth);
};

export const revokeKey = async (apiKey: string) => {
    return axios
        .delete(`${BACKEND_URL}/auth/api_keys/revoke`, {
            data: {
                api_key: apiKey,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(({data}) => data)
        .catch(checkAuth);
};

export const logout = async () => {
    return axios
        .delete(`${BACKEND_URL}/auth/logout`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(({data}) => data)
        .catch(checkAuth);
};

const formatStr = 'yyyy-MM-dd';

export type OtpDailySummaryData = {
    result: { pending: number; verified: number; failed: number; date: string }[]
};

type OtpSummaryData = {
    result: { otp_status: 'verified' | 'pending' | 'failed', count: number }[]
};

export const fetchSummary = async (date: Date, upto?: Date): Promise<OtpSummaryData> => {
    return axios
        .post(`${BACKEND_URL}/otp/summary`, {
            date: format(date, formatStr),
            upto: upto ? format(upto, formatStr) : undefined,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(({data}) => data)
        .catch(checkAuth);
};

export const fetchDailySummary = async (date: Date, upto?: Date): Promise<OtpDailySummaryData> => {
    return axios
        .post(`${BACKEND_URL}/otp/summary/daily`, {
            date: format(date, formatStr),
            upto: upto ? format(upto, formatStr) : undefined,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(({data}) => data)
        .catch(checkAuth);
};

export const fetchApiDocs = async () => {
    return axios
        .get(`${BACKEND_URL}/otp/docs`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(({data}) => data)
        .catch(checkAuth);
};

export const fetchApiErrors = async () => {
    return axios
        .get(`${BACKEND_URL}/otp/docs/errors`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(({data}) => data)
        .catch(checkAuth);
};

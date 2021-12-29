import React from 'react';
import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "e77a9d29-6870-462c-8b13-f105ae662367"
    }
})

export const usersAPI = {
    getUser(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)

    },
    ignore(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    }
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }
}

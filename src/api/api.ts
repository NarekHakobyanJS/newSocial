import axios from "axios";


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0`,
    withCredentials: true,
    headers: {
        "API-KEY": '97b016cf-738c-412b-8c5c-fe131956f90e'
    }
})

export const socialAPI = {
    getUsers(page: number = 1, pageSize: number = 30) {
        return instance.get(`/users?page=${page}&count=${pageSize}`)
            .then((response) => response.data)
    },
    follow(userId: number) {
        return instance.post(`/follow/${userId}`, {})
    },
    unfollow(userId: number) {
        return instance.delete(`/follow/${userId}`)
    },
    getProfile(userId : number | string | undefined){
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId : number | string | undefined){
        return instance.get(`/profile/${userId}`)
    },
    getStatus(userId : number | string | undefined){
        return instance.get(`/profile/status/${userId}`)
    },
    updateStatus(newStatus : string | undefined){
        return instance.put(`/profile/status`, {status : newStatus})
    }
}

export const authAPI = {
    me(){
        return instance.get('/auth/me')
    }
}
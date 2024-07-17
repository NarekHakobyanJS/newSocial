import axios from "axios";
import { ProfileAPIType } from "../state/profileReducer";


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0`,
    withCredentials: true,
    headers: {
        "API-KEY": '3826a686-b225-4c28-bc75-139644ff28bc'
    }
})

export const socialAPI = {
    getUsers(page: number, pageSize: number = 30, term : string = '') {
        return instance.get(`/users?page=${page}&count=${pageSize}&term=${term}`)
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
    },
    savePhoto(photoFile : any){
        let formData = new FormData()
        formData.append('image', photoFile)
        return instance.put('/profile/photo', formData, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        })
    },
    saveProfile(profile : ProfileAPIType) {
        return instance.put(`/profile`, profile)
    }
}

type MeResponseType = {
    data : {
        id : number,
        email : string,
        login : string
    },
    resultCode : number,
    messages : Array<string>
}
export const authAPI = {
    me(){
        return instance.get<MeResponseType>('/auth/me')
    },
    login(email : string, password : string, rememberMe : boolean = false){
        return instance.post('/auth/login', {email, password, rememberMe})
    },
    logout(){
        return instance.delete('/auth/login')
    }
}

export const securityAPI = {
    getCaptchaUrl(){
        return instance.get(`/security/get-captcha-url`)
    }
}
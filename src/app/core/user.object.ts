import { InjectionToken } from "@angular/core";
import { User } from "../Banking/modals/account.modal";


export const CURRENT_USER : User = {
    id : 1,
    name : "Oarabile", 
    email : "oarabilembewe@gmail.com",
    role : "Good Person",
    phone : "12345"
} 

export const USER_OBJECT = new InjectionToken<User>('user-object');
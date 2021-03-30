import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciasDTO } from "../models/credencias.dto";
import { LocalUser } from "../models/local_user";
import { StorageSerive } from "./storage.service";

@Injectable()
export class AuthService{

    constructor(
        public http: HttpClient,
        public storage : StorageSerive){

    }

    authenticate(creds : CredenciasDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`, 
        creds,
        {
            observe: 'response',
            responseType: 'text'
        })
    }

    successfullLogin(authorizationBarrier : string ){
        let token = authorizationBarrier.substring(7);
        let user : LocalUser = {
            token: token
        }
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}
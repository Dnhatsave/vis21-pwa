import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "../config/api.config";
import { CredenciasDTO } from "../models/credencias.dto";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService{

    jwtHelper : JwtHelper = new JwtHelper();
    constructor(
        public http: HttpClient,
        public storage : StorageService){

    }

    authenticate(creds : CredenciasDTO){
        
        return this.http.post(`${API_CONFIG.herokuUrl}/login`, 
        creds,
        {
            observe: 'response',
            responseType: 'text'
        })
    }
    refreshToken() {
        return this.http.post(
            `${API_CONFIG.herokuUrl}/auth/refresh_token`, 
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfullLogin(authorizationValue : string) {
        let tok = authorizationValue;
        let user : LocalUser = {
            token: tok,
            contacto: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}
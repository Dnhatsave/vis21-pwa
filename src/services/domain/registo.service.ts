import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { RegistoDTO } from "../../models/registo.dto";
import { StorageSerive } from "../storage.service";

@Injectable()
export class RegistoService{
    constructor(public http: HttpClient, public storage: StorageSerive){
    }

    findAll() :Observable<RegistoDTO[]> {
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<RegistoDTO[]>(`${API_CONFIG.baseUrl}/registos`,
            {headers: authHeader});
    }

    findByContacto(contacto:string) : Observable<RegistoDTO[]>{
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<RegistoDTO[]>(
            `${API_CONFIG.baseUrl}/registos/contacto?value=${contacto}`,
            {headers: authHeader});
    }
}
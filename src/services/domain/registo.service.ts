import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { RegistoDTO } from "../../models/registo.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class RegistoService{
    constructor(public http: HttpClient, public storage: StorageService){
    }

    findAll() :Observable<RegistoDTO[]> {
        
        return this.http.get<RegistoDTO[]>(`${API_CONFIG.baseUrl}/registos`);
    }

    findByContacto(contacto:string) : Observable<RegistoDTO[]>{
        return this.http.get<RegistoDTO[]>(
            `${API_CONFIG.baseUrl}/registos/contacto?value=${contacto}`);
    }

    insert(obj : RegistoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/registos`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}
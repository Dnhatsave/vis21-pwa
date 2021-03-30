import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { RegistoDTO } from "../../models/registo.dto";

@Injectable()
export class RegistoService{
    constructor(public http: HttpClient){
    }

    findAll() :Observable<RegistoDTO[]> {
        return this.http.get<RegistoDTO[]>(`${API_CONFIG.baseUrl}/registos`);
    }
}
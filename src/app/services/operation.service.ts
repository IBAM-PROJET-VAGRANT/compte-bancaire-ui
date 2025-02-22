import {Injectable} from '@angular/core';
import {IDepot} from "../models/depot.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRetrait} from "../models/retrait.model";
import {IVirement} from "../models/virement.model";
import {IHistorique} from "../models/historique-compte.model";
import {API_BASE_URL} from "../shared/app.constant";

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  // API_BASE_URL = "http://192.168.50.22:8082/api/v1"
  API_BASE_URL = API_BASE_URL;

  constructor(private httpClient: HttpClient) { }

  depot(depot: IDepot) {
    return this.httpClient.post(`${this.API_BASE_URL}/operations/depot`, depot);
  }

  retrait(retrait: IRetrait) {
    return this.httpClient.post(`${this.API_BASE_URL}/operations/retrait`, retrait);
  }
  virement(virement: IVirement) {
    return this.httpClient.post(`${this.API_BASE_URL}/operations/virement`, virement);
  }

  search(numCompte: string, page: number, size: number): Observable<IHistorique> {
    return this.httpClient.get<IHistorique>(`${this.API_BASE_URL}/operations/${numCompte}/par-page?page=${page}&size=${size}`);
  }

}

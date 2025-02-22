import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICompte } from '../models/compte.model';
import { Observable } from 'rxjs';
import {API_BASE_URL} from "../shared/app.constant";

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  // API_BASE_URL = "http://192.168.50.22:8082/api/v1"
  API_BASE_URL = API_BASE_URL;

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<ICompte[]> {
    return this.httpClient.get<ICompte[]>(`${this.API_BASE_URL}/comptes`);
  }

  search(searchTerm: string): Observable<ICompte[]> {
    return this.httpClient.get<ICompte[]>(`${this.API_BASE_URL}/comptes/search?term=${searchTerm}`);
  }

  find(id: number): Observable<ICompte> {
    return this.httpClient.get<ICompte>(`${this.API_BASE_URL}/comptes/${id}`);
  }

  create(compte: ICompte): Observable<ICompte> {
    let pathSuf = "compte-courant"
    if(compte.type == "CE") {
      pathSuf = "compte-epargne";
    }
    return this.httpClient.post<ICompte>(`${this.API_BASE_URL}/comptes/${pathSuf}`, compte);
  }

  update(compte: ICompte): Observable<ICompte> {
    let pathSuf = "compte-courant"
    if(compte.type == "CE") {
      pathSuf = "compte-epargne";
    }
    return this.httpClient.put<ICompte>(`${this.API_BASE_URL}/comptes/${pathSuf}/${compte.idCompteBanque}`, compte);
  }

}

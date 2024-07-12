import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICompte } from '../models/compte.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  API_BASE_URL = "http://localhost:8082/api/v1"

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
    return this.httpClient.post<ICompte>(`${this.API_BASE_URL}/comptes`, compte);
  }

  update(compte: ICompte): Observable<ICompte> {
    return this.httpClient.put<ICompte>(`${this.API_BASE_URL}/comptes/${compte.idCompteBanque}`, compte);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../models/client.model';
import {IApiResponse} from "../models/api-response.model";
import {API_BASE_URL} from "../shared/app.constant";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // API_BASE_URL = "http://192.168.50.22:8082/api/v1"
  API_BASE_URL = API_BASE_URL;

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<IClient[]> {
    return this.httpClient.get<IClient[]>(`${this.API_BASE_URL}/clients`);
  }

  search(searchTerm: string): Observable<IClient[]> {
    return this.httpClient.get<IClient[]>(`${this.API_BASE_URL}/clients/search?term=${searchTerm}`);
  }

  find(id: number): Observable<IClient> {
    return this.httpClient.get<IClient>(`${this.API_BASE_URL}/clients/${id}`);
  }

  create(client: IClient): Observable<IClient> {
    return this.httpClient.post<IClient>(`${this.API_BASE_URL}/clients`, client);
  }

  update(client: IClient): Observable<IClient> {
    return this.httpClient.put<IClient>(`${this.API_BASE_URL}/clients/${client.idClient}`, client);
  }

  delete(id: number): Observable<IApiResponse> {
    return this.httpClient.delete<IApiResponse>(`${this.API_BASE_URL}/clients/${id}`);
  }
}

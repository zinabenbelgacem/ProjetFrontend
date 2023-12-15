import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/getallclients`);
  }

  getClientById(clientId: Object): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/getclientById/${clientId}`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/addclient`, client);
  }

  updateClient(clientId: Object, updatedClient: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/Updateclient/${clientId}`, updatedClient);
  }

  deleteClient(clientId: Object): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletecliente/${clientId}`);
  }
  getMostPurchasedProducts(clientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/mostPurchasedProducts/${clientId}`);
  }
  getFacturesReglees(idClient: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/facturesReglees/${idClient}`);
  }

  getFacturesNonReglees(idClient: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/facturesNonReglees/${idClient}`);
  }

  getChiffreAffairesGlobal(clientId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${clientId}/chiffre-affaires`);
  }

 
  getChiffreAffairesAnnee(clientId: number, annee: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${clientId}/chiffre-affaires/${annee}`);
  }
  

  getResteGlobalMontantsNonPayes(clientId: number) {
    const url = `${this.apiUrl}/calculerResteGlobalMontantsNonPayes/${clientId}`;
    return this.http.get(url, { withCredentials: true });
  }
}

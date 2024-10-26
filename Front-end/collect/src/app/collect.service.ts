import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collect } from './collect';

@Injectable({
  providedIn: 'root'
})
export class CollectService {

  private apiUrl = 'http://localhost:8080/collect';

  constructor(private http: HttpClient) { }

  pointRead(): Observable<Collect[]> {
    return this.http.get<Collect[]>(this.apiUrl);
  }

  pointCreate(collect: Collect): Observable<Collect> {
    return this.http.post<Collect>(this.apiUrl, collect);
  }

  pointUpdate(id: number, collect: Collect): Observable<Collect> {
    return this.http.put<Collect>(`${this.apiUrl}/${id}`, collect);
  }

  pointDelete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  pointSearch(params: any): Observable<Collect[]> {
    let httpParams = new HttpParams();

    if (params.nome) {
      httpParams = httpParams.set('nome', params.nome);
    }
    if (params.endereco) {
      httpParams = httpParams.set('endereco', params.endereco);
    }
    if (params.zona) {
      httpParams = httpParams.set('zona', params.zona);
    }
    if (params.contatos) {
      httpParams = httpParams.set('contatos', params.contatos);
    }
    if (params.horarioExpediente) {
      httpParams = httpParams.set('horarioExpediente', params.horarioExpediente);
    }

    return this.http.get<Collect[]>(`${this.apiUrl}/search`, { params: httpParams });
  }

}

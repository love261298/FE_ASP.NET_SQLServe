import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  protected apiUrl = environment.API_URL;
  protected url: string = '';
  constructor(public http: HttpClient) { }
  search(data: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.url}/Search`, data);
  }
  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.url}`);
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.url}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.url}`, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${this.url}/${id}`, data);
  }
  deleteById(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.url}/${id}`);
  }
}

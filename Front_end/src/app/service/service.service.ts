import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employee } from '../interface/emp';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  Url: string = "https://localhost:44367/api/Employee";
  constructor(private _HttpClient:HttpClient){}

getallData():Observable<employee[]>
{
return this._HttpClient.get<employee[]>(`${this.Url}`)
}

  // Method to send QR code and get employee details
  getEmployeeByQrCode(body: any): Observable<employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._HttpClient.post<employee>(`${this.Url}/getEmployeeByQrCode`, body, { headers });
  }
  getEmployeeById(id: string): Observable<employee> {
    return this._HttpClient.get<employee>(`${this.Url}/${id}`);
  }
}
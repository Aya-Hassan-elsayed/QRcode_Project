import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employee } from '../interface/emp';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  Url: string = "http://10.100.102.50:8082/api/Employee";
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
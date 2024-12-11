import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { employee } from '../../interface/emp';
import { ServiceService } from '../service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanresloverService implements Resolve<any> {

  constructor( private services:ServiceService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.services.getallData();
    
  }
}

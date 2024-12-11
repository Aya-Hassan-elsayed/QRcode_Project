import { Routes } from '@angular/router';
import { generate } from 'rxjs';
import { GenerateComponent } from './additions/generate/generate/generate.component';
import { HomeComponent } from './additions/home/home.component';
import { ScanresloverService } from './service/reslovers/scanreslover.service';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:'home' ,component:HomeComponent  ,resolve:{"Scan":ScanresloverService}},
    {path:'generate/:id' , component:GenerateComponent}
];

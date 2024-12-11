import { Component } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { employee } from '../../interface/emp';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from "@angular/material/card"; 
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({  
  selector: 'app-home',
  standalone: true, 
  imports: [FormsModule, NgFor, NgIf, MatCardModule, ZXingScannerModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  employee!: employee[];

  constructor(private _ServiceService: ServiceService, private router: Router,private route:ActivatedRoute) {}

  ngOnInit() {
    // this._ServiceService.getallData().subscribe(res => {
    //   this.employee = res;
    //   console.log(res);
    // });
    this.employee=this.route.snapshot.data["Scan"]||[]
  }

  scanQrCode(qrCodeBase64: string) {
    const cleanedQrCode = qrCodeBase64.replace(/^data:image\/(png|jpg);base64,/, '');

    const body = {
      qrCodeBase64: cleanedQrCode
    };

    this._ServiceService.getEmployeeByQrCode(body).subscribe(
      (res: employee) => {
        console.log(res);
      // this.router.navigate(['generate'], { state: { employee: res } });
      this.router.navigate(['generate', res.id], { state: { employee: res } }); // استخدم ID الموظف هنا

      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}

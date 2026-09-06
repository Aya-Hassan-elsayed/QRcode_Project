
import { Component } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { employee } from '../../interface/emp';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    MatCardModule,
    ZXingScannerModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  employee!: employee[];

  constructor(
    private _ServiceService: ServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.employee = this.route.snapshot.data['Scan'] || [];
  }

  // ==========================================
  // الضغط على QR الموجود في الكارت
  // ==========================================
  openEmployee(employeeId: number) {
    this.router.navigate(['generate', employeeId]);
  }

  // ==========================================
  // Scan QR بالكاميرا
  // ==========================================
  scanQrCode(qrText: string) {

    console.log('QR Scanned:', qrText);

    try {


      const url = new URL(qrText);

      const parts = url.pathname.split('/');

      const employeeId = parts[parts.length - 1];

      if (!employeeId || isNaN(Number(employeeId))) {
        console.error('Invalid employee ID in QR code');
        return;
      }

      this.router.navigate(['generate', employeeId]);

    } catch (error) {

      console.error('Invalid QR code:', error);

    }
  }
}


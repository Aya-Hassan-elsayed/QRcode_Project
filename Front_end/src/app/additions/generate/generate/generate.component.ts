import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { employee } from '../../../interface/emp';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [ZXingScannerModule , NgIf],
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.css'
})
export class GenerateComponent  implements OnInit{
  employee!: employee;
  employeeData!:employee
  constructor(private route: ActivatedRoute, private services:ServiceService ) {}


  ngOnInit():void
  {
  //  this.employee =history.state.employee
  const employeeId = this.route.snapshot.paramMap.get('id'); // الحصول على الـ ID من الرابط
  if (employeeId) {
    this.getEmployeeData(employeeId);
  }
}
getEmployeeData(id: string): void {
  this.services.getEmployeeById(id).subscribe((data) => {
    this.employee = data;
  });
}

    // قراءة بيانات الموظف من الـ state اللي بعتها الصفحة السابقة
  //   const navigation = this.router.getCurrentNavigation();
  //   if (navigation?.extras?.state) {
  //     this.employee = navigation.extras.state['employee'];
  //   }
  // }
}

  

 




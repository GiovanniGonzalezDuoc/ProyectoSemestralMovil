import { Component, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() searchText:string = '';

  constructor(private router:Router,private bd:ServicebdService) {}

  ngOnInit() {
  }

  mostrarTodasPublicaciones() {
    this.router.navigate(['/home']);
  }
}

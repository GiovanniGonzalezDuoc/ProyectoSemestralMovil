import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.page.html',
  styleUrls: ['./agregar-rol.page.scss'],
})
export class AgregarRolPage implements OnInit {
  nombre_rol: string = "";
  constructor(private bd:ServicebdService) { }

  ngOnInit() {
  }
  insertar(){
    this.bd.insertarRol(this.nombre_rol);
  }
}

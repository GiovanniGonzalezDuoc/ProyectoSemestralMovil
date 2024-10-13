import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-contacto',
  templateUrl: './agregar-contacto.page.html',
  styleUrls: ['./agregar-contacto.page.scss'],
})
export class AgregarContactoPage implements OnInit {

  correo_usuario_contacto: string = "";
  mensaje_contacto: string = "";
  constructor(private bd:ServicebdService) { }

  ngOnInit() {
  }
  insertar(){
    this.bd.insertarContacto(this.correo_usuario_contacto,this.mensaje_contacto);
  }

}

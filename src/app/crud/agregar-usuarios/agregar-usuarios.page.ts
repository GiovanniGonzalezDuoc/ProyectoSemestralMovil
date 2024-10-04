import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.page.html',
  styleUrls: ['./agregar-usuarios.page.scss'],
})
export class AgregarUsuariosPage implements OnInit {
  nombre_usuario:string="";
  apellido_usuario:string="";
  carrera_usuario:string="";
  telefono!:number;
  correo_usuario:string="";
  contrasena:string="";
  rol_id_rol!:number;
  constructor(private bd:ServicebdService) { }

  ngOnInit() {
  }
  insertar(){
    this.bd.insertarUsuario(this.nombre_usuario,this.apellido_usuario,this.carrera_usuario,this.telefono,this.correo_usuario,this.contrasena,this.rol_id_rol);
  }
}

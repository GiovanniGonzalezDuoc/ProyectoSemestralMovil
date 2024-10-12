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
  id_pregunta!:number;
  respuesta:string = "";
  preguntasSeguridad: any[] = []; // Aquí se almacenarán las categorías desde la BD
  preguntaSeleccionada: number[] = []; // Para las categorías seleccionadas
  
  constructor(private bd:ServicebdService) { }

  ngOnInit() { this.listarPreguntas();
  }
  listarPreguntas() {
    this.bd.fetchPreguntas().subscribe(preguntas => {
      this.preguntasSeguridad = preguntas; // Almacena las preguntas obtenidas
    })
  }
  insertar(){
    const preguntaSelecion = this.preguntaSeleccionada[0]
    this.bd.insertarUsuario(this.nombre_usuario,this.apellido_usuario,this.carrera_usuario,this.telefono,this.correo_usuario,this.contrasena,this.rol_id_rol,preguntaSelecion,this.respuesta);
  }
}

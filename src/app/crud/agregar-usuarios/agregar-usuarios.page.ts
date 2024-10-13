import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.page.html',
  styleUrls: ['./agregar-usuarios.page.scss'],
})
export class AgregarUsuariosPage implements OnInit {
  nombre_usuario: string = "";
  apellido_usuario: string = "";
  id_carrera!: number;
  telefono!: number;
  correo_usuario: string = "";
  contrasena: string = "";
  rol_id_rol!: number;
  id_pregunta!: number;
  respuesta: string = "";
  preguntasSeguridad: any[] = []; // Almacenar las preguntas de seguridad desde la BD
  preguntaSeleccionada: number[] = []; // Pregunta seleccionada
  carreras: any[] = []; // Almacenar las carreras desde la BD
  carreraSeleccionada!: number; // Carrera seleccionada
  
  constructor(private bd: ServicebdService) { }

  ngOnInit() {
    this.listarPreguntas();
    this.listarCarreras(); // Llamar a la función para obtener las carreras
  }

  listarPreguntas() {
    this.bd.fetchPreguntas().subscribe(preguntas => {
      this.preguntasSeguridad = preguntas;
    });
  }

  listarCarreras() {
    this.bd.fetchCarreras().subscribe(carreras => {
      this.carreras = carreras; // Almacenar las carreras obtenidas
    });
  }

  insertar() {
    const preguntaSelecion = this.preguntaSeleccionada[0];
    this.bd.insertarUsuario(this.nombre_usuario, this.apellido_usuario, this.carreraSeleccionada, this.telefono, this.correo_usuario, this.contrasena, this.rol_id_rol, preguntaSelecion, this.respuesta);
  }
}

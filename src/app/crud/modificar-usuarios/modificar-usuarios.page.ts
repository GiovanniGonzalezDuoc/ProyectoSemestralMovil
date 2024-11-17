import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-usuarios',
  templateUrl: './modificar-usuarios.page.html',
  styleUrls: ['./modificar-usuarios.page.scss'],
})
export class ModificarUsuariosPage implements OnInit {
  usuario: any = {}; // Inicializar como objeto vacío
  preguntasSeguridad: any[] = []; // Almacenar las preguntas de seguridad desde la BD
  preguntaSeleccionada: number[] = []; // Pregunta seleccionada
  carreras: any[] = []; // Almacenar las carreras desde la BD
  carreraSeleccionada: number[] = []; // Carrera seleccionada
  roles: any[] = []; // Almacenar los roles desde la BD
  rolSeleccionado: number[] = []; // Roles seleccionados

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        // Asegúrate de que 'usuario' no sea undefined ni null
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'] || {}; // Valor por defecto
      }
    });
  }

  ngOnInit() {
    if (!this.usuario || !this.usuario.id_usuario) {
      console.error('No se encontró el usuario o el ID del usuario.');
    } else {
      this.listarPreguntas();
      this.listarCarreras();
      this.listarRoles();
      this.carreraSeleccionada = this.usuario.id_carrera; // Si está disponible
      this.rolSeleccionado = this.usuario.rol_id_rol; // Si está disponible
      this.preguntaSeleccionada = this.usuario.id_pregunta; // Si está disponible
    }
  }

  listarPreguntas() {
    this.bd.fetchPreguntas().subscribe(preguntas => {
      this.preguntasSeguridad = preguntas;
    });
  }

  listarCarreras() {
    this.bd.fetchCarreras().subscribe(carreras => {
      this.carreras = carreras;
    });
  }

  listarRoles() {
    this.bd.fetchRol().subscribe(rol => {
      this.roles = rol;
    });
  }

  modificar() {
    if (this.usuario && this.usuario.id_usuario) {
      const preguntaSelecion = this.preguntaSeleccionada[0];
      const carrera_usuario = this.carreraSeleccionada[0];
      const rol_usuario = this.rolSeleccionado[0];
      this.bd.modificarUsuario(
        this.usuario.id_usuario,
        this.usuario.nombre_usuario,
        this.usuario.apellido_usuario,
        carrera_usuario,
        this.usuario.telefono,
        this.usuario.correo_usuario,
        this.usuario.contrasena,
        rol_usuario,
        preguntaSelecion,
        this.usuario.respuesta
      );
    } else {
      console.error('No se puede modificar, faltan datos del usuario.');
    }
  }
}
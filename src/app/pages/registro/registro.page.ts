import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { Usuarios } from 'src/app/models/usuarios';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  arregloUsuario: any = {
    nombre_usuario: "",
    apellido_usuario: "",
    carrera_usuario: "",
    telefono: '',
    correo_usuario: "",
    contrasena: '',
    rol_id_rol: 1,
    id_pregunta: '', // ID de la pregunta seleccionada
    respuesta: '', // Respuesta de la pregunta de seguridad
  };
  preguntasSeguridad: any[] = []; // Aquí se almacenarán las preguntas desde la BD
  preguntaSeleccionada: number | null = null; // Para almacenar la pregunta seleccionada

  // Variables para almacenar mensajes de error
  errorNombre: string = '';
  errorApellido: string = '';
  errorCarrera: string = '';
  errorTelefono: string = '';
  errorCorreo: string = '';
  errorContrasena: string = '';
  errorPregunta: string = ''; // Mensaje de error para la pregunta
  errorRespuesta: string = ''; // Mensaje de error para la respuesta
  errorMessage: string = '';

  constructor(private router: Router, private bd: ServicebdService) { }

  ngOnInit() {
    this.listarPreguntas(); // Cargar las preguntas al inicializar
  }

  listarPreguntas() {
    this.bd.fetchPreguntas().subscribe(preguntas => {
      this.preguntasSeguridad = preguntas; // Almacena las preguntas obtenidas
    });
  }

  registro() {
    const email = this.arregloUsuario.correo_usuario.trim();
    const telefono = parseInt(this.arregloUsuario.telefono, 10);
    const contrasena = this.arregloUsuario.contrasena.trim();

    // Limpiar mensajes de error antes de validar
    this.errorNombre = '';
    this.errorApellido = '';
    this.errorCarrera = '';
    this.errorTelefono = '';
    this.errorCorreo = '';
    this.errorContrasena = '';
    this.errorPregunta = ''; // Limpiar mensaje de error de la pregunta
    this.errorRespuesta = ''; // Limpiar mensaje de error de la respuesta
    this.errorMessage = '';

    let formValid = true;

    // Validar que no hayan campos vacíos
    if (!this.arregloUsuario.nombre_usuario || !this.arregloUsuario.apellido_usuario || 
        !this.arregloUsuario.carrera_usuario || !this.arregloUsuario.telefono || 
        !this.arregloUsuario.correo_usuario || !this.arregloUsuario.contrasena || 
        !this.preguntaSeleccionada || !this.arregloUsuario.respuesta) {
      this.errorMessage = 'Por favor, rellene todos los campos.';
      formValid = false;
    }

    // Validar que el nombre no contenga números
    if (/\d/.test(this.arregloUsuario.nombre_usuario)) {
      this.errorNombre = 'El nombre no puede contener números.';
      formValid = false;
    }

    // Validar que el apellido no contenga números
    if (/\d/.test(this.arregloUsuario.apellido_usuario)) {
      this.errorApellido = 'El apellido no puede contener números.';
      formValid = false;
    }

    // Validar que la carrera no contenga números ni signos
    if (/[^a-zA-Z\s]/.test(this.arregloUsuario.carrera_usuario)) {
      this.errorCarrera = 'La carrera no puede contener números, guiones o signos.';
      formValid = false;
    }

    // Validar que el teléfono tenga exactamente 8 dígitos
    if (!/^\d{8}$/.test(telefono.toString())) {
      this.errorTelefono = 'El número de teléfono debe tener exactamente 8 dígitos.';
      formValid = false;
    }

    // Validar que el correo sea válido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.errorCorreo = 'El correo electrónico no es válido.';
      formValid = false;
    } else if (email) {
      this.bd.verificarEmail(email).then((usuarioEncontrado) => {
        if (usuarioEncontrado) {
          this.errorCorreo = 'El Correo electrónico ya está registrado en la base de datos';
          formValid = false;
        }
      });
    }

    // Validar que la contraseña cumpla con las reglas
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(contrasena)) {
      this.errorContrasena = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.';
      formValid = false;
    }

    // Validar que se haya seleccionado una pregunta de seguridad
    if (!this.preguntaSeleccionada) {
      this.errorPregunta = 'Por favor, seleccione una pregunta de seguridad.';
      formValid = false;
    } else {
      this.arregloUsuario.id_pregunta = this.preguntaSeleccionada; // Asignar el ID de la pregunta seleccionada
    }

    // Validar que la respuesta no esté vacía
    if (!this.arregloUsuario.respuesta) {
      this.errorRespuesta = 'Por favor, ingrese una respuesta a la pregunta de seguridad.';
      formValid = false;
    }

    // Si el formulario es válido, insertar usuario
    if (formValid) {
      this.bd.insertarUsuario(
        this.arregloUsuario.nombre_usuario,
        this.arregloUsuario.apellido_usuario,
        this.arregloUsuario.carrera_usuario,
        this.arregloUsuario.telefono,
        this.arregloUsuario.correo_usuario,
        this.arregloUsuario.contrasena,
        this.arregloUsuario.rol_id_rol,
        this.arregloUsuario.id_pregunta, // Usar el ID de la pregunta seleccionada
        this.arregloUsuario.respuesta
      );

      // Redirigir al login después del registro
      this.router.navigate(['/login']);
    }
  }
}

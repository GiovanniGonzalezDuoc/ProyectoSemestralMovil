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
    id_carrera: '',
    telefono: '',
    correo_usuario: "",
    contrasena: '',
    re_contrasena: '',
    rol_id_rol: 1,
    id_pregunta: '', // ID de la pregunta seleccionada
    respuesta: '', // Respuesta de la pregunta de seguridad
  };
  preguntasSeguridad: any[] = []; // Aquí se almacenarán las preguntas desde la BD
  preguntaSeleccionada: number | null = null; // Para almacenar la pregunta seleccionada
  carreras: any[] = []; // Almacenar las carreras desde la BD
  carreraSeleccionada!: number; // Carrera seleccionada

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
    this.listarCarreras();
  }

  listarPreguntas() {
    this.bd.fetchPreguntas().subscribe(preguntas => {
      this.preguntasSeguridad = preguntas; // Almacena las preguntas obtenidas
    });
  }

  listarCarreras() {
    this.bd.fetchCarreras().subscribe(carreras => {
      this.carreras = carreras; // Almacenar las carreras obtenidas
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

    // Validar que no hayan campos vacíos o que contengan solo espacios
    if (
      !this.arregloUsuario.nombre_usuario ||
      !this.arregloUsuario.nombre_usuario.trim() ||
      !this.arregloUsuario.apellido_usuario ||
      !this.arregloUsuario.apellido_usuario.trim() ||
      !this.arregloUsuario.telefono ||
      !this.arregloUsuario.telefono.trim() ||
      !this.arregloUsuario.correo_usuario ||
      !this.arregloUsuario.correo_usuario.trim() ||
      !this.arregloUsuario.contrasena ||
      !this.arregloUsuario.contrasena.trim() ||
      !this.arregloUsuario.respuesta ||
      !this.arregloUsuario.respuesta.trim()
    ) {
      this.errorMessage = 'Por favor, rellene todos los campos correctamente.';
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

    // Validar que se haya seleccionado una pregunta de seguridad
    if (!this.carreraSeleccionada) {
      this.errorCarrera = 'Por favor, seleccione una carrera.';
      formValid = false;
    } else {
      this.arregloUsuario.id_carrera = this.carreraSeleccionada; // Asignar el ID de la pregunta seleccionada
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
    if (this.arregloUsuario.contrasena != this.arregloUsuario.re_contrasena) {
      this.errorContrasena = 'Las Contraseñas No Son Iguales.'
      formValid = false;
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
        this.arregloUsuario.id_carrera,
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

  verificarEspacios() {
    let valid = true;
  
    // Validar que el nombre no esté vacío
    if (!this.arregloUsuario.nombre_usuario.trim()) {
      this.errorNombre = 'El nombre no puede quedar vacio.';
      valid = false;
    }
  
    // Validar que el apellido no esté vacío
    if (!this.arregloUsuario.apellido_usuario.trim()) {
      this.errorApellido = 'El apellido no puede quedar vacio.';
      valid = false;
    }
  
    return valid;
  }


}

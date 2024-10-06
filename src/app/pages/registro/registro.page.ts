import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  };

  // Variables para almacenar mensajes de error
  errorNombre: string = '';
  errorApellido: string = '';
  errorCarrera: string = '';
  errorTelefono: string = '';
  errorCorreo: string = '';
  errorContrasena: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private bd: ServicebdService) { }

  ngOnInit() { }

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
    this.errorMessage = '';

    let formValid = true;

    // Validar que no hayan campos vacíos
    if (!this.arregloUsuario.nombre_usuario || !this.arregloUsuario.apellido_usuario || !this.arregloUsuario.carrera_usuario || !this.arregloUsuario.telefono || !this.arregloUsuario.correo_usuario || !this.arregloUsuario.contrasena) {
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
    }else if (email){
      this.bd.verificarEmail(email).then((usuarioEncontrado) => {
        if (usuarioEncontrado){
          this.errorCorreo = 'El Correo electrónico ya esta registrado en la base de datos';
          formValid = false;
        }
      });
    }

    // Validar que la contraseña cumpla con las reglas
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(contrasena)) {
      this.errorContrasena = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.';
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
        this.arregloUsuario.rol_id_rol
      );

      // Redirigir al login después del registro
      this.router.navigate(['/login']);
    }
  }
}

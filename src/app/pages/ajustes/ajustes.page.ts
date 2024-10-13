import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  arregloUsuario: any = {
    id_usuario: '',
    nombre_usuario: "",
    apellido_usuario: "",
    id_carrera: '',
    telefono: '',
    correo_usuario: "",
    contrasena: '',
    rol_id_rol: 1,
    id_pregunta: '', // ID de la pregunta seleccionada
    respuesta: '', // Respuesta de la pregunta de seguridad
  };
  usuario: any = {
    email: "",
    telefono: "",
    contrasenaActual: "",
    contrasenaNueva: "",
    renuevaContrasena: "",
    id_carrera: '',
  }


  carreras: any[] = []; // Almacenar las carreras desde la BD
  carreraSeleccionada!: number; // Carrera seleccionada

  // Variables para almacenar mensajes de error
  errorCarrera: string = '';
  errorTelefono: string = '';
  errorCorreo: string = '';
  errorContrasena: string = '';
  errorContrasenaBD: string = '';
  errorMessage: string = '';

  rol_id_rol!: number;

  constructor(
    private router: Router,
    private storage: NativeStorage,
    private bd: ServicebdService,
  ) {
    this.bd.dbState().subscribe(data => {
      // Validar si la base de datos está lista
      if (data) {
        // Obtener el ID del usuario antes de listar las publicaciones
        this.storage.getItem('id_usuario').then(id => {
          this.arregloUsuario.id_usuario = id;

          // Llamar a la función listarPublicacionesID para cargar las publicaciones del usuario
          this.bd.listarUsuarioID(this.arregloUsuario.id_usuario).then(() => {
            // Suscribirse al observable de fetchPublicacion
            this.bd.fetchUsuario().subscribe(Usuarios => {
              // Filtrar las publicaciones por el usuario actual
              this.arregloUsuario = Usuarios.find(p => p.id_usuario === this.arregloUsuario.id_usuario);
            });
          }).catch(err => {
            console.error('Error listando publicaciones:', err);
          });

        }).catch(err => {
          console.error('Error obteniendo id_usuario:', err);
        });
      }
    })
  }

  ngOnInit() {
    // Obtener el rol y cargar los datos del usuario al cargar la página
    this.storage.getItem('rol_id_rol').then(id => {
      this.rol_id_rol = id;// Cargar datos del usuario
    }).catch(err => {
      console.error('Error obteniendo rol_id_rol:', err);
    });

    this.listarCarreras();
  }


  listarCarreras() {
    this.bd.fetchCarreras().subscribe(carreras => {
      this.carreras = carreras; // Almacenar las carreras obtenidas
    });
  }
  guardarCambios() {
    const email = this.usuario.email.trim();
    const telefono = parseInt(this.usuario.telefono, 8);
    let formValid = true;

    // Limpiar mensajes de error antes de validar
    this.errorCarrera = '';
    this.errorTelefono = '';
    this.errorCorreo = '';
    this.errorContrasena = '';
    this.errorMessage = '';

    // Validar que se haya seleccionado una carrera
    if (!this.usuario.id_carrera) {
      this.errorCarrera = 'Por favor, seleccione una carrera.';
      formValid = false;
      return;
    }

    // Validar que el correo sea válido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.errorCorreo = 'El correo electrónico no es válido.';
      formValid = false;
      return;
    }

    if (formValid) {
      // Comprobar si el email ya está registrado
      this.bd.verificarEmail(email).then((usuarioEncontrado) => {
        if (usuarioEncontrado) {
          this.errorCorreo = 'El Correo electrónico ya está registrado en la base de datos';
          formValid = false;
        } else {
          // Si el formulario es válido, modificar la información
          if (formValid) {
            this.bd.modificarInformacion(
              this.arregloUsuario.id_usuario,
              this.usuario.id_carrera, // Cambia aquí
              email,
              telefono
            ).then(() => {
              this.bd.presentToast('bottom', 'Se han modificado correctamente.');
              this.router.navigate(['/home']);
            }).catch(err => {
              this.bd.presentAlert('Error al modificar la información:', err);
              this.bd.presentToast('bottom', 'Ocurrió un error al modificar la información.');
            });
          }
        }
      });
    }
  }

  // Método para guardar la nueva contraseña
  guardarContrasena() {
    const contrasena = this.usuario.contrasenaActual.trim();
    const nuevaContrasena = this.usuario.nuevaContrasena.trim();
    const renuevaContrasena = this.usuario.renuevaContrasena.trim();

    // Validar si la contraseña actual es correcta
    if (contrasena !== this.arregloUsuario.contrasena) {
      this.errorContrasenaBD = 'La contraseña no es correcta';
      return; // Detiene la ejecución de la función si la contraseña no es correcta
    }

    // Validar que las nuevas contraseñas coincidan
    if (nuevaContrasena !== renuevaContrasena) {
      this.bd.presentToast('bottom', 'Las contraseñas no coinciden.');
      return; // Detiene la ejecución si las contraseñas no coinciden
    }

    // Validar que la nueva contraseña cumpla con las reglas
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(nuevaContrasena)) {
      this.errorContrasena = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.';
      return; // Detiene la ejecución si la contraseña no cumple con las reglas
    }
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(renuevaContrasena)) {
      this.errorContrasena = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.';
    }

    // Si todo está correcto, actualiza la contraseña
    this.bd.modificarContra(this.arregloUsuario.id_usuario, nuevaContrasena).then(() => {
      this.bd.presentToast('bottom', 'Contraseña actualizada correctamente.');
      this.router.navigate(['/home']);
    }).catch(error => {
      console.error('Error al cambiar la contraseña:', error);
      this.bd.presentToast('bottom', 'Ocurrió un error al cambiar la contraseña.');
    });

  }


  cerrarSesion() {
    this.bd.presentToast('bottom', 'Sesión cerrada.');
    this.router.navigate(['/login']);
  }

}

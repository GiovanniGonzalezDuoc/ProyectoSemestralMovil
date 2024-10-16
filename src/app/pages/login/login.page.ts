import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  emailsolicitado: string = "";
  contrasenasolicitada: string = "";

  constructor(
    private router: Router,
    private bd: ServicebdService,
    private storage: NativeStorage,
  ) { }

  ngOnInit() { }

  // Método de login
  login() {
    const email = this.emailsolicitado.trim();
    const contrasena = this.contrasenasolicitada.trim();

    if (email && contrasena) {
      // Verificar si el email y la contraseña existen en la base de datos
      this.bd.recopilarDatos(email, contrasena).then((usuarioEncontrado) => {
        if (usuarioEncontrado) {
          // Verificar si el usuario está baneado
          this.bd.verificarBaneo(usuarioEncontrado.id_usuario).then(baneo => {
            if (baneo) {
              const tiempoRestante = baneo.tiempoRestante; // Obtener el tiempo restante
              const motivo = baneo.motivo; // Obtener el motivo

              // Mostrar mensaje de error con motivo y tiempo restante
              this.bd.presentAlert('Baneo Activo', `Estás baneado. Motivo: ${motivo}. Te queda: ${tiempoRestante} horas.`);
            } else {
              // Si no está baneado, procede a almacenar la información del usuario
              this.storage.setItem('id_usuario', usuarioEncontrado.id_usuario);
              this.storage.setItem('nombre_usuario', usuarioEncontrado.nombre_usuario);
              this.storage.setItem('apellido_usuario', usuarioEncontrado.apellido_usuario);
              this.storage.setItem('rol_id_rol', usuarioEncontrado.rol_id_rol);
              this.storage.setItem('correo_usuario', usuarioEncontrado.correo_usuario);

              // Redirigir al usuario a la página de inicio
              this.router.navigate(['/home']);
              this.bd.presentToast('bottom', 'El Usuario Se Ingresó Correctamente');
            }
          }).catch(err => {
            // Manejo de errores de la consulta de baneo
            console.error('Error al verificar baneo:', err);
            this.bd.presentAlert('Error', 'Ocurrió un error al verificar el estado de baneo.');
          });
        } else {
          this.bd.presentAlert('Error', 'Usuario no encontrado.');
        }
      }).catch(err => {
        // Manejo de errores de la consulta
        this.bd.presentAlert('Error', 'Ocurrió un error al verificar el usuario');
        console.error(err);
      });
    } else {
      this.bd.presentAlert('Campos Vacíos', 'Por favor complete todos los campos.');
    }
  }
}

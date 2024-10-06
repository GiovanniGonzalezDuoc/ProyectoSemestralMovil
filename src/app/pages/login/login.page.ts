import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  emailsolicitado: string = "";
  contrasenasolicitada: string = "";



  constructor(private router: Router, private bd: ServicebdService) {
  }

  ngOnInit() {
  }

  login() {
    const email = this.emailsolicitado.trim();
    const contrasena = this.contrasenasolicitada.trim();

    if (email && contrasena) {
      // Verificar si el email y la contraseña existen en la base de datos
      this.bd.verificarUsuario(email, contrasena).then((usuarioEncontrado) => {
        if (usuarioEncontrado) {
          // Si el usuario fue encontrado, redirigir a la página de inicio
          this.router.navigate(['/home']);
          this.bd.presentToast('bottom', 'Usuario Ingresado Correctamente');
        } else {
          // Mostrar una alerta de error si el usuario no es encontrado
          this.bd.presentAlert(
            'Email o Contraseña Incorrecta',
            'Por favor ingrese un Email o Contraseña válidos'
          );
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

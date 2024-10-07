import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserIDService } from 'src/app/services/user-id.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  emailsolicitado: string = "";
  contrasenasolicitada: string = "";
  
  constructor(private router: Router, private bd: ServicebdService, private userService: UserIDService) { }

  ngOnInit() { }

  login() {
    const email = this.emailsolicitado.trim();
    const contrasena = this.contrasenasolicitada.trim();
  
    if (email && contrasena) {
      // Verificar el usuario en la base de datos
      this.bd.verificarUsuario(email, contrasena).then((usuarioEncontrado) => {
        if (usuarioEncontrado) {
          // Si el usuario es encontrado, obtenemos su información con la función `verificarInformacionUsuario`
          this.bd.verificarInformacionUsuario(email).then((userData) => {
            if (userData) {
              // Almacenar la información del usuario en el servicio
              this.userService.setUserId(userData.idUsuario);
              this.userService.setUserName(userData.nombreUsuario);
              this.userService.setUserLastName(userData.apellidoUsuario);
              
              // Redirigir a la página de inicio
              this.router.navigate(['/home']);
              this.bd.presentToast('bottom', 'Usuario Ingresado Correctamente');
            } else {
              // Si no se encontró el usuario
              this.bd.presentAlert('Error', 'No se encontró información del usuario.');
            }
          }).catch(err => {
            this.bd.presentAlert('Error', 'Ocurrió un error al obtener la información del usuario.');
            console.error(err);
          });
        } else {
          this.bd.presentAlert('Email o Contraseña Incorrecta', 'Por favor ingrese un Email o Contraseña válidos.');
        }
      }).catch(err => {
        this.bd.presentAlert('Error', 'Ocurrió un error al verificar el usuario.');
        console.error(err);
      });
    } else {
      this.bd.presentAlert('Campos Vacíos', 'Por favor complete todos los campos.');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-nueva-contrasena',
  templateUrl: './nueva-contrasena.page.html',
  styleUrls: ['./nueva-contrasena.page.scss'],
})
export class NuevaContrasenaPage implements OnInit {

  contrasenasolicitado: string = "";
  recontrasenasolicitada: string = "";
  emailsolicitado: string = "";

  constructor(private router: Router, private bd: ServicebdService, private activedrouter: ActivatedRoute) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.emailsolicitado = this.router.getCurrentNavigation()?.extras?.state?.['email'];
      }
    });
  }

  ngOnInit() { }

  async Contrasena() {
    const contrasena = this.contrasenasolicitado.trim();
    const recontrasena = this.recontrasenasolicitada.trim();

    // Validaciones de la contraseña
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(contrasena)) {
      this.bd.presentAlert('La Contraseña No Cumple Con Las Reglas', 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.');
      return;
    }

    if (contrasena !== recontrasena) {
      this.bd.presentAlert('Error En Las Contraseñas', 'Las contraseñas ingresadas no son iguales.');
      return;
    }

    try {
      // Modificar la contraseña en la base de datos
      await this.bd.modificarContrasena(this.emailsolicitado, contrasena); // Cambié el orden de los parámetros
      this.bd.presentToast('bottom', 'Se ha cambiado correctamente la contraseña del usuario');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al modificar la contraseña:', error);
      this.bd.presentAlert('Error', 'No se pudo cambiar la contraseña.');
    }
  }
}

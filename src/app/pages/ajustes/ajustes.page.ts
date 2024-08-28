import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  usuario = {
    email: '',
    carrera:'',
    telefono:'',
    contrasenaActual: '',
    nuevaContrasena: '',
  };

  constructor(private router: Router) {}

  ngOnInit() {
  }

  guardarCambios() {
    // Lógica para guardar los cambios del usuario
    console.log('Cambios guardados', this.usuario);
  }

  cerrarSesion() {
    // Lógica para cerrar sesión
    console.log('Sesión cerrada');
    this.router.navigate(['/login']);
  }
}

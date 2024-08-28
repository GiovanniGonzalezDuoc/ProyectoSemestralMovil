import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario: any = {
    nombre: '',
    apellido: '',
    carrera: '',
    telefono: '',
    email: '',
    contrasena: '',
  };

  constructor(private router: Router, private alertcontroller: AlertController, private toastcontroller: ToastController) {}

  ngOnInit() {}

  registro() {
    // Parsear teléfono a número
    const telefono = parseInt(this.usuario.telefono, 10);

    // Limpiar contraseña de caracteres innecesarios (en este caso, solo quitar espacios)
    const contrasena = this.usuario.contrasena.trim();

    // Validar nombre (no debe contener números)
    if (/\d/.test(this.usuario.nombre)) {
      this.presentAlert('El Nombre No Cumple Con Las Reglas', 'El nombre no puede contener números.');
      return;
    }

    // Validar apellido (no debe contener números)
    if (/\d/.test(this.usuario.apellido)) {
      this.presentAlert('El Apellido No Cumple Con Las Reglas', 'El apellido no puede contener números.');
      return;
    }

    // Validar carrera (no debe contener guiones, signos ni números)
    if (/[^a-zA-Z\s]/.test(this.usuario.carrera)) {
      this.presentAlert('La Carrera No Cumple Con Las Reglas', 'La carrera no puede contener números, guiones o signos.');
      return;
    }

    // Validar número de teléfono (solo números, máximo 8 caracteres)
    if (!/^\d{8}$/.test(telefono.toString())) {
      this.presentAlert('El Teléfono No Cumple Con Las Reglas', 'El número de teléfono debe tener exactamente 8 dígitos.');
      return;
    }

    // Validar email (debe contener @ y no debe tener espacios)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.usuario.email)) {
      this.presentAlert('El Correo No Cumple Con Las Reglas', 'El correo electrónico no es válido.');
      return;
    }

    // Validar contraseña (mínimo 8 caracteres, al menos una mayúscula y un carácter especial)
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(contrasena)) {
      this.presentAlert('La Contraseña No Cumple Con Las Reglas', 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.');
      return;
    }

    // Si todas las validaciones pasan, proceder a la navegación
    let navigationExtras: NavigationExtras = {
      state: {
        nom: this.usuario.nombre,
        apell: this.usuario.apellido,
        carr: this.usuario.carrera,
        tel: this.usuario.telefono,
        ema: this.usuario.email,
        contra: this.usuario.contrasena,
      }
    };

    this.router.navigate(['/login'], navigationExtras);

    // Mostrar mensaje de éxito
    this.presentToast('bottom');
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertcontroller.create({
      header: titulo,
      message: msj,
      buttons: ['ok'],
    });

    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') { //posición
    const toast = await this.toastcontroller.create({
      message: 'Usuario Registrado Correctamente',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}

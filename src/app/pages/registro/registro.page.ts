import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

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

  constructor(private router: Router, private alertcontroller: AlertController, private toastcontroller: ToastController,private bd:ServicebdService) {}

  ngOnInit() {}

  registro() {
    
    const telefono = parseInt(this.usuario.telefono, 10);

    
    const contrasena = this.usuario.contrasena.trim();

    
    if (/\d/.test(this.usuario.nombre)) {
      this.presentAlert('El Nombre No Cumple Con Las Reglas', 'El nombre no puede contener números.');
      return;
    }

    
    if (/\d/.test(this.usuario.apellido)) {
      this.presentAlert('El Apellido No Cumple Con Las Reglas', 'El apellido no puede contener números.');
      return;
    }

    
    if (/[^a-zA-Z\s]/.test(this.usuario.carrera)) {
      this.presentAlert('La Carrera No Cumple Con Las Reglas', 'La carrera no puede contener números, guiones o signos.');
      return;
    }

    
    if (!/^\d{8}$/.test(telefono.toString())) {
      this.presentAlert('El Teléfono No Cumple Con Las Reglas', 'El número de teléfono debe tener exactamente 8 dígitos.');
      return;
    }

    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.usuario.email)) {
      this.presentAlert('El Correo No Cumple Con Las Reglas', 'El correo electrónico no es válido.');
      return;
    }

    
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(contrasena)) {
      this.presentAlert('La Contraseña No Cumple Con Las Reglas', 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.');
      return;
    }

    
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

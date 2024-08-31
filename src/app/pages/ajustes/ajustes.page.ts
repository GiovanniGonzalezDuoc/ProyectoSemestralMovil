import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

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
    renuevaContrasena:'',
  };

  constructor(private router: Router, private alertcontroller: AlertController, private toastcontroller: ToastController) {}

  ngOnInit() {
  }

  guardarCambios() {
    
    const telefono = parseInt(this.usuario.telefono, 10);
    
    if (!/^\d{8}$/.test(telefono.toString())) {
      this.presentAlert('El Teléfono No Cumple Con Las Reglas', 'El número de teléfono debe tener exactamente 8 dígitos.');
      this.usuario.telefono='';
      return;
    }
    if (/[^a-zA-Z\s]/.test(this.usuario.carrera)) {
      this.presentAlert('La Carrera No Cumple Con Las Reglas', 'La carrera no puede contener números, guiones o signos.');
      this.usuario.carrera='';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.usuario.email)) {
      this.presentAlert('El Correo No Cumple Con Las Reglas', 'El correo electrónico no es válido.');
      this.usuario.email='';
      return;
    }

    this.router.navigate(['/home'])
    this.presentToast('bottom','Cambios Realizado Correctamente.')

  }
  guardarContrasena(){
    
    const contrasena = this.usuario.contrasenaActual.trim();
    const nuevacontrasena = this.usuario.nuevaContrasena.trim();
    const renuevacontrasena = this.usuario.renuevaContrasena.trim();

    if (contrasena==='1234'){
      this.presentAlert('La Contraseña No Cumple Con Las Reglas', 'Error En La Contraseña.');
      this.usuario.contrasenaActual=''
      return;
    }else if (nuevacontrasena!=renuevacontrasena){
      this.presentAlert('La Contraseña No Cumple Con Las Reglas', 'Las Contraseñas Ingresadas No Son Iguales.');
      this.usuario.nuevaContrasena=''
      this.usuario.renuevaContrasena=''
      return;
    }

    this.usuario.email='';
    this.usuario.carrera='';
    this.usuario.telefono='';
    this.usuario.contrasenaActual='';
    this.usuario.nuevaContrasena='';
    this.usuario.renuevaContrasena='';

    this.router.navigate(['/home'])
    this.presentToast('bottom','Cambios Realizados Correctamente.')
  }

  cerrarSesion() {
    
    this.presentToast('bottom','Sesión Cerrada.');
    this.router.navigate(['/login']);
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertcontroller.create({
      header: titulo,
      message: msj,
      buttons: ['ok'],
    });

    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom',text:string) { //posición
    const toast = await this.toastcontroller.create({
      message: text,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}

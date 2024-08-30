import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-nueva-contrasena',
  templateUrl: './nueva-contrasena.page.html',
  styleUrls: ['./nueva-contrasena.page.scss'],
})
export class NuevaContrasenaPage implements OnInit {

  contrasenasolicitado:string="";
  recontrasenasolicitada:string="";
  emailsolicitado:string= "";
  
  constructor(private router:Router, private activedroute:ActivatedRoute,private alertController:AlertController,private toastcontroller:ToastController) { }

  ngOnInit() {
  }
  Contrasena(){
    const contrasena = this.contrasenasolicitado.trim();
    const recontrasena = this.recontrasenasolicitada.trim();
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(contrasena)) {
      this.presentAlert('La Contraseña No Cumple Con Las Reglas', 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.');
      return;
    }
    if (contrasena!=recontrasena){
      this.presentAlert('Error En Las Contraseñas', 'La contraseña Ingresadas No Son Iguales.');
      return;
    }

    this.router.navigate(['/admin/home']);
    this.presentToast('bottom','Se Le Ha Cambiado Correctamente La Contraseña Al Usuario')
    

  }
  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
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

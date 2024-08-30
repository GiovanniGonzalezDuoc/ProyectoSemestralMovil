import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-verificacion-email',
  templateUrl: './verificacion-email.page.html',
  styleUrls: ['./verificacion-email.page.scss'],
})
export class VerificacionEmailPage implements OnInit {

  emailsolicitado:string= "";

  constructor(private router:Router, private activedroute:ActivatedRoute,private alertController:AlertController,private toastcontroller:ToastController) { }

  ngOnInit() {
  }
  Email(){
    if (this.emailsolicitado==="1234@gmail.com"){
      this.presentAlert('Error En El Correo','El Correo No Existe En La Base De Datos.')
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.emailsolicitado)) {
      this.presentAlert('El Correo No Cumple Con Las Reglas', 'El correo electrónico no es válido.');
      return;
    }

    this.router.navigate(['/nueva-contrasena']);
    this.presentToast('bottom','Revise su correo Electronico.')
    

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

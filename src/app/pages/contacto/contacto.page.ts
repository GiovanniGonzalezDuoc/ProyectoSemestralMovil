import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  emailsolicitado:string="";
  mensaje:string="";
  constructor(private router:Router, private activedroute:ActivatedRoute,private alertController:AlertController,private toastcontroller:ToastController) { }

  ngOnInit() {
  }

  Contacto(){
    this.router.navigate(['/home']);
    this.presentToast('bottom','Se Envio Correctamente El Mensaje Al Administrador.')
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

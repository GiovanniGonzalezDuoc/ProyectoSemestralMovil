import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {

  Titulo:string = "";
  Categoria:string= "";
  Contenido:string= "";

  constructor(private router:Router,private toastcontroller:ToastController, private alertController:AlertController) { }

  ngOnInit() {
  }

  publicar() {
    if (this.Titulo==="" && this.Categoria==="" && this.Contenido===""){
      this.presentAlert("La Publicación esta incompleta.","Favor Rellenar Todos Los Campos De La Publicacion")
    }
    this.presentToast('bottom')
    this.router.navigate(['/home'])
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['ok'],
    });

    await alert.present();
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') { //posición
    const toast = await this.toastcontroller.create({
      message: 'Su Publicación Se Mando Correctamente',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}

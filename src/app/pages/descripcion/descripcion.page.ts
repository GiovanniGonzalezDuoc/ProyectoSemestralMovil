import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.page.html',
  styleUrls: ['./descripcion.page.scss'],
})
export class DescripcionPage implements OnInit {

  Perfiles:any = [
    {
      id:1,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Juan El Ganador",
      horas:25,
      titulo:"Aguante Brasil",
      mensaje:"Cristiano Ronaldo Mejor Campeon Do Fochibole",
      like:25,
      comentarios:10
   },
    {
      id:2,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Juan El Ganador",
      horas:25,
      titulo:"Aguante Brasil",
      mensaje:"Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final. Aunque no posee actualmente fuentes para justificar sus hipótesis, el profesor de filología clásica Richard McClintock asegura que su uso se remonta a los impresores de comienzos del siglo XVI. Su uso en algunos editores de texto muy conocidos en la actualidad ha dado al texto lorem ipsum nueva popularidad.",
      like:25,
      comentarios:10
    },
    {
      id:3,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Juan El Ganador",
      horas:25,
      titulo:"Aguante Brasil",
      mensaje:"Cristiano Ronaldo Mejor Campeon Do Fochibole",
      like:25,
      comentarios:10
    },
    {
      id:4,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Juan El Ganador",
      horas:25,
      titulo:"Aguante Brasil",
      mensaje:"Cristiano Ronaldo Mejor Campeon Do Fochibole",
      like:25,
      comentarios:10
    },
  ]
  comentarios:any=[
    {
      id:1,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Juan El Ganador",
      horas:25,
      mensajecomentario:"Cristiano Mejor Domundo"
    },
    {
      id:2,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Juan El Ganador",
      horas:25,
      mensajecomentario:"Cristiano Mejor Domundo"
    },
    {
      id:3,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Juan El Ganador",
      horas:25,
      mensajecomentario:"Cristiano Mejor Domundo"
    },
    {
      id:4,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Juan El Ganador",
      horas:25,
      mensajecomentario:"Cristiano Mejor Domundo"
    },
  ]
  likes:number = 25;
  coment:number = 10;

  nuevoComentario: string = '';
  isPopoverOpen = false;
  selectedOption!: string;
  
  constructor(private router:Router,private popoverController:PopoverController, private alertController:AlertController,private toastcontroller:ToastController) {
  }
  
  ngOnInit() {
  }
  
  agregarComentario() {
    if (this.nuevoComentario.trim()) {
      this.Perfiles.mensajescomentarios.push(this.nuevoComentario);
      this.nuevoComentario = '';
    }
  }

  openPopover(ev: any) {
    this.isPopoverOpen = true;
  }

  closePopover() {
    this.isPopoverOpen = false;
  }

  handleOption(option: string) {
    // Cerrar el popover
    this.closePopover();
  
    // Realizar la acción después de cerrar el popover
    setTimeout(() => {
      if (option === 'option1') {
        this.presentToast('bottom', 'El Post Se Elimino Correctamente.');
        this.router.navigate(['/home']);
      }else if (option ==='option2'){
        this.presentToast('bottom', 'Se Ha Seguido Correctamente Al Usuario.');
        this.router.navigate(['/home']);
      }
    }, 0); // Aquí el tiempo de espera es 0 para que se ejecute lo antes posible
  }
  like(){
    this.presentToast('bottom', 'Se Dio Like Correctamente.');
  }
  comentario(){
    this.router.navigate(['/descripcion'])
  }
  guardar(){
    this.presentToast('bottom', 'El Post Se Guardo Correctamente.');
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

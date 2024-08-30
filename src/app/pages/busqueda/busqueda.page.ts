import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {

  searchQuery:string = 'Tecnologia';

  Perfiles:any = [
    {
      id:1,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Juan El Ganador",
      horas:25,
      titulo:"Aguante Brasil",
      mensaje:"Cristiano Ronaldo Mejor Campeon Do Fochibole",
      like:25,
      comentarios:10,
   },
    {
      id:2,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Juan El Ganador",
      horas:25,
      titulo:"Aguante Brasil",
      mensaje:"Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final. Aunque no posee actualmente fuentes para justificar sus hipótesis, el profesor de filología clásica Richard McClintock asegura que su uso se remonta a los impresores de comienzos del siglo XVI. Su uso en algunos editores de texto muy conocidos en la actualidad ha dado al texto lorem ipsum nueva popularidad.",
      like:25,
      comentarios:10,
    },
    {
      id:3,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Juan El Ganador",
      horas:25,
      titulo:"Aguante Brasil",
      mensaje:"Cristiano Ronaldo Mejor Campeon Do Fochibole",
      like:25,
      comentarios:10,
    },
    {
      id:4,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Juan El Ganador",
      horas:25,
      titulo:"Aguante Brasil",
      mensaje:"Cristiano Ronaldo Mejor Campeon Do Fochibole",
      like:25,
      comentarios:10,
    },
  ]

  constructor(private router:Router,private toastcontroller:ToastController) {}

  ngOnInit() {
  }
  
  comentario(){
    this.router.navigate(['/descripcion'])
  }
  guardar(){
    this.presentToast('bottom', 'El Post Se Guardo Correctamente.');
  }
  like(){
    this.presentToast('bottom', 'Se Dio Like Correctamente.');
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

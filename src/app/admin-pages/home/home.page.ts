import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
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

  constructor() { }

  ngOnInit() {
  }

}

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
      nombreperfil:"Juan",
      horas:25,
      titulo:"Importancia de la informatica",
      mensaje:"Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final. Aunque no posee actualmente fuentes para justificar sus hipótesis, el profesor de filología clásica Richard McClintock asegura que su uso se remonta a los impresores de comienzos del siglo XVI. Su uso en algunos editores de texto muy conocidos en la actualidad ha dado al texto lorem ipsum nueva popularidad.",
      like:25,
      comentarios:10,
   },
    {
      id:2,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Sergio",
      horas:25,
      titulo:"Lenguaje",
      mensaje:"Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final. Aunque no posee actualmente fuentes para justificar sus hipótesis, el profesor de filología clásica Richard McClintock asegura que su uso se remonta a los impresores de comienzos del siglo XVI. Su uso en algunos editores de texto muy conocidos en la actualidad ha dado al texto lorem ipsum nueva popularidad.",
      like:25,
      comentarios:10,
    },
    {
      id:3,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Pedrito",
      horas:25,
      titulo:"Matematicas",
      mensaje:"El Caso de matematicas es demasiado dificil quien me ayuda.",
      like:25,
      comentarios:10,
    },
    {
      id:4,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Sebastian",
      horas:25,
      titulo:"Base De Datos",
      mensaje:"Cabros ayuden que me estoy hechando base de datos.",
      like:25,
      comentarios:10,
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}

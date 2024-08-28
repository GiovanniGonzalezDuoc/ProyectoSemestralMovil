import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  Perfiles: any = [
    {
      id: 1,
      foto: "assets/icon/favicon.png",
      nombreperfil: "Juan El Ganador",
      seguidores: 25,
      seguidos: 300,
      like: 25,
      comentarios: 10,
    }
  ]
  Publicaciones: any = [
    {
      id: 1,
      foto: "assets/icon/favicon.png",
      nombreperfil: "Juan El Ganador",
      titulo: "asdasda",
      contenido: "asdasdasd",
    },
    {
      id: 2,
      foto: "assets/icon/favicon.png",
      nombreperfil: "Juan El Ganador",
      titulo: "asdasda",
      contenido: "asdasdasd",
    },
    {
      id: 3,
      foto: "assets/icon/favicon.png",
      nombreperfil: "Juan El Ganador",
      titulo: "asdasda",
      contenido: "asdasdasd",
    },
    {
      id: 4,
      foto: "assets/icon/favicon.png",
      nombreperfil: "Juan El Ganador",
      titulo: "asdasda",
      contenido: "asdasdasd",
    },
    {
      id: 5,
      foto: "assets/icon/favicon.png",
      nombreperfil: "Juan El Ganador",
      titulo: "asdasda",
      contenido: "asdasdasd",
    },

  ]

  constructor() { }

  ngOnInit() {
  }

}

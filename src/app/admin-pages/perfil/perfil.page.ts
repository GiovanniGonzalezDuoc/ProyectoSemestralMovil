import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      nombreperfil: "Pedro",
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
      nombreperfil: "Pedro",
      horas:25,
      titulo: "Base De Datos",
      contenido: "Necesito ayuda con este problema.",
    },
    {
      id: 2,
      foto: "assets/icon/favicon.png",
      nombreperfil: "Pedro",
      horas:25,
      titulo: "Ingenieria de software",
      contenido: "Necesito ayuda con este problema.",
    },
    {
      id: 3,
      foto: "assets/icon/favicon.png",
      nombreperfil: "Pedro",
      horas:25,
      titulo: "Arquitectura",
      contenido: "Necesito ayuda con este problema.",
    },
    {
      id: 4,
      foto: "assets/icon/favicon.png",
      nombreperfil: "Pedro",
      horas:25,
      titulo: "Religion",
      contenido: "Necesito ayuda con este problema.",
    },
    {
      id: 5,
      foto: "assets/icon/favicon.png",
      nombreperfil: "Pedro",
      horas:25,
      titulo: "Estadistica",
      contenido: "Necesito ayuda con este problema.",
    },

  ]
  constructor(private router:Router) { }

  ngOnInit() {
  }

  openSettings(){
    this.router.navigate(['/ajustes']);
  }

}

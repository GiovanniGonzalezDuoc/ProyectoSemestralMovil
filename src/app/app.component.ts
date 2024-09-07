import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  Perfiles:any = [
    {
      id:1,
      foto:"assets/icon/favicon.png",
      nombreperfil:"Pedro",
      horas:25,
      titulo:"Aguante Brasil",
      mensaje:"Cristiano Ronaldo Mejor Campeon Do Fochibole",
      like:25,
      comentarios:10,
   }
  ];
  personasSiguiendo = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María García' },
    { id: 3, nombre: 'Carlos Sánchez' }
  ];

  categorias = [
    { id: 1, nombre: 'Tecnología', foto:"https://i.postimg.cc/VNxfr1Jm/desktop-computer-icon-vector.jpg" },
    { id: 2, nombre: 'Ciencia', foto:"https://i.postimg.cc/hjVSVwmx/dynamic-atom-molecule-science-symbol-vector-icon.jpg"},
    { id: 3, nombre: 'Arte' , foto:"https://i.postimg.cc/jjwqSCdM/1987925.png"}
  ];
  constructor() {}
}

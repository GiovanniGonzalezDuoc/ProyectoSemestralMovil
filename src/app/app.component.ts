import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  personasSiguiendo = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María García' },
    { id: 3, nombre: 'Carlos Sánchez' }
    // Agrega más personas según sea necesario
  ];

  categorias = [
    { id: 1, nombre: 'Tecnología' },
    { id: 2, nombre: 'Ciencia' },
    { id: 3, nombre: 'Arte' }
    // Agrega más categorías según sea necesario
  ];
  constructor() {}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-carreras',
  templateUrl: './modificar-carreras.page.html',
  styleUrls: ['./modificar-carreras.page.scss'],
})
export class ModificarCarrerasPage implements OnInit {

  carrera: any = {}; // Inicializar carrera como un objeto vacío para evitar errores al acceder a propiedades

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        // Si se pasa un objeto 'carrera' a través del estado de navegación, se asigna a 'this.carrera'
        this.carrera = this.router.getCurrentNavigation()?.extras?.state?.['carrera'] || {};
      }
    });
  }

  ngOnInit() {
    // Asegurarse de que 'this.carrera' contiene datos válidos si no se pasó a través del estado de navegación.
    if (!this.carrera.id_carrera) {
      // Si no hay un 'id_carrera' válido, mostrar un mensaje de alerta o manejar el error
      console.error('No se ha encontrado la carrera');
    }
  }

  modificar() {
    // Validar que 'this.carrera' tiene los valores necesarios antes de llamar al servicio
    if (this.carrera.id_carrera && this.carrera.nombre_carrera) {
      this.bd.modificarCarrera(this.carrera.id_carrera, this.carrera.nombre_carrera);
    } else {
      // Si falta algún valor, mostrar un mensaje de error
      console.error('Datos de carrera inválidos');
    }
  }
}

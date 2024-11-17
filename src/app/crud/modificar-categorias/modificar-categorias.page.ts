import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-categorias',
  templateUrl: './modificar-categorias.page.html',
  styleUrls: ['./modificar-categorias.page.scss'],
})
export class ModificarCategoriasPage implements OnInit {

  categoria: any = {}; // Inicializar categoria como un objeto vacío para evitar errores al acceder a propiedades

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        // Si se pasa un objeto 'categoria' a través del estado de navegación, se asigna a 'this.categoria'
        this.categoria = this.router.getCurrentNavigation()?.extras?.state?.['categoria'] || {};
      }
    });
  }

  ngOnInit() {
    // Asegurarse de que 'this.categoria' contiene datos válidos si no se pasó a través del estado de navegación.
    if (!this.categoria.id_categoria) {
      // Si no hay un 'id_categoria' válido, mostrar un mensaje de alerta o manejar el error
      console.error('No se ha encontrado la categoría');
    }
  }

  modificar() {
    // Validar que 'this.categoria' tiene los valores necesarios antes de llamar al servicio
    if (this.categoria.id_categoria && this.categoria.nombre_categoria) {
      this.bd.modificarCategoria(this.categoria.id_categoria, this.categoria.nombre_categoria);
    } else {
      // Si falta algún valor, mostrar un mensaje de error
      console.error('Datos de categoría inválidos');
    }
  }
}

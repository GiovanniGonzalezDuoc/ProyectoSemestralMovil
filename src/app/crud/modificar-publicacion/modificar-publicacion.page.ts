import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-publicacion',
  templateUrl: './modificar-publicacion.page.html',
  styleUrls: ['./modificar-publicacion.page.scss'],
})
export class ModificarPublicacionPage implements OnInit {

  publicacion: any = {};  // Inicializar como objeto vacío

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        // Asegúrate de que 'publicacion' no sea undefined ni null
        this.publicacion = this.router.getCurrentNavigation()?.extras?.state?.['publicacion'] || {};  // Valor por defecto
      }
    });
  }

  ngOnInit() {
    // Verifica si 'publicacion' tiene la propiedad 'id_publicacion'
    if (!this.publicacion || !this.publicacion.id_publicacion) {
      console.error('No se encontró la publicación o ID de publicación.');
    }
  }
  
  modificar() {
    if (this.publicacion && this.publicacion.id_publicacion) {
      this.bd.modificarPublicacion(this.publicacion.id_publicacion, this.publicacion.titulo_publicacion, this.publicacion.descripcion_publicacion);
    } else {
      console.error('No se puede modificar, faltan datos de la publicación.');
    }
  }
}

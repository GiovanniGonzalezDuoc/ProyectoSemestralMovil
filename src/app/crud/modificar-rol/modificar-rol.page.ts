import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-rol',
  templateUrl: './modificar-rol.page.html',
  styleUrls: ['./modificar-rol.page.scss'],
})
export class ModificarRolPage implements OnInit {

  rol: any = {};  // Inicializar como objeto vacío

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        // Asegúrate de que 'rol' no sea undefined ni null
        this.rol = this.router.getCurrentNavigation()?.extras?.state?.['rol'] || {};  // Valor por defecto
      }
    });
  }

  ngOnInit() {
    // Verifica si 'rol' tiene la propiedad 'id_rol'
    if (!this.rol || !this.rol.id_rol) {
      console.error('No se encontró el rol o ID del rol.');
    }
  }

  modificar() {
    if (this.rol && this.rol.id_rol) {
      this.bd.modificarRol(this.rol.id_rol, this.rol.nombre_rol);
    } else {
      console.error('No se puede modificar, faltan datos del rol.');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { ControlPublicacion } from 'src/app/models/control-publicacion';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-control-control-publicacion',
  templateUrl: './control-control-publicacion.page.html',
  styleUrls: ['./control-control-publicacion.page.scss'],
})
export class ControlControlPublicacionPage implements OnInit {
  
  arregloControl: ControlPublicacion[] = []; // Cambiado a ControlUsuario[]
  
  constructor(private bd: ServicebdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      if (data) {
        // Subscribir al observable de la lista de controles
        this.bd.fetchControlPublicaciones().subscribe(res => {
          this.arregloControl = res;
        });
      }
    });
  }

  modificar(x: ControlPublicacion) {
    let navigationsExtras: NavigationExtras = {
      state: {
        control: x
      }
    };
    this.router.navigate(['/crud/modificar-control-control-publicacion'], navigationsExtras);
  }

  eliminar(x: ControlPublicacion) {
    this.bd.eliminarControl(x.id_veto_publicacion); // Cambia esto según el ID correcto a eliminar
  }

  agregar() {
    this.router.navigate(['/crud/agregar-control-control-publicacion']);
  }
}

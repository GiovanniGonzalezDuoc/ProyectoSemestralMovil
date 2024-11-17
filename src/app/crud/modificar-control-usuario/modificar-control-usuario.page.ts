import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-control-usuario',
  templateUrl: './modificar-control-usuario.page.html',
  styleUrls: ['./modificar-control-usuario.page.scss'],
})
export class ModificarControlUsuarioPage implements OnInit {
  Control: any = {}; // Inicializa Control como un objeto vacío para evitar errores de undefined.
  nombreBaneado: string = ''; // Asegúrate de inicializar nombreBaneado

  constructor(
    private router: Router, 
    private activedrouter: ActivatedRoute, 
    private bd: ServicebdService
  ) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.Control = this.router.getCurrentNavigation()?.extras?.state?.['control'] || {}; // Verifica que Control no sea undefined
        // Verifica que 'Control' tenga las propiedades necesarias
        if (this.Control && this.Control.nombre_usuario && this.Control.apellido_usuario) {
          this.nombreBaneado = this.Control.nombre_usuario + ' ' + this.Control.apellido_usuario;
        }
      }
    });
  }

  ngOnInit() {
    // Verificamos que 'Control' y 'Control.tiempo_veto' no sean null o undefined
    if (this.Control && this.Control.tiempo_veto !== undefined) {
      this.nombreBaneado = this.Control.nombre_usuario + ' ' + this.Control.apellido_usuario;
    } else {
      this.nombreBaneado = ''; // O maneja el caso de error como prefieras
    }
  }

  modificar() {
    if (this.Control && this.Control.id_veto && this.Control.tiempo_veto && this.Control.motivo_veto && this.Control.usuario_id_usuario) {
      this.bd.modificarControl(this.Control.id_veto, this.Control.tiempo_veto, this.Control.motivo_veto, this.Control.usuario_id_usuario);
    } else {
      // Maneja el caso de error si alguna propiedad de Control falta
      console.error('Error: Faltan propiedades en Control');
    }
  }
}

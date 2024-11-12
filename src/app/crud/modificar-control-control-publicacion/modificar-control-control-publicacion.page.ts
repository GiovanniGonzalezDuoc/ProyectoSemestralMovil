import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-control-control-publicacion',
  templateUrl: './modificar-control-control-publicacion.page.html',
  styleUrls: ['./modificar-control-control-publicacion.page.scss'],
})
export class ModificarControlControlPublicacionPage implements OnInit {
  arregloPublicacion:any;
  Control: any;
  nombreBaneado!: string;

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.Control = this.router.getCurrentNavigation()?.extras?.state?.['control'];
      }
    })
    this.bd.fetchPublicacion().subscribe(res=>{
      this.arregloPublicacion = res.filter(publis => publis.id_publicacion === this.Control.publicacion_id_publicacion);
    })
  }

  ngOnInit() {
    // Verificamos que 'Control' y 'control' no sean null o undefined
    if (this.Control && this.Control) {
      this.nombreBaneado = this.arregloPublicacion.nombre_usuario_publicacion;
    } else {
      this.nombreBaneado = ''; // O maneja el caso de error como prefieras
    }
  }
  

  modificar() {
    //this.bd.presentAlert("Mod","ID: " + this.noticia.idnoticia)
    this.bd.modificarControlPublicacion(this.Control.id_veto_publicacion,this.Control.tiempo_veto_publicacion,this.Control.motivo_veto_publicacion,this.Control.publicacion_id_publicacion);
  }

}

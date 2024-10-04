import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-control-usuario',
  templateUrl: './modificar-control-usuario.page.html',
  styleUrls: ['./modificar-control-usuario.page.scss'],
})
export class ModificarControlUsuarioPage implements OnInit {
  Control: any;

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.Control = this.router.getCurrentNavigation()?.extras?.state?.['control'];
      }
    })
  }

  ngOnInit() {
  }

  modificar() {
    //this.bd.presentAlert("Mod","ID: " + this.noticia.idnoticia)
    this.bd.modificarControl(this.Control.id_veto,this.Control.tiempo_veto,this.Control.motivo_veto,this.Control.usuario_id_usuario);
  }

}

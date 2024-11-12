import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-control-comentarios',
  templateUrl: './modificar-control-comentarios.page.html',
  styleUrls: ['./modificar-control-comentarios.page.scss'],
})
export class ModificarControlComentariosPage implements OnInit {
  arregloComentarios:any;
  Control: any;
  nombreBaneado!: string;

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.Control = this.router.getCurrentNavigation()?.extras?.state?.['control'];
      }
    })
    this.bd.fetchComentarios().subscribe(res => {
      this.arregloComentarios = res.filter(comentario => 
        comentario.id_comentario === this.Control.comentario_id_comentario
      );
    });
  }

  ngOnInit() {
      if (this.arregloComentarios.length > 0) {
        const comentarioSeleccionado = this.arregloComentarios[0];
        this.nombreBaneado = comentarioSeleccionado.nombre_usuario_comentario;
      } else {
        console.error('Comentario no encontrado con el ID proporcionado');
      }
  }
  

  modificar() {
    //this.bd.presentAlert("Mod","ID: " + this.noticia.idnoticia)
    this.bd.modificarControlComentarios(this.Control.id_veto_comentario,this.Control.tiempo_veto_comentario,this.Control.motivo_veto_comentario,this.Control.comentario_id_comentario);
  }

}

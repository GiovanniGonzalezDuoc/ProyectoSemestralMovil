import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-publicacion',
  templateUrl: './modificar-publicacion.page.html',
  styleUrls: ['./modificar-publicacion.page.scss'],
})
export class ModificarPublicacionPage implements OnInit {

  publicacion: any;

  constructor(private router:Router,private activedrouter:ActivatedRoute, private bd:ServicebdService) {
    this.activedrouter.queryParams.subscribe(res=>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.publicacion = this.router.getCurrentNavigation()?.extras?.state?.['publicacion'];
      }
    })
  }

  ngOnInit() {
  }
  
  modificar(){
    //this.bd.presentAlert("Mod","ID: " + this.noticia.idnoticia)
    this.bd.modificarPublicacion(this.publicacion.id_publicacion,this.publicacion.titulo_publicacion,this.publicacion.descripcion_publicacion);
  }

}

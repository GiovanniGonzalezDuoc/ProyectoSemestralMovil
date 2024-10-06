import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-categorias',
  templateUrl: './modificar-categorias.page.html',
  styleUrls: ['./modificar-categorias.page.scss'],
})
export class ModificarCategoriasPage implements OnInit {
  
  categoria: any;

  constructor(private router:Router,private activedrouter:ActivatedRoute, private bd:ServicebdService) {
    this.activedrouter.queryParams.subscribe(res=>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.categoria = this.router.getCurrentNavigation()?.extras?.state?.['categoria'];
      }
    })
  }

  ngOnInit() {
  }
  
  modificar(){
    //this.bd.presentAlert("Mod","ID: " + this.noticia.idnoticia)
    this.bd.modificarCategoria(this.categoria.id_categoria,this.categoria.nombre_categoria);
  }
}

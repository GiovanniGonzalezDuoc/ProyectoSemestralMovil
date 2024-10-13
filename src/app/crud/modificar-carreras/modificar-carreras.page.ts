import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-carreras',
  templateUrl: './modificar-carreras.page.html',
  styleUrls: ['./modificar-carreras.page.scss'],
})
export class ModificarCarrerasPage implements OnInit {

  carrera: any;

  constructor(private router:Router,private activedrouter:ActivatedRoute, private bd:ServicebdService) {
    this.activedrouter.queryParams.subscribe(res=>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.carrera = this.router.getCurrentNavigation()?.extras?.state?.['carrera'];
      }
    })
  }

  ngOnInit() {
  }
  
  modificar(){
    //this.bd.presentAlert("Mod","ID: " + this.noticia.idnoticia)
    this.bd.modificarCarrera(this.carrera.id_carrera,this.carrera.nombre_carrera);
  }

}

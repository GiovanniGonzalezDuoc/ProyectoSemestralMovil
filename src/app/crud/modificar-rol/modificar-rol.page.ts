import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-rol',
  templateUrl: './modificar-rol.page.html',
  styleUrls: ['./modificar-rol.page.scss'],
})
export class ModificarRolPage implements OnInit {

  rol: any;

  constructor(private router:Router,private activedrouter:ActivatedRoute, private bd:ServicebdService) {
    this.activedrouter.queryParams.subscribe(res=>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.rol = this.router.getCurrentNavigation()?.extras?.state?.['rol'];
      }
    })
  }

  ngOnInit() {
  }
  
  modificar(){
    //this.bd.presentAlert("Mod","ID: " + this.noticia.idnoticia)
    this.bd.modificarRol(this.rol.id_rol,this.rol.nombre_rol);
  }

}

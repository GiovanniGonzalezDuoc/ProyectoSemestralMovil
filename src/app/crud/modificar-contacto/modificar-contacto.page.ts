import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-contacto',
  templateUrl: './modificar-contacto.page.html',
  styleUrls: ['./modificar-contacto.page.scss'],
})
export class ModificarContactoPage implements OnInit {

  contacto: any;

  constructor(private router:Router,private activedrouter:ActivatedRoute, private bd:ServicebdService) {
    this.activedrouter.queryParams.subscribe(res=>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.contacto = this.router.getCurrentNavigation()?.extras?.state?.['contacto'];
      }
    })
  }

  ngOnInit() {
  }
  
  modificar(){
    //this.bd.presentAlert("Mod","ID: " + this.noticia.idnoticia)
    this.bd.modificarContacto(this.contacto.id_contacto,this.contacto.correo_usuario_contacto,this.contacto.mensaje_contacto);
  }
}

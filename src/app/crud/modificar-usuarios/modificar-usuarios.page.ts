import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-usuarios',
  templateUrl: './modificar-usuarios.page.html',
  styleUrls: ['./modificar-usuarios.page.scss'],
})
export class ModificarUsuariosPage implements OnInit {
  usuario:any;
  constructor(private router:Router,private activedrouter:ActivatedRoute, private bd:ServicebdService) {
    this.activedrouter.queryParams.subscribe(res=>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
      }
    })
  }

  ngOnInit() {
  }

  modificar(){
    //this.bd.presentAlert("Mod","ID: " + this.noticia.idnoticia)
    this.bd.modificarUsuario(this.usuario.id_usuario,this.usuario.nombre_usuario,this.usuario.apellido_usuario,this.usuario.carrera_usuario,this.usuario.telefono,this.usuario.correo_usuario,this.usuario.contrasena,this.usuario.rol_id_rol);
  }

}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  arregloUsuario: any = [
    { 
      id_usuario:'',
      nombre_usuario:'',
      apellido_usuario:'',
      carrera_usuario:'',
      telefono:'',
      correo_usuario:'',
      contrasena:'',
      rol_id_rol:'',
      control_usuario_id_veto:'',

    }
  ]
  constructor(private bd:ServicebdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data=>{
      //validar si la bd esta lista
      if(data){
        //subscribir al observable de la listaRoles
        this.bd.fetchUsuario().subscribe(res=>{
          this.arregloUsuario = res;
        })
      }
    })
  }

  modificar(x:any){
    let navigationsExtras: NavigationExtras ={
      state:{
        usuario: x
      }
    }
    this.router.navigate(['/crud/modificar-usuarios'],navigationsExtras);
  }
  eliminar(x:any){
    this.bd.eliminarUsuario(x.id_usuario);
  }

  agregar(){
    this.router.navigate(['/crud/agregar-usuarios']);
  }

}

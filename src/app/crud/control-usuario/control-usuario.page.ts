import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-control-usuario',
  templateUrl: './control-usuario.page.html',
  styleUrls: ['./control-usuario.page.scss'],
})
export class ControlUsuarioPage implements OnInit {

  arregloControl: any = [
    {
      id_veto: '',
      tiempo_veto: '',
      fecha_veto:'',
      motivo_veto:'',
      usuario_id_usuario:'',
    }
  ]
  constructor(private bd:ServicebdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data=>{
      //validar si la bd esta lista
      if(data){
        //subscribir al observable de la listaRoles
        this.bd.fetchControl().subscribe(res=>{
          this.arregloControl = res;
        })
      }
    })
  }

  modificar(x:any){
    let navigationsExtras: NavigationExtras ={
      state:{
        control: x
      }
    }
    this.router.navigate(['/crud/modificar-control-usuario'],navigationsExtras);
  }
  eliminar(x:any){
    this.bd.eliminarRol(x.id_rol);
  }

  agregar(){
    this.router.navigate(['/crud/agregar-control-usuario']);
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.page.html',
  styleUrls: ['./rol.page.scss'],
})
export class RolPage implements OnInit {

  arregloRol: any = [
    {
      id_rol: '',
      nombre_rol: '',
    }
  ]
  constructor(private bd:ServicebdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data=>{
      //validar si la bd esta lista
      if(data){
        //subscribir al observable de la listaRoles
        this.bd.fetchRol().subscribe(res=>{
          this.arregloRol = res;
        })
      }
    })
  }

  modificar(x:any){
    let navigationsExtras: NavigationExtras ={
      state:{
        rol: x
      }
    }
    this.router.navigate(['/crud/modificar-rol'],navigationsExtras);
  }
  eliminar(x:any){
    this.bd.eliminarRol(x.id_rol);
  }

  agregar(){
    this.router.navigate(['/crud/agregar-rol']);
  }
}

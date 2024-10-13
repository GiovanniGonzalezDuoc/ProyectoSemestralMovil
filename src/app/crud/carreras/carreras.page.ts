import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.page.html',
  styleUrls: ['./carreras.page.scss'],
})
export class CarrerasPage implements OnInit {
  
  arregloCarrera: any = [
    {
      id_carrera: '',
      nombre_carrera: '',
    }
  ]
  constructor(private bd:ServicebdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data=>{
      //validar si la bd esta lista
      if(data){
        //subscribir al observable de la listaRoles
        this.bd.fetchCarreras().subscribe(res=>{
          this.arregloCarrera = res;
        })
      }
    })
  }

  modificar(x:any){
    let navigationsExtras: NavigationExtras ={
      state:{
        carrera: x
      }
    }
    this.router.navigate(['/crud/modificar-carreras'],navigationsExtras);
  }
  eliminar(x:any){
    this.bd.eliminarRol(x.id_carrera);
  }

  agregar(){
    this.router.navigate(['/crud/agregar-carreras']);
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {

  arregloContacto: any = [
    {
      id_contacto: '',
      correo_usuario_contacto: '',
      mensaje_contacto: ''
    }
  ]
  constructor(private bd:ServicebdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data=>{
      //validar si la bd esta lista
      if(data){
        //subscribir al observable de la listaRoles
        this.bd.fetchContacto().subscribe(res=>{
          this.arregloContacto = res;
        })
      }
    })
  }

  modificar(x:any){
    let navigationsExtras: NavigationExtras ={
      state:{
        contacto: x
      }
    }
    this.router.navigate(['/crud/modificar-contacto'],navigationsExtras);
  }
  eliminar(x:any){
    this.bd.eliminarContacto(x.id_contacto);
  }

  agregar(){
    this.router.navigate(['/crud/agregar-contacto']);
  }
}

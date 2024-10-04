import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
})
export class PublicacionPage implements OnInit {
  arregloPublicacion: any = [
    {
      id_publicacion: '',
      nombre_usuario_publicacion: '',
      titulo_publicacion:'',
      descripcion_publicacion:'',
      like_publicacion:'',
      fecha_publicacion:'',
      usuario_id_usuario:'',
      categoria_publicacion_id_categoria:'',
    }
  ]

  constructor(private bd:ServicebdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data=>{
      //validar si la bd esta lista
      if(data){
        //subscribir al observable de la listaRoles
        this.bd.fetchPublicacion().subscribe(res=>{
          this.arregloPublicacion = res;
        })
      }
    })
  }

  modificar(x:any){
    let navigationsExtras: NavigationExtras ={
      state:{
        publicacion: x
      }
    }
    this.router.navigate(['/crud/modificar-publicacion'],navigationsExtras);
  }
  eliminar(x:any){
    this.bd.eliminarPublicacion(x.id_publicacion);
  }

  agregar(){
    this.router.navigate(['/crud/agregar-publicacion']);
  }
}

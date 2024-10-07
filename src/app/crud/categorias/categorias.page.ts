import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  arregloCategoria: any = [
    {
      id_categoria: '',
      nombre_categoria: '',
    }
  ]
  constructor(private bd:ServicebdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data=>{
      //validar si la bd esta lista
      if(data){
        //subscribir al observable de la listaRoles
        this.bd.fetchCategorias().subscribe(res=>{
          this.arregloCategoria = res;
        })
      }
    })
  }

  modificar(x:any){
    let navigationsExtras: NavigationExtras ={
      state:{
        categoria: x
      }
    }
    this.router.navigate(['/crud/modificar-categorias'],navigationsExtras);
  }
  eliminar(x:any){
    this.bd.elimarCategoria(x.id_categoria);
  }

  agregar(){
    this.router.navigate(['/crud/agregar-categorias']);
  }

}

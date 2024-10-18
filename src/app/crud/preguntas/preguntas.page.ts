import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {
  arregloPreguntas: any = [
    {
      id_pregunta: '',
      pregunta: '',
    }
  ]
  constructor(private bd:ServicebdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data=>{
      //validar si la bd esta lista
      if(data){
        //subscribir al observable de la listaRoles
        this.bd.fetchPreguntas().subscribe(res=>{
          this.arregloPreguntas = res;
        })
      }
    })
  }

  modificar(x:any){
    let navigationsExtras: NavigationExtras ={
      state:{
        pregunta: x
      }
    }
    this.router.navigate(['/crud/modificar-preguntas'],navigationsExtras);
  }
  eliminar(x:any){
    this.bd.eliminarPreguntas(x.id_pregunta);
  }

  agregar(){
    this.router.navigate(['/crud/agregar-preguntas']);
  }
}

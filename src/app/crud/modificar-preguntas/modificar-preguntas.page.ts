import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-preguntas',
  templateUrl: './modificar-preguntas.page.html',
  styleUrls: ['./modificar-preguntas.page.scss'],
})
export class ModificarPreguntasPage implements OnInit {

  pregunta: any;

  constructor(private router:Router,private activedrouter:ActivatedRoute, private bd:ServicebdService) {
    this.activedrouter.queryParams.subscribe(res=>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.pregunta = this.router.getCurrentNavigation()?.extras?.state?.['pregunta'];
      }
    })
  }

  ngOnInit() {
  }
  
  modificar(){
    //this.bd.presentAlert("Mod","ID: " + this.noticia.idnoticia)
    this.bd.modificarPreguntas(this.pregunta.id_pregunta,this.pregunta.pregunta);
  }

}

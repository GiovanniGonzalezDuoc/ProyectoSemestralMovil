import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-preguntas',
  templateUrl: './agregar-preguntas.page.html',
  styleUrls: ['./agregar-preguntas.page.scss'],
})
export class AgregarPreguntasPage implements OnInit {
  pregunta: string = "";
  constructor(private bd:ServicebdService) { }

  ngOnInit() {
  }
  insertar(){
    this.bd.insertarPreguntas(this.pregunta);
  }
}

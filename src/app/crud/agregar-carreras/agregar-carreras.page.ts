import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-carreras',
  templateUrl: './agregar-carreras.page.html',
  styleUrls: ['./agregar-carreras.page.scss'],
})
export class AgregarCarrerasPage implements OnInit {
  nombre_carrera: string = "";
  constructor(private bd:ServicebdService) { }

  ngOnInit() {
  }
  insertar(){
    this.bd.insertarCarrera(this.nombre_carrera);
  }
}

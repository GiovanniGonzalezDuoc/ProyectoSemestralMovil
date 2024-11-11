import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-control-control-publicacion',
  templateUrl: './agregar-control-control-publicacion.page.html',
  styleUrls: ['./agregar-control-control-publicacion.page.scss'],
})
export class AgregarControlControlPublicacionPage implements OnInit {

  id_veto_publicacion: string = "";
  tiempo_veto_publicacion!: number;
  motivo_veto_publicacion: string = "";
  publicacion: any[] = []; // Aquí se almacenarán las categorías desde la BD
  publicacionSeleccionado: number[] = []; // Para las categorías seleccionadas
  constructor(private bd:ServicebdService) { }

  ngOnInit() {
    this.bd.fetchPublicacion().subscribe(publi => {
      this.publicacion = publi;
    });
  }
  insertar(){
    const publicacion_id_publicacion = this.publicacionSeleccionado[0];
    this.bd.insertarControlPublicacion(this.tiempo_veto_publicacion,this.motivo_veto_publicacion,publicacion_id_publicacion);
  }

}

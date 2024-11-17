import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-preguntas',
  templateUrl: './modificar-preguntas.page.html',
  styleUrls: ['./modificar-preguntas.page.scss'],
})
export class ModificarPreguntasPage implements OnInit {

  pregunta: any = {}; // Inicializa como un objeto vacío

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        // Asegúrate de que 'pregunta' no sea undefined ni null
        this.pregunta = this.router.getCurrentNavigation()?.extras?.state?.['pregunta'] || {}; // Valor por defecto
      }
    });
  }
  
  ngOnInit() {
    // Verifica si 'pregunta' tiene la propiedad 'id_pregunta'
    if (!this.pregunta || !this.pregunta.id_pregunta) {
      console.error('No se encontró la pregunta o ID de pregunta.');
    }
  }
  
  modificar() {
    if (this.pregunta && this.pregunta.id_pregunta) {
      this.bd.modificarPreguntas(this.pregunta.id_pregunta, this.pregunta.pregunta);
    } else {
      console.error('No se puede modificar, faltan datos de la pregunta.');
    }
  }
}

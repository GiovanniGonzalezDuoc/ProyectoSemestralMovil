import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-verificacion-email',
  templateUrl: './verificacion-email.page.html',
  styleUrls: ['./verificacion-email.page.scss'],
})
export class VerificacionEmailPage implements OnInit {

  emailsolicitado: string = "";
  preguntasSeguridad: any[] = []; // Aquí se almacenarán las preguntas desde la BD
  preguntaSeleccionada: number | null = null; // Para almacenar la pregunta seleccionada
  respuesta: string = "";
  errorPregunta: string = ''; // Mensaje de error para la pregunta
  errorRespuesta: string = ''; // Mensaje de error para la respuesta

  constructor(private router: Router, private bd: ServicebdService) { }

  ngOnInit() {
    this.listarPreguntas(); // Cargar las preguntas al inicializar
  }

  listarPreguntas() {
    this.bd.fetchPreguntas().subscribe(preguntas => {
      this.preguntasSeguridad = preguntas; // Almacena las preguntas obtenidas
    });
  }
  
  async Email() {
    // Validar si el correo electrónico está en el formato correcto
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.emailsolicitado)) {
      this.bd.presentAlert('El Correo No Cumple Con Las Reglas', 'El correo electrónico no es válido.');
      return;
    }

    // Verificar si el correo electrónico existe en la base de datos
    const emailExists = await this.bd.verificarEmail(this.emailsolicitado);
    
    if (!emailExists) {
      this.bd.presentAlert('Error En El Correo', 'El Correo No Existe En La Base De Datos.');
      return;
    }

    // Validar que se haya seleccionado una pregunta de seguridad
    if (this.preguntaSeleccionada === null) {
      this.errorPregunta = 'Por favor, seleccione una pregunta de seguridad.';
      return;
    }

    // Validar que la respuesta no esté vacía
    if (!this.respuesta) {
      this.errorRespuesta = 'Por favor, ingrese una respuesta a la pregunta de seguridad.';
      return;
    }

    // Verificar si la respuesta y la pregunta coinciden con los almacenados en la base de datos
    const respuestaValida = await this.bd.verificarRespuesta(this.emailsolicitado,this.preguntaSeleccionada, this.respuesta);

    if (!respuestaValida) {
      this.bd.presentAlert('Datos Incorrectos', 'La respuesta a la pregunta de seguridad es incorrecta.');
      return;
    }
    
    let navigationsExtras: NavigationExtras ={
      state:{
        email: this.emailsolicitado
      }
    }
    
    // Redirigir al usuario a la página para crear una nueva contraseña
    this.router.navigate(['/nueva-contrasena'],navigationsExtras);
    this.bd.presentToast('bottom', 'Revise su correo Electrónico.');
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombre:string="";
  apellido:string="";
  carrera:string="";
  telefono:string="";
  email:string = "";
  contrasena:string="";

  emailsolicitado:string="";
  contrasenasolicitada:string="";

  

  constructor(private router:Router, private activedroute:ActivatedRoute,private alertController:AlertController,private toastcontroller:ToastController){
    this.activedroute.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state){
        this.nombre = this.router.getCurrentNavigation()?.extras?.state?.['nom'];
        this.apellido = this.router.getCurrentNavigation()?.extras?.state?.['apell'];
        this.carrera = this.router.getCurrentNavigation()?.extras?.state?.['carr'];
        this.telefono = this.router.getCurrentNavigation()?.extras?.state?.['tel'];
        this.email = this.router.getCurrentNavigation()?.extras?.state?.['ema'];
        this.contrasena = this.router.getCurrentNavigation()?.extras?.state?.['contra'];
      }
    })
  }

  ngOnInit() {
  }

  login(){
    const contrasena = this.contrasenasolicitada.trim();

    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.emailsolicitado)) {
      this.presentAlert('El Correo No Cumple Con Las Reglas', 'El correo electrónico no es válido.');
      return;
    }
    
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(contrasena)) {
      this.presentAlert('La Contraseña No Cumple Con Las Reglas', 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.');
      return;
    }

    if (this.email===this.emailsolicitado && this.contrasena===this.contrasenasolicitada){
      this.router.navigate(['/home']);
      this.presentToast('bottom')
    }else{
      this.presentAlert('Email o Contraseña Incorrecta','Porfavor Ingrese un Email o Contraseña Valido');
    }
    
  }
  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['ok'],
    });

    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') { //posición
    const toast = await this.toastcontroller.create({
      message: 'Usuario Ingreso Correctamente',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}

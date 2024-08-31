import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {
  users:any = [
    { foto:"assets/icon/favicon.png",name: 'Juan Pérez', email: 'juan@example.com' },
    { foto:"assets/icon/favicon.png",name: 'Ana Gómez', email: 'ana@example.com' },
  ];

  isPopoverOpen = false;
  selectedOption!: string;

  constructor(private router:Router,private popoverController:PopoverController, private alertController:AlertController,private toastcontroller:ToastController) { }

  ngOnInit() {
  }

  openPopover(ev: any) {
    this.isPopoverOpen = true;
  }

  closePopover() {
    this.isPopoverOpen = false;
  }

  handleOption(option: string) {
    
    this.closePopover();

    
    
    setTimeout(() => {
      if (option === 'option1') {
        this.presentToast('bottom', 'Se Le Ha Eliminado Al Usuario El Baneo.');
        this.router.navigate(['/admin/home']);
      } else if (option === 'option2') {
        this.presentToast('bottom', 'Se Ha Baneado Correctamente Al Usuario.');
        this.router.navigate(['/admin/home']);
      } else if (option === 'option3') {
        
        this.router.navigate(['/nueva-contrasena']);
      } else if (option === 'option4') {
        this.presentToast('bottom', 'Se Ha Eliminado La Cuenta Del Usuario Correctamente.');
        this.router.navigate(['/admin/home']);
      }
    }, 0); 
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['ok'],
    });

    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom',text:string) { //posición
    const toast = await this.toastcontroller.create({
      message: text,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}

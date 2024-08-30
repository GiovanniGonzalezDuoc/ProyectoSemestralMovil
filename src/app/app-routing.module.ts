import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'publicar',
    loadChildren: () => import('./pages/publicar/publicar.module').then(m => m.PublicarPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'descripcion',
    loadChildren: () => import('./pages/descripcion/descripcion.module').then(m => m.DescripcionPageModule)
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pages/ajustes/ajustes.module').then(m => m.AjustesPageModule)
  },
  {
    path: 'admin/home',
    loadChildren: () => import('./admin-pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'admin/perfil',
    loadChildren: () => import('./admin-pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'admin/descripcion',
    loadChildren: () => import('./admin-pages/descripcion/descripcion.module').then(m => m.DescripcionPageModule)
  },
  {
    path: 'admin/lista-usuarios',
    loadChildren: () => import('./admin-pages/lista-usuarios/lista-usuarios.module').then(m => m.ListaUsuariosPageModule)
  },
  {
    path: 'busqueda',
    loadChildren: () => import('./pages/busqueda/busqueda.module').then(m => m.BusquedaPageModule)
  },
  {
    path: 'admin/nueva-contrasena',
    loadChildren: () => import('./admin-pages/nueva-contrasena/nueva-contrasena.module').then(m => m.NuevaContrasenaPageModule)
  },
  {
    path: 'nueva-contrasena',
    loadChildren: () => import('./pages/nueva-contrasena/nueva-contrasena.module').then(m => m.NuevaContrasenaPageModule)
  },
  {
    path: 'verificacion-email',
    loadChildren: () => import('./pages/verificacion-email/verificacion-email.module').then(m => m.VerificacionEmailPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

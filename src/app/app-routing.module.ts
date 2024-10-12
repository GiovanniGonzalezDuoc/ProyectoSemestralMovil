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
    path: 'busqueda',
    loadChildren: () => import('./pages/busqueda/busqueda.module').then(m => m.BusquedaPageModule)
  },
  {
    path: 'admin/nueva-contrasena',
    loadChildren: () => import('./admin-pages/nueva-contrasena/nueva-contrasena.module').then(m => m.NuevaContrasenaPageModule)
  },
  {
    path: 'admin/crud',
    loadChildren: () => import('./admin-pages/crud/crud.module').then( m => m.CRUDPageModule)
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
    path: 'crud/rol',
    loadChildren: () => import('./crud/rol/rol.module').then( m => m.RolPageModule)
  },
  {
    path: 'crud/agregar-rol',
    loadChildren: () => import('./crud/agregar-rol/agregar-rol.module').then( m => m.AgregarRolPageModule)
  },
  {
    path: 'crud/modificar-rol',
    loadChildren: () => import('./crud/modificar-rol/modificar-rol.module').then( m => m.ModificarRolPageModule)
  },
  {
    path: 'crud/publicacion',
    loadChildren: () => import('./crud/publicacion/publicacion.module').then( m => m.PublicacionPageModule)
  },
  {
    path: 'crud/agregar-publicacion',
    loadChildren: () => import('./crud/agregar-publicacion/agregar-publicacion.module').then( m => m.AgregarPublicacionPageModule)
  },
  {
    path: 'crud/modificar-publicacion',
    loadChildren: () => import('./crud/modificar-publicacion/modificar-publicacion.module').then( m => m.ModificarPublicacionPageModule)
  },
  {
    path: 'crud/usuarios',
    loadChildren: () => import('./crud/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'crud/agregar-usuarios',
    loadChildren: () => import('./crud/agregar-usuarios/agregar-usuarios.module').then( m => m.AgregarUsuariosPageModule)
  },
  {
    path: 'crud/modificar-usuarios',
    loadChildren: () => import('./crud/modificar-usuarios/modificar-usuarios.module').then( m => m.ModificarUsuariosPageModule)
  },
  {
    path: 'crud/control-usuario',
    loadChildren: () => import('./crud/control-usuario/control-usuario.module').then( m => m.ControlUsuarioPageModule)
  },
  {
    path: 'crud/agregar-control-usuario',
    loadChildren: () => import('./crud/agregar-control-usuario/agregar-control-usuario.module').then( m => m.AgregarControlUsuarioPageModule)
  },
  {
    path: 'crud/modificar-control-usuario',
    loadChildren: () => import('./crud/modificar-control-usuario/modificar-control-usuario.module').then( m => m.ModificarControlUsuarioPageModule)
  },
  {
    path: 'crud/categorias',
    loadChildren: () => import('./crud/categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'crud/agregar-categorias',
    loadChildren: () => import('./crud/agregar-categorias/agregar-categorias.module').then( m => m.AgregarCategoriasPageModule)
  },
  {
    path: 'crud/modificar-categorias',
    loadChildren: () => import('./crud/modificar-categorias/modificar-categorias.module').then( m => m.ModificarCategoriasPageModule)
  },




  
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  // {
  //   path: '**',
  //   loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  // },
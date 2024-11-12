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
    loadChildren: () => import('./crud/modificar-control-usuario/modificar-control-usuario.module').then(m => m.ModificarControlUsuarioPageModule)
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
  {
    path: 'crud/preguntas',
    loadChildren: () => import('./crud/preguntas/preguntas.module').then( m => m.PreguntasPageModule)
  },
  {
    path: 'crud/agregar-preguntas',
    loadChildren: () => import('./crud/agregar-preguntas/agregar-preguntas.module').then( m => m.AgregarPreguntasPageModule)
  },
  {
    path: 'crud/modificar-preguntas',
    loadChildren: () => import('./crud/modificar-preguntas/modificar-preguntas.module').then( m => m.ModificarPreguntasPageModule)
  },
  {
    path: 'crud/carreras',
    loadChildren: () => import('./crud/carreras/carreras.module').then( m => m.CarrerasPageModule)
  },
  {
    path: 'crud/agregar-carreras',
    loadChildren: () => import('./crud/agregar-carreras/agregar-carreras.module').then( m => m.AgregarCarrerasPageModule)
  },
  {
    path: 'crud/modificar-carreras',
    loadChildren: () => import('./crud/modificar-carreras/modificar-carreras.module').then( m => m.ModificarCarrerasPageModule)
  },
  {
    path: 'crud/contacto',
    loadChildren: () => import('./crud/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'crud/agregar-contacto',
    loadChildren: () => import('./crud/agregar-contacto/agregar-contacto.module').then( m => m.AgregarContactoPageModule)
  },
  {
    path: 'crud/modificar-contacto',
    loadChildren: () => import('./crud/modificar-contacto/modificar-contacto.module').then( m => m.ModificarContactoPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./pages/noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'descripcion-noticias',
    loadChildren: () => import('./pages/descripcion-noticias/descripcion-noticias.module').then( m => m.DescripcionNoticiasPageModule)
  },
  {
    path: 'listado-seguidores',
    loadChildren: () => import('./pages/listado-seguidores/listado-seguidores.module').then( m => m.ListadoSeguidoresPageModule)
  },
  {
    path: 'perfil-seguidor',
    loadChildren: () => import('./pages/perfil-seguidor/perfil-seguidor.module').then( m => m.PerfilSeguidorPageModule)
  },
  {
    path: 'publicaciones-guardadas',
    loadChildren: () => import('./pages/publicaciones-guardadas/publicaciones-guardadas.module').then( m => m.PublicacionesGuardadasPageModule)
  },
  {
    path: 'crud/control-control-publicacion',
    loadChildren: () => import('./crud/control-control-publicacion/control-control-publicacion.module').then( m => m.ControlControlPublicacionPageModule)
  },
  {
    path: 'crud/agregar-control-control-publicacion',
    loadChildren: () => import('./crud/agregar-control-control-publicacion/agregar-control-control-publicacion.module').then( m => m.AgregarControlControlPublicacionPageModule)
  },
  {
    path: 'crud/modificar-control-control-publicacion',
    loadChildren: () => import('./crud/modificar-control-control-publicacion/modificar-control-control-publicacion.module').then( m => m.ModificarControlControlPublicacionPageModule)
  },
  {
    path: 'crud/modificar-control-comentarios',
    loadChildren: () => import('./crud/modificar-control-comentarios/modificar-control-comentarios.module').then( m => m.ModificarControlComentariosPageModule)
  },
  {
    path: 'crud/agregar-control-comentarios',
    loadChildren: () => import('./crud/agregar-control-comentarios/agregar-control-comentarios.module').then( m => m.AgregarControlComentariosPageModule)
  },
  {
    path: 'crud/control-comentarios',
    loadChildren: () => import('./crud/control-comentarios/control-comentarios.module').then( m => m.ControlComentariosPageModule)
  },  {
    path: 'modificar-publicacion',
    loadChildren: () => import('./pages/modificar-publicacion/modificar-publicacion.module').then( m => m.ModificarPublicacionPageModule)
  },
  {
    path: 'modificar-comentario',
    loadChildren: () => import('./pages/modificar-comentario/modificar-comentario.module').then( m => m.ModificarComentarioPageModule)
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
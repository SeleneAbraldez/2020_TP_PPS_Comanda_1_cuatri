import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./paginas/home/home.module').then(m => m.HomePageModule)
    //loadChildren: () => import('./paginas/principal/principal.module').then(m => m.PrincipalPageModule)

  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: 'testeo',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./paginas/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./paginas/admin/admin.module').then(m => m.AdminPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'alta-cliente',
    loadChildren: () => import('./paginas/alta-cliente/alta-cliente.module').then(m => m.AltaClientePageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./paginas/principal/principal.module').then(m => m.PrincipalPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'mozo',
    loadChildren: () => import('./paginas/mozo/mozo.module').then(m => m.MozoPageModule)
  },
  {
    path: 'bartender',
    loadChildren: () => import('./paginas/bartender/bartender.module').then(m => m.BartenderPageModule)
  },
  {
    path: 'cocinero',
    loadChildren: () => import('./paginas/cocinero/cocinero.module').then(m => m.CocineroPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

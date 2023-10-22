import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user/home',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./layout/user-layout/user-layout.module').then(module => module.UserLayoutModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./layout/admin-layout/admin-layout.module').then(module => module.AdminLayoutModule),
    canActivate: [AuthGuard], data: {
      userRoles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'auth',
    loadChildren: () => import('./layout/auth-layout/auth-layout.module').then(module => module.AuthLayoutModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

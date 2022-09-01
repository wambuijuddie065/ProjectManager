import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Modules/admin/admin/admin.component';
import { LoginComponent } from './Modules/auth/login/login.component';
import { SignupComponent } from './Modules/auth/signup/signup.component';
import { HeroComponent } from './Modules/shared/components/hero/hero.component';
import { PageNotFoundComponent } from './Modules/shared/components/page-not-found/page-not-found.component';
import { UserComponent } from './Modules/user/user/user.component';
import { AuthGuard } from './services/auth-guard';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HeroComponent},

  {path:'auth',loadChildren:() => import('./Modules/auth/auth.module').then(m=>m.AuthModule)},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard]},
  {path:'user',component:UserComponent,canActivate:[AuthGuard]},
  
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }

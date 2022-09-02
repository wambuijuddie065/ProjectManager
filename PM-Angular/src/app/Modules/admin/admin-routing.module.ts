import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth-guard';
import { AddNewProjectComponent } from './add-new-project/add-new-project.component';
import { AdminComponent } from './admin/admin.component';
import { DisplayProjectsComponent } from './display-projects/display-projects.component';



const routes: Routes = [
  {path:'',component:AdminComponent,children:[
    {path:'add',component:AddNewProjectComponent},
    {path:'projects',component:DisplayProjectsComponent}
  ]}
];

@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  
 }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayAssignedProjectsComponent } from './display-assigned-projects/display-assigned-projects.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  
  {path:'',component:UserComponent,children:[
    {path:'projects',component:DisplayAssignedProjectsComponent}
  ]}
];

@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
  
 }

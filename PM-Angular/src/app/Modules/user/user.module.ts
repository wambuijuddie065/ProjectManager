import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { DisplayAssignedProjectsComponent } from './display-assigned-projects/display-assigned-projects.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
  
  
    UserComponent,
          DisplayAssignedProjectsComponent
  ],
  imports: [
    CommonModule,UserRoutingModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }

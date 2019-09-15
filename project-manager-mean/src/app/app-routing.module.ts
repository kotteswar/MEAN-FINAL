import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { ShowTaskComponent } from './show-task/show-task.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'createtask', pathMatch: 'full' },
{ path: 'createtask', component:CreateTaskComponent},
{ path: 'updatetask', component:UpdateTaskComponent},
{ path: 'showtask', component:ShowTaskComponent},
{ path: 'adduser', component:AddUserComponent},
{ path: 'updateuser', component:UpdateUserComponent},
// { path: 'product/:id', component: ProductComponent },  
// { path: 'contact', component: ContactComponent },  
{ path: '**', component:CreateTaskComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }








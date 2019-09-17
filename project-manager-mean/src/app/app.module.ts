import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { ShowTaskComponent } from './show-task/show-task.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { MatFormFieldModule } from '@angular/material';
import {DemoMaterialModule} from '../material-module';
import { HttpClientModule} from '@angular/common/http';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';  
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { CreateProjectComponent } from './project/create-project/create-project.component';

//import { MatFormFieldModule } from '@angular/material';
//import { MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    ShowTaskComponent,
    DatepickerComponent,
    AddUserComponent,
    UpdateUserComponent,
    CreateProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    DemoMaterialModule,
     HttpClientModule,
    Ng2SearchPipeModule,
    OrderModule
    
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }

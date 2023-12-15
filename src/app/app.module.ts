import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './menu/menu.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilePondModule } from 'ngx-filepond';
import { ClientFormComponent } from './clients/client-form/client-form.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IndexComponent } from './clients/index/index.component';
import { CreateComponent } from './clients/create/create.component';
import { ViewComponent } from './clients/view/view.component';
import { ClientsRoutingModule } from './clients/clients-routing.module';
import { EditComponent } from './clients/edit/edit.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
      AppComponent, 
      MenuComponent, 
      ClientFormComponent,
      ClientDetailComponent,
      IndexComponent,
      CreateComponent,
      ViewComponent,
      EditComponent,
      HomeComponent
    ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FilePondModule,
    MatPaginatorModule, 
    ClientsRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule {}

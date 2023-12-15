import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import {CloudinaryModule} from '@cloudinary/ng';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [

    ViewComponent,
  ],
  
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    ReactiveFormsModule,
    CloudinaryModule,
    ClientsRoutingModule,

  ]
})
export class ClientsModule { }

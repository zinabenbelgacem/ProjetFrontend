import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'clients', component: IndexComponent },
  { path: 'clients/:idClient/edit', component: EditComponent },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }

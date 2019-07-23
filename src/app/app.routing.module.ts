import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AddUserComponent} from './user/add-user.component';

const routes: Routes = [
  { path: '', component: AddUserComponent },
  { path: 'add', component: AddUserComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }

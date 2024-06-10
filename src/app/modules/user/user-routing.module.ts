import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { UserCollectionsComponent } from './pages/collections/user-collections/user-collections.component';
import { UserFormComponent } from './pages/forms/user-form/user-form.component';

const routes: Routes = [
  {
    path: 'form',
    component: UserFormComponent,
  },
  {
    path: '',
    component: UserCollectionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

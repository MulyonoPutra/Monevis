import { RouterModule, Routes } from '@angular/router';

import { GroupCollectionsComponent } from './pages/collections/group-collections/group-collections.component';
import { GroupFormComponent } from './pages/forms/group-form/group-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'form',
    component: GroupFormComponent,
  },
  {
    path: 'update/:id',
    component: GroupFormComponent,
  },
  {
    path: '',
    component: GroupCollectionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }

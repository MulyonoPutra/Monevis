import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TransaksiCollectionsComponent } from './pages/collections/transaksi-collections/transaksi-collections.component';
import { TransaksiFormComponent } from './pages/forms/transaksi-form/transaksi-form.component';

const routes: Routes = [
	{
		path: 'form',
		component: TransaksiFormComponent,
	},
	{
		path: 'update/:id',
		component: TransaksiFormComponent,
	},
	{
		path: '',
		component: TransaksiCollectionsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TransaksiRoutingModule {}

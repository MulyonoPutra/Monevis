import { RouterModule, Routes } from '@angular/router';

import { BulanComponent } from './pages/bulan/collections/bulan.component';
import { BulanFormsComponent } from './pages/bulan/forms/bulan-forms.component';
import { DaftarUnitCollectionsComponent } from './pages/daftar-unit/collections/daftar-unit-collections/daftar-unit-collections.component';
import { DaftarUnitFormsComponent } from './pages/daftar-unit/forms/daftar-unit-forms/daftar-unit-forms.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: 'bulan',
		component: BulanComponent,
	},
	{
		path: 'bulan-form',
		component: BulanFormsComponent,
	},
	{
		path: 'bulan-update/:id',
		component: BulanFormsComponent,
	},
	{
		path: 'unit',
		component: DaftarUnitCollectionsComponent,
	},
	{
		path: 'unit-form',
		component: DaftarUnitFormsComponent,
	},
	{
		path: 'unit-update/:id',
		component: DaftarUnitFormsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MasterRoutingModule {}

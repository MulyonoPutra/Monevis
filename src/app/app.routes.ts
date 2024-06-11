import { HomeComponent } from './modules/home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: 'master',
				loadChildren: () =>
					import('../app/modules/master/master.module').then((m) => m.MasterModule),
			},
			{
				path: 'transaksi',
				loadChildren: () =>
					import('../app/modules/transaksi/transaksi.module').then(
						(m) => m.TransaksiModule,
					),
			},
			{
				path: 'user',
				loadChildren: () =>
					import('../app/modules/user/user.module').then((m) => m.UserModule),
			},
			{
				path: 'group',
				loadChildren: () =>
					import('../app/modules/group/group.module').then((m) => m.GroupModule),
			},
		],
	},

	{
		path: 'auth',
		loadChildren: () => import('../app/modules/auth/auth.module').then((m) => m.AuthModule),
	},
];

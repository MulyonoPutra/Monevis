import { AuthenticationGuard } from './core/guards/authentication.guard';
import { HomeComponent } from './modules/home/home.component';
import { PageNotFound404Component } from './core/components/page-not-found-404/page-not-found-404.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: '/transaksi', pathMatch: 'full' },
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: 'master',
				loadChildren: () =>
					import('../app/modules/master/master.module').then((m) => m.MasterModule),

				canActivate: [AuthenticationGuard],
			},
			{
				path: 'transaksi',
				loadChildren: () =>
					import('../app/modules/transaksi/transaksi.module').then(
						(m) => m.TransaksiModule,
					),
				canActivate: [AuthenticationGuard],
			},
			{
				path: 'user',
				loadChildren: () =>
					import('../app/modules/user/user.module').then((m) => m.UserModule),
				canActivate: [AuthenticationGuard],
			},
			{
				path: 'group',
				loadChildren: () =>
					import('../app/modules/group/group.module').then((m) => m.GroupModule),
				canActivate: [AuthenticationGuard],
			},
		],
	},
	{
		path: 'auth',
		loadChildren: () => import('../app/modules/auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: '**',
		pathMatch: 'full',
		component: PageNotFound404Component,
	},
];

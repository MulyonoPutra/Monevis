import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	providers: [ToastService, MessageService],
})
export class NavbarComponent {
	constructor(
		private readonly storageService: StorageService,
		private readonly router: Router,
		private readonly messageService: MessageService,
		private readonly toastService: ToastService,
	) {}
	menuItems = [
		{
			title: 'Transaksi',
			icon: '../../../../assets/icons/money.svg',
			route: '/transaksi',
		},
		{
			title: 'Group',
			icon: '../../../../assets/icons/group.svg',
			route: '/group',
		},
		{
			title: 'User Management',
			icon: '../../../../assets/icons/user.svg',
			route: '/user',
		},
		{
			title: 'Master',
			icon: '../../../../assets/icons/data.svg',
			route: '/master/bulan',
			children: [
				{
					title: 'Bulan',
					icon: '../../../../assets/icons/moon.svg',
					route: '//master/bulan',
				},
				{
					title: 'Unit',
					icon: '../../../../assets/icons/money.svg',
					route: '/master/unit',
				},
			],
		},
	];

	logout() {
		this.storageService.clear();
		this.router.navigate(['auth/login']);
	}

	show(): void {
		this.messageService.add({
			severity: 'success',
			summary: 'Heading',
			detail: '<strong>Message Content</strong>',
		});
		this.toastService.showSuccess('Success!', 'Successfully!');
	}
}

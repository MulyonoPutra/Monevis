import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../../core/services/user.service';
import { User } from '../../../../../core/models/user';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-user-collections',
	standalone: true,
	imports: [CommonModule, TableComponent],
	templateUrl: './user-collections.component.html',
	styleUrls: ['./user-collections.component.scss'],
	providers: [UserService],
})
export class UserCollectionsComponent implements OnInit {
	user!: User[];
  private destroyed = new Subject();

	constructor(
		private readonly router: Router,
		private readonly userService: UserService,
	) {}

	ngOnInit(): void {
		this.findAll();
	}

	findAll(): void {
    this.userService.findAll().pipe(takeUntil(this.destroyed)).subscribe({
			next: (response) => {
				this.user = response.data;
			},
		});
	}

	navigate(): void {
		this.router.navigate(['/user/form']);
	}

	onUpdate(id: any): void {
		this.router.navigateByUrl(`/user/update/${id}`);
	}

	onRemove(id: any): void {
    this.userService.remove(id).pipe(takeUntil(this.destroyed)).subscribe({
			next: () => {},
			error: (error: HttpErrorResponse) => {
				console.log(error);
			},
			complete: () => {
				window.location.reload();
			},
		});
	}

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}

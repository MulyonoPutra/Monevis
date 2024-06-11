import { CommonModule } from '@angular/common';
import { Component, OnDestroy, type OnInit } from '@angular/core';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Router } from '@angular/router';
import { GroupService } from '../../../../../core/services/group.service';
import { Group } from '../../../../../core/models/group';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponseEntity } from '../../../../../core/models/http-response-entity';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-group-collections',
	standalone: true,
	imports: [CommonModule, TableComponent],
	templateUrl: './group-collections.component.html',
	styleUrls: ['./group-collections.component.scss'],
	providers: [GroupService],
})
export class GroupCollectionsComponent implements OnInit, OnDestroy {
	private destroyed = new Subject();
	group!: Group[];
	columns = ['id', 'namaGroup', 'kodeGroup', 'keterangan'];

	constructor(
		private readonly router: Router,
		private readonly groupService: GroupService,
	) {}

	ngOnInit(): void {
		this.findAll();
	}

	findAll(): void {
		this.groupService
			.findAll()
			.pipe(takeUntil(this.destroyed))
			.subscribe({
				next: (response: HttpResponseEntity<Group[]>) => {
					this.group = response.data;
				},
			});
	}

	navigate(): void {
		this.router.navigate(['/group/form']);
	}

	onUpdate(id: any): void {
		this.router.navigateByUrl(`/group/update/${id}`);
	}

	onRemove(id: any): void {
		this.groupService
			.remove(id)
			.pipe(takeUntil(this.destroyed))
			.subscribe({
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

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../../../../core/services/master.service';
import { Bulan } from '../../../../../core/models/bulan';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-bulan',
	standalone: true,
	imports: [CommonModule, TableComponent],
	templateUrl: './bulan.component.html',
	styleUrls: ['./bulan.component.scss'],
	providers: [MasterService],
})
export class BulanComponent implements OnInit, OnDestroy {
	private destroyed = new Subject();

	bulan!: Bulan[];
	columns = ['id', 'namaBulan'];

	constructor(
		private readonly router: Router,
		private readonly masterService: MasterService,
	) {}

	ngOnInit(): void {
		this.findAll();
	}

	findAll(): void {
		this.masterService
			.findAllBulan()
			.pipe(takeUntil(this.destroyed))
			.subscribe({
				next: (response) => {
					this.bulan = response.data;
				},
			});
	}

	navigate(): void {
		this.router.navigate(['/master/bulan-form']);
	}

	onUpdate(id: number): void {
		this.router.navigateByUrl(`/master/bulan-update/${id}`);
	}

	onRemove(id: number): void {
		this.masterService
			.removeBulan(id)
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

import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unit } from '../../../../../../core/models/unit';
import { MasterService } from '../../../../../../core/services/master.service';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-daftar-unit-collections',
	standalone: true,
	imports: [CommonModule, TableComponent],
	templateUrl: './daftar-unit-collections.component.html',
	styleUrls: ['./daftar-unit-collections.component.scss'],
	providers: [MasterService],
})
export class DaftarUnitCollectionsComponent implements OnInit {
	units!: Unit[];
	columns = ['id', 'kodeUnit', 'namaUnit', 'akroUnit', 'alamat', 'telepon'];

	constructor(
		private readonly router: Router,
		private readonly masterService: MasterService,
	) {}

	ngOnInit(): void {
		this.findAll();
	}

	findAll(): void {
		this.masterService.findAll().subscribe({
			next: (response) => {
				this.units = response.data;
			},
		});
	}

	navigate(): void {
		this.router.navigate(['master/unit-form']);
	}

	onUpdate(id: number): void {
		this.router.navigateByUrl(`/master/unit-update/${id}`);
	}

	onRemove(id: number): void {
		this.masterService.remove(id).subscribe({
			next: () => {},
			error: (error: HttpErrorResponse) => {
				console.log(error);
			},
			complete: () => {
				window.location.reload();
			},
		});
	}
}

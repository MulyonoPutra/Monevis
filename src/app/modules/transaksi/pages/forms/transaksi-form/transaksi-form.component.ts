import { CommonModule, Location } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../../../../core/services/master.service';
import { TransaksiService } from '../../../../../core/services/transaksi.service';
import { Bulan } from '../../../../../core/models/bulan';
import { Transaksi } from '../../../../../core/models/transaksi';
import { Unit } from '../../../../../core/models/unit';
import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { timer, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-transaksi-form',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './transaksi-form.component.html',
	styleUrls: ['./transaksi-form.component.scss'],
	providers: [TransaksiService, MasterService],
})
export class TransaksiFormComponent implements OnInit {
	form!: FormGroup;
	bulan!: Bulan[];
	units!: Unit[];
	label!: string;
	routeId!: number;
	transaksi!: Transaksi;

	constructor(
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly transaksiService: TransaksiService,
		private readonly masterService: MasterService,
		private readonly location: Location,
	) {
		this.routeId = +this.route.snapshot.paramMap.get('id')!;
		console.log(this.routeId);
	}

	ngOnInit(): void {
		this.formInitialized();
		this.findAllBulan();
		this.findAllUnit();
		this.initPageFromRouteId();
	}

	formInitialized(): void {
		this.form = this.fb.group({
			anggaran: ['', Validators.required],
			real: ['', Validators.required],
			keterangan: ['', Validators.required],
			bulanId: ['', Validators.required],
			daftarUnitId: ['', Validators.required],
		});
	}

	initPageFromRouteId(): void {
		this.label = this.routeId ? 'Update' : 'Create';
		if (this.routeId) {
			this.findOne();
		}
	}

	get formCtrlValue() {
		return {
			anggaran: this.form.get('anggaran')?.value,
			real: this.form.get('real')?.value,
			keterangan: this.form.get('keterangan')?.value,
			bulanId: Number(this.form.get('bulanId')?.value),
			daftarUnitId: Number(this.form.get('daftarUnitId')?.value),
		};
	}

	findOne(): void {
		this.transaksiService.findById(this.routeId).subscribe({
			next: (response: any) => {
				this.prepopulateForm(response.data);
			},
			error: (error: HttpErrorResponse) => {
				console.error(error);
			},
			complete: () => {},
		});
	}

	prepopulateForm(data: any): void {
		this.form.patchValue({
			anggaran: data.anggaran,
			real: data.real,
			keterangan: data.keterangan,
			bulanId: data.bulan.id,
			daftarUnitId: data.daftarUnit.id,
		});
	}

	getFormControl(form: string): FormControl | AbstractControl {
		return this.form.get(form) as FormControl;
	}

	findAllBulan(): void {
		this.masterService.findAllBulan().subscribe({
			next: (response) => {
				this.bulan = response.data;
			},
		});
	}

	findAllUnit(): void {
		this.masterService.findAll().subscribe({
			next: (response) => {
				this.units = response.data;
			},
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			this.routeId ? this.onUpdate() : this.onCreate();
		}
	}

	onUpdate(): void {
		this.transaksiService.update(this.routeId, this.formCtrlValue).subscribe({
			next: () => {},
			error: (error: HttpErrorResponse) => {
				console.error(error);
			},
			complete: () => {
				this.navigateAfterSucceed();
			},
		});
	}

	onCreate(): void {
		this.transaksiService.create(this.formCtrlValue).subscribe({
			next: () => {},
			error: (error: HttpErrorResponse) => {
				console.error(error);
			},
			complete: () => {
				this.navigateAfterSucceed();
			},
		});
	}

	navigateAfterSucceed(): void {
		timer(3000)
			.pipe(take(1))
			.subscribe(() => {
				this.router.navigateByUrl('/transaksi');
			});
	}

	goBack(): void {
		this.location.back();
	}
}

import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, type OnInit } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer, take, Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MasterService } from '../../../../../../core/services/master.service';
import { FormFieldComponent } from '../../../../../../shared/components/form-field/form-field.component';

@Component({
	selector: 'app-daftar-unit-forms',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, FormFieldComponent],
	templateUrl: './daftar-unit-forms.component.html',
	styleUrls: ['./daftar-unit-forms.component.scss'],
	providers: [MasterService],
})
export class DaftarUnitFormsComponent implements OnInit, OnDestroy {
	private destroyed = new Subject();
	label!: string;
	routeId!: number;
	form!: FormGroup;

	constructor(
		private readonly fb: FormBuilder,
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly masterService: MasterService,
		private readonly location: Location,
	) {
		this.routeId = +this.route.snapshot.paramMap.get('id')!;
	}

	ngOnInit(): void {
		this.formInitialized();
		this.initPageFromRouteId();
	}

	formInitialized(): void {
		this.form = this.fb.group({
			kodeUnit: ['', Validators.required],
			namaUnit: ['', Validators.required],
			type: ['', Validators.required],
			akroUnit: ['', Validators.required],
			alamat: ['', Validators.required],
			telepon: ['', Validators.required],
		});
	}

	initPageFromRouteId(): void {
		this.label = this.routeId ? 'Update' : 'Save';
		if (this.routeId) {
			this.findOne();
		}
	}

	findOne(): void {
		this.masterService
			.findById(this.routeId)
			.pipe(takeUntil(this.destroyed))
			.subscribe({
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
			kodeUnit: data.kodeUnit,
			namaUnit: data.namaUnit,
			type: data.type,
			akroUnit: data.akroUnit,
			alamat: data.alamat,
			telepon: data.telepon,
		});
	}

	get formCtrlValue() {
		return {
			kodeUnit: this.form.get('kodeUnit')?.value,
			namaUnit: this.form.get('namaUnit')?.value,
			type: this.form.get('type')?.value,
			akroUnit: this.form.get('akroUnit')?.value,
			alamat: this.form.get('alamat')?.value,
			telepon: this.form.get('telepon')?.value,
		};
	}

	getFormControl(form: string): FormControl | AbstractControl {
		return this.form.get(form) as FormControl;
	}

	onSubmit(): void {
		if (this.form.valid) {
			this.routeId ? this.onUpdate() : this.onCreate();
		}
	}

	onCreate(): void {
		this.masterService
			.create(this.formCtrlValue)
			.pipe(takeUntil(this.destroyed))
			.subscribe({
				next: () => {},
				error: (error: HttpErrorResponse) => {
					console.error(error);
				},
				complete: () => {
					this.navigateAfterSucceed();
				},
			});
	}

	onUpdate(): void {
		this.masterService
			.update(this.routeId, this.formCtrlValue)
			.pipe(takeUntil(this.destroyed))
			.subscribe({
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
				this.router.navigateByUrl('/master/unit').then(() => window.location.reload());
			});
	}

	goBack(): void {
		this.location.back();
	}

	ngOnDestroy() {
		this.destroyed.next(true);
		this.destroyed.complete();
	}
}

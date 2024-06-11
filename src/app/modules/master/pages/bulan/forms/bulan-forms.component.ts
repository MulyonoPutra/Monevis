import { CommonModule, Location } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { MasterService } from '../../../../../core/services/master.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl,
	AbstractControl,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer, take } from 'rxjs';

@Component({
	selector: 'app-bulan-forms',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './bulan-forms.component.html',
	styleUrls: ['./bulan-forms.component.scss'],
	providers: [MasterService],
})
export class BulanFormsComponent implements OnInit {
	label!: string;
	routeId!: number;
	form!: FormGroup;

	constructor(
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private readonly masterService: MasterService,
		private readonly route: ActivatedRoute,
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
			namaBulan: ['', Validators.required],
		});
	}

	initPageFromRouteId(): void {
		this.label = this.routeId ? 'Update' : 'Save';
		if (this.routeId) {
			this.findOne();
		}
	}

	findOne(): void {
		this.masterService.findBulanById(this.routeId).subscribe({
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
			namaBulan: data.namaBulan,
		});
	}

	get formCtrlValue() {
		return {
			namaBulan: this.form.get('namaBulan')?.value,
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
		this.masterService.createBulan(this.formCtrlValue).subscribe({
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
		this.masterService.updateBulan(this.routeId, this.formCtrlValue).subscribe({
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
				this.router.navigateByUrl('/master/bulan');
			});
	}

	goBack(): void {
		this.location.back();
	}
}

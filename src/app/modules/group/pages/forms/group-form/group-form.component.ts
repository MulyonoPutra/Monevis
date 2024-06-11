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
import { GroupService } from '../../../../../core/services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { timer, take, Subject, takeUntil } from 'rxjs';
import { FormFieldComponent } from '../../../../../shared/components/form-field/form-field.component';

@Component({
	selector: 'app-group-form',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, FormFieldComponent],
	templateUrl: './group-form.component.html',
	styleUrls: ['./group-form.component.scss'],
	providers: [GroupService],
})
export class GroupFormComponent implements OnInit, OnDestroy {
	private destroyed = new Subject();
	form!: FormGroup;
	label!: string;
	routeId!: number;

	constructor(
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly groupService: GroupService,
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
			namaGroup: ['', Validators.required],
			kodeGroup: ['', Validators.required],
			keterangan: ['', Validators.required],
		});
	}

	initPageFromRouteId(): void {
		this.label = this.routeId ? 'Update' : 'Save';
		if (this.routeId) {
			this.findOne();
		}
	}

	findOne(): void {
		this.groupService
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
			namaGroup: data.namaGroup,
			kodeGroup: data.kodeGroup,
			keterangan: data.keterangan,
		});
	}

	get formCtrlValue() {
		return {
			namaGroup: this.form.get('namaGroup')?.value,
			kodeGroup: this.form.get('kodeGroup')?.value,
			keterangan: this.form.get('keterangan')?.value,
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

	onUpdate(): void {
		this.groupService
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

	onCreate(): void {
		this.groupService
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

	navigateAfterSucceed(): void {
		timer(3000)
			.pipe(take(1))
			.subscribe(() => {
				this.router.navigateByUrl('/group');
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

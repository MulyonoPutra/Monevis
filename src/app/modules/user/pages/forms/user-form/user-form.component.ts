import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { UserService } from '../../../../../core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
	FormsModule,
	ReactiveFormsModule,
	FormGroup,
	FormBuilder,
	Validators,
	FormControl,
	AbstractControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { timer, take } from 'rxjs';
import { GroupService } from '../../../../../core/services/group.service';
import { Group } from '../../../../../core/models/group';
import { CreateUserDto } from '../../../../../core/models/dto/create-user.dto';
import { User } from '../../../../../core/models/user';
import { FormFieldComponent } from '../../../../../shared/components/form-field/form-field.component';

@Component({
	selector: 'app-user-form',
	standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormFieldComponent],
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss'],
	providers: [UserService, GroupService],
})
export class UserFormComponent implements OnInit {
	form!: FormGroup;
	label!: string;
	routeId!: number;
	group!: Group[];

	constructor(
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly userService: UserService,
		private readonly groupService: GroupService,
		private readonly location: Location,
	) {
		this.routeId = +this.route.snapshot.paramMap.get('id')!;
	}

	ngOnInit(): void {
		this.formInitialized();
		this.initPageFromRouteId();
		this.findAllGroup();
	}

	formInitialized(): void {
		this.form = this.fb.group({
			nama: ['', Validators.required],
			password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
			groupId: ['', Validators.required],
		});
	}

	initPageFromRouteId(): void {
		this.label = this.routeId ? 'Update' : 'Save';
		if (this.routeId) {
			this.findOne();
		}
	}

	findAllGroup(): void {
		this.groupService.findAll().subscribe({
			next: (response) => {
				this.group = response.data;
			},
		});
	}

	findOne(): void {
		this.userService.findById(this.routeId).subscribe({
			next: (response: any) => {
				this.prepopulateForm(response.data);
			},
			error: (error: HttpErrorResponse) => {
				console.error(error);
			},
			complete: () => {},
		});
	}

	prepopulateForm(data: User): void {
		this.form.patchValue({
			nama: data.nama,
			password: data.password,
			email: data.email,
			groupId: data.group.id,
		});
	}

	get formCtrlValue(): CreateUserDto {
		return {
			nama: this.form.get('nama')?.value,
			password: this.form.get('password')?.value,
			email: this.form.get('email')?.value,
			groupId: Number(this.form.get('groupId')?.value),
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
		this.userService.update(this.routeId, this.formCtrlValue).subscribe({
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
		this.userService.create(this.formCtrlValue).subscribe({
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
				this.router.navigateByUrl('/user');
			});
	}

	goBack(): void {
		this.location.back();
	}
}

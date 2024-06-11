import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../../../core/models/login';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../../../shared/services/storage.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	providers: [AuthService],
})
export class LoginComponent implements OnInit {
	form!: FormGroup;
	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly router: Router,
		private readonly authService: AuthService,
		private readonly storageService: StorageService,
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});
	}

	get f() {
		return this.form.controls;
	}

	get formCtrlValue(): Login {
		return {
			email: this.form.get('email')?.value,
			password: this.form.get('password')?.value,
		};
	}

	onSubmit() {
		if (this.form.valid) {
			this.authService.login(this.formCtrlValue).subscribe({
				next: (response) => {
					this.storageService.setUserId(response.data.id);
				},
				error: (error: HttpErrorResponse) => {
					if (error.status === 404) {
						alert('User Not Found!');
					}
				},
				complete: () => {
					this.router.navigate(['']).then(() => {
						window.location.reload();
					});
				},
			});
		}
		this.router.navigateByUrl('/');
	}
}

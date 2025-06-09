import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppMessageService } from 'src/app/demo/service/app-message.service';
import { AuthService } from 'src/app/demo/service/auth.service';

@Component({
	templateUrl: './register.component.html'
})
export class RegisterComponent {
	registerForm: FormGroup = this.fb.group({
		username: ['', [Validators.required]],
		password: ['', [Validators.required]],
		confirmPassword: ['', [Validators.required]],
	});
	confirmed: boolean = false;
	constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private msgService: AppMessageService) { }

	onSubmit() {
		if (this.registerForm.valid && this.confirmed) {
			this.authService.register(this.registerForm.value).subscribe({
				next: (res) => {
					this.msgService.success(res.message);
					this.router.navigate(["/auth/login"])
				},
				error: (err) => {
					this.msgService.error(err.error)
				},
			});
		}
	}
}

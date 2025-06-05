
import { Router } from '@angular/router';
import { AuthService } from './../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppMessageService } from 'src/app/demo/service/app-message.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        i {
            opacity: 0.6;
            transition-duration: .12s;
            color: #2196F3;
            
            &:hover {
                opacity: 1;
            }
        }
    `]
})
export class LoginComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private msgService: AppMessageService) { }
    loginForm: FormGroup = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });
    ngOnInit(): void {
        if (localStorage.getItem('token')) {
            this.router.navigate(['']);
        }
    }
    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe({
                next: (res) => {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('role', res.role);
                    localStorage.setItem('userId', res.userId);
                    this.msgService.success(res.message);
                    this.router.navigate(['']);
                },
                error: (err) => {
                    this.msgService.error(err.error);
                },
            });
        }
    }
}

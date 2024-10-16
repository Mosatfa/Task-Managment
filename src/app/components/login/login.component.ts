import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hidePassword: boolean = false
  isLoading: boolean = false
  errMessage: string = ''

  // Collect user data for login
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required]),
  })

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  //Show or hide password
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message == "Done") {
            this.isLoading = false;
            localStorage.setItem('TS-UR', res.token); //storge token
            this._AuthService.AuthenticatedUser() // decoded token
            this._Router.navigate(['./tasks']) // redirct to tasks management 
          }
        },
        error: (err) => {
          this.isLoading = false
          this.errMessage = err.error.message
        }
      })
    }
  }
}


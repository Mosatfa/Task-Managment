import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hidePassword: boolean = false
  isLoading: boolean = false 
  errMessage: string = '' //message error

  // Collect user data for registration
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required]),
  })

  constructor(private _AuthService:AuthService,private _Router:Router){}


  //Show or hide password
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword
  }

  // Submit user data
  register(){
    if (this.registerForm.valid) {
      this.isLoading = true
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message == "Done") {
            this.isLoading = false
            this._Router.navigate(['./logIn'])
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

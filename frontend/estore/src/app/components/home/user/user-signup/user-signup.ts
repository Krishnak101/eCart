import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { User } from '../../types/user-type';
import { NgClass } from '@angular/common';
import { matchPasswords } from './validators/match-password-validator';

@Component({
  selector: 'app-user-signup',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './user-signup.html',
  styleUrl: './user-signup.css',
})
export class UserSignup {
  userSignupForm: FormGroup;
  alertMessage: string = '';
  alertType: number = 0; //0-success, 1-warning, 2-error

  constructor(private formBuilder: FormBuilder) {
    this.userSignupForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        address: [''],
        city: [''],
        state: [''],
        pin: [''],
      },
      {
        validator: matchPasswords,
      },
    );
  }
  get userName(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('username');
  }
  get email(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('email');
  }
  get password(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('password');
  }
  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('confirmPassword');
  }

  onSubmit(): void {
    if (this.userSignupForm.invalid) {
      this.alertMessage = 'Please fill all required fields correctly.';
      this.alertType = 1;
      this.userSignupForm.markAllAsTouched();
      return;
    }
  }
}

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
    this.userSignupForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
      address: [''],
      city: [''],
      state: [''],
      pin: [''],
    });
  }
  get firstName(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('firstName');
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

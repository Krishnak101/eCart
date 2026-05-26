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
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-user-signup',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './user-signup.html',
  styleUrl: './user-signup.css',
  providers: [UserService],
})
export class UserSignup {
  userSignupForm: FormGroup;
  alertMessage: string = '';
  alertType: number = 0; //0-success, 1-warning, 2-error

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
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

    const { username, email, password, address, city, state, pin } = this.userSignupForm.value;
    const newUser: User = {
      username,
      email,
      password,
      address,
      city,
      state,
      pin,
    };

    this.userSignupForm.disable();
    this.userService.createUser(newUser).subscribe({
      next: (result) => {
        this.userSignupForm.enable();
        if (result?.message === 'Account created successfully.') {
          this.alertMessage = 'User created successfully.';
          this.alertType = 0;
          this.userSignupForm.reset();
        }
      },
      error: (error: any) => {
        this.userSignupForm.enable();
        console.error('Error creating user:', error);
        if (error.error?.message === 'User already exists.') {
          this.alertMessage = error.error.message;
          this.alertType = 1;
        } else {
          this.alertMessage = error.message || 'Error creating user.';
          this.alertType = 2;
        }
      },
    });
  }
}

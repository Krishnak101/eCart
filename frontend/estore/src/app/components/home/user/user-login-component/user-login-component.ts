import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-login-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-login-component.html',
  styleUrl: './user-login-component.css',
})
export class UserLoginComponent {
  userLoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userLoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.userLoginForm.get('username');
  }

  get password() {
    return this.userLoginForm.get('password');
  }

  onSubmit(): void {
    if (this.userLoginForm.invalid) {
      return;
    }
    // Handle login logic here
    console.log(this.userLoginForm.value);
  }
}

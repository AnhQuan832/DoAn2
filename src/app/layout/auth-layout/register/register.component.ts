import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {

  constructor(
    private socialService: SocialAuthService,
    private authService: AuthService,
    private builder: FormBuilder,
    private router: Router,
  ) { }

  isSubmitted = false;
  isWrongReg = false;
  isWrongEmail = false;
  isNotVerified = false;

  registerForm = this.builder.group({
    userEmail: this.builder.control('', [Validators.required, Validators.email]),
    userPassword: this.builder.control('', [Validators.required, Validators.minLength(6)]),
    userFullname: this.builder.control('', [Validators.required]),
    userPhoneNumber: this.builder.control('', [Validators.required, Validators.pattern(/^(?:\d{9}|\d{10})$/)])
  })

  ngOnInit() {

  }

  registerNewUser() {
    this.isSubmitted = true;
    this.isWrongReg = false;
    this.authService.registerNewUser(this.registerForm.value);
  }

  clearErrorNotification() {
    console.log("cleared")
  }

  validatePassword(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    const hasNumber = /\d/.test(password); // Check for at least 1 number
    const hasLetter = /[a-zA-Z]/.test(password); // Check for at least 1 letter

    if (!hasNumber || !hasLetter) {
      return { 'passwordRequirements': true };
    }

    return null;
  }
}

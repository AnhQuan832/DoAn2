import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/service/auth.service';
import { StorageService } from 'src/app/core/service/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent {
  msgError: string;
  msgSuccess: string;
  msgErrorOTP;
  verifyEmail: boolean = false;
  otp;
  constructor(
    private socialService: SocialAuthService,
    private authService: AuthService,
    private builder: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) {}

  isSubmitted = false;

  verifyForm = this.builder.group({
    emailAddress: this.builder.control('', [
      Validators.required,
      Validators.email,
    ]),
    otp: this.builder.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  registerForm = this.builder.group({
    userEmail: this.builder.control('', [
      Validators.required,
      Validators.email,
    ]),
    userPassword: this.builder.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    userFullName: this.builder.control('', [Validators.required]),
    userPhoneNumber: this.builder.control('', [
      Validators.required,
      Validators.pattern(/^(?:\d{9}|\d{10})$/),
    ]),
  });

  ngOnInit() {}

  registerNewUser() {
    this.isSubmitted = true;
    if (this.registerForm.valid)
      this.authService.registerNewUser(this.registerForm.value).subscribe({
        next: (res) => {
          if (typeof res === 'string') {
            this.msgError = res;
            return;
          }
          this.verifyEmail = true;
          this.authService
            .sendOtpRes(this.registerForm.value.userEmail)
            .subscribe({
              next: (res) => {},
            });
        },
        error: (err) => console.log(err),
      });
  }

  clearErrorNotification() {
    this.isSubmitted = false;
    this.msgError = '';
    this.msgError = '';
  }

  validatePassword(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.value;
    const hasNumber = /\d/.test(password); // Check for at least 1 number
    const hasLetter = /[a-zA-Z]/.test(password); // Check for at least 1 letter

    if (!hasNumber || !hasLetter) {
      return { passwordRequirements: true };
    }

    return null;
  }

  verify() {
    this.verifyForm.patchValue({
      emailAddress: this.registerForm.value.userEmail,
    });
    this.authService.validateRes(this.verifyForm.value).subscribe({
      next: (res: any) => {
        if (res.meta.statusCode === '1_9_f')
          this.msgErrorOTP = res.meta.message;
        else this.msgSuccess = 'Account created';
      },
    });
  }
}

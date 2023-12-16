import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { StorageService } from 'src/app/core/service/storage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less'],
})
export class ForgotPasswordComponent {
  isSubmitted = false;
  msgError: string;
  private accessToken = '';
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  loginForm = this.builder.group({
    userEmail: this.builder.control('', [Validators.required]),
    userPassword: this.builder.control('', [Validators.required]),
  });
  ngOnInit(): void {}

  login() {
    this.isSubmitted = true;
    if (this.loginForm.valid)
      this.authService
        .login(
          this.loginForm.value.userEmail,
          this.loginForm.value.userPassword
        )
        .subscribe({
          next: (res) => {
            if (typeof res === 'string') {
              this.msgError = res;
              return;
            }
            const { jwtToken, ...userInfo } = res;
            this.storageService.setItemLocal('userInfo', userInfo);
            this.storageService.setTimeResetTokenCookie('jwtToken', jwtToken);
            this.router.navigate(['/user/home']);
          },
          error: (err) => console.log(err),
        });
  }

  clearErrorNotification() {
    this.isSubmitted = false;
  }

  emailValidator(exceptionEmail: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return { invalidEmail: true };
      } else {
        return null;
      }
    };
  }
}

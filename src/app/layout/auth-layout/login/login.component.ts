import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

import { GoogleLoginProvider, FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { StorageService } from 'src/app/core/service/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  isSubmitted = false;
  msgError: string;
  private accessToken = '';
  constructor(
    private socialLoginService: SocialAuthService,
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
  ) { }

  loginForm = this.builder.group({
    userEmail: this.builder.control('', [Validators.required]),
    userPassword: this.builder.control('', [Validators.required])
  })
  ngOnInit(): void {
    this.loginWithGoogle()
  }

  loginWithGoogle() {
    this.socialLoginService.authState.subscribe(
      (user) => {
        this.authService.loginGoogle(user).subscribe(
          response => {
            const user: any = response
            console.log(user.userRoles.includes("ROLE_SHELTER_MANAGER"))
            if (user.userRoles.includes("ROLE_SHELTER_MANAGER"))
              this.router.navigate(['/shelter/landing'])
            else
              this.router.navigate(['/user/landing'])
          }
        )
      });
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.valid)
      this.authService.login(this.loginForm.value.userEmail, this.loginForm.value.userPassword).subscribe({
        next: (res) => {
          if (typeof res === 'string') {
            this.msgError = res;
            return
          }
          const { jwtToken, ...userInfo } = res
          this.storageService.setItemLocal("userInfo", userInfo)
          this.storageService.setTimeResetTokenCookie("jwtToken", jwtToken)

          if (userInfo.userRoles[0].roleName === 'ROLE_CUSTOMER')
            this.router.navigate(['/user/home'])
          else if (userInfo.userRoles[0].roleName === 'ROLE_ADMIN')
            this.router.navigate(['/admin/dashboard'])
        },
        error: (err) => console.log(err),
      })
  }

  getAccessToken(): void {
    this.socialLoginService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(
      accessToken => this.accessToken = accessToken);
  }
  public signOut(): void {
    this.socialLoginService.signOut();
  }
  refreshToken(): void {
    this.socialLoginService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../constants/API_URL'
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${API_URL}/auth`
  constructor(
    private http: HttpClient
  ) { }

  login(userEmail, userPassword) {
    return this.http.post<User>(this.baseUrl + '/authenticate', {
      userEmail: userEmail,
      userPassword: userPassword
    })
  }

  registerNewUser(inputData) {
    console.log(inputData)
    // return (this.http.post(this.baseUrl + '/userRegister', {
    //   userEmail: inputData.userEmail,
    //   userPassword: inputData.userPassword,
    //   userFirstName: this.getFirstName(inputData.userName),
    //   userLastName: this.getLastName(inputData.userName),
    //   userPhoneNumber: inputData.phoneNumber,
    //   isSocial: false,
    //   userAvatar: ""
    // }));
  }

  async sendOTPVerifyEmail(inputData: any): Promise<any> {
    return await (this.http.post(this.baseUrl + 'otp/sendOTPConfirmEmail', {
      emailAddress: inputData,
    }
    )).toPromise();
  }

  async sendOTPForgotPassword(inputData: any): Promise<any> {
    return await (this.http.post(this.baseUrl + 'otp/sendOTPForgotPassword', {
      emailAddress: inputData.email,
    }
    )).toPromise();
  }
  async verifyEmail(inputData: any): Promise<any> {
    return await (this.http.post(this.baseUrl + 'otp/validateOTPConfirmEmail', {
      otp: inputData.otp
    }
    )).toPromise();
  }

  async verifyNewPassword(inputData: any): Promise<any> {
    const email = localStorage.getItem("validatedEmail")
    return await (this.http.post(this.baseUrl + 'otp/validateOTPForgotPassword', {
      emailAddress: email,
      otp: inputData.otp,
      newPassword: inputData.newPassword
    }
    )).toPromise();
  }

  loginGoogle(inputData: any) {
    return (this.http.post(this.baseUrl + 'auth/authenticateGoogleUser', {
      userEmail: inputData.email,
      userFirstName: inputData.firstName,
      userLastName: inputData.lastName,
      userAvatar: inputData.photoUrl
    }));

  }

  private getFirstName(userName: string) {
    return userName.slice(0, userName.indexOf(" "))
  }
  private getLastName(userName: string) {
    return userName.slice((userName.trim().indexOf(" ") + 1))
  }


}

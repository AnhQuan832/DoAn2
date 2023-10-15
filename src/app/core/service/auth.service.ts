import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AUTH_API } from '../constants/enum';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }

  login(userEmail, userPassword) {
    return this.http.post(AUTH_API.AUTHENTICATE.END_POINT.LOGIN, {
      userEmail: userEmail,
      userPassword: userPassword
    }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === AUTH_API.AUTHENTICATE.STATUS.AUTHENTICATE_SUCCESSFUL) {
          return data.data
        }
        else if (data.meta.statusCode === AUTH_API.AUTHENTICATE.STATUS.BAD_CREDENTIAL) {
          return data.data
        }
        else {
          throw new Error(data.meta)
        }
      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }

  registerNewUser(inputData) {
    console.log(inputData)
    return this.http.post(AUTH_API.AUTHENTICATE.END_POINT.REGISTER, {
      userEmail: inputData.userEmail,
      userPassword: inputData.userPassword,
      userFirstName: this.getFirstName(inputData.userFullName),
      userLastName: this.getLastName(inputData.userFullName),
      userPhoneNumber: inputData.phoneNumber,
      userAvatar: ""
    }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === AUTH_API.AUTHENTICATE.STATUS.CREATED_ACCOUNT_SUCCESSFUL) {
          return data.data
        }
        else if (data.meta.statusCode === AUTH_API.AUTHENTICATE.STATUS.ACCOUNT_EXISTED) {
          return data.data
        }
        else if (data.meta.statusCode === AUTH_API.AUTHENTICATE.STATUS.ACCOUNT_INACTIVE) {
          return data.data
        }
        else if (data.meta.statusCode === AUTH_API.AUTHENTICATE.STATUS.ACCOUNT_LOCKED) {
          return data.data
        }
        else {
          throw new Error(data.meta)
        }
      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }


  loginGoogle(inputData: any) {
    return (this.http.post(AUTH_API.AUTHENTICATE.END_POINT.GG_LOGIN, {
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

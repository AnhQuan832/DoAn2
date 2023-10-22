import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { API } from '../constants/enum';
import { StorageService } from './storage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  login(userEmail, userPassword) {
    return this.http.post(API.AUTHENTICATE.END_POINT.LOGIN, {
      userEmail: userEmail,
      userPassword: userPassword
    }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.AUTHENTICATE.STATUS.AUTHENTICATE_SUCCESSFUL) {
          return data.data.user
        }
        else if (data.meta.statusCode === API.AUTHENTICATE.STATUS.BAD_CREDENTIAL) {
          return "Wrong login information"
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
    return this.http.post(API.AUTHENTICATE.END_POINT.REGISTER, {
      userEmail: inputData.userEmail,
      userPassword: inputData.userPassword,
      userFirstName: this.getFirstName(inputData.userFullName),
      userLastName: this.getLastName(inputData.userFullName),
      userPhoneNumber: inputData.phoneNumber,
      userAvatar: ""
    }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.AUTHENTICATE.STATUS.CREATED_ACCOUNT_SUCCESSFUL) {
          return data.data
        }
        else if (data.meta.statusCode === API.AUTHENTICATE.STATUS.ACCOUNT_EXISTED) {
          return "Account existed"
        }
        else if (data.meta.statusCode === API.AUTHENTICATE.STATUS.ACCOUNT_INACTIVE) {
          return "Account was not activated"
        }
        else if (data.meta.statusCode === API.AUTHENTICATE.STATUS.ACCOUNT_LOCKED) {
          return "Account locked"
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
    return (this.http.post(API.AUTHENTICATE.END_POINT.GG_LOGIN, {
      userEmail: inputData.email,
      userFirstName: inputData.firstName,
      userLastName: inputData.lastName,
      userAvatar: inputData.photoUrl
    }));

  }



  roleMatch(allowedRoles: any): boolean {
    const userRoles: any = this.storageService.getItemLocal("userInfo").userRoles[0].roleName;
    if (userRoles != null && userRoles)
      if (userRoles.includes(allowedRoles[0]))
        return true
    return false
  }
  private getFirstName(userName: string) {
    return userName.slice(0, userName.indexOf(" "))
  }
  private getLastName(userName: string) {
    return userName.slice((userName.trim().indexOf(" ") + 1))
  }


}

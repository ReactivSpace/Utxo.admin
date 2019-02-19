import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, pipe, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';
import decode from 'jwt-decode';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private message: string;
  Error: string;
  ContactNumber: string;
  LoginObject: { 'email': any; 'password': any; };
  CoinID: any;

  constructor(private _router: Router, private Api: ApiService, private Alert: FlashMessagesService) { }

  /**
   * this is used to clear anything that needs to be removed
   */
  clear(): void {
    localStorage.clear();
  }

  /**
   * check for expiration and if token is still existing or not
   * @return {boolean}
   */
  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null && !this.isTokenExpired();
  }

  // simulate jwt token is valid
  // https://github.com/theo4u/angular4-auth/blob/master/src/app/helpers/jwt-helper.ts
  isTokenExpired(): boolean {
    return false;
  }

  // For Login
  login(email, password): void {
    this.LoginObject = { 'email': email, 'password': password };
    localStorage.clear();
    this.DefaultCoin();
    this.Api.post(environment.Login, this.LoginObject).subscribe(res => {
      // console.log('in auth sevice', res.status,res);
      if (res.status === true) {
        localStorage.setItem('token', res.token);
        // console.log(this.decode().Email);
        // this._router.navigate(['/']);
        window.location.href = '/' ;
        // this.Auth.canActivate();
      } else if (res.status === false) {
        localStorage.clear();
        this.Alert.show(res.msg, { cssClass: 'alert-danger', timeout: 3000 });
      } else {
        this.Alert.show('Somthing Went Wrong. Please Try again Later. or <b>Contact Us</b>', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  DefaultCoin() {
    this.Api.post(environment.GetAllCoins).subscribe(response => {
      this.CoinID = response.data[0].id;
      localStorage.setItem('CoinID', this.CoinID);
    });
  }

  /**
   * this is used to clear local storage and also the route to login
   */
  logout(): void {
    // console.log('hello');
    this.clear();
    // this.Alert.show('Logged Out!!!.', { cssClass: 'alert-success', timeout: 3000 });
    this._router.navigate(['login']);
    // window.location.href('login');
    window.location.href = '/';
  }

  decode() {
    return decode(localStorage.getItem('token'));
  }
}

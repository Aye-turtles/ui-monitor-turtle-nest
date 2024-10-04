import { Injectable } from '@angular/core';
import {UserRes} from "./model/userRes";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _currentUser: UserRes = {
    email: '',
    id: 1,
    isActive: false,
    isAdministrator: false,
    lastName: "undefined",
    name: "undefined",
    phone: "undefined",
    title: "undefined"
  };

  private ApiUrl = 'http://norsucio.com:8090/dbp'; // TEST URL
  //private ApiUrl = 'http://norsucio.com:8089/dbp'; // PROD URL

  get currentUser(): UserRes {
    return this._currentUser;
  }

  set currentUser(value: UserRes) {
    this._currentUser = value;
  }

  apiURL() {
    return this.ApiUrl ;
  }

  private _email: string ="a@gmail.com";
  private _isUserLogin: boolean = false;


  get isUserLogin(): boolean {
    return this._isUserLogin;
  }

  set isUserLogin(value: boolean) {
    this._isUserLogin = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  constructor() { }


}

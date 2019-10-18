import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
//import { RequestOptions } from '@angular/http';
//import {Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import "rxjs/add/operator/map";
import { Observable, throwError } from 'rxjs';
import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class UserapiService {
  baseUrl: string = environment.apiUrl;
  mongoApiUrl: string = environment.mongoApiUrl;
  //xapikey: string = environment.xapikey;

  constructor(private http: HttpClient) { }


  private jwt() {

    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    //return new RequestOptions({ headers: headers });
    var token = localStorage.getItem("jwtToken")
    let options = {};
    if (token) {
      options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' ,
          'x-access-token': token,
        }
      }
    }
    else {
      options = {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    }
    return options;

  }

  login(obj : any) {

    return this.http.post<any>(this.mongoApiUrl + `users/login`, obj, this.jwt())
      .pipe(map(user => {

        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        //var jwtToken = window.btoa(user.token);
        var jwtToken = user.token;
        localStorage.setItem('jwtToken', jwtToken);
        //this.currentUserSubject.next(user);
        return user;
      }));
  }


   //Create App User
  createAppUser(obj : any) {


    return this.http.post<any>(this.mongoApiUrl + 'Users/',obj)
      .pipe(map(data => {
        return data;
      }));
  }

  //Get App User
  GetUserList() {

    return this.http.get<any>(this.mongoApiUrl + 'Users/')
      .pipe(map(data => {
          console.log(data);
        return data;
      }));
  }

  // Delete User

  DeleteUser(obj : any) {


    return this.http.delete<any>(this.mongoApiUrl + "Users/" + obj.id)
      .pipe(map(data => {
        return data;
      }));
  }

  // Update User
  UpdateUser(obj : any) {


    return this.http.put<any>(this.mongoApiUrl + `Users/`, obj)
      .pipe(map(data => {
        return data;
      }));
  }

 }

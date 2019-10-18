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
export class ProjectapiService {
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


    // Create Project

  createProject(obj : any) {
    return this.http.post<any>(this.mongoApiUrl + `Projects/`, obj)
      .pipe(map(data => {


        return data;
      }));
  }

  // Delete Project

  DeleteProject(obj : any) {
     return this.http.delete(this.mongoApiUrl + "Projects/"+ obj.id)
      .pipe(map(data => {

        return data;
      }));
  }

  // Update Project

  UpdateProject(obj : any) {
    return this.http.put<any>(this.mongoApiUrl + `Projects/`,obj)
      .pipe(map(data => {


        return data;
      }));
  }

  //Get Project

  GetProjectList() {
    return this.http.get<any>(this.mongoApiUrl + `Projects/`)
      .pipe(map(data => {
          console.log(data);
        return data;
      }));
  }

 }

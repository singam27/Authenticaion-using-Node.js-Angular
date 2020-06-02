import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = environment.baseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, private router: Router) { }

  //retirves the token from local storage
  public getToken() {
    return localStorage.getItem('access_token');
  }

  //check whether the email exists or not
  checkEmail(email) {
    let url = `${this.baseUrl}/email`;
    return this.http.post(url, email).pipe(catchError(this.handleError));
  }

  //Registering the user
  registerUser(user): Observable<any> {

    let url = `${this.baseUrl}/register`;
    return this.http.post(url, user).pipe(catchError(this.handleError));
  }

  //user login
  loginUser(user) {

    let url = `${this.baseUrl}/login`;

    return this.http.post(url, user).pipe(catchError(this.handleError))
      .subscribe((res: any) => {
        if (res.message) {
          window.alert(res.message)
        }

        localStorage.setItem('access_token', res.token)

        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['user-profile/' + res.msg._id]);
        })
      })

  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.baseUrl}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }


  //checking whether the user is logged or not
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token')
    return (authToken !== null) ? true : false;

  }


  //handling errors
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      //client-side error
      msg = error.error.message;
    }
    else {
      //server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log("message from server", error)

    }

    return throwError(msg);

  }

  //logout User
  logoutUser() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate([''])
    }

  }


}

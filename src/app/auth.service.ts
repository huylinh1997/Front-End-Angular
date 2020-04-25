import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { $ } from 'protractor';

interface myData {
  message: boolean,
  id: number,
  username: string,
  email: string,
  token: string
}

interface token {
  access_token: string
}

interface response {
  username: string
}

interface student {
  name: string
  email: string
  id: number
  classname: string
  date_of_birth: Date
}

@Injectable()
export class AuthService {

  private loginStatus = false
  constructor(private http: HttpClient, private route: Router) { }

  setLoginStatus(value: boolean) {
    this.loginStatus = value
  }

  getLoginStatus() {
    return this.loginStatus
  }

  getAllStudent() {
    return this.http.get('https://backendflaskapp.herokuapp.com/api/student')
  }

  getStudentById(id) {
    return this.http.get<student>('https://backendflaskapp.herokuapp.com/api/student/' + `${id}`)
  }

  register(username, email, password) {
    return this.http.post('https://backendflaskapp.herokuapp.com/api/register', { username, email, password })
  }

  updateStudentbyId(id, name, email, classname, date_of_birth) {
    return this.http.put('https://backendflaskapp.herokuapp.com/api/student/' + `${id}`, { name, email, classname, date_of_birth })
  }

  createStudent(name, email, classname, date_of_birth) {
    return this.http.post('https://backendflaskapp.herokuapp.com/api/student', { name, email, classname, date_of_birth })
  }

  deleteStudentbyId(id) {
    return this.http.delete('https://backendflaskapp.herokuapp.com/api/student/' + `${id}`)
  }

  loginStudent(email, password) {
    return this.http.post<token>('https://backendflaskapp.herokuapp.com/api/login', { email, password })
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
import { HttpErrorInterceptor } from './../Object.interceptor';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private route: Router) { }

  ngOnInit() {

    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pw: this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      })
    })
  }

  onSubmit() {
    const email = this.form.get('email').value
    const username = this.form.get('username').value
    const password = this.form.get('pw').get('password').value
    const confirmPassWord = this.form.get('pw').get('confirmPassword').value

    console.log(+ "ddhahaha");

    if (this.form.valid) {
      if (password === confirmPassWord) {

        this.auth.register(username, email, password).subscribe(data => {
          if(data){
            if (window.confirm("Register Successfully, Login Now")) {
              this.route.navigate(['loginForm'])
            }
          }
        })

      } else {
        window.alert("Confirm password wrong")
      }
    }
    else {
      window.alert("Please check information again")
    }
  }
  
  // handleError(error: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     errorMessage = error.error['msg']
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }
}

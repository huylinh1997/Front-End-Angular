import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  form: FormGroup;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  isNull: any

  onSubmit() {
    this.submitted = true;
    const email = this.form.get('email').value
    const password = this.form.get('password').value
    console.log(email, password);
    this.isNull = this.form.get('email').hasError('required')

    if (this.form.invalid) {
      return;
    }

    if (this.form.valid) {
      this.auth.loginStudent(email, password).subscribe(data => {
        if (data) {
          if (data.access_token) {
            console.log(data.access_token)
            localStorage.setItem('token', data.access_token)
            this.router.navigate(['admin'])
          }
        } else {
          window.alert("Wrong Email Or PassWord")
        }
      }
      )
    }

    else {
      window.alert("Check information")
    }
  }

  // handleError(error: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = error.error['msg']
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

}

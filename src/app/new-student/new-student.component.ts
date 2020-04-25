import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { delay, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      classname: ['', Validators.required],
      date_of_birth: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email').value
      const name = this.form.get('name').value
      const classname = this.form.get('classname').value
      const date_of_birth = this.form.get('date_of_birth').value

      this.auth.createStudent(name, email, classname, date_of_birth).subscribe(data => {
        if (window.confirm("Create Successfully")) {
          this.router.navigate(['admin'])
        }
      })
    }
    else {
      window.alert("Please fill up required information")
    }
  }

  // handleError(error: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // errorMessage = error.error['msg']
  //     console.log(error.error);
      
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }


}

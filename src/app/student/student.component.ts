import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {


  heroes: Observable<any>
  idStudent: any
  form: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: ActivatedRoute, private route: Router) { }

  loadData() {
    this.idStudent = this.router.snapshot.paramMap.get('id');
    console.log(this.idStudent);
    this.auth.getStudentById(this.idStudent).subscribe(data => {
      this.form.get('name').setValue(data.name)
      this.form.get('email').setValue(data.email)
      this.form.get('date_of_birth').setValue(data.date_of_birth)
      this.form.get('classname').setValue(data.classname)
      this.idStudent = data.id
    })
  }
  ngOnInit() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      classname: ['', Validators.required],
      date_of_birth: ['', Validators.required],
    })

    this.loadData()
  }

  onSubmit() {
    const email = this.form.get('email').value
    const name = this.form.get('name').value
    const classname = this.form.get('classname').value
    const date_of_birth = this.form.get('date_of_birth').value

    this.auth.updateStudentbyId(this.idStudent, name, email, classname, date_of_birth).subscribe(data => {
      if (data) {
        if (window.confirm("Update Successfully")) {
          this.route.navigate(['admin'])
        }
      }
    })
  }

  deleteStudent() {
    this.auth.deleteStudentbyId(this.idStudent).subscribe(data => {
      console.log(data);
      window.alert("Delete Successfully")
    })
  }

}

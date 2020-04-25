import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ok } from 'assert';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  students: any

  constructor(private auth: AuthService, private http: HttpClient, private route: Router) { }

  getData() {
    this.auth.getAllStudent().subscribe(data => {
      this.students = data
    })
  }

  ngOnInit() {
    this.getData();
  }

  deleteStudent(id) {
    if(window.confirm("Delete This Student ??"))
    {
      this.auth.deleteStudentbyId(id).subscribe(data => {
        console.log(data);
      })
      this.ngOnInit();
    }
  }
}

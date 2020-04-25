
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { HttpErrorInterceptor } from './Object.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AdminComponent,
    StudentComponent,
    RegisterFormComponent,
    LoginFormComponent,
    NewStudentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
      { path: 'registerForm', component: RegisterFormComponent },
      { path: 'loginForm', component: LoginFormComponent },
      { path: 'admin/student/:id', component: StudentComponent },
      { path: 'newStudent', component: NewStudentComponent }
    ])
  ],
  providers: [AuthService, AuthGuard, UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface myData {
  message: string,
  success: boolean
}

interface loginStatus {
  status : boolean
}

// interface logoutStatus {
//   success: boolean
// }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  isLoggedIn(): Observable<loginStatus> {
    return this.http.get<loginStatus>('https://backendflaskapp.herokuapp.com/api/islogin')
  }
}

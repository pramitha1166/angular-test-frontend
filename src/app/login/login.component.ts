import { NgForm } from '@angular/forms';
import { Component } from "@angular/core";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private _auth:AuthService, private _router: Router) {}

  loginUserData = {}

  onLogin(form: NgForm) {
    this.loginUserData = {
      email: form.value.email,
      password: form.value.password
    }

    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate([''])
      },
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            alert('Unauthorized User! Please Enter Valid Email and Password')
          }
        }
      }
    )
  }

}

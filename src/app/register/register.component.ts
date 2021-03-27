import { HttpErrorResponse } from '@angular/common/http';
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private _auth: AuthService, private _router: Router) {}

  registerUserData = {}

  onRegister(form: NgForm) {

    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(form.value.email)) {
      alert('Invalid Email! Please enter valid email address.')
    }else {
      this.registerUserData = {
        email: form.value.email,
        password: form.value.password
      }
      this._auth.registerUser(this.registerUserData).subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this._router.navigate([''])
        },
        err => {
          if(err instanceof HttpErrorResponse) {
            if(err.status===403) {
              alert('This Email Already Exists! Try Different')
            }
          }
        }
      )
    }


    //console.log(this.registerUserData)
  }

}

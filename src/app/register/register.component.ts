import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private _auth: AuthService) {}

  registerUserData = {}

  onRegister(form: NgForm) {
    this.registerUserData = {
      email: form.value.email,
      password: form.value.password
    }
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
      },
      err => console.log(err)
    )
    //console.log(this.registerUserData)
  }

}

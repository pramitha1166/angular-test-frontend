import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myapp';

  constructor(public _authservice: AuthService, private _router: Router) {}

  logout() {
    localStorage.removeItem('token')
    this._router.navigate(['login'])
  }

}

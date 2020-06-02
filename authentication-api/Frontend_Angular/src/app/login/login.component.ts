import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { faSignInAlt, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  registerSign = faSignInAlt;
  loginSign = faLock;

  constructor(public dailog: MatDialog) { }

  ngOnInit(): void {
  }

  loginDialog() {
    this.dailog.open(LoginDialogComponent, {
      height: '45%',
      width: '55%'
    });
  }

  registerDialog() {
    this.dailog.open(RegisterDialogComponent, {
      height: '50%',
      width: '50%'
    });
  }

}

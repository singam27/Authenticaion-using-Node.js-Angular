import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog'


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor(public loginDialogRef: MatDialogRef<LoginDialogComponent>, private userService: UserService) { 
    loginDialogRef.disableClose = true;
  }

  ngOnInit() { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  loginUser() {
    this.userService.loginUser(this.loginForm.value);
    this.loginDialogRef.close();
  }
  closeDialog(){
    this.loginDialogRef.close();
  }
}





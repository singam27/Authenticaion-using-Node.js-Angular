import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  emailAlreadyExist: any;

  constructor(private snackbar: MatSnackBar,
    private _userService: UserService,
    private router: Router,
    private dialogRef: MatDialogRef<RegisterDialogComponent>) { dialogRef.disableClose = true; }

  ngOnInit(): void {
  }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  registerUser() {

    this._userService.checkEmail(this.registerForm.value).subscribe((data) => {
      this.emailAlreadyExist = data;
      if (this.emailAlreadyExist.message == true) {
        window.alert("Email Already Exists!!. Please try with different email address");
      }
      else {
        this._userService.registerUser(this.registerForm.value).subscribe((data) => {
          this.snackbar.open(data.message, '', { duration: 2000, });
          this.dialogRef.close();
        }, (error) => {
          alert(error);
          this.registerForm.reset();
        })

      }

    });

  }

  closeDialog(){
    this.dialogRef.close();
  }
}

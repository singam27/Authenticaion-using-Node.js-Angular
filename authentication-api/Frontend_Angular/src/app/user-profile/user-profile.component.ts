import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userId: String;
  userDetails;
  presentTime: number = Date.now();
  token: String;

  constructor(public _userService: UserService, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {

    this.token = this._userService.getToken();

    this._userService.getUserProfile(this.userId).subscribe((data) => {
      console.log("userdata", data)
      this.userDetails = data;
    });

  }

  logout() {
    console.log("userid of a user", this.userId);
    this._userService.logoutUser();
  }



}

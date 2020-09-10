import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userModel } from '../userModel';
import { UsersServiceService } from '../users-service.service';

//DashboardComponent - table of users
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userList: userModel[];
  constructor(
    private userService: UsersServiceService,
    private router: Router
  ) {}

  //Soft deletes the user document and gets latest user list
  handleDelete(_id: string) {
    this.userService.deleteUser(_id).subscribe(() => {
      this.userService
        .getUsersList()
        .subscribe((users) => (this.userList = users));
    });
  }

  //redirects to edit-user form with selected user id
  handleEdit(_id: string) {
    this.router.navigate(['/edit-user', _id]);
  }

  //gets users on init
  ngOnInit() {
    this.userService
      .getUsersList()
      .subscribe((users) => (this.userList = users));
  }
}

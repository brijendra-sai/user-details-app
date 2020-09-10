import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { userModel } from '../userModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersServiceService } from '../users-service.service';

//User form component is used for both creating and updating user documents
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  
  //takes values "create" or "update" based on what the form is doing
  formFunction: string;

  //id from url-parameter in case of updating, else undefined
  _id: string;

  //user object to store values for form
  user: userModel = new userModel();
  constructor(
    private userService: UsersServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //gets id parameter from url
    this.activatedRoute.params.subscribe((params) => {
      this._id = params['id'];
    });

    //if id is defined(in case of updating) gets that user document or initialize empty user object
    if (this._id) {
      this.formFunction = 'Update';
      this.userService
        .getUser(this._id)
        .subscribe((user) => (this.user = user));
    } else {
      this.formFunction = 'Create';
      this.user = {
        firstName: '',
        lastName: '',
        email: '',
        status: true,
        deleted: false,
      };
    }
    console.log(this.user);
  }

  //toggles status value in user object
  toggleStatus(): void {
    this.userForm.patchValue({
      status: !this.user.status,
    });
  }

  //validators for the user form
  userForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(150),
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(150),
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.max(9999999999),
      Validators.min(1000000000),
    ]),
    status: new FormControl(true),
  });

  //updates or creates user, logs and calls user service to make necessary changes in db
  onSubmit() {
    console.log('values', this.user);

    if (this.formFunction == 'Update') {
      console.log('Updated');
      this.userService.updateUser(this._id, this.user).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      console.log('Submitted');
      this.userService.addUser(this.user).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}

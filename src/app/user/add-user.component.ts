import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User, UserRole } from '../models/user.model';
import { UserService } from './user.service';
import { AppConstants} from '../app.constants';
import { UserListComponent} from './user-list.component';

@Component({
  templateUrl: './add-user.component.html',
})
export class AddUserComponent  implements OnInit, AfterViewInit {
  registerForm: FormGroup;
  added = false;

  private user: any
  private userRoles: UserRole[];
  private batchSubmitReady: boolean = false;
  private nextBatchReady: boolean = true;
 
  @ViewChild(UserListComponent, {static : false}) userListComponent;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.userRoles = Object.keys(UserRole).map(key => UserRole[key]);
    this.batchSubmitReady = false;
  }

  ngOnInit() {
        this.registerForm = this.formBuilder.group({
            roles: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('[0-9]{8,12}')]]
        });
  }

  ngAfterViewInit() {
  }

  get f() { 
      return this.registerForm.controls; 
  }

  onSubmit() {
        this.added = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.user = this.registerForm.value;
        this.addUser();
  }

  addUser(): void {
    if (this.nextBatchReady) {
      this.userListComponent.users = this.userService.clearUsers();
      this.userListComponent.success = false;
      this.nextBatchReady = false;
    }
    this.userService.addUser(this.user);
    this.user = new User();
    this.added = false;
    this.registerForm.reset(this.user);
    if (this.userService.getUsers().length >= AppConstants.BATCH_SUBMIT_LIMIT) {
      this.batchSubmitReady = true;
    }
  };

  receiveAfterSubmit($event) {
    if ($event == true) {
      //alert("done!");
      this.batchSubmitReady = false;
      this.nextBatchReady = true
    }
  }

}

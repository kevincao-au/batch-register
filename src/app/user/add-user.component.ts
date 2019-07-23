import { Component, AfterViewInit, ViewChild, Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User, UserRole } from '../models/user.model';
import { UserService } from './user.service';
import {UserListComponent} from './user-list.component';


@Component({
  templateUrl: './add-user.component.html',
})
export class AddUserComponent  implements OnInit {
  registerForm: FormGroup;
  added = false;

  private user: any
  private userRoles: UserRole[];
  private batchSubmitReady: boolean = false;
 
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

  get f() { 
      return this.registerForm.controls; 
  }

  onSubmit() {
        this.added = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.user = this.registerForm.value;
        this.addUser();
  }

  addUser(): void {
    this.userService.addUser(this.user);
    this.user = new User();
    this.added = false;
    this.registerForm.reset(this.user);
  };

  message: string;

  receiveMessage($event) {
    console.log($event);
    this.message = $event
  }


}

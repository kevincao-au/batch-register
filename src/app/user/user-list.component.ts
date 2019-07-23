import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { UserService } from './user.service';
import {AddUserComponent} from './add-user.component';
import { EventEmitter } from 'events';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styles: []
})

export class UserListComponent implements OnInit {


  users: User[];
  submitLimit: number = 2;
  success: boolean = false;
  afterSubmissionMessage: string;

 //@Output() messageEvent = new EventEmitter();
  
  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.users = this.userService.getUsers()
  };

  

  submitBatch() : void {
    //console.log("submit batch");
    //this.userService.submitUsers(this.users).subscribe( data => {
        this.success = true;
        this.users = this.userService.clearUsers();
        this.afterSubmissionMessage = "Multipe Users Submit Successfully."
    //}, (err) => {
    //    this.success = false;
     //   this.afterSubmissionMessage = "Multipe Users Submit Failed! (" + err + ")"
    //});
    
  }

  // sendMessage() {
  //     this.messageEvent.emit("okay");
  // }


}



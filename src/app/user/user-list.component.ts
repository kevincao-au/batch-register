import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { UserService } from './user.service';
import { AppConstants} from '../app.constants';


@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styles: []
})

export class UserListComponent implements OnInit {


  users: User[];
  submitLimit: number = 5;
  success: boolean = false;
  afterSubmissionMessage: string;
  
  @Output()
  afterSubmitEvent: EventEmitter<any>;

  constructor(private router: Router, private userService: UserService) {
    this.submitLimit = AppConstants.BATCH_SUBMIT_LIMIT;
    this.afterSubmitEvent = new EventEmitter<any>();
  }

  ngOnInit() {
    this.users = this.userService.getUsers()
  };

  

  submitBatch() : void {
    //console.log("submit batch");
    this.userService.submitUsers(this.users).subscribe( data => {
        this.success = true;
        this.afterSubmissionMessage = "Multipe Users Submit Successfully."
        this.triggerAfterSubmitEvent(true);
    }, (err) => {
        this.success = false;
        this.afterSubmissionMessage = "Multipe Users Submit Failed! (" + err + ")"
        this.triggerAfterSubmitEvent(false);
    });
        
  }

  triggerAfterSubmitEvent(success: boolean) {
    this.afterSubmitEvent.emit(success);
  }

}



import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http:HttpClient) {}

  private userUrl = 'http://localhost:4200/batchRegister';

  list = [];

  addUser(user) {
    this.list.push(user);
  }

  getUsers() {
    return this.list;
  }


  clearUsers() {
    this.list = [];
    return this.list;
  }


  public submitUsers(users: User[]) {
    console.log("Users :" + users);
    return this.http.put<User>(this.userUrl, users);
    
  }

}

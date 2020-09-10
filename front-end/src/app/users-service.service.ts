import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { userModel } from './userModel';

//User Api service
@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  //api URL
  apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getUsersList() {
    return this.http.get<userModel[]>(`${this.apiUrl}/users`)    
  }

  getUser(_id: string){
    return this.http.get<userModel>(`${this.apiUrl}/users/${_id}`);
  }

  updateUser(_id: string,user: userModel) {
    return this.http.patch(`${this.apiUrl}/users/${_id}`,user);
  }

  deleteUser(_id: string) {
    return this.http.patch(`${this.apiUrl}/users/${_id}`, {deleted: true});
  }
  
  addUser(user: userModel) {
    return this.http.post(`${this.apiUrl}/users`,user)
  }
}

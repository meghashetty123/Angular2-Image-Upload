import { Component } from '@angular/core';
import {UserService} from "./services/user.service";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works';
  users;

  constructor(private userService: UserService){
  
  }
  ngOnInit()
  {
    //this.userService.getUsers().subscribe(p=>this.users = p);
    console.log("Service Response",this.userService.getUsers().subscribe(p=>this.users = p));
  }
 
 

}

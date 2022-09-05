import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  username!:string|null

  constructor() { }

  ngOnInit(): void {
    this.username=localStorage.getItem('name') as string
    
  }

}

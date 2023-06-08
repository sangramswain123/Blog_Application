import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router ,private apiService: ApiService ) {  }

  ngOnInit(): void {}

  createBlog(){
    this.router.navigate(['/create']) ;
  }  

}

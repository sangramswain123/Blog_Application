import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  posts: Post[] = [];

  post: any = {};
  constructor(private router: Router ,private apiService: ApiService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.apiService.getAllPost().subscribe(
      (response: Post[]) => {
        this.posts = response;
        console.log(this.posts);
      },
      (error) => {
        console.log('Error fetching posts:', error);
      }
    );
  }

  }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post.model';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  
})
export class PostComponent implements OnInit {
  post: {
    [key: string]: string | Date;
    title: string;
    description: string;
    picture: string;
    email: string;
    categories: string;
    createdDate: Date;
  } = {
    title: '',
    description: '',
    picture: '',
    email: '',
    categories: '',
    createdDate: new Date()
  };
  posts: Post[] = [];
  category: string = '';
  file: any;
  url: string ='';
  
 
  constructor(private apiService: ApiService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'] || '';

      this.getPosts();
      
    });
  }
  
 
  getPosts(): void {
    this.apiService.getAllPosts({ category: this.category }).subscribe(
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

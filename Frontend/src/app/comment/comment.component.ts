import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments: any[] = [];
  comment = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
  };
  
  account: any = {
    email : '',
    name : ''
  };
  id: string = '';

  commentControl = new FormControl();
  constructor(private apiService: ApiService ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.account.email = localStorage.getItem('email') ?? '';
    this.account.name = localStorage.getItem('name') ?? '';
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getAllComments();
  }

  createComment() {
    this.comment.name = this.account.name;
    this.comment.postId = this.id;
    this.comment.comments = this.commentControl.value;
    this.apiService.createComment(this.comment).subscribe(() => {
      this.commentControl.reset();
      this.getAllComments();
    });
  }

  getAllComments() {
    this.apiService.getAllComments(this.id).subscribe(
      response => {
      this.comments = response;
      console.log(this.comments);
    },
    error => {
      console.log('inside error');
      console.log(error);
    }
    );
  }

  deleteComment(commentId: string) {
    this.apiService.deleteComment(commentId).subscribe(() => {
      this.getAllComments();
    });
  }

}

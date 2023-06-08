import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  url: string = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
  post: any = {};
  
    account = {
    email : '',
    name : ''
  };

  id: string='';

  constructor(private apiService: ApiService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchPostData(this.id);
    });

    this.account.email = localStorage.getItem('email') ?? '';
    this.account.name = localStorage.getItem('name') ?? '';
  }

  fetchPostData(id:string): void {
    this.apiService.getPostById(id).subscribe(
      response => {
          this.post = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteBlog(){
    this.apiService.deletePost(this.post._id).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  post: any;
  file: any;
  imageURL: string = '';
  url: string = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8';
  id:string ='';

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchData(this.id);
    });
  }

  fetchData(id: any): void {
    this.apiService.getPostById(id).subscribe(response => {
        this.post = response;
    },
    error => {
      console.log(error);
    });
  }


  updateBlogPost(): void {
    this.apiService.updatePost(this.post , this.post._id).subscribe(() => {
      this.router.navigate(['/home/details', this.post._id]);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  uploadSuccess = false;
  uploadError = false;

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

  file: any;
  url: string ='';
  data:any;
  response:any;


  constructor(private apiService: ApiService, private router : Router) { }

  ngOnInit(): void {
    this.url =
      this.post.picture ||
      'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
      
    this.post.categories = this.router.parseUrl(this.router.url).queryParams['categories'] || 'All';
    this.post.email = localStorage.getItem('email') ?? '';
  }


  savePost() {
    this.apiService.createPost(this.post)
    .then(() => this.router.navigate(['/home']))
    .catch((error) => console.error(error));
  }

  handleChange(event: any) {
    this.post[event.target.name] = event.target.value;
  }

  handleFileInput(event: any) {
    this.file = event.target.files[0];
  }

  async getImage() {
    if (this.file) {
      const data = new FormData();
      data.append('name', this.file.name);
      data.append('file', this.file);
      console.log(data);
      try {
       this.response  = await this.apiService.uploadFile(data);
          console.log(this.response);
          this.post.picture = this.response;
      } catch (error) {
        console.error(error);
      }
    }
  }


}

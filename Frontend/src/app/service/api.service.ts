import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  signupUser(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/signup', user);
  } 

  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/login', credentials);
  }

  createPost(post: any) {
    const url = `${this.baseUrl}/create`;
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post(url, post,{headers}).toPromise();
  }

  getAllPosts(params : any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get('http://localhost:3000/posts', {params , headers});
  }

  getAllPost(): Observable<any> {
    console.log('inside aetAllpost');
    return this.http.get('http://localhost:3000/postsAll');
  }
  viewPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/viewpost/${id}`);
  }



  getPostById(id: string): Observable<Post> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Post>(`${this.baseUrl}/post/${id}`, {headers});
  }

  deletePost(id: string): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`,{headers});
  }

  updatePost(post: any , id: string): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.put(`${this.baseUrl}/update/${id}`, post,{headers});
  }

  createComment(comment: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<any>(`${this.baseUrl}/comment/new`, comment,{headers});
  }

  getAllComments(Id: string): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<any>(`${this.baseUrl}/comments/${Id}`,{headers});
  }

  deleteComment(Id: string): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete<any>(`${this.baseUrl}/comment/delete/${Id}`,{headers} );
  }

}

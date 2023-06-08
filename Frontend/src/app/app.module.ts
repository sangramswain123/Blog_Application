import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import {MatIconModule} from '@angular/material/icon';
import { CategoriesComponent } from './categories/categories.component';
import { PostComponent } from './post/post.component';
import { DetailsComponent } from './details/details.component';
import { UpdateComponent } from './update/update.component';
import { CommentComponent } from './comment/comment.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    ViewComponent,
    CreateComponent,
    CategoriesComponent,
    PostComponent,
    DetailsComponent,
    UpdateComponent,
    CommentComponent,
    ViewDetailsComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateComponent } from './update/update.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path:'',
    component:ViewComponent
  },
  {
    path:'login',
    component:SignupComponent
  },
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'about',
    component : AboutComponent
  },
  {
    path : 'contact',
    component : ContactComponent
  },
  {
    path : 'create',
    component : CreateComponent
  },
  {
    path: 'home/details/:id' ,
    component : DetailsComponent
  },
  {
    path: 'update/:id',
    component : UpdateComponent
  },
  {
    path: 'viewdetails/:id',
    component : ViewDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {LoginComponent} from "./pages/login/login.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {NestsComponent} from "./pages/nests/nests.component";
import {CreateNestComponent} from "./pages/nests/create-nest/create-nest.component";
import {NestInfoComponent} from "./pages/nests/nest-info/nest-info.component";
import {ShowUsersComponent} from "./pages/users/show-users/show-users.component";
import {CreateUsersComponent} from "./pages/users/create-users/create-users.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'homepage', component: HomepageComponent},
  {
    path: 'nidos', children: [
      {path: '', component: NestsComponent, pathMatch: 'full'},
      {path: 'crear', component: CreateNestComponent, pathMatch: 'full'},
      {path: ':id', component: CreateNestComponent},
      {path: 'info/:id', component: NestInfoComponent}
    ]
  },
  {
    path: 'usuarios', children:[
      {path: '', component: ShowUsersComponent},
      {path: ':id', component: CreateUsersComponent},
      {path: 'crear', component: CreateUsersComponent}
    ]
  }


];

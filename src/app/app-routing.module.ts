import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/users/login/login.component";
import {RegisterComponent} from "./components/users/register/register.component";
import {NotfoundComponent} from "./components/notfound/notfound.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProfilePageComponent} from "./components/users/profile-page/profile-page.component";
import {AppLayoutComponent} from "./components/layouts/app-layout/app-layout.component";
import {HomeComponent} from "./components/home/home.component";
import {TierListDetailsComponent} from "./components/tierlist/tier-list-details/tier-list-details.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'tier-list/:id', component: TierListDetailsComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard], pathMatch: "full"  },
      { path: '', component: HomeComponent, canActivate: [AuthGuard], pathMatch: "full"  },
    ]
  },
  { path: '**', component: NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

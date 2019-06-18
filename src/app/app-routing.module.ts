import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { BookingComponent } from './booking';
import { PublishComponent } from './publish';
import { GrillsComponent } from './grills';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'publish', component: PublishComponent, canActivate: [AuthGuard] },
  { path: 'grills', component: GrillsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' } // otherwise redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

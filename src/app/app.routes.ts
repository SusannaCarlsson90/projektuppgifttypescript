import { Routes } from '@angular/router';
import { Myschedule } from './pages/myschedule/myschedule';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "myschedule", component: Myschedule},
  { path: "**", redirectTo: "", pathMatch: "full"}
];

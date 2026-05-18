import { Routes } from '@angular/router';
import { Myschedule } from './pages/myschedule/myschedule';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: "", component: Home},
  { path: "", component: Myschedule}
];

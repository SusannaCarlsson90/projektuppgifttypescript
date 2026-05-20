import { Injectable, signal, computed } from '@angular/core';
import { Course } from '../models/courses';

@Injectable({
  providedIn: 'root',
})
export class Schedule {
  private scheduledCourses = signal<Course[]>([]); //Sparar listan med valda kurser när användaren ska skapa sitt eget schema
  courses = this.scheduledCourses.asReadonly();
}

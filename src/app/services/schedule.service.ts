import { Injectable, signal, computed } from '@angular/core';
import { Course } from '../models/courses';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private scheduledCourses = signal<Course[]>([]); //Sparar listan med valda kurser när användaren ska skapa sitt eget schema
  courses = this.scheduledCourses.asReadonly();

  //Funktion som lägger till en kurs i listan 
  addCourse(course: Course) {
    this.scheduledCourses.update(list => [...list, course]);
  }

//Funktion som tar bort en kurs
removeCourse(courseCode: string) {
  this.scheduledCourses.update(list => list.filter(c => c.courseCode !== courseCode));
}
}


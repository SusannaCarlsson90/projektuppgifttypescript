import { Injectable, signal, effect, inject } from '@angular/core';
import { Course } from '../models/courses';
import { LocalStorageService } from './local-storage.service'; 
import { Myschedule } from '../pages/myschedule/myschedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private storage = inject(LocalStorageService);

  //Ladda in från localStorage direkt vid start
  private scheduledCourses = signal<Course[]>(this.storage.getItem<Course[]>('mySchedule') || []);

  courses = this.scheduledCourses.asReadonly();

  constructor() {
    effect(() => {
      const courses = this.scheduledCourses();
      this.storage.setItem('mySchedule', courses);
    });
  }

  //Funktion som lägger till en kurs i listan 
  addCourse(course: Course) {
    //Finns kursen redan tillagd i listan?
    const exists = this.scheduledCourses().some(c => c.courseCode === course.courseCode);
    if (!exists) { // om den inte finns lägg till den
      this.scheduledCourses.update(list => [...list, course]);
      return true; //Lyckades
    } else {
      //popup denna kurs finns redan tillagd
      return false;
    }
  }

  //Funktion som tar bort en kurs
  removeCourse(courseCode: string) {
    this.scheduledCourses.update(list => list.filter(c => c.courseCode !== courseCode));
  }
}
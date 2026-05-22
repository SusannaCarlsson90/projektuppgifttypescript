import { Injectable, signal, computed } from '@angular/core';
import { Course } from '../models/courses';
import { LocalStorageService } from './local-storage.service'; // Importerar min service 

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private scheduledCourses = signal<Course[]>([]); //Sparar listan med valda kurser när användaren ska skapa sitt eget schema
  courses = this.scheduledCourses.asReadonly();

  //Funktion som lägger till en kurs i listan 
  addCourse(course: Course) {
    //Finns kursen redan tillagd i listan?
    const exists = this.scheduledCourses().some(c=> c.courseCode === course.courseCode);
    if(!exists) { // om den inte finns lägg till den
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


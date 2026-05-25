import { Component, inject } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-myschedule',
  imports: [],
  templateUrl: './myschedule.html',
  styleUrl: './myschedule.css',
})
export class Myschedule {
  // Injicerar service och döper till scheduleService
  protected scheduleService = inject(ScheduleService);

  scheduledCourses = this.scheduleService.courses;

  removeCourse(courseCode: string) {
    this.scheduleService.removeCourse(courseCode);
  }
}
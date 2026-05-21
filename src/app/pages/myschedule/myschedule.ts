import { Component, inject } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-myschedule',
  imports: [],
  templateUrl: './myschedule.html',
  styleUrl: './myschedule.css',
})
export class Myschedule {
  scheduledCourses = inject(ScheduleService).courses;

  private scheduleService = inject(ScheduleService);

removeCourse(courseCode: string) {
  this.scheduleService.removeCourse(courseCode);
}
}

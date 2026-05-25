import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { Course } from '../../models/courses'; // Mitt interface
import { CourseService } from '../../services/course.service'; // Min service course.ts
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../../services/schedule.service';



@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit { //Skapar tre signalar: courses, error och serchTerm. 
 courses = signal<Course[]>([]);
  error = signal<string | null>(null);
  searchTerm = signal<string>('')// En "behållare" som sparar texten användaren skriver i sökrutan
  selectedSubject = signal<string>('');
  displayCount = signal(50); //Gräns för hur många kurser som visas samtidigt pga. allt gick så långsamt 

  filteredCourses = computed(() => { //Computed skapar en ny lista som håller koll på de andra signalerna. 
    const term = this.searchTerm().toLowerCase(); // Hämtar sökordet och gör om till små bokstäver oavsett hur användaren skriver
    const subject = this.selectedSubject(); //Hämtar värdet från signalen
    let list = this.courses(); // Hämtar alla kurser 

    //Filtrera på sökord (kod eller namn)
    if (term) {
      list = list.filter(course => 
        course.courseCode.toLowerCase().includes(term) ||
        course.courseName.toLowerCase().includes(term)
      );
    }

    //Filtrera på ämne

    if (subject) {
      list = list.filter(course => course.subject === subject);
    }
    return list.slice(0, this.displayCount()); 
  });

  uniqueSubjects = computed(() => {
    //Plockar ut alla ämnen från alla kurser
    const subjects = this.courses().map(course => course.subject);
  
    return [...new Set(subjects)].sort();  //Skapar en "Set" för att bara behålla unika värden (tar bort dubbletter), och gör om tillbaka till en array och sortera 
  });
  
  courseService = inject(CourseService); //Kopplar på kurs-service
  private scheduleService = inject(ScheduleService);

  addToSchedule(course: Course) { //Anropar ScheduleService för att spara kursen i det centrala schemat (Schedule service)
    const success = this.scheduleService.addCourse(course);
    if(!success) {
      alert("Kursen finns redan i ditt schema");
    }
  }
  ngOnInit() {
  this.loadCourses();
  }

//Funktion som anropar servicen och sparar kurserna i min signal
  loadCourses() { this.courseService.getCourses().subscribe({
    next:(response: any) => {
      this.courses.set(response);
      console.table(this.courses());
    },
    error: (err: any) => {
      console.error(err);
      this.error.set("Kunde inte ladda kurserna, försök igen senare");
    }
  });
}
//Metod för sökning
  handleSearch(event: Event) {
    const input = event.target as HTMLInputElement; //Meddelar att det är en textruta
    this.searchTerm.set(input.value.toLowerCase()); //Sparar det som skrivs och gör om till små bokstäver
  }

  //Funktion som lyssnar på när användaren väljer ett ämne i dropdown-menyn och uppdaterar min signal 
  handleSubjectChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedSubject.set(select.value);
  }
//Metod för att ladda 50 till: 
loadMore() {
  this.displayCount.update(current => current + 50);
}

// En funktion som körs när användaren klickar på en rubrik för att sortera listan
sortData(key: keyof Course) {
  const sorted = [...this.courses()].sort((a, b) => { // Sortera i bokstavsordning
    return String(a[key]).localeCompare(String(b[key])); // Jämför a mot b
  });

  // Om listan redan är sorterad stigande, vänd på den så den blir fallande
  if (JSON.stringify(this.courses()) === JSON.stringify(sorted)) {
    sorted.reverse();
  }

  this.courses.set(sorted);
}
}

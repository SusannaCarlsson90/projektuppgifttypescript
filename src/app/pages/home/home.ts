import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { Course } from '../../models/courses'; // Mitt interface
import { CourseService } from '../../services/course'; // Min service course.ts
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit { //Skapar tre signalar: courses, error och serchTerm. 
 courses = signal<Course[]>([]);
  error = signal<string | null>(null);
  searchTerm = signal<string>('')// En behållare som sparar texten användaren skriver i sökrutan
  selectedSubject = signal<string>('');

  filteredCourses = computed(() => { //Computed skapar en ny, smart lista som håller koll på de andra signalerna. 
    const term = this.searchTerm().toLowerCase(); // Hämtar sökordet och gör om till små bokstäver oavsett hur användaren skriver
    const list = this.courses(); // Hämtar alla kurser 

    // Returnerar bara de kurser som matchar sökordet i kod eller namn
    return list.filter(course => //Filtrerar listan och behåller bara det som matchar vad användaren skriver
      course.courseCode.toLowerCase().includes(term) || 
      course.courseName.toLowerCase().includes(term)
    );
  });
  
  courseService = inject(CourseService); //Kopplar på kurs-service
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

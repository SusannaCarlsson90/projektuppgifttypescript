//Importerar verktyg
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//Importerar mitt interface: 
import { Course } from '../models/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // inject(HttpClient) skapar en koppling till Angulars HTTP-verktyg och sparar det i "http"
  private http = inject(HttpClient); 

  //Sökvägen till min lokala fil: 
  private jsonUrl = '/miun_courses.json'; 

  //En funktion som startar en hämtning av min JSON-fil 
  getCourses(): Observable<Course[]> { //// Talar om att vi vill hämta en lista med kurser
    return this.http.get<Course[]>(this.jsonUrl);// Hämtar filen och kontrollerar att den följer reglerna i mitt interface (Course)
  }
  }

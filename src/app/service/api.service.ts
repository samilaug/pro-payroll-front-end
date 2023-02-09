import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Business } from '../business';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Define API URL
  private apiServerUrl = 'http://localhost:8080/business';


  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) { }

  // Define the method to fetch the businesses data
  public getBusinesses(): Observable<Business[]> {
    return this.http.get<Business[]>(`${this.apiServerUrl}/all`);
  }

  // Define the method to post the businesses data
  public addBusiness(business: Business): Observable<Business> {
    return this.http.post<Business>(`${this.apiServerUrl}/add`, business);
  }

  // Define the method to update the businesses dat
  public updateBusiness(data:any,id: number){
    return this.http.put(`${this.apiServerUrl}/update/${id}`,data);
  }


// Define the method to delete the businesses data 
  public deleteBusiness(businessId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${businessId}`);
  }

}

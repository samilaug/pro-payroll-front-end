import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Business } from '../business';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiServerUrl = 'http://localhost:8080/business';

  constructor(private http: HttpClient) { }

  public getBusinesses(): Observable<Business[]> {
    return this.http.get<Business[]>(`${this.apiServerUrl}/all`);
  }
  public addBusiness(business: Business): Observable<Business> {
    return this.http.post<Business>(`${this.apiServerUrl}/add`, business);
  }
  public updateBusiness(data:any,id: number){
    return this.http.put(`${this.apiServerUrl}/update/${id}`,data);
  }



  public deleteBusiness(businessId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${businessId}`);
  }

}

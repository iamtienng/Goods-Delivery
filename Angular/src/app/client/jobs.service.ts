import { Injectable } from "@angular/core";

import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { Order } from "../models/order";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
const apiUrl = "http://localhost:3000/orderslist";

@Injectable({
  providedIn: "root",
})
export class JobsService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getJobs(): Observable<Order[]> {
    return this.http.get<Order[]>(`${apiUrl}`).pipe(
      tap(() => console.log("fetched jobs")),
      catchError(this.handleError("getJobs", []))
    );
  }

  getJobsListByDeliver(deliver: string): Observable<Order[]> {
    const url = `${apiUrl}/getjobslist/${deliver}`;
    return this.http.get<Order[]>(url).pipe(
      tap(() => console.log(`fetched jobs list deliver=${deliver}`)),
      catchError(this.handleError("getJobs", []))
    );
  }

  getJobById(id: string): Observable<Order> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap((_) => console.log(`fetched job id=${id}`)),
      catchError(this.handleError<Order>())
    );
  }
}

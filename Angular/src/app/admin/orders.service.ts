import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";

import { Order } from "../models/order";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
const apiUrl = "http://localhost:3000/orders";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${apiUrl}`).pipe(
      tap(() => console.log("Fetched orders")),
      catchError(this.handleError("getJobs", []))
    );
  }

  getOrdersByDeliver(deliver: String): Observable<Order[]> {
    const url = `http://localhost:3000/orders/getjobslist/${deliver}`;
    return this.http.get<Order[]>(url).pipe(
      tap(() => console.log(`Fetched orders list of deliver=${deliver}`)),
      catchError(this.handleError("getOrdersByDeliver", []))
    );
  }

  getOrderById(id: string): Observable<Order> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap((_) => console.log(`Fetched order id=${id}`)),
      catchError(this.handleError<Order>())
    );
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(apiUrl, order, httpOptions).pipe(
      tap((s: Order) => console.log(`Added order`)),
      catchError(this.handleError<Order>())
    );
  }

  updateOrder(id: string, order: Order): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, order, httpOptions).pipe(
      tap((_) => console.log(`Updated order id = ${id}`)),
      catchError(this.handleError<any>())
    );
  }

  addDeliverToOrder(id: string, deliver: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    const data = { deliver: deliver };
    return this.http.put(url, data, httpOptions).pipe(
      tap((_) => console.log(`Updated order id = ${id}`)),
      catchError(this.handleError<any>())
    );
  }

  deleteOrder(id: string): Observable<Order> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Order>(url, httpOptions).pipe(
      tap((_) => console.log(`Deleted order id=${id}`)),
      catchError(this.handleError<Order>())
    );
  }
}

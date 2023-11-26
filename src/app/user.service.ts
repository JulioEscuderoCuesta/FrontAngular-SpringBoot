import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User, Series, Bill } from './user-data';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.url}/users/1`)
      .pipe(catchError(this.handleError<User>('getUser')));
  }

  getSeries(): Observable<Series[]> {
    return this.http.get<Series[]>(`${this.url}/series`).pipe(catchError(this.handleError<Series[]>('getSeries')));
  }

  searchSeries(term: string): Observable<Series[]> {
    if(!term.trim()) 
      return of([]);
    return this.http.get<Series[]>(`${this.url}/series`).pipe(
      map(series => series.filter(s => s.name.toLowerCase().startsWith(term.toLowerCase()))),
      tap(filteredSeries => filteredSeries.length ?
         this.log(`found series matching "${term}"`) :
         this.log(`no series matching "${term}"`)),
      catchError(this.handleError<Series[]>('searchSeries', []))
    );
  }

  /**
   * Update user information on the server
   * @param user the user with information updated
   * @returns 
   */
  save(userId : number, seriesId: number) {
    return this.http.put(`${this.url}/users/${userId}/pendingSeries/${seriesId}`, this.httpOptions);
  }

  searchBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.url}/users/1/bills`).pipe(catchError(this.handleError<Bill[]>('searchBills', [])));
  }
  

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Person } from './person';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class PersonService {

  private personsUrl = 'api/persons';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET persons from the server */
  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personsUrl)
      .pipe(
        tap(_ => this.log('fetched contacts')),
        catchError(this.handleError<Person[]>('getPersons', []))
      );
  }

  /** GET person by id. Return `undefined` when id not found */
  getPersonNo404<Data>(id: number): Observable<Person> {
    const url = `${this.personsUrl}/?id=${id}`;
    return this.http.get<Person[]>(url)
      .pipe(
        map(persons => persons[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} person id=${id}`);
        }),
        catchError(this.handleError<Person>(`getPerson id=${id}`))
      );
  }

  /** GET person by id. Will 404 if id not found */
  getPerson(id: number): Observable<Person> {
    const url = `${this.personsUrl}/${id}`;
    return this.http.get<Person>(url).pipe(
      tap(_ => this.log(`fetched person id=${id}`)),
      catchError(this.handleError<Person>(`getPerson id=${id}`))
    );
  }

  /* GET persons whose name contains search term */
  searchPersons(term: string): Observable<Person[]> {
    if (!term.trim()) {
      // if not search term, return empty contact array.
      return of([]);
    }
    return this.http.get<Person[]>(`${this.personsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found contacts matching "${term}"`) :
         this.log(`no contacts matching "${term}"`)),
      catchError(this.handleError<Person[]>('searchPersons', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new person to the server */
  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.personsUrl, person, this.httpOptions).pipe(
      tap((newPerson: Person) => this.log(`added contact w/ id=${newPerson.id}`)),
      catchError(this.handleError<Person>('addPerson'))
    );
  }

  /** DELETE: delete the contact from the server */
  deletePerson(person: Person | number): Observable<Person> {
    const id = typeof person === 'number' ? person : person.id;
    const url = `${this.personsUrl}/${id}`;

    return this.http.delete<Person>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted contact id=${id}`)),
      catchError(this.handleError<Person>('deletePerson'))
    );
  }

  /** PUT: update the contact on the server */
  updatePerson(person: Person): Observable<any> {
    return this.http.put(this.personsUrl, person, this.httpOptions).pipe(
      tap(_ => this.log(`updated contact id=${person.id}`)),
      catchError(this.handleError<any>('updatePerson'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
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

  /** Log a PersonService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PersonService: ${message}`);
  }
}

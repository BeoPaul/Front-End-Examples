import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Person } from './person';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const persons = [
      { id: 1, name: 'Cat Stevens' , number :'312-555-4567'},
      { id: 2, name: 'John Barnes' , number :'773-456-8877'},
      { id: 3, name: 'Jay Gordon', number :'312-456-0044' },
      { id: 4, name: 'Merry Elisabeth', number :'312-452-2341' },
      { id: 5, name: 'George B.', number :'630-777-8866' },
      { id: 6, name: 'Swedish', number :'212-556-9988'},
      { id: 7, name: 'Andy Brinx', number :'313-444-2234' },
      { id: 8, name: 'Sonny Parker', number :'708-777-4567' },
      { id: 9, name: 'Alison M', number :'312-123-9876' },
      { id: 10, name: 'Bar fly', number :'917-456-6543' }
    ];
    return {persons};
  }

  // Overrides the genId method to ensure that contact always has an id.
  // If the persons array is empty,
  // the method below returns the initial number (11).
  // if the persons array is not empty, the method below returns the highest
  // contact person id + 1.
  genId(persons: Person[]): number {
    return persons.length > 0 ? Math.max(...persons.map(person => person.id)) + 1 : 1;
  }
}



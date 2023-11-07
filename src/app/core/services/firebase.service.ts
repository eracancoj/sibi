import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  setDoc,
  doc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);

  constructor() {}

  getCollection(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef, { idField: 'id' }) as Observable<
      any[]
    >;
  }

  getEmployees(): Observable<any[]> {
    const employeesRef = collection(this.firestore, 'empleados');
    return collectionData(employeesRef, { idField: 'id' }) as Observable<any[]>;
    // let employeesRef: any;
    // return employeesRef as Observable<any[]>;
  }

  addEmployee(employee: any) {
    const employeesCollection = collection(this.firestore, 'empleados');
    return addDoc(employeesCollection, employee);
  }

  udpateEmployee(employee: any) {
    console.log('udpateEmployee');
    console.log(employee);
    const employeesRef = doc(this.firestore, `empleados/${employee.id}`);
    return setDoc(employeesRef, employee);
  }

  async addDocs(collectionName: string, docs: any[]) {
    const employeesCollection = collection(this.firestore, collectionName);

    for (const doc of docs) {
      await addDoc(employeesCollection, doc);
      console.log(doc);
    }
  }
}

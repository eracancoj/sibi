import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);

  constructor() { }

  
  getEmployees(): Observable<any[]> {
    const employeesRef = collection(this.firestore, "empleados");

    return collectionData(employeesRef, { idField: "id" }) as Observable<any[]>;
  }

  addEmployee(employee: any) {
    const employeesCollection = collection(this.firestore, "empleados");
    return addDoc(employeesCollection, employee);
  }

  async addDocs(collectionName: string, docs: any[]) {
    const employeesCollection = collection(this.firestore, collectionName);

    for (const doc of docs) {
      await addDoc(employeesCollection, doc);
      console.log(doc);
    }
  }
}

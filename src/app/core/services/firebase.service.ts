import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  setDoc,
  doc,
  collectionData,
  where,
  query,
  Timestamp,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);

  constructor() {}

  async addDocs(collectionName: string, docs: any[]) {
    const employeesCollection = collection(this.firestore, collectionName);

    for (const doc of docs) {
      await addDoc(employeesCollection, doc);
      console.log(doc);
    }
  }

  get(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef, { idField: 'id' }) as Observable<
      any[]
    >;
  }
  create(collectionName: string, formData: any) {
    const ollectionRef = collection(this.firestore, collectionName);
    return addDoc(ollectionRef, formData);
  }
  udpate(collectionName: string, formData: any) {
    const collectionRef = doc(
      this.firestore,
      `${collectionName}/${formData.id}`
    );
    return setDoc(collectionRef, formData);
  }
  getQuery(
    collectionName: string,
    wh: string,
    i: any,
    eq: any
  ): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    const queryRef = query(collectionRef, where(wh, i, eq));

    return collectionData(queryRef, { idField: 'id' }) as Observable<any[]>;
  }

  getDates(collectionName: string, init: Date, end: Date): Observable<any[]> {
    const ttInit = Timestamp.fromDate(init);

    const collectionRef = collection(this.firestore, collectionName);
    const queryRef = query(collectionRef, where('fecha_inicio', '>=', ttInit));

    if (end) {
      const ttEnd = Timestamp.fromDate(end);

      return collectionData(queryRef, { idField: 'id' }).pipe(
        map((contratos) => {
          return contratos.filter((contrato) => contrato['fecha_fin'] <= ttEnd);
        })
      );
    } else {
      return collectionData(queryRef, { idField: 'id' }) as Observable<any[]>;
    }
  }

  getEmployees(): Observable<any[]> {
    // const employeesRef = collection(this.firestore, 'empleados');
    // return collectionData(employeesRef, { idField: 'id' }) as Observable<any[]>;
    let employeesRef: any;
    return employeesRef as Observable<any[]>;
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
}

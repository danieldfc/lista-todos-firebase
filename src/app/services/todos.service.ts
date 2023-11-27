import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private database: any = firebase.initializeApp();

  adicionarTodo(todo: any): Promise<any> {
    const novaTodoRef = this.database.ref('todos').push();
    return novaTodoRef.set(todo);
  }

  getTodos(): Observable<any[]> {
    return new Observable((observer) => {
      this.database.ref('todos').on('value', (snapshot: any) => {
        const data: any[] = [];
        snapshot.forEach((childSnapshot: any) => {
          data.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        observer.next(data);
      });
    });
  }

  excluirTodo(id: string): Promise<void> {
    return this.database.ref('todos').child(id).remove();
  }
}

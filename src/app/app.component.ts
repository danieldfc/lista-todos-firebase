import { Component, Input, OnInit } from '@angular/core';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit  {
  todos: any[] = [];
  newTodo: string = '';

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.carregarTodos();
  }

  carregarTodos() {
    this.todosService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  adicionarTodo() {
    if (this.newTodo.trim() !== '') {
      const newTodoObj = {
        descricao: this.newTodo,
        concluida: false,
      };

      this.todosService.adicionarTodo(newTodoObj).then(() => {
        this.newTodo = '';
        this.carregarTodos();
      });
    }
  }

  excluirTodo(id: string) {
    this.todosService.excluirTodo(id).then(() => {
      this.carregarTodos();
    });
  }
}

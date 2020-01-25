import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  id: number;
  todo: Todo;

  message: string;

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());
    if (this.id == -1) {
      // User creates new todo
    } else {
      this.todoService.retrieveTodo('in28minutes', this.id)
      .subscribe(
        data => this.todo = data
      );
    }
  }

  saveTodo() {
    if (this.id == -1){
      console.log('executing create todo method');
      this.todoService.createTodo('in28minutes', this.todo)
      .subscribe(
        response => {
          this.message = `Todo ${this.id} has been created!`;
          console.log(`Todo ${this.id} has been created!`);
          this.router.navigate(['todos'])
        }
      );
    } else {
      console.log('executing save todo method');
      this.todoService.updateTodo('in28minutes', this.id, this.todo)
      .subscribe(
        response => {
          console.log(response);
          this.message = `Todo ${this.id} has been updated!`;
          console.log(`Todo ${this.id} has been updated`);
          this.router.navigate(['todos']);
        }
      );
    }
  }

}

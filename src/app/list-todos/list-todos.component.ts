import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss']
})
export class ListTodosComponent implements OnInit {

  // todos = [
  //   new Todo(1,'Learn to dance',false,new Date()),
  //   new Todo(2,'Become an expert to Angular',false,new Date()),
  //   new Todo(3,'Visit South Korea',false,new Date()),
  //   new Todo(4,'Configure punto de venta',false,new Date()),
  //   new Todo(5,'Buy Xiaomi camera',false,new Date())
  // ]

  todos: Todo[];

  message: string;

  constructor(
    private todoService: TodoDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos('in28minutes').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

  deleteTodo(id){
    this.todoService.deleteTodo('in28minutes', id).subscribe(
      response => {
        console.log(response);
        this.message = `Todo ${id} has been deleted!`;
        console.log(`Todo ${id} has been deleted`);
        this.refreshTodos();
      }
    )
  }

  updateTodo(id){
    console.log('Update Todo');
    this.router.navigate(['todos',id]);
  //   this.todoService.updateTodo('in28minutes', id).subscribe(
  //     response => {
  //       console.log(response);
  //       this.message = `Todo ${id} has been updated!`;
  //       console.log(`Todo ${id} has been updated`);
  //       this.refreshTodos();
  //     }
  //   )
  }

  addTodo(){
    this.router.navigate(['todos', -1]);
  }

}

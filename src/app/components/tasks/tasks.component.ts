import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ITask } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskCardComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  tasks: ITask[] = []

  formData: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.minLength(2), Validators.maxLength(60), Validators.required]),
    description: new FormControl(null, [Validators.minLength(2), Validators.maxLength(500), Validators.required]),
    status: new FormControl('Pending')
  })

  constructor(private _TaskService: TaskService, private _ToastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAllTasks() //Display tASKS
  }

  //Get Tasks for Api
  getAllTasks() {
    this._TaskService.getAllTasks().subscribe({
      next: (res) => {
        if (res.message == 'Done') {
          this.tasks = res.results
        }
      }
    })
  }

  //Create Task 
  createTask() {
    if (this.formData.valid) {
      this._TaskService.createTask(this.formData.value).subscribe({
        next: (res) => {
          if (res.message = 'Done') {
            this._ToastrService.success('Created Task', 'Success',{
              positionClass:'toast-top-right'
            });
            this.formData.reset({
              status: 'Pending'
            }); //reset the form
            this.getAllTasks()
          }
        },
        error: (err) => {
          if (err) {
            this._ToastrService.error('Failed Create Task', 'Faild',{
              positionClass:'toast-top-right'
            });
          }
        }
      })
    }
  }
}

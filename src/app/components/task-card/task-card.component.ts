import { TaskService } from './../../services/task.service';
import { RouterModule } from '@angular/router';
import { ITask } from './../../models/task.model';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task !: ITask;

  constructor(private _TaskService: TaskService) { }

  // mark Completed
  markCompleted(task: ITask) {
    if (task.status == 'Pending') {
      this._TaskService.updateStatusTask(task._id).subscribe({
        next: (res) => {
          if (res.message == 'Done') {
            this.task.status = 'Completed'
          }
        }
      })
    }
  }

}

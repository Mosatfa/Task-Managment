import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../models/task.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './details-task.component.html',
  styleUrl: './details-task.component.scss'
})
export class DetailsTaskComponent implements OnInit {
  isEdit: boolean = false
  selectedFile: any;
  name: String = ''
  imgSrc: string = ''
  idTask: string | any = ''
  taskDetails: ITask = { _id: '', title: '', description: '', status: '', createdAt: '' }
  messageErorr: string = ''

  constructor(private _Router: Router, private _TaskService: TaskService, private _ActivatedRoute: ActivatedRoute, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getTaskDetails()
  }

  edit() {
    this.isEdit = !this.isEdit
  }
  
  cancle() {
    this.isEdit = false
    this.getTaskDetails()
  }

  // Get Details Task
  getTaskDetails() {
    this.idTask = this._ActivatedRoute.snapshot.paramMap.get('id');
    this._TaskService.getTaskById(this.idTask).subscribe({
      next: (res) => {
        this.taskDetails = res.results as ITask
      }
    })
  }

  // Update Task
  updateTask(id: string) {
    const { title, description } = this.taskDetails;
    this._TaskService.updateTask(id, { title, description }).subscribe({
      next: (res) => {
        if (res.message == 'Done') {
          this._ToastrService.success('Updated Task', 'Success', {
            positionClass: 'toast-top-right'
          });
          this.isEdit = false
          this.getTaskDetails()
        } else if (res.validationErr) {
          this.messageErorr = 'Title must be at least 2 characters long and cannot exceed 60 characters.Description must be at least 2 characters long and cannot exceed 500 characters.'
        }
      },
      error: (err) => {
        if (err) {
          this._ToastrService.error('Failed Update Task', 'Faild', {
            positionClass: 'toast-top-right'
          });
        }
      }
    })

  }

  // Delete Task 
  deleteTask(id: string) {
    this._TaskService.deleteTask(id).subscribe({
      next: (res) => {
        if (res.message == 'Done') {
          this._ToastrService.warning('Deleted Task', 'Success', {
            positionClass: 'toast-top-right'
          });
          this._Router.navigate(['./tasks'])
        }
      },
      error: (err) => {
        if (err) {
          this._ToastrService.error('Failed Delete Task', 'Faild', {
            positionClass: 'toast-top-right'
          });
        }
      },
    })
  }
}

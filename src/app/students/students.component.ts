import { NgForm } from '@angular/forms';
import { StudentService } from './../student.service';
import { Component, OnChanges, OnInit, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {

  constructor(private service: StudentService, private _router:Router) {}

  loading: boolean = false;
  students: any = [];
  filterStudent: any = [];

  searchName='';
  searchText='';

  ngOnInit(): void {
    this.service.fetchStudents().subscribe(
      res => {
        this.students = res;
        //console.log(res)
      },
      err => {
        //console.log(err)
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401 || err.status === 500) {
            this._router.navigate(['login'])
          }
        }
      }
    );
    //console.log(this.students)
  }

  saveStudent(form: NgForm) {

    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(form.value.email)) {
      alert('Invalid Email! Please enter valid email address.')
    }else {

      const studentData = {
        fname: form.value.fname,
        lname: form.value.lname,
        email: form.value.email,
        grade: form.value.grade
      }

      this.service.saveStudent(studentData).subscribe(
        res => {
          this.loading = true;
         // console.log(res)

          this.students.push(res)
        },
        err => {
          alert('Error with saving data!')
        }
      )

    }



  }

  Update(id:any) {
    alert('update '+id)

  }

  Delete(id:any) {
    //alert('Delete '+ id)
    this.service.deleteStudent(id).subscribe(
      res => {
        this.students.splice(res._id,1)
        alert('Deleted!')
      },
      err => {
        alert('Error with deleting data!')
      }
    )
  }

  fundByName() {
    this.filterStudent = this.students.filter((w:any)=>w.fname.match(this.searchName));
  }

}

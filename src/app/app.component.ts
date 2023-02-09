import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './service/api.service';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialDialogComponent } from './dialog/material-dialog.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pro-payroll-front-end'; displayedColumns: string[] = ['id', 'name', 'legalName', 'abn', 'acn', 'active', 'actions'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private apiService: ApiService,
    ) { }
  ngOnInit(): void {
    this.getBusinesses();
  }

  getBusinesses() {
    this.apiService.getBusinesses().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(res); 
    }, err => { console.log(err.error.message); });      // this.dataSource.filter = this.filter;
    
  }
  editBusiness(row : any) {

    this.dialog.open(MaterialDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(res => {
      if (res == "update") { this.getBusinesses(); }
    });
  }



  deleteBusiness(id: number) {
    this.apiService.deleteBusiness(id).subscribe(res => {
      alert("Business deleted successfully");
      this.getBusinesses();
    }, err => { alert(err.error.message); });
  }

  openDialog() {
    this.dialog.open(MaterialDialogComponent,{
      width: '30%',
    }).afterClosed().subscribe(res => {
      if (res == "save") { this.getBusinesses(); }
    });
  }

applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}

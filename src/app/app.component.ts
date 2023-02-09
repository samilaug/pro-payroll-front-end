import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './service/api.service';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialDialogComponent } from './dialog/material-dialog.component';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { inject } from '@angular/core/testing';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Implementing OnInit interface to run a code on component initialization
export class AppComponent implements OnInit {
  // Defining the columns to be displayed in the table
  title = 'pro-payroll-front-end'; displayedColumns: string[] = ['id', 'name', 'legalName', 'abn', 'acn', 'active', 'actions'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Injecting the MatDialog and ApiService
  constructor(private dialog: MatDialog, private apiService: ApiService,
  ) { }
  ngOnInit(): void {
    this.getBusinesses();
  }
  // Method to fetch businesses data from the API
  getBusinesses() {
    this.apiService.getBusinesses().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(res);
    }, err => { console.log(err.error.message); });      // this.dataSource.filter = this.filter;

  }

  // Method to open the dialog for editing a business
  editBusiness(row: any) {

    this.dialog.open(MaterialDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(res => {
      if (res == "update") { this.getBusinesses(); }
    });
  }


// Method to delete a business by its id
  deleteBusiness(id: number) {
    this.apiService.deleteBusiness(id).subscribe(res => {
      alert("Business deleted successfully");
      this.getBusinesses();
    }, err => { alert(err.error.message); });
  }


  // Method to open the dialog for adding a business
  openDialog() {
    this.dialog.open(MaterialDialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(res => {
      if (res == "save") { this.getBusinesses(); }
    });
  }


  // Method to filter the table data
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}

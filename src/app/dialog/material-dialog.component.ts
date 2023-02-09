import { inject } from '@angular/core/testing';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.css']
})
export class MaterialDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<MaterialDialogComponent>) { }

  businessForm!: FormGroup;
  activeList = ["true", "false"];
  actionButton: string = "Save";

  ngOnInit(): void {
    this.businessForm = this.formBuilder.group({
      name: ['', Validators.required],
      legalName: ['', Validators.required],
      acn: ['', Validators.required],
      abn: ['', Validators.required],
      active: ['', Validators.required]
    });
    if (this.editData) {
      console.log(this.editData);
      this.actionButton = "Update";
      this.businessForm.controls['name'].setValue(this.editData.name);
      this.businessForm.controls['legalName'].setValue(this.editData.legalName);
      this.businessForm.controls['acn'].setValue(this.editData.acn);
      this.businessForm.controls['abn'].setValue(this.editData.abn);
      this.businessForm.controls['active'].setValue(this.editData.active);

    }
  }
  addBusiness() {

   if(!this.editData){
     if (this.businessForm.valid) {
       this.apiService.addBusiness(this.businessForm.value).subscribe(res => {
         alert("Business added successfully");
         this.businessForm.reset();
         this.dialogRef.close("save");
       }, err => { alert(err.error.message); });
     }
     else {
       this.updateBusiness();
     }

   }

  }
  updateBusiness() {
    this.apiService.updateBusiness(this.businessForm.value,this.editData.id)
    .subscribe(res => {alert("Business updated successfully");
    this.businessForm.reset();
    this.dialogRef.close("update");
  },error => {alert(error.error.message);});

  }

}

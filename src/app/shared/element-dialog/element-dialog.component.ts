import { Pessoa } from 'src/app/models/Pessoas'
//import { MatDialogModule } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {
  element!: Pessoa
  isChange!: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Pessoa,
    public dialogRef: MatDialogRef<ElementDialogComponent>,

  ) {}

  ngOnInit(): void {
    if (this.data.position != null){
      this.isChange = true;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
}
}

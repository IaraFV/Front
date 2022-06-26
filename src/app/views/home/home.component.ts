import { PessoasService } from './../../services/Pessoas.service';
import { MatDialog } from '@angular/material/dialog';
import { ElementDialogComponent } from './../../shared/element-dialog/element-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Pessoa } from 'src/app/models/Pessoas';
/*
const ELEMENT_DATA: Pessoa[] = [
  {position: 1, name: 'Jose', equipe: 'H'},
  {position: 2, name: 'Maria', equipe: 'He'},
  {position: 3, name: 'Li', equipe: 'Li'},
  {position: 4, name: 'Barth', equipe: 'Be'},
  {position: 5, name: 'Boron', equipe: 'B'},
  {position: 6, name: 'Carla', equipe: 'C'},
  {position: 7, name: 'Nilo', equipe: 'N'},
  {position: 8, name: 'Ox', equipe: 'O'},
  {position: 9, name: 'Fluorine', equipe: 'F'},
  {position: 10, name: 'Neon', equipe: 'Ne'},
];*/
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PessoasService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'equipe','opcoes'];
  dataSource!: Pessoa[];

  constructor(
    public dialog: MatDialog,
    public PessoasService: PessoasService
    ) {
      this.PessoasService.getElements()
        .subscribe((data: Pessoa[]) => {
          this.dataSource = data;
        });
   }

  ngOnInit(): void {
  }
  openDialog(element: Pessoa | null): void {
  const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ?{
        position: null,
        name: '',
        equipe: null
      } : {
        position: element.position,
        name: element.name,
        equipe: element.equipe
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(this.dataSource.map(p => p.position).includes(result.position)){
        this.dataSource[result.position - 1] = result;
        this.table.renderRows();
      }else{
        this.dataSource.push(result)
        this.table.renderRows();
      }
      }
    });
  }
  editElement(element: Pessoa): void{
    this.openDialog(element);
  }
  deleteElement(position: number): void {
    this.dataSource = this.dataSource.filter(p => p.position !== position);
  }

}

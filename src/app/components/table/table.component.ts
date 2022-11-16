import { Component, Inject, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TableElement } from 'src/app/interfaces/table-element';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { Observable, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

let ROW_DATA: TableElement[] = [];


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  data: Observable<any> | undefined
  displayedColumns: string[] = ['name', 'picture'];
  dataSource: any;
  clickedRows = new Set<TableElement>();
  
  constructor(private dialog: MatDialog, private uploadService: UploadFilesService) { }

  clickedRow(row: TableElement): void{
    this.dialog.open(DialogComponent, {
        data: row

    });
  }

  fetchImages(){
    this.uploadService.getFiles().subscribe(data => {
      ROW_DATA = data;
      this.dataSource = new MatTableDataSource(ROW_DATA);
      console.log("row: ",ROW_DATA)
    })
  }

  ngOnInit(): void {
    this.fetchImages();
  }
}
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClickedEvent,
  CellValueChangedEvent,
  ColDef,
  GridReadyEvent,
  RowClassParams,
  RowStyle
} from "ag-grid-community";
import {Observable, of} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {DeleteButtonComponent} from "../delete-button/delete-button.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApiErrorInterface} from "../../../../interfaces/api-error.interface";
import {FormService} from "../../../../services/forms/form.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})
export class EntityTableComponent implements OnInit{
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private formService: FormService,
    private toastr: ToastrService,
  ) {}
  @Input() columnDefs?: ColDef[];
  @Input() dataCallback?: Function;
  @Input() deleteDataCallback?: Function;
  @Input() updateDataCallback?: Function;
  @Input() includeActions: boolean = false;
  @Input() onCellUpdate?: Function;
  @Input() hasLinkedData: boolean = false;
  @Input() disableRemove?: Function;
  editedEntities: object[] = []
  toDeleteEntities: object[] = []
  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    flex: 1,
    checkboxSelection: false,
    cellClassRules: {
      'non-editable': (params) => {
        if(params.colDef.editable !== undefined) {
          if(typeof params.colDef.editable === 'function') {
            return !params.colDef.editable(params)
          } else {
            return !params.colDef.editable
          }
        }
        return false;
      }
    }
    // cellClassRules: {
    //   'non-editable': (params) => params.colDef.editable === false
    // }
  };
  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;
  rowClassRules = {
    'row-invalid' : (params: any) => {
      if(params.data.invalid === undefined || params.data.invalid === false) {
        return false;
      }
      return true;
    }
  }
  onGridReady() {
    this.editedEntities = []
    if(this.dataCallback) {
      this.rowData$ = this.dataCallback()
    }
    this.agGrid.api.sizeColumnsToFit();
  }


  //Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
  }
  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  ngOnInit() {
    if(!this.columnDefs) {
      throw new Error('columns required')
    }
    this.columnDefs.unshift({
      headerName: '',
      valueGetter: "node.rowIndex + 1",
      cellClass: 'rowIndex',
      maxWidth: 30,
    });
    if (this.deleteDataCallback) {
      this.columnDefs.push({
        field: '',
        headerName: '',
        maxWidth: 50,
        sortable: false,
        filter: false,
        cellRenderer: DeleteButtonComponent,
        cellRendererParams: {
          clicked: this.addToDeletedList,
          disabled: this.disableRemove ? this.disableRemove : false,
        },
      });
    }
  }
  async saveButtonHandler() {
    await this.update();
    await this.delete()
  }

  edit: Function = (params: any) => {
    this.agGrid.api.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'id',
    })
  }

  async delete() {
    if(this.deleteDataCallback) {
      for (const entity of this.toDeleteEntities) {
        const deleted = await this.deleteDataCallback(entity);
      }
      this.toDeleteEntities = []
    }
  }
  update: Function = async (params: any) => {
    if(this.updateDataCallback) {
      const errorEntities: object[] = []
      const editedEntities: object[] = []
      let errors: ApiErrorInterface[] = [];
      this.editedEntities.forEach(async (entity: object, index, array) => {
        try {
          const editedEntity = await this.updateDataCallback!(entity);
          if (editedEntity) {
            editedEntities.push(editedEntity);
          }
        } catch (e: unknown) {
          if (e instanceof HttpErrorResponse) {
            if (e.error && e.error.statusCode === 400) {
              const error = e.error;
              const messages: ApiErrorInterface[] = error.message;
              errors = errors.concat(messages);
              const rowIndex = this.getRowIndex(messages, entity)

              this.applyErrors(errors, rowIndex);

              errorEntities.push(entity);
              // Ajouter la classe "invalid" aux cellules correspondantes
            }
          }
        }
      });
      this.agGrid.api.applyTransaction({ update: editedEntities});
      this.editedEntities = errorEntities
    }
  }

  refresh() {
    this.onGridReady()
  }



  async onCellValueChanged(event: CellValueChangedEvent) {
    let editedEntity = event.data
    let alreadyEdited = false;
    this.editedEntities.map((entity: any) => {
      if(entity.id === editedEntity.id ) {
        entity = editedEntity
        alreadyEdited = true;
      }
    })
    if(!alreadyEdited) {
      this.editedEntities.push(editedEntity)
    }
    if(this.onCellUpdate) {
      editedEntity = await this.onCellUpdate(editedEntity, event);
      this.agGrid.api.applyTransaction({ update: [editedEntity]});
    }
  }
  addToDeletedList: Function = (toDelete: object) => {
    if(this.toDeleteEntities.length === 0 && this.hasLinkedData) {
      this._snackBar.open('Après confirmation, toutes les données liées seront effacés', 'OK', {
        duration: 5000
      })
    }
    this.toDeleteEntities.push(toDelete);
    this.agGrid.api.applyTransaction({ remove: [toDelete]});
  }

  cancel() {
    this.onGridReady()
    this.toDeleteEntities = [];
    this.editedEntities = [];
  }
  getRowId = (params: any) => {
    return params.data.id
  }
  getRowIndex(apiErrors: ApiErrorInterface[], entity: object) {
    const nodes = this.agGrid.api.getRenderedNodes();
    const node = nodes.find(node => {
      if(node.data.id == (entity as {id: any}).id) {
        return true;
      }
      return false;
    });
    if(node && node.rowIndex !== null) {
      return node.rowIndex+1;
    }
    return null;
  }
  applyErrors(apiErrors: ApiErrorInterface[], row: number | null) {
    const errors: string[] = []
    for (const error of apiErrors) {
      const data = this.formService.getErrorMessage(error)
      if(typeof data === "string") {
        let columnheader = '';
        this.agGrid.columnDefs!.find((column: ColDef) => {
          if(error.property ===  column.field) {
            columnheader = column.headerName!;
          }
        });
        error.value = `${error.value}`
        if(error.value.length > 20) {
          error.value = error.value.slice(0, 20) + "..."
        }

        errors.push(`${row !== null ? `(Ligne ${row}) ` : ''}${columnheader}: ${data} (${error.value})`);
      }
    }



    for (const error of errors) {
      this.toastr.error(error, '', {
        progressBar: true,
        timeOut: 10000,
      });
    }

    // this._snackBar.open(errorString, 'ok', {
    //   panelClass: ['multiple-line-snackbar']
    // })
  }

}

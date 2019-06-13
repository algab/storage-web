import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { BucketService } from "../../bucket.service";
import { FolderService } from "../../folder.service";

@Component({
    selector: 'app-dashboard-folders-option',
    templateUrl: './folders-option.component.html'
})
export class FoldersOptionComponent implements OnInit {
    folders: any[] = []

    constructor(private bucket: BucketService, private folder: FolderService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.listFolders();
    }

    listFolders() {
        this.folders = [];
        let bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
        this.bucket.getBucket(bucket).subscribe(data => {
            let folders = data.filter(data => data.type == "folder");
            folders.sort().forEach(folder => {
                this.folder.getFolderInfo(folder.name, bucket).subscribe(data => {
                    this.folders.push({ ...data, name: folder.name })
                })
            });
        })
    }

    edit(name: string) {
        const dialogRef = this.dialog.open(DialogFolderEdit, {
            width: '800px'
        })

        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                let bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
                this.folder.editFolder(name, { bucket, folder: result }).subscribe(data => {
                    this.listFolders()
                }, err => {
                    if (err.status == 409) {
                        this.snackBar.open('Pasta com mesmo nome já existe.', 'FECHAR', {
                            duration: 2000
                        })
                    }
                    else {
                        this.snackBar.open('Pasta não encontrada.', 'FECHAR', {
                            duration: 2000
                        })
                    }
                })
            }
        })
    }

    delete(name: string) {
        const dialogRef = this.dialog.open(DialogFolderDelete, {
            width: '800px'
        })

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                let bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
                this.folder.deleteFolder(bucket, name).subscribe(data => {
                    this.listFolders()
                }, err => {
                    if (err.status == 409) {
                        this.snackBar.open('Pasta não está vazia.', 'FECHAR', {
                            duration: 2000
                        })
                    }
                    else {
                        this.snackBar.open('Pasta não encontrada.', 'FECHAR', {
                            duration: 2000
                        })
                    }
                })
            }
        })
    }
}

@Component({
    selector: 'dialog-folder-edit',
    template: `
    <h1 mat-dialog-title>Renomear pasta</h1>
    <div mat-dialog-content>
        <mat-form-field>
            <input matInput [(ngModel)]="name" name="subfolder" placeholder="Digite o nome da pasta">
        </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="name" cdkFocusInitial>Salvar</button>
      <button mat-button (click)="close()">Fechar</button>
    </div>
    `
})
export class DialogFolderEdit {
    name: string

    constructor(public dialogRef: MatDialogRef<FoldersOptionComponent>) { }

    close() {
        this.dialogRef.close()
    }
}

@Component({
    selector: 'dialog-folder-delete',
    template: `
    <h1 mat-dialog-title>Confirmação</h1>
    <div mat-dialog-content>
      <p>Você tem certeza que deseja excluir essa pasta ?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Sim</button>
      <button mat-button (click)="close()">Não</button>
    </div>
    `
})
export class DialogFolderDelete {
    constructor(public dialogRef: MatDialogRef<FoldersOptionComponent>) { }

    close() {
        this.dialogRef.close()
    }
}
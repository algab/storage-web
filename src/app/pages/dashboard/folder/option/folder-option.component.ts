import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { FolderEditComponent } from '../../../../components/folder-edit/folder-edit.component';
import { FolderDeleteComponent } from '../../../../components/folder-delete/folder-delete.component';

import { FolderService } from '../folder.service';

@Component({
    selector: 'app-dashboard-folder-option',
    templateUrl: './folder-option.component.html'
})
export class FolderOptionComponent implements OnInit {
    public folders: any[] = [];

    constructor(private service: FolderService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.listFolders();
    }

    listFolders() {
        this.folders = [];
        const bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
        this.service.getBucket(bucket).subscribe(data => {
            const folders = data.filter(object => object.type === 'folder');
            folders.sort().forEach(folder => {
                this.service.getFolderInfo(folder.name, bucket).subscribe(record => {
                    this.folders.push({ ...record, name: folder.name });
                });
            });
        })
    }

    edit(name: string) {
        const dialogRef = this.dialog.open(FolderEditComponent, {
            width: '800px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                const bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
                this.service.editFolder(name, { bucket, folder: result }).subscribe(() => {
                    this.listFolders();
                }, err => {
                    if (err.status === 409) {
                        this.snackBar.open('Pasta com mesmo nome já existe.', 'FECHAR', {
                            duration: 2000
                        });
                    } else {
                        this.snackBar.open('Pasta não encontrada.', 'FECHAR', {
                            duration: 2000
                        });
                    }
                });
            }
        })
    }

    delete(name: string) {
        const dialogRef = this.dialog.open(FolderDeleteComponent, {
            width: '800px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                const bucket = JSON.parse(localStorage.getItem('user')).bucket.name;
                this.service.deleteFolder(bucket, name).subscribe(() => {
                    this.listFolders();
                }, err => {
                    if (err.status === 409) {
                        this.snackBar.open('Pasta não está vazia.', 'FECHAR', {
                            duration: 2000
                        })
                    } else {
                        this.snackBar.open('Pasta não encontrada.', 'FECHAR', {
                            duration: 2000
                        })
                    }
                });
            }
        });
    }
}

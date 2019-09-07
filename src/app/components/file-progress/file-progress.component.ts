import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { FilesService } from '../../pages/dashboard/files/files.service';

@Component({
    selector: 'app-file-progress',
    templateUrl: './file-progress.component.html'
})
export class FileProgressComponent implements OnInit {
    public progress = 0;

    constructor(
        private service: FilesService,
        private snack: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void {
        if (this.data.type === 'bucket') {
            this.service.uploadFileBucket(this.data.bucket, this.data.formData).subscribe(data => {
                this.snack.open('Upload realizado com sucesso.', 'FECHAR', {
                    duration: 2000
                })
            }, err => {
                if (err.status === 409) {
                    this.snack.open('Esse arquivo está corrompido.', 'FECHAR', {
                        duration: 2000
                    });
                } else {
                    this.snack.open('Por favor, tente novamente mais tarde.', 'FECHAR', {
                        duration: 2000
                    });
                }
            });
        } else {
            this.service.uploadFileFolder(this.data.bucket, this.data.folder, this.data.formData).subscribe(data => {
                this.snack.open('Upload realizado com sucesso.', 'FECHAR', {
                    duration: 1000
                });
            }, err => {
                if (err.status === 409) {
                    this.snack.open('Esse arquivo está corrompido.', 'FECHAR', {
                        duration: 2000
                    });
                } else {
                    this.snack.open('Por favor, tente novamente mais tarde.', 'FECHAR', {
                        duration: 2000
                    });
                }
            });
        }
        this.service.uploadProgress().subscribe(data => {
            this.progress = data.percent;
        });
    }
}

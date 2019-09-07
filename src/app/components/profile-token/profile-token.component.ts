import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../../pages/dashboard/profile/profile.service';

@Component({
    selector: 'app-profile-token',
    templateUrl: './profile-token.component.html'
})
export class ProfileTokenComponent implements OnInit {
    public token: string;

    constructor(private service: ProfileService) { }

    ngOnInit(): void {
        const nick = JSON.parse(localStorage.getItem('user')).nick;
        this.service.tokenUser(nick).subscribe(data => {
            this.token = data.token;
        });
    }
}

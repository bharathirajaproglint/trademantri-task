import { Component } from '@angular/core';

@Component({
    selector: 'side-menu',
    templateUrl: './sidemenu.template.html'
})
export class SideMenuComponent {
    showNavbar = false

    toggleNavBar() {
        this.showNavbar = !this.showNavbar;
    }
}

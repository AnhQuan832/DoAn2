import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.less']
})
export class AdminLayoutComponent {

  onNavbarClick(element) {
    const items = document.querySelectorAll(".nav-link");
    items.forEach((item) => {
      item.classList.remove("active")
      item.removeAttribute("style");
    })
    element.target.classList.add("active")
  }

  toogleSideBar() {
    const sidebar: any = document.getElementById('sidebar');
    sidebar.classList.toggle('hide');

  }
}

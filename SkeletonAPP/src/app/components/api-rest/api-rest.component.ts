import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { ApiRestService } from 'src/app/services/api-rest.service';

@Component({
  selector: 'app-api-rest',
  templateUrl: './api-rest.component.html',
  styleUrls: ['./api-rest.component.scss'],
})
export class ApiRestComponent  implements OnInit {

  dataService = inject(ApiRestService);

  users: User[] = [];
  newUser: User = { uid: '', email: '', password: '', userRole: 1};
  editUser: User | null = null;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.dataService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  addUser() {
    if (this.newUser.email || this.newUser.password) return;

    const newUser: User = {
      uid: this.newUser.uid,
      email: this.newUser.email,
      password: this.newUser.password,
      userRole: this.newUser.userRole
    };

    this.dataService.createUser(newUser).subscribe((user) => {
      this.users.push(user); // Agrega el nuevo usuario a la lista. 
      this.reset();
    })
  }

  updateUser(user:User) {
    this.editUser = user;
    this.newUser.uid = user.uid;
    this.newUser.email = user.email;
    this.newUser.password = user.password;
    this.newUser.userRole = user.userRole;
  }

  saveUser() {
    if (!this.editUser) return;

    const updatedUser: User = {
      uid: this.newUser.uid,
      email: this.newUser.email,
      password: this.newUser.password,
      userRole: this.newUser.userRole
    };

    this.dataService.updateUser(updatedUser).subscribe((user) => {
      const index = this.users.findIndex(u => u.uid === user.uid);
      if (index !== -1) {
        this.users[index] = user;
      }
      this.reset();
      this.editUser = null;
    })
  }

  deleteUser(uid:string) {
    this.dataService.deleteUser(uid).subscribe(()=> {
      this.users = this.users.filter(user => user.uid !== uid);
    });
  }

  reset() {
    this.newUser= {
      uid: '',
      email: '',
      password: '',
      userRole: 1
    }
  }
}

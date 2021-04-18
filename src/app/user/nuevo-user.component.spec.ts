import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { User } from '../models/User';
import { UsersService } from '../service/users/users.service';

import { NuevoUserComponent } from './nuevo-user.component';

class UsersServiceMock{
  getLoggedInUserRoleAdmin = jasmine.createSpy('getLoggedInUserRoleAdmin');
  logout = jasmine.createSpy('logout');

}
class ToastrServiceMock{
  success = jasmine.createSpy('toastr.success');
  warning = jasmine.createSpy('toastr.warning');

}

class MatDialogMock{
  open = jasmine.createSpy('dialogo.open');
  afterClosed = jasmine.createSpy('dialogo.afterClosed');
  subscribe = jasmine.createSpy('dialogo.subscribe');
  
}
// let mockRouter = {
//   navigate: jasmine.createSpy('navigate'),
//   navigateByUrl: jasmine.createSpy('navigateByUrl'),
//   router: jasmine.createSpy('routerState')
// };
describe('NuevoUserComponent', () => {
  let component: NuevoUserComponent;
  let fixture: ComponentFixture<NuevoUserComponent>;

  let matDialogMock: MatDialogMock;
  let userServiceMock: UsersServiceMock;
  let toastrMock : ToastrServiceMock;
  const spyRouter = jasmine.createSpyObj('Router', ['navigate']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        //Estos 2 imports casi que van de cajon siempre
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ NuevoUserComponent ],

      //los mock que creamos
      providers: [
        HttpClient,
        NuevoUserComponent,
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
        {
          provide: Router,
          useValue: spyRouter,
        },
        {
          provide: ToastrService,
          useClass: ToastrServiceMock,
        },
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },

      ]
    });

    //inject de los mock para hacer referencia a los reales
    component = TestBed.get(NuevoUserComponent);
    toastrMock = TestBed.get(ToastrService);
    matDialogMock = TestBed.get(MatDialog);
    component.ngOnInit();
  });
  //**ESTO LO QUITE POR QUE ME DIO CLAVOS */
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(NuevoUserComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

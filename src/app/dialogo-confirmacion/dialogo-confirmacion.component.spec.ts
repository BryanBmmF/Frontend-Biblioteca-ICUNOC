import { Component, NgModule } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';

import { DialogoConfirmacionComponent } from './dialogo-confirmacion.component';

describe('InformationDialog', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  let noop: ComponentFixture<NoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoConfirmacionComponent ],
      imports: [ DialogTestModule ],
      providers: [
        { provide: OverlayContainer, useFactory: () => {
          overlayContainerElement = document.createElement('div');
          return { getContainerElement: () => overlayContainerElement };
        }}
      ]
    });

    dialog = TestBed.get(MatDialog);
    noop = TestBed.createComponent(NoopComponent);

  });
  

  it('shows information without details', () => {
    const config = {
      data: {
        title: 'User cannot be saved without an email',
        details: []
      }
    };

    dialog.open(DialogoConfirmacionComponent, config);
    noop.detectChanges(); // Updates the dialog in the overlay

    const button = overlayContainerElement.querySelector('button');
    expect(button.textContent).toBe('No');
  });

  it('shows an error message with some details', () => {
    const config = {
      data: {
        title: 'Validation Error - Not Saved',
        details: ['Need an email', 'Username already in use']
      }
    };
    dialog.open(DialogoConfirmacionComponent, config);
    noop.detectChanges(); // Updates the dialog in the overlay
    // const button = overlayContainerElement.querySelector('button');
    // expect(button.textContent).toBe('Sí');

  });

});

// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [
  DialogoConfirmacionComponent,
  NoopComponent
];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    DialogoConfirmacionComponent
  ],
})
class DialogTestModule { }
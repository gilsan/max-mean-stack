import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatGridListModule,
  MatCheckboxModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatTableModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatProgressSpinnerModule

} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    MatButtonModule,
    MatGridListModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatGridListModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {
}

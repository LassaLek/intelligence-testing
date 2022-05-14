import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArcItemComponent } from './arc-item/arc-item.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { ResultListComponent } from './result-list/result-list.component';
import { ResultComponent } from './result/result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickColorDirective } from './click-color.directive';

@NgModule({
  declarations: [
    AppComponent,
    ArcItemComponent,
    AssignmentComponent,
    AssignmentListComponent,
    ResultListComponent,
    ResultComponent,
    ClickColorDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

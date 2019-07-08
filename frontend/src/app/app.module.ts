import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {GraphQLModule} from './apollo.config'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material';
import { CommonModule } from '@angular/common';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InstitutionComponent } from './institution/institution.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import {DataService} from './services/data.service';
import {ModalService} from './services/modal.service';
import {DomService} from './services/dom.service';
import {FlashMessagesModule} from 'angular2-flash-messages'
import { AuthGuard } from './guards/auth.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TemplateDialogComponent } from './template-dialog/template-dialog.component';
import { FolderComponent } from './folder/folder.component';
import { FolderDialogComponent } from './folder-dialog/folder-dialog.component';
import { TemplateComponent } from './template/template.component';

@NgModule({
	declarations : [
		AppComponent,
		NavbarComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		ProfileComponent,
		DashboardComponent,
		InstitutionComponent,
		TemplateDialogComponent,
		FolderComponent,
		FolderDialogComponent,
		TemplateComponent,
	],
	imports      : [
		BrowserModule,
		AppRoutingModule,
		ApolloModule,
		HttpClientModule,
		HttpLinkModule,
		GraphQLModule,
    FormsModule,
		FlashMessagesModule.forRoot(),
		FlexLayoutModule,
		BrowserAnimationsModule,
		CommonModule,
		MatDialogModule,
		ReactiveFormsModule,

	],
	providers    : [
		ValidateService,
		AuthService,
		AuthGuard,
		DataService,
		ModalService,
		DomService
	],
	bootstrap    : [
		AppComponent,
	],
	entryComponents:[TemplateDialogComponent, FolderDialogComponent]
})
export class AppModule {}

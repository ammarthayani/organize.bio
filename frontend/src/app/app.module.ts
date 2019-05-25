import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { FormsModule } from '@angular/forms';
import {GraphQLModule} from './apollo.config'


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
import {FlashMessagesModule} from 'angular2-flash-messages'
import { AuthGuard } from './guards/auth.guard';

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
	],
	providers    : [
		ValidateService,
		AuthService,
		AuthGuard
	],
	bootstrap    : [
		AppComponent,
	],
})
export class AppModule {}


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBadgeModule } from '@angular/material/badge';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

import { CdkTableModule } from '@angular/cdk/table';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';

import { HttpRequestInterceptor } from './authentication/HttpRequestInterceptor';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';

import { VerticalAppHeaderComponent } from './layouts/full/vertical-header/vertical-header.component';
import { VerticalAppSidebarComponent } from './layouts/full/vertical-sidebar/vertical-sidebar.component';
import { HorizontalAppHeaderComponent } from './layouts/full/horizontal-header/horizontal-header.component';

import { AppBreadcrumbComponent } from './layouts/full/breadcrumb/breadcrumb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { AdminComponent } from './login/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { DialogRegisterTeam } from './pages/home/modals/register-team-dialog.component';
import { DialogLookingForATeam } from './pages/home/modals/looking-for-a-team-dialog.component';

import { DialogScheduleGame } from './pages/schedules/modals/dialog-schedule-game.component';
import { DialogTeam } from './pages/teams/modals/dialog-team.component';

import { AuthGuard } from './shared/security/auth.guard';
import { LoginActiveGuard } from './shared/security/login-active.guard';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StandingsComponent } from './pages/standings/standings.component';
import { StandingsTableComponent } from './pages/standings/standings-table/standings-table.component';
import { FieldsComponent } from './pages/fields/fields.component';
import { RulesComponent } from './pages/rules/rules.component';
import { SponsersComponent } from './pages/sponsers/sponsers.component';
import { RegisteredTeamsComponent } from './pages/registered-teams/registered-teams.component';
import { FreeAgentsComponent } from './pages/free-agents/free-agents.component';
import { SchedulePreferenceComponent } from './pages/schedule-preference/schedule-preference.component';
import { BulletinBoardComponent } from './pages/bulletin-board/bulletin-board.component';
import { MvpVotingComponent } from './pages/mvp-voting/mvp-voting.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { TeamsComponent } from './pages/teams/teams.component';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { AuthenticationResolver } from 'src/app/shared/authenticate-resolver.service';


export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true,
	wheelSpeed: 2,
	wheelPropagation: true
};

@NgModule({
	declarations: [
		AppComponent,
		FullComponent,
		VerticalAppHeaderComponent,
		SpinnerComponent,
		AppBlankComponent,
		VerticalAppSidebarComponent,
		AppBreadcrumbComponent,
		HorizontalAppHeaderComponent,
		AdminComponent,
		HomeComponent,
		DialogRegisterTeam,
		DialogLookingForATeam,
		DialogScheduleGame,
		DialogTeam,
		StandingsComponent,
		StandingsTableComponent,
		FieldsComponent,
		RulesComponent,
		SponsersComponent,
		SchedulePreferenceComponent,
		RegisteredTeamsComponent,
		FreeAgentsComponent,
		BulletinBoardComponent,
		MvpVotingComponent,
		SchedulesComponent,
		TeamsComponent
	],
	imports: [
		MatAutocompleteModule,
		MatButtonModule,
		MatBottomSheetModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatTableModule,
		MatDatepickerModule,
		MatDialogModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatBadgeModule,
		MatSidenavModule,
		MatSlideToggleModule,
		MatSliderModule,
		MatSnackBarModule,
		MatSortModule,
		MatStepperModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
		MatNativeDateModule,
		CdkTableModule,
		A11yModule,
		BidiModule,
		CdkAccordionModule,
		ObserversModule,
		OverlayModule,
		PlatformModule,
		PortalModule,
		BrowserModule,
		BrowserAnimationsModule,
		DemoMaterialModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		PerfectScrollbarModule,
		HttpClientModule,
		SharedModule,
		RouterModule.forRoot(AppRoutes),
		NgxMatTimepickerModule,
		NgxMatDatetimePickerModule,
		NgxMatNativeDateModule,
		NgxMatMomentModule,

		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [
		AuthGuard,
		LoginActiveGuard,
		AuthenticationService,
		AuthenticationResolver,
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpRequestInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

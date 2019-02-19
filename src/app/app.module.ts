import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MasterComponent } from './components/master/master.component';
import { LandingComponent } from './components/dashboard/landing/landing.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { DetailComponent } from './components/dashboard/users/detail/detail.component';
import { CoinsComponent } from './components/dashboard/settings/coins/coins.component';
import { ColdWalletComponent } from './components/dashboard/settings/cold-wallet/cold-wallet.component';
import { DepositComponent } from './components/dashboard/transactions/deposit/deposit.component';
import { WithdrawComponent } from './components/dashboard/transactions/withdraw/withdraw.component';
import { CommissionComponent } from './components/dashboard/transactions/commission/commission.component';
import { AllTransactionComponent } from './components/dashboard/transactions/all-transaction/all-transaction.component';
import { PendingComponent } from './components/dashboard/transactions/pending/pending.component';
import { EditComponent } from './components/dashboard/settings/coins/edit/edit.component';
import { UpdateComponent } from './components/dashboard/settings/coins/update/update.component';
import { ModifyComponent } from './components/dashboard/settings/cold-wallet/modify/modify.component';
import { SupportComponent } from './components/dashboard/support/support.component';
import { ViewComponent } from './components/dashboard/support/view/view.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { ChangePasswordComponent } from './components/dashboard/profile/change-password/change-password.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
import { HeaderComponent } from './components/ui/header/header.component';
import { SideNavComponent } from './components/ui/side-nav/side-nav.component';
import { LastLoginComponent } from './components/dashboard/landing/last-login/last-login.component';
import { BalancesComponent } from './components/dashboard/landing/balances/balances.component';
import { BackBtnComponent } from './components/helper/back-btn/back-btn.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { RestrictionComponent } from './components/dashboard/users/restriction/restriction.component';
import { LoadingComponent } from './components/helper/loading/loading.component';
import { NoDataComponent } from './components/helper/no-data/no-data.component';
import { ApiErrorComponent } from './components/helper/api-error/api-error.component';
import { CoinNameComponent } from './components/helper/coin-name/coin-name.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MasterComponent,
    LandingComponent,
    UsersComponent,
    DetailComponent,
    CoinsComponent,
    ColdWalletComponent,
    DepositComponent,
    WithdrawComponent,
    CommissionComponent,
    AllTransactionComponent,
    PendingComponent,
    EditComponent,
    UpdateComponent,
    ModifyComponent,
    SupportComponent,
    ViewComponent,
    ProfileComponent,
    ChangePasswordComponent,
    HeaderComponent,
    SideNavComponent,
    BalancesComponent,
    LastLoginComponent,
    BackBtnComponent,
    FooterComponent,
    RestrictionComponent,
    LoadingComponent,
    NoDataComponent,
    ApiErrorComponent,
    CoinNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    DataTablesModule
  ],
  providers: [Title, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

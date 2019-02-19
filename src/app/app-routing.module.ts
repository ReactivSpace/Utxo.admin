import { RestrictionComponent } from './components/dashboard/users/restriction/restriction.component';
import { ModifyComponent } from './components/dashboard/settings/cold-wallet/modify/modify.component';
import { ColdWalletComponent } from './components/dashboard/settings/cold-wallet/cold-wallet.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';

import { ChangePasswordComponent } from './components/dashboard/profile/change-password/change-password.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { SupportComponent } from './components/dashboard/support/support.component';
import { PendingComponent } from './components/dashboard/transactions/pending/pending.component';
import { AllTransactionComponent } from './components/dashboard/transactions/all-transaction/all-transaction.component';
import { CommissionComponent } from './components/dashboard/transactions/commission/commission.component';
import { WithdrawComponent } from './components/dashboard/transactions/withdraw/withdraw.component';
import { DepositComponent } from './components/dashboard/transactions/deposit/deposit.component';
import { UpdateComponent } from './components/dashboard/settings/coins/update/update.component';
import { EditComponent } from './components/dashboard/settings/coins/edit/edit.component';
import { CoinsComponent } from './components/dashboard/settings/coins/coins.component';
import { DetailComponent } from './components/dashboard/users/detail/detail.component';
import { MasterComponent } from './components/master/master.component';
import { LandingComponent } from './components/dashboard/landing/landing.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ViewComponent } from './components/dashboard/support/view/view.component';

const routes: Routes = [
  // auth
  { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full'},
  { path: 'auth', children: [
    { path: 'login', component: LoginComponent },
  ]},

  // Dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  //  canActivate: [AuthGuardService]
  { path: 'dashboard', component: MasterComponent, canActivate: [AuthGuardService], children: [
    { path: '', component: LandingComponent },
    { path: 'users', children: [
      { path: '', component: UsersComponent },
      { path: 'restriction/:id', component: RestrictionComponent },
      { path: ':id', component: DetailComponent },
    ]},
    // settings
    { path: 'settings', redirectTo: 'settings/coins' },
    { path: 'settings', children: [
      { path: 'coins', component: CoinsComponent },
      { path: 'coins/edit', component: EditComponent },
      { path: 'coins/update/:id', component: UpdateComponent },
      { path: 'cold-wallet', component: ColdWalletComponent },
      { path: 'cold-wallet/modify/:id', component: ModifyComponent }
    ]},
    // transactions
    { path: 'transactions', redirectTo: 'transactions/deposit' },
    { path: 'transactions', children: [
      { path: 'deposit', component: DepositComponent },
      { path: 'withdraw', component: WithdrawComponent },
      { path: 'commission', component: CommissionComponent },
      { path: 'all', component: AllTransactionComponent },
      { path: 'pending', component: PendingComponent }
    ]},
    // support
    { path: 'support', children: [
      { path: '', component: SupportComponent },
      { path: 'view', component: ViewComponent }
    ]},
    // profile
    { path: 'profile', children: [
      { path: '', component: ProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent }
    ]}
  ]},
  // redirect
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

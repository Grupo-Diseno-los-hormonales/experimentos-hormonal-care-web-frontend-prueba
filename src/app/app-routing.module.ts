import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DoctorChatComponent} from './communications/pages/doctor-chat/doctor-chat.component';
import {NotificationsViewComponent} from './notifications/pages/notifications-view/notifications-view.component';
import {PageNotFoundComponent} from './public/pages/page-not-found/page-not-found.component';
import {DoctorProfileComponent} from './profiles/pages/doctor-profile/doctor-profile.component';
import {HomeDoctorComponent} from './profiles/pages/home-doctor/home-doctor.component';
import {HomePatientComponent} from './profiles/pages/home-patient/home-patient.component';
import {CalendarPatientViewComponent} from './calendar/pages/calendar-patient-view/calendar-patient-view.component';
import {PatientChatComponent} from './communications/pages/patient-chat/patient-chat.component';
import {
  NotificationsPatientsComponent
} from './notifications/pages/notifications-patients/notifications-patients.component';
import {PatientProfileComponent} from './profiles/pages/patient-profile/patient-profile.component';
import {SelectUserRoleComponent} from './identity-and-access/pages/select-user-role/select-user-role.component';
import {HeaderDoctorComponent} from './shared/pages/header-doctor/header-doctor.component';
import {HeaderPatientComponent} from './shared/pages/header-patient/header-patient.component';

import {LoginComponent} from './identity-and-access/auth/components/login/login.component';
import {RegisterComponent} from './identity-and-access/auth/components/register/register.component';
import {ForgotPasswordComponent} from './identity-and-access/auth/components/forgot-password/forgot-password.component';
import {
  SelectPaymentMethodComponent
} from "./subscriptions-and-payments/pages/select-payment-method/select-payment-method.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'selectRole', component: SelectUserRoleComponent},
  {path: 'headerDoctor', component: HeaderDoctorComponent},
  {path: 'headerPatient', component: HeaderPatientComponent},
  {path: 'homeDoctor', component: HomeDoctorComponent},
  {path: 'homePatient', component: HomePatientComponent},
  {
    path: 'available-doctors',
    loadComponent: () =>
      import('../../src/app/profiles/components/available-doctors/available-doctors.component').then(m => m.AvailableDoctorsComponent)
  },
  {
    path: 'doctor-profile/:id',
    loadComponent: () => import('../../src/app/profiles/components/doctor-profile/doctor-profile.component').then(m => m.DoctorProfileComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },


  {

    path: 'appointments/:id',
    loadComponent: () => import('../../src/app/profiles/components/appointments/appointments.component').then(m => m.AppointmentsComponent)
  },

  {
    path: 'calendar',
    loadChildren: () =>
      import('./calendar/calendar.module').then(m => m.CalendarModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
  },

  {path: 'messages', component: DoctorChatComponent},
  {path: 'notifications', component: NotificationsViewComponent},
  {path: 'doctorProfile', component: DoctorProfileComponent},
  {path: 'calendarPatientView', component: CalendarPatientViewComponent},
  {path: 'messagesPatient', component: PatientChatComponent},
  {path: 'notificationsPatient', component: NotificationsPatientsComponent},
  {path: 'patientProfile', component: PatientProfileComponent},
  {
    path: 'medical-history',
    loadChildren: () =>
      import('./medical-history/medical-history.module').then(m => m.MedicalHistoryModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule)
  },
  {path:'payment',component: SelectPaymentMethodComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

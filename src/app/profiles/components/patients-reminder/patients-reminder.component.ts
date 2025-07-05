import { Component, OnInit } from '@angular/core';
import { MedicalHistoryEntity, TreatmentAndMedication } from "../../model/medical-history.entity";
import { MedicalHistoryService } from "../../services/medical-history.service";
import { forkJoin } from 'rxjs';
import {CommonModule} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-patients-reminder',
  standalone: true,
  templateUrl: './patients-reminder.component.html',
  styleUrls: ['./patients-reminder.component.css'],
  imports: [CommonModule,
    MatTableModule,
    MatSortModule, TranslateModule]
})
export class PatientsReminderComponent implements OnInit {
  medicalHistoryData!: MedicalHistoryEntity[];
  dataSource: TreatmentAndMedication[] = [];
  displayed: string[] = ['drug_name', 'concentration', 'frequency'];

  constructor(private medicalHistoryService: MedicalHistoryService,
              private translate: TranslateService,) {
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);

  }
  selectedLang = localStorage.getItem('lang') || 'es';

  changeLang(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.selectedLang = lang;
  }

  ngOnInit() {
    this.getMedicalHistoryDetailsByPatient(['1']); // replace with the actual patient IDs
  }

  private getMedicalHistoryDetailsByPatient(patientIds: string[]) {
    this.medicalHistoryService.getAll()
      .subscribe((allMedicalHistories: any) => { // Change the type to any
        const filtered = allMedicalHistories.filter((medicalHistory: MedicalHistoryEntity) => patientIds.includes(medicalHistory.patient_id.toString()));

        const grouped = filtered.reduce((grouped: { [key: string]: MedicalHistoryEntity[] }, current: MedicalHistoryEntity) => {
          (grouped[current.patient_id] = grouped[current.patient_id] || []).push(current);
          return grouped;
        }, {});

        this.medicalHistoryData = (Object.values(grouped) as MedicalHistoryEntity[][]).map((group: MedicalHistoryEntity[]) => {
          const combined: MedicalHistoryEntity = { ...group[0] };
          combined.treatment_and_medication = group.flatMap(medicalHistory => medicalHistory.treatment_and_medication);
          return combined;
        });

        this.dataSource = this.medicalHistoryData.flatMap(medicalHistory => medicalHistory.treatment_and_medication);
      }, error => {
        console.error('Error occurred while fetching medical history data: ', error);
      });
  }
  sortData(sort: {active: string, direction: string}): void {
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.dataSource = this.dataSource.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'drug_name': return compare(a.drug_name, b.drug_name, isAsc);
        case 'quantity': return compare(a.quantity, b.quantity, isAsc);
        case 'concentration': return compare(a.concentration, b.concentration, isAsc);
        case 'frequency': return compare(a.frequency, b.frequency, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

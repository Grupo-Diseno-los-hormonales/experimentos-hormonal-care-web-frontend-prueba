import { Component } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
interface KnowledgeItem {
  titleKey: string;
  contentKey: string;
}
@Component({
  selector: 'app-knowledge-base',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatLabel,
    MatIcon,
    FormsModule,
    MatInput,
    NgIf,
    MatIconButton,
    NgForOf,
    TranslateModule
  ],
  templateUrl: './knowledge-base.component.html',
  styleUrls: ['./knowledge-base.component.css']
})
export class KnowledgeBaseComponent {
  searchTerm = '';
  allQuestions: KnowledgeItem[] = [];
  filteredQuestions: KnowledgeItem[] = [];
  constructor(private http: HttpClient, private translate: TranslateService) {
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

  ngOnInit(): void {
    this.allQuestions = [
      {
        titleKey: 'SUPPORT.KB.Q1.TITLE',
        contentKey: 'SUPPORT.KB.Q1.CONTENT'
      },
      {
        titleKey: 'SUPPORT.KB.Q2.TITLE',
        contentKey: 'SUPPORT.KB.Q2.CONTENT'
      },
      {
        titleKey: 'SUPPORT.KB.Q3.TITLE',
        contentKey: 'SUPPORT.KB.Q3.CONTENT'
      },
      {
        titleKey: 'SUPPORT.KB.Q4.TITLE',
        contentKey: 'SUPPORT.KB.Q4.CONTENT'
      },
      {
        titleKey: 'SUPPORT.KB.Q5.TITLE',
        contentKey: 'SUPPORT.KB.Q5.CONTENT'
      },
      {
        titleKey: 'SUPPORT.KB.Q6.TITLE',
        contentKey: 'SUPPORT.KB.Q6.CONTENT'
      },
      {
        titleKey: 'SUPPORT.KB.Q7.TITLE',
        contentKey: 'SUPPORT.KB.Q7.CONTENT'
      },
      {
        titleKey: 'SUPPORT.KB.Q8.TITLE',
        contentKey: 'SUPPORT.KB.Q8.CONTENT'
      },
      {
        titleKey: 'SUPPORT.KB.Q9.TITLE',
        contentKey: 'SUPPORT.KB.Q9.CONTENT'
      },
      {
        titleKey: 'SUPPORT.KB.Q10.TITLE',
        contentKey: 'SUPPORT.KB.Q10.CONTENT'
      }
    ];


    this.filteredQuestions = [...this.allQuestions];
  }

  filterQuestions(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredQuestions = this.allQuestions.filter(q => {
      const title = this.translate.instant(q.titleKey).toLowerCase();
      const content = this.translate.instant(q.contentKey).toLowerCase();
      return title.includes(term) || content.includes(term);
    });
  }


  clearSearch(): void {
    this.searchTerm = '';
    this.filteredQuestions = [...this.allQuestions];
  }
}


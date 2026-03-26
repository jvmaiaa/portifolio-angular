import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill, Project, Certification, Article } from '../models';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  private readonly http = inject(HttpClient);

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>('assets/data/skills.json');
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('assets/data/projects.json');
  }

  getCertifications(): Observable<Certification[]> {
    return this.http.get<Certification[]>('assets/data/certifications.json');
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('assets/data/articles.json');
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from './core/services/seo.service';
import { ThemeService } from './core/services/theme.service';
import { Articles } from './features/articles/articles';
import { Certifications } from './features/certifications/certifications';
import { Footer } from './features/footer/footer';
import { Hero } from './features/hero/hero';
import { Projects } from './features/projects/projects';
import { Skills } from './features/skills/skills';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Hero, Skills, Certifications, Projects, Articles, Footer],
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-skills />
      <app-certifications />
      <!-- <app-projects /> -->
      <app-articles />
    </main>
    <app-footer />
  `,
  styles: `
    main {
      min-height: 100vh;
    }
  `,
})
export class App implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.themeService.init();
    this.seoService.setPageMeta({
      title: 'Joao Victor | Desenvolvedor Java Senior - Spring Boot, Microservicos',
      description:
        'Portfolio de Joao Victor, Desenvolvedor Java Senior especializado em Spring Boot, microservicos, APIs REST e arquitetura de software.',
      keywords:
        'desenvolvedor java, java developer, spring boot, microservicos, api rest, backend developer, java senior, joao victor',
    });
  }
}

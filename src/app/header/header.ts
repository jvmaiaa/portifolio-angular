import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header" [class.scrolled]="isScrolled()">
      <nav class="nav-container" role="navigation" aria-label="Main navigation">
        <a class="logo" href="#hero" (click)="scrollTo($event, 'hero')">
          <span class="logo-bracket">{{ '{' }}</span>
          <span class="logo-text">Joao.</span><span class="logo-methodName">Maia</span><span class="logo-parenthesis">()</span>
          <span class="logo-bracket">{{ '}' }}</span>
          <span class="logo-cursor">|</span>
        </a>

        <ul class="nav-links" [class.open]="menuOpen()" role="menubar">
          @for (link of navLinks; track link.id) {
            <li role="none">
              <a
                [href]="'#' + link.id"
                role="menuitem"
                class="nav-link"
                [class.active]="activeSection() === link.id"
                (click)="scrollTo($event, link.id); closeMenu()"
              >
                {{ link.label }}
              </a>
            </li>
          }
        </ul>

        <div class="nav-actions">
          <button
            class="theme-toggle"
            (click)="themeService.toggle()"
            [attr.aria-label]="themeService.isDark() ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
          >
            <span class="theme-icon">{{ themeService.isDark() ? '&#9790;' : '&#9728;' }}</span>
          </button>

          <button
            class="hamburger"
            [class.open]="menuOpen()"
            (click)="toggleMenu()"
            aria-label="Toggle menu"
            [attr.aria-expanded]="menuOpen()"
          >
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </nav>
    </header>

    @if (menuOpen()) {
      <div class="menu-overlay" (click)="closeMenu()"></div>
    }
  `,
  styles: `
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 0 2rem;
      height: 70px;
      display: flex;
      align-items: center;
      background: var(--header-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid transparent;
      transition: border-color 0.3s ease, background 0.3s ease;
    }

    .header.scrolled {
      border-bottom-color: var(--border-color);
    }

    .nav-container {
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      text-decoration: none;
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0;
    }

    .logo-bracket { color: var(--java-orange); }
    .logo-text { color: var(--text-primary); font-weight: 600; }
    .logo-methodName { color: var(--spring-blue); }
    .logo-parenthesis { color: var(--spring-green); }

    .logo-cursor {
      color: var(--java-orange);
      animation: blink 1s step-end infinite;
      margin-left: 2px;
    }

    @keyframes blink {
      50% { opacity: 0; }
    }

    .nav-links {
      display: flex;
      list-style: none;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }

    .nav-link {
      text-decoration: none;
      font-family: 'Sora', sans-serif;
      font-size: 0.9rem;
      color: var(--text-secondary);
      transition: color 0.3s ease;
      position: relative;
      padding: 0.25rem 0;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--java-orange);
      transition: width 0.3s ease;
    }

    .nav-link:hover,
    .nav-link.active {
      color: var(--text-primary);
    }

    .nav-link.active::after,
    .nav-link:hover::after {
      width: 100%;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .theme-toggle {
      background: none;
      border: 1px solid var(--border-color);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: border-color 0.3s ease, transform 0.3s ease;
    }

    .theme-toggle:hover {
      border-color: var(--java-orange);
      transform: rotate(15deg);
    }

    .theme-icon {
      font-size: 1.2rem;
      line-height: 1;
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
    }

    .hamburger-line {
      width: 24px;
      height: 2px;
      background: var(--text-primary);
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .hamburger.open .hamburger-line:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    .hamburger.open .hamburger-line:nth-child(2) {
      opacity: 0;
    }
    .hamburger.open .hamburger-line:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }

    .menu-overlay {
      display: none;
    }

    @media (max-width: 768px) {
      .header { padding: 0 1rem; }

      .hamburger { display: flex; }

      .nav-links {
        position: fixed;
        top: 70px;
        right: -100%;
        width: 70%;
        max-width: 300px;
        height: calc(100vh - 70px);
        flex-direction: column;
        background: var(--surface-1);
        padding: 2rem;
        gap: 1.5rem;
        transition: right 0.3s ease;
        border-left: 1px solid var(--border-color);
      }

      .nav-links.open {
        right: 0;
      }

      .menu-overlay {
        display: block;
        position: fixed;
        inset: 70px 0 0 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
      }
    }
  `,
})
export class Header implements AfterViewInit, OnDestroy {
  readonly themeService = inject(ThemeService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isScrolled = signal(false);
  readonly menuOpen = signal(false);
  readonly activeSection = signal('hero');

  private observer: IntersectionObserver | null = null;

  readonly navLinks = [
    { id: 'hero', label: 'Sobre' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certificações' },
    { id: 'projects', label: 'Projetos' },
    { id: 'articles', label: 'Artigos' },
    { id: 'footer', label: 'Contato' },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    window.addEventListener('scroll', this.onScroll);
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    window.removeEventListener('scroll', this.onScroll);
    this.observer?.disconnect();
  }

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();
    if (!isPlatformBrowser(this.platformId)) return;

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  private readonly onScroll = (): void => {
    this.isScrolled.set(window.scrollY > 50);
  };

  private setupIntersectionObserver(): void {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: '-70px 0px 0px 0px' }
    );

    sections.forEach((section) => this.observer!.observe(section));
  }
}

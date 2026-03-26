import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WINDOW } from '../tokens/window.token';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly win = inject(WINDOW);
  private readonly _theme = signal<'dark' | 'light'>('dark');

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  toggle(): void {
    const next = this._theme() === 'dark' ? 'light' : 'dark';
    this._theme.set(next);
    this.applyTheme(next);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('portfolio-theme', next);
    }
  }

  init(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.applyTheme('dark');
      return;
    }

    const saved = localStorage.getItem('portfolio-theme') as 'dark' | 'light' | null;
    const preferred = this.win?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = saved ?? preferred;
    this._theme.set(theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: 'dark' | 'light'): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
}

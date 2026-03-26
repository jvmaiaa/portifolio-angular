# Portfolio Angular - Documentacao

## 1. Visao Geral

Portfolio profissional de Joao Victor, desenvolvedor Java Back-End Senior. O site foi construido em Angular 20 com foco em performance, SEO, acessibilidade e identidade visual inspirada no ecossistema Java/Spring.

**Principais tecnologias:**
- Angular 20 (standalone components, signals, new control flow `@if/@for`)
- TypeScript 5+ com strict mode
- SCSS com CSS Custom Properties para sistema de temas
- Tailwind CSS para utilitarios
- Marked para renderizacao de Markdown nos artigos

---

## 2. Setup Local

### Pre-requisitos
- Node.js 22+
- npm 10+
- Angular CLI (`npm install -g @angular/cli`)

### Instalacao
```bash
git clone https://github.com/jvmaiaa/portifolio-angular.git
cd portifolio-angular
npm install
ng serve
```

O site estara disponivel em `http://localhost:4200`.

---

## 3. Como Adicionar Conteudo

Todo o conteudo do site e gerenciado via arquivos JSON em `src/assets/data/`:

### Adicionar uma nova Skill
Edite `src/assets/data/skills.json`:
```json
{ "name": "NomeDaTech", "icon": "nome-do-icone-devicon" }
```
Os icones sao carregados automaticamente via CDN do Devicon.

### Adicionar um novo Projeto
Edite `src/assets/data/projects.json`:
```json
{
  "id": "meu-projeto",
  "title": "Meu Projeto",
  "description": "Descricao do projeto",
  "imageUrl": "",
  "tags": ["Java", "Spring Boot"],
  "projectUrl": "https://...",
  "githubUrl": "https://github.com/...",
  "featured": true
}
```

### Adicionar uma nova Certificacao
Edite `src/assets/data/certifications.json`:
```json
{
  "id": "cert-id",
  "name": "Nome da Certificacao",
  "issuer": "Empresa Emissora",
  "year": 2024,
  "imageUrl": "https://...",
  "verifyUrl": "https://..."
}
```

### Adicionar um novo Artigo
Edite `src/assets/data/articles.json`:
```json
{
  "id": "meu-artigo",
  "title": "Titulo do Artigo",
  "date": "2024-01-15",
  "readTimeMinutes": 10,
  "summary": "Resumo do artigo",
  "content": "# Conteudo em Markdown\n\nTexto aqui...",
  "tags": ["Java", "Spring Boot"]
}
```

---

## 4. Sistema de Temas

O sistema de temas utiliza **Angular Signals** para reatividade e **CSS Custom Properties** para estilizacao.

### Arquitetura
- `ThemeService` (`src/app/core/services/theme.service.ts`): gerencia o estado do tema com `signal<'dark' | 'light'>('dark')`
- O tema e persistido no `localStorage` com a chave `portfolio-theme`
- Se nao houver tema salvo, respeita a preferencia do sistema (`prefers-color-scheme`)
- Variaveis CSS definidas em `src/styles/themes.scss` em `:root[data-theme="dark"]` e `:root[data-theme="light"]`

### Como funciona
1. No `ngOnInit` do `AppComponent`, `ThemeService.init()` e chamado
2. O servico verifica: localStorage > preferencia do sistema > dark (padrao)
3. Aplica o atributo `data-theme` no `<html>` via `document.documentElement.setAttribute`
4. As variaveis CSS mudam automaticamente, aplicando o tema em todo o site

---

## 5. Carrossel de Habilidades

O carrossel usa **CSS puro** com `animation: marquee linear infinite`.

### Configuracao
- **Velocidade**: ajuste a variavel `--marquee-duration` (padrao: `35s`)
- **Pausa no hover**: automatico via `animation-play-state: paused`
- **Loop infinito**: o array de skills e duplicado para criar loop sem "salto"
- **Performance**: usa `will-change: transform`
- **Acessibilidade**: respeita `prefers-reduced-motion` desabilitando a animacao

### Adicionar skills
Basta editar `src/assets/data/skills.json` - o carrossel atualiza automaticamente.

---

## 6. SEO

### Meta Tags
Configuradas em `src/index.html`:
- Title, description, keywords, author
- Open Graph (og:title, og:description, og:type)
- Twitter Card
- Security headers (X-Content-Type-Options, Referrer-Policy)

### SEO Dinamico
O `SeoService` (`src/app/core/services/seo.service.ts`) permite atualizar meta tags programaticamente usando os servicos `Meta` e `Title` do Angular.

### JSON-LD
Dados estruturados do tipo `Person` estao no `<head>` do `index.html`.

### Sitemap & robots.txt
- `public/sitemap.xml`: mapa do site para crawlers
- `public/robots.txt`: regras de indexacao

---

## 7. Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
ng build --configuration production
vercel --prod
```

### Netlify
```bash
ng build --configuration production
# Arraste a pasta dist/portifolio-angular/browser/ para o Netlify
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
ng build --configuration production
firebase deploy
```

### Build de producao
```bash
ng build --configuration production
# Output: dist/portifolio-angular/browser/
```

---

## 8. Estrutura de Componentes

```
App (app.ts)
├── Header (header/header.ts)
│   ├── Logo animado { Joao.java() }
│   ├── Nav links com IntersectionObserver
│   ├── Theme toggle (dark/light)
│   └── Mobile hamburger menu
├── Main
│   ├── Hero (features/hero/hero.ts)
│   │   ├── Availability badge
│   │   ├── Typewriter name
│   │   ├── CTA buttons
│   │   └── Social links (SVG icons)
│   ├── Skills (features/skills/skills.ts)
│   │   ├── SectionHeader (shared)
│   │   └── SkillChip (shared) x N [marquee]
│   ├── Certifications (features/certifications/certifications.ts)
│   │   └── SectionHeader + cert cards
│   ├── Projects (features/projects/projects.ts)
│   │   ├── SectionHeader
│   │   ├── Filter bar (signals)
│   │   └── TechBadge (shared) x N
│   └── Articles (features/articles/articles.ts)
│       ├── SectionHeader
│       ├── Article cards
│       └── ArticleModal (article-modal.ts)
│           └── Markdown rendered via `marked`
└── Footer (features/footer/footer.ts)
```

---

## 9. Decisoes Tecnicas

| Decisao | Motivacao |
|---------|-----------|
| **Standalone Components** | Eliminam a necessidade de NgModules, simplificando a arquitetura |
| **Signals** | Reatividade mais performatica e previsivel que RxJS para estado local |
| **OnPush ChangeDetection** | Reduz ciclos de deteccao de mudanca, melhorando performance |
| **CSS Custom Properties** | Permitem temas dinamicos sem recompilacao de estilos |
| **Zoneless** | Melhor performance removendo Zone.js; signals disparam change detection automaticamente |
| **Dados em JSON** | Zero hardcode em templates, facil manutencao sem tocar em codigo |
| **Marked** | Leve e rapido para renderizar Markdown nos artigos |
| **IntersectionObserver** | Destaque de nav link e scroll reveal sem dependencias externas |
| **CSS marquee** | Carrossel leve sem dependencia de biblioteca de terceiros |

---

## 10. Checklist de Manutencao

Ao adicionar novo conteudo:

- [ ] Editar o JSON correspondente em `src/assets/data/`
- [ ] Verificar se os icones do Devicon existem (para skills)
- [ ] Testar em modo dark e light
- [ ] Verificar responsividade em mobile (320px+)
- [ ] Rodar `ng build --configuration production` sem erros
- [ ] Atualizar `sitemap.xml` se houver novas rotas
- [ ] Verificar acessibilidade com `aria-label` e `alt` em imagens

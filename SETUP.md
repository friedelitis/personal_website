# christianfriedrich.org – Setup-Dokumentation

## Überblick

Die Website christianfriedrich.org ist eine statische Website, gebaut mit Hugo und gehostet bei Reclaim Hosting. Es gibt kein CMS – alle Inhalte werden als Textdateien bearbeitet und über Git veröffentlicht.

## Technischer Stack

| Komponente | Zweck |
|---|---|
| **Hugo** | Static Site Generator – baut aus Textdateien eine fertige HTML-Website |
| **GitHub** | Online-Speicher für den Quellcode (Repo: `friedelitis/personal_website`, public) |
| **GitHub Actions** | Automatischer Build – baut die Website bei jedem Push |
| **Reclaim Hosting** | Webserver, auf dem die fertige Website liegt |
| **cPanel** | Verwaltungsoberfläche des Servers bei Reclaim |

## Ablauf: Von der Änderung zur Live-Website

```
Textdatei auf dem Mac bearbeiten
        ↓
git add / commit / push  →  GitHub (Branch "main")
        ↓
GitHub Actions wacht auf
        → installiert Hugo
        → baut die Website
        → legt das Ergebnis in Branch "deploy"
        ↓
Cron-Job auf Reclaim (alle 5 Minuten)
        → prüft ob "deploy" sich geändert hat
        → holt die neuen Dateien
        → kopiert sie nach public_html
        ↓
christianfriedrich.org zeigt die neue Version
```

Gesamtdauer: ca. 5–7 Minuten nach dem Push.

## Projektverzeichnis

```
~/Documents/christianfriedrich.org/
├── config.toml                # Hugo-Konfiguration (Sprachen, Titel, URLs)
├── .cpanel.yml                # Deployment-Anweisung für cPanel
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions Workflow
├── content/
│   ├── de/
│   │   └── _index.md          # Deutsche Startseite (nur Metadaten)
│   └── en/
│       └── _index.md          # Englische Startseite (nur Metadaten)
├── i18n/
│   ├── de.toml                # ⭐ Alle deutschen Texte
│   └── en.toml                # ⭐ Alle englischen Texte
├── data/
│   └── references.toml        # Referenzen/Testimonials (zweisprachig)
├── layouts/
│   ├── index.html             # Haupt-Template der Startseite
│   └── partials/              # Wiederverwendbare Template-Bausteine
├── static/
│   ├── css/style.css          # Stylesheet
│   ├── js/main.js             # JavaScript (Vollgas-Toggle, Easter Eggs)
│   └── img/                   # Fotos (4 Porträts)
│       ├── _MHZ2744.jpg       # Farbe, frontal → Hero
│       ├── _MHZ2658.jpg       # Farbe, lächelnd → Über mich
│       ├── _MHZ2695.jpg       # S/W, Seitenansicht
│       └── _MHZ2648.jpg       # S/W, Nahaufnahme
└── public/                    # ⚠️ Generierte Dateien (nicht manuell bearbeiten)
```

## Inhalte bearbeiten

### Wo stehen die Texte?

Die Texte der Website stehen **nicht** in den Markdown-Dateien unter `content/`, sondern in den i18n-Dateien:

- **Deutsche Texte:** `i18n/de.toml`
- **Englische Texte:** `i18n/en.toml`

Öffnen z.B. mit:
```bash
open -a TextEdit i18n/de.toml
```

Die Dateien enthalten Einträge wie:
```toml
[hero_tagline]
other = "Organisationsberatung · Podcasting · Moderation"

[about_text]
other = "Hier steht der Text über mich..."
```

Zum Bearbeiten einfach den Text zwischen den Anführungszeichen ändern.

### Referenzen / Testimonials

Stehen in `data/references.toml` – ebenfalls zweisprachig in einer Datei.

### Fotos

Liegen in `static/img/`. Neue Fotos dort ablegen. Im Template (`layouts/`) wird festgelegt, welches Foto wo erscheint.

## Änderungen veröffentlichen

Nach jeder Bearbeitung im Terminal:

```bash
cd ~/Documents/christianfriedrich.org
git add .
git commit -m "Kurze Beschreibung der Änderung"
git push
```

Die Website ist nach ca. 5–7 Minuten aktualisiert.

### Vorschau vor dem Veröffentlichen

Um die Änderungen lokal anzuschauen bevor sie live gehen:

```bash
cd ~/Documents/christianfriedrich.org
hugo server
```

Dann im Browser öffnen: http://localhost:1313

Beenden mit `Ctrl+C`.

## Server-Zugang

### SSH (für Wartung)

```bash
ssh -i ~/.ssh/reclaim_deploy christ22@gauntlet.reclaimhosting.com
```

- Server: `gauntlet.reclaimhosting.com`
- User: `christ22`
- Port: 22
- Auth: SSH-Key (`~/.ssh/reclaim_deploy`)
- Document Root: `/home/christ22/public_html/`

### cPanel

Erreichbar über das Reclaim Hosting Dashboard. Wichtige Bereiche:

- **Git™ Version Control** – Repo-Verwaltung, manuelles Deploy
- **Cron Jobs** – der 5-Minuten-Job für automatisches Deployment
- **FTP Accounts** – FTP-Zugang `deploy@christianfriedrich.org`
- **File Manager** – Dateien auf dem Server durchsuchen

### Manuelles Deployment (Notfall)

Falls das automatische Deployment nicht funktioniert, direkt vom Mac:

```bash
cd ~/Documents/christianfriedrich.org
hugo --minify
rsync -avz --delete -e "ssh -i ~/.ssh/reclaim_deploy" public/ christ22@gauntlet.reclaimhosting.com:/home/christ22/public_html/
```

## GitHub Actions Workflow

Datei: `.github/workflows/deploy.yml`

Der Workflow wird bei jedem Push auf `main` ausgelöst und:
1. Installiert Hugo (v0.140.2)
2. Baut die Website (`hugo --minify`)
3. Kopiert `.cpanel.yml` in den Output
4. Pusht das Ergebnis in den `deploy` Branch

## Branches

| Branch | Inhalt | Wer schreibt |
|---|---|---|
| `main` | Quelldateien (Templates, Texte, Config) | Du (per `git push`) |
| `deploy` | Fertige HTML-Website | GitHub Actions (automatisch) |

## Was wo lebt

| Domain | Was | Wo |
|---|---|---|
| christianfriedrich.org | Statische Hugo-Website | `/home/christ22/public_html/` |
| blog.christianfriedrich.org | WordPress-Blog (unabhängig) | `/home/christ22/blog.christianfriedrich.org/` |
| sicherheitsluecke.fm | Podcast (extern) | Nur verlinkt |
| hamburgwaswillstduwissen.de | Podcast (extern) | Nur verlinkt |

## Wichtige Hinweise

- **`public/`-Ordner nie manuell bearbeiten** – wird bei jedem Build überschrieben
- **Blog bleibt WordPress** – unter `blog.christianfriedrich.org`, wird nicht angefasst
- **Backup der alten Website** liegt unter `/home/christ22/public_html_backup/` auf dem Server
- **Git-Repo auf Reclaim** liegt unter `/home/christ22/repositories/personal_website/`
- **Cron-Job** läuft alle 5 Minuten – bei Problemen in cPanel → Cron Jobs prüfen

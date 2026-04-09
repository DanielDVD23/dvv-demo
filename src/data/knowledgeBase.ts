export interface KBArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  roles: ("staffelleitung" | "clubadmin" | "verbandsadmin")[];
  tags: string[];
  content: string;
  relatedArticles?: string[];
}

export const kbCategories = [
  { id: "spielbetrieb", label: "Spielbetrieb", icon: "calendar-edit", color: "accent" },
  { id: "mannschaften", label: "Mannschaften & Kader", icon: "users", color: "green" },
  { id: "finanzen", label: "Finanzen & Rechnungen", icon: "file", color: "orange" },
  { id: "veranstaltungen", label: "Veranstaltungen & Lehrgänge", icon: "calendar-star", color: "blue" },
  { id: "stammdaten", label: "Stammdaten & Vereine", icon: "building", color: "accent" },
  { id: "system", label: "System & Konto", icon: "grid", color: "red" },
];

export const kbRoleTiles = [
  { role: "staffelleitung" as const, label: "Für Staffelleitungen", desc: "Spieltage, Ligen, Ergebnisse", gradient: "from-accent to-[#6D28D9]", icon: "star" },
  { role: "clubadmin" as const, label: "Für Vereins-Admins", desc: "Mannschaften, Meldungen, Finanzen", gradient: "from-green to-[#15803d]", icon: "users" },
  { role: "verbandsadmin" as const, label: "Für Verbands-Admins", desc: "Stammdaten, Statistiken, Ordnung", gradient: "from-blue to-[#1d4ed8]", icon: "org-tree" },
];

export const kbArticles: KBArticle[] = [
  // ── Spielbetrieb ──
  {
    id: "spieltag-anlegen",
    title: "Einen neuen Spieltag anlegen",
    summary: "Schritt-für-Schritt-Anleitung zum Erstellen eines Spieltags mit automatischer Paarungsgenerierung.",
    category: "spielbetrieb",
    roles: ["staffelleitung", "verbandsadmin"],
    tags: ["spieltag", "paarungen", "nummernspielplan", "anlegen"],
    content: `## Spieltag anlegen

1. Navigiere zu **Spielbetrieb → Ligenübersicht**
2. Klicke auf **\"+ Neuer Spieltag\"**
3. Wähle die **Liga** und das **Datum** aus
4. Die Paarungen werden automatisch aus dem Nummernspielplan generiert
5. Überprüfe die generierten Paarungen und bestätige den Spieltag

### Hinweise
- Spieltage können nur erstellt werden, wenn ein gültiger Nummernspielplan für die Liga existiert.
- Änderungen sind bis zur Fixierung des Spielplans möglich.`,
    relatedArticles: ["ergebnis-bestaetigen", "verlegung-beantragen"],
  },
  {
    id: "ergebnis-bestaetigen",
    title: "Spielergebnisse bestätigen",
    summary: "Wie beide Teams ein Ergebnis bestätigen und was bei Abweichungen passiert.",
    category: "spielbetrieb",
    roles: ["staffelleitung", "clubadmin", "verbandsadmin"],
    tags: ["ergebnis", "bestätigung", "spielbericht", "abweichung"],
    content: `## Ergebnisse bestätigen

1. Gehe zu **Spielbetrieb → Ligenübersicht → Ergebnisse**
2. Beide Teams müssen das Ergebnis unabhängig bestätigen
3. Bei übereinstimmenden Eingaben wird das Ergebnis automatisch gewertet

### Bei Abweichungen
- Der Staffelleiter wird automatisch benachrichtigt
- Das Ergebnis bleibt im Status \"Offen\" bis zur Klärung
- Der Staffelleiter kann das korrekte Ergebnis manuell setzen`,
    relatedArticles: ["spieltag-anlegen", "automatische-wertung"],
  },
  {
    id: "verlegung-beantragen",
    title: "Spielverlegung beantragen",
    summary: "So funktioniert der Verlegungsantrag und was bei Konflikten passiert.",
    category: "spielbetrieb",
    roles: ["clubadmin", "staffelleitung"],
    tags: ["verlegung", "termin", "konflikt", "antrag"],
    content: `## Verlegung beantragen

1. Navigiere zum betreffenden Spieltag
2. Klicke auf **\"Verlegung beantragen\"** beim gewünschten Spiel
3. Schlage einen neuen Termin vor
4. Das Gegner-Team wird automatisch benachrichtigt

### Konfliktfall
- Wenn sich beide Teams nicht einigen, wird der Konflikt an die Staffelleitung eskaliert
- Offene Konflikte erscheinen im Dashboard unter \"Meine To-Dos\"`,
    relatedArticles: ["spieltag-anlegen"],
  },
  {
    id: "automatische-wertung",
    title: "Automatische Wertung bei Nicht-Antritt",
    summary: "Regelung für Spiele, bei denen ein Team nicht antritt (0:3 / 0:75).",
    category: "spielbetrieb",
    roles: ["staffelleitung", "clubadmin", "verbandsadmin"],
    tags: ["wertung", "nicht-antritt", "automatisch", "strafe"],
    content: `## Automatische Wertung

Bei Nicht-Antritt eines Teams wird das Spiel automatisch gewertet:
- **Sätze:** 0:3 für das nicht angetretene Team
- **Punkte:** 0:75 für das nicht angetretene Team

### Protest
- Ein Protest kann innerhalb von 7 Tagen eingereicht werden
- Protest-Wertungen werden von der Staffelleitung bzw. der Rechtskommission entschieden`,
    relatedArticles: ["ergebnis-bestaetigen"],
  },

  // ── Mannschaften & Kader ──
  {
    id: "mannschaftsmeldung",
    title: "Mannschaftsmeldung durchführen",
    summary: "Kompletter Ablauf der Mannschaftsmeldung inkl. Fristen und Mindestanzahlen.",
    category: "mannschaften",
    roles: ["clubadmin"],
    tags: ["meldung", "mannschaft", "frist", "kader", "erstellen"],
    content: `## Mannschaftsmeldung

1. Gehe zu **Mein Verein → Meine Mannschaften**
2. Klicke auf **\"+ Neue Mannschaft\"** oder wähle eine bestehende
3. Fülle die Pflichtfelder aus: Ligapräferenz, Trainer, Heimhalle
4. Melde mindestens die Mindestanzahl an Spielerinnen

### Fristen
- Die Meldefrist wird vom Verband festgelegt
- Der Countdown ist im Dashboard sichtbar
- Nach Ablauf sind keine Meldungen mehr möglich

### Mindestanzahlen (Beispiele)
| Wettbewerb | Min. | Max. |
|-----------|------|------|
| U16       | 7    | 14   |
| U18       | 8    | 14   |
| Erwachsene| 8    | 16   |`,
    relatedArticles: ["spielerin-melden", "kader-verwalten"],
  },
  {
    id: "spielerin-melden",
    title: "Spielerin zum Kader melden",
    summary: "Wie man eine neue Spielerin zum Kader hinzufügt und was der Spielerpass bedeutet.",
    category: "mannschaften",
    roles: ["clubadmin"],
    tags: ["spielerin", "melden", "pass", "kader", "hinzufügen"],
    content: `## Spielerin melden

1. Öffne die gewünschte Mannschaft
2. Klicke auf **\"+ Spielerin melden\"**
3. Gib Name, Trikotnummer und Position ein
4. Die Pass-Nummer wird automatisch vergeben

### Spielerpass
- Jede Spielerin benötigt einen gültigen Spielerpass
- Abgelaufene Pässe werden mit einer Warnung markiert
- Der Pass muss vor Spielbeginn verlängert werden`,
    relatedArticles: ["mannschaftsmeldung", "vereinswechsel"],
  },
  {
    id: "kader-verwalten",
    title: "Kader verwalten und bearbeiten",
    summary: "Spielerinnen bearbeiten, Status ändern, und Kaderliste exportieren.",
    category: "mannschaften",
    roles: ["clubadmin", "staffelleitung"],
    tags: ["kader", "bearbeiten", "status", "export", "verwalten"],
    content: `## Kader verwalten

### Status einer Spielerin ändern
- **Aktiv** → Spielberechtigt
- **Verletzt** → Nicht einsetzbar (mit ärztlichem Attest)
- **Gesperrt** → Nicht einsetzbar (Disziplinarmaßnahme)
- **Inaktiv** → Vom Spielbetrieb abgemeldet

### Kaderliste exportieren
- Klicke auf den Export-Button oberhalb der Kadertabelle
- Verfügbare Formate: PDF, CSV, Excel`,
    relatedArticles: ["spielerin-melden", "mannschaftsmeldung"],
  },
  {
    id: "vereinswechsel",
    title: "Vereinswechsel beantragen",
    summary: "Transfer einer Spielerin zu einem anderen Verein nach BSO §8.",
    category: "mannschaften",
    roles: ["clubadmin"],
    tags: ["transfer", "wechsel", "verein", "bso"],
    content: `## Vereinswechsel (BSO §8)

1. Gehe zu **Mein Verein → Meine Mannschaften**
2. Klicke auf **\"Vereinswechsel\"**
3. Gib den abgebenden Verein und die Spielerin an
4. Der abgebende Verein muss den Transfer bestätigen

### Fristen
- Wechselperiode 1: 01.07. – 30.09.
- Wechselperiode 2: 01.01. – 31.01.
- Außerhalb der Perioden nur mit Sondergenehmigung`,
    relatedArticles: ["spielerin-melden"],
  },

  // ── Finanzen ──
  {
    id: "rechnung-erstellen",
    title: "Neue Rechnung erstellen",
    summary: "Schritt-für-Schritt: Empfänger, Posten, Zahlungsdetails und Vorschau.",
    category: "finanzen",
    roles: ["verbandsadmin"],
    tags: ["rechnung", "erstellen", "sepa", "datev"],
    content: `## Rechnung erstellen

1. Gehe zu **Finanzen → Rechnungen**
2. Klicke auf **\"+ Neue Rechnung\"**
3. Der Assistent führt durch 4 Schritte:
   - **Empfänger** auswählen (Verein, Person)
   - **Posten** hinzufügen (Gebühren, Strafen, Sonstiges)
   - **Zahlungsdetails** festlegen (Fälligkeit, Zahlungsart)
   - **Vorschau** prüfen und absenden

### SEPA-Lastschrift
- Vereine müssen ein gültiges SEPA-Mandat hinterlegen
- Automatischer Einzug zum Fälligkeitsdatum`,
    relatedArticles: ["datev-export", "strafe-erstellen"],
  },
  {
    id: "datev-export",
    title: "DATEV-Export für die Buchhaltung",
    summary: "Buchungsstapel im DATEV-Format exportieren für externe Buchhaltungssysteme.",
    category: "finanzen",
    roles: ["verbandsadmin"],
    tags: ["datev", "export", "buchhaltung", "lexware"],
    content: `## DATEV-Export

1. Gehe zu **Finanzen → Rechnungen**
2. Klicke auf den **Export-Button**
3. Wähle **\"DATEV-Export\"**
4. Die Datei enthält Buchungsstapel im DATEV-kompatiblen Format

### Unterstützte Systeme
- DATEV (nativ)
- Lexware (nativ)
- sevdesk (über API)
- WISO MeinBüro (über API)`,
    relatedArticles: ["rechnung-erstellen"],
  },
  {
    id: "strafe-erstellen",
    title: "Strafbescheid erstellen",
    summary: "Ordnungsstrafe nach BSO §17 anlegen, Einspruch und Stornierung.",
    category: "finanzen",
    roles: ["verbandsadmin", "staffelleitung"],
    tags: ["strafe", "ordnungsstrafe", "bso", "einspruch"],
    content: `## Strafbescheid erstellen

1. Gehe zu **Finanzen & Ordnung → Strafbescheide**
2. Klicke auf **\"+ Neuer Strafbescheid\"**
3. Wähle Kategorie, betroffenen Verein/Person und Betrag

### Einspruch
- Einspruch innerhalb von 7 Tagen nach Zustellung
- Wird an die Rechtskommission weitergeleitet

### Stornierung
- Offene Strafen: direkt stornierbar
- Abgerechnete Strafen: automatische Gutschrift beim nächsten Rechnungslauf`,
    relatedArticles: ["rechnung-erstellen"],
  },

  // ── Veranstaltungen ──
  {
    id: "lehrgang-erstellen",
    title: "Lehrgang oder Fortbildung erstellen",
    summary: "Ausbildungslehrgänge und Fortbildungen mit automatischer Lizenzierung.",
    category: "veranstaltungen",
    roles: ["verbandsadmin"],
    tags: ["lehrgang", "fortbildung", "lizenz", "ausbildung"],
    content: `## Lehrgang erstellen

1. Gehe zu **Veranstaltungen → Neue Veranstaltung**
2. Wähle Typ **\"Lehrgang\"** oder **\"Fortbildung\"**
3. Der Wizard führt durch alle Schritte inkl. Lizenzierung

### Unterschied Ausbildung vs. Fortbildung
- **Ausbildung**: Stellt neue Lizenzen aus (z.B. C-Trainer)
- **Fortbildung**: Verlängert bestehende Lizenzen durch UE

### Automatische Lizenzierung
- Bei aktiviertem \"Mit Prüfung\" werden Lizenzen nach bestandener Prüfung automatisch ausgestellt`,
    relatedArticles: ["veranstaltung-verwalten"],
  },
  {
    id: "veranstaltung-verwalten",
    title: "Veranstaltungen verwalten",
    summary: "Teilnehmerlisten, Wartelisten, Kapazitätsgrenzen und Anmeldemodi.",
    category: "veranstaltungen",
    roles: ["verbandsadmin"],
    tags: ["veranstaltung", "teilnehmer", "warteliste", "kapazität"],
    content: `## Veranstaltungen verwalten

### Anmeldemodi
- **Öffentlich**: Selbstanmeldung für alle
- **Geschlossen**: Nur per Einladung
- **Intern**: Nur Verbands-Mitarbeiter

### Warteliste
- Bei Überbuchung werden Anmeldungen automatisch auf die Warteliste gesetzt
- Bei Absagen rücken Teilnehmer automatisch nach

### Kapazitätsgrenzen
- Werden beim Erstellen der Veranstaltung festgelegt
- Können nachträglich angepasst werden`,
    relatedArticles: ["lehrgang-erstellen"],
  },

  // ── Stammdaten ──
  {
    id: "verein-verwalten",
    title: "Vereinsdaten verwalten",
    summary: "Stammdaten, Kontaktpersonen und Hallen eines Vereins pflegen.",
    category: "stammdaten",
    roles: ["verbandsadmin", "clubadmin"],
    tags: ["verein", "stammdaten", "kontakt", "halle"],
    content: `## Vereinsdaten verwalten

1. Gehe zu **Stammdaten → Vereine** (Verbandsadmin) oder **Dashboard** (Clubadmin)
2. Wähle den Verein aus oder bearbeite deinen eigenen

### Pflichtdaten
- Vereinsname und DVV-Nummer
- Anschrift und Kontaktdaten
- Verantwortliche Kontaktperson
- Heimhallen mit Kapazitätsangaben`,
    relatedArticles: ["mannschaftsmeldung"],
  },

  // ── System ──
  {
    id: "passwort-zuruecksetzen",
    title: "Passwort zurücksetzen",
    summary: "Schritt-für-Schritt-Anleitung zum Zurücksetzen des Passworts.",
    category: "system",
    roles: ["staffelleitung", "clubadmin", "verbandsadmin"],
    tags: ["passwort", "login", "zugang", "konto"],
    content: `## Passwort zurücksetzen

1. Klicke auf der Login-Seite auf **\"Passwort vergessen?\"**
2. Gib deine registrierte E-Mail-Adresse ein
3. Du erhältst einen Link zum Zurücksetzen (gültig 24h)
4. Setze ein neues Passwort (mind. 8 Zeichen, 1 Großbuchstabe, 1 Zahl)

### Kein Zugang zur E-Mail?
- Kontaktiere deinen Verbands-Administrator
- Oder erstelle ein Support-Ticket über den Chat-Assistenten`,
    relatedArticles: ["rolle-wechseln"],
  },
  {
    id: "rolle-wechseln",
    title: "Rolle verstehen und wechseln",
    summary: "Wie das rollenbasierte System funktioniert und welche Berechtigungen es gibt.",
    category: "system",
    roles: ["staffelleitung", "clubadmin", "verbandsadmin"],
    tags: ["rolle", "berechtigung", "zugriff", "rebac"],
    content: `## Rollen in beauOS

### Verfügbare Rollen
- **Staffelleitung**: Spielbetrieb einer Liga verwalten
- **Club-Admin**: Vereinsdaten und Mannschaften verwalten
- **Verbandsadmin**: Voller Zugriff auf alle Verbandsfunktionen

### Rolle wechseln
- Klicke auf dein Profil oben links
- Wähle die gewünschte Rolle aus
- Die Navigation passt sich automatisch an

### Hinweis
Rollen werden vom Verband zugewiesen. Für eine neue Rolle wende dich an deinen Verbandsadmin.`,
    relatedArticles: ["passwort-zuruecksetzen"],
  },
];

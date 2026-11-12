English

# Customer Management App | Kundenverwaltungs-App

A comprehensive Single Page Application (SPA) built with Angular for managing customers, tracking sales opportunities, and generating reports.
_Eine umfassende Single Page Application (SPA), die mit Angular entwickelt wurde, um Kunden zu verwalten, Verkaufschancen zu verfolgen und Berichte zu erstellen._

---

## Demo Credentials | Demo-Zugangsdaten

Because the backend is mocked, use these credentials to log in:
_Da das Backend simuliert wird, verwenden Sie diese Daten zum Einloggen:_

- **Email | E-Mail:** `admin@test.com`
- **Password | Passwort:** `password123`

---

## 1. Setup & Installation | Installation & Setup

This project requires **two terminals** running simultaneously.
_Das Projekt benötigt **zwei Terminals**, die gleichzeitig laufen._

**Terminal 1: Mock Backend | Mock-Backend starten**

```bash
npm install -D json-server@0.17.4
npm run mock:server
```

Deutsch

# Kundenverwaltungs-App (Customer Management App)

Eine umfassende, unternehmensgerechte Single Page Application (SPA), die mit Angular entwickelt wurde. Dieses Projekt wurde für Vertriebsmitarbeiter entwickelt, um Kundendaten zu verwalten, Verkaufschancen zu verfolgen und Geschäftsberichte zu erstellen.

---

## Demo-Zugangsdaten

Da das Backend simuliert wird, verwenden Sie die folgenden Daten zum Einloggen:

- **E-Mail:** `admin@test.com`
- **Passwort:** `password123`

---

## 1. Installation & Setup

Dieses Projekt benötigt **zwei Terminals**, die gleichzeitig laufen: eines für die Mock-Datenbank, eines für das Frontend.

**Terminal 1: Mock-Backend starten**

```bash
npm install -D json-server@0.17.4
npm run mock:server
```

2. Architektur & Struktur
   Das Projekt folgt dem Angular Style Guide und dem Prinzip der Trennung von Zuständigkeiten (Separation of Concerns):

/core: Singleton-Services (AuthService, CustomerService, NotificationService), Models, Route-Guards (authGuard) und HTTP-Interceptors (authInterceptor).

/shared: Wiederverwendbare UI-Komponenten (DataTableComponent, CardComponent), eigene Direktiven (PhoneFormatDirective), Pipes und Utilities.

/features: Lazy-Loaded Feature-Module (Customers, Opportunities, Reports, Login, NotFound).

3. Implementierte Features (Zugeordnet zu den Arbeitspaketen)
   Kernfunktionen (AP1 & AP2)
   Responsive Navigationsleiste: Klappt auf mobilen Geräten zu einem Hamburger-Menü mit Sidebar zusammen.

Lazy Loading Routing: Features werden bei Bedarf geladen und durch einen canMatch AuthGuard geschützt.

Reaktive Formulare: Strenge Validierung (Pflichtfelder, E-Mail-Format, Prüfung auf doppelte E-Mails).

Formular als Dialog (UX-Upgrade): Erstellen und Bearbeiten öffnen ein zentriertes Material-Dialog-Fenster, das sich nach dem Speichern/Abbrechen automatisch schließt.

Reaktive Suche: Echtzeit-Filterung der Tabelle nach Name, E-Mail oder Unternehmen mithilfe von RxJS valueChanges und debounceTime.

Detailansicht: Eine eigene Route (/customers/:id), die alle Infos anzeigt und das Umschalten in den Bearbeitungsmodus ermöglicht.

Löschbestätigung: Ein Sicherheits-Dialog, der vor dem Löschen eines Kunden eine Bestätigung verlangt.

Services & Datenverarbeitung (AP3)
HTTP & CRUD: Der CustomerService handhabt alle HTTP-Anfragen (GET, POST, PUT, DELETE) an einen lokalen json-server.

JWT-Authentifizierung: Mock AuthService generiert ein clientseitiges JWT. Tokens werden im localStorage gespeichert (inkl. Ablaufzeit).

HTTP-Interceptor: Hängt automatisch das Bearer <token> an jede ausgehende HTTP-Anfrage.

Globale Benachrichtigungen: Ein NotificationService (Snackbar) für einheitliche Erfolgs- (grün) und Fehlermeldungen (rot).

Ladezustände: Spinner werden angezeigt, während HTTP-Anfragen im Gange sind.

Fortgeschrittene Komponenten (AP4)
Wiederverwendbare Datentabelle: Eine eigene Komponente mit Sortierung, Pagination und Filterung.

Telefon-Direktive & Pipe: appPhoneFormat formatiert Eingaben während der Eingabe in XXX-XXX-XXXX, eine phoneFormat Pipe formatiert die Anzeige.

Content Projection: Eine wiederverwendbare CardComponent mit Slots für [card-body] und [card-actions].

Dynamisches Formular: Eine konfigurationsgesteuerte Formularkomponente, die Felder basierend auf einem Objekt generiert.

Diagramme: Interaktive Balkendiagramme zur Visualisierung der Verkaufschancen und Firmenverteilung mit ng2-charts.

Optimierung & i18n (AP5)
Lazy Loading & OnPush: Implementiert in den Hauptkomponenten zur Performance-Optimierung.

Internationalisierung (i18n): Volle Unterstützung für Englisch (en-US) und Deutsch (de) via @angular/localize.

Unit-Tests: Kritische Services und Komponenten sind mit Karma/Jasmine getestet (0 Fehler).

🧪 4. Testszenarien (Manueller Durchlauf)
Auth-Flow: Versuchen Sie /customers ohne Login aufzurufen. Sie werden zu /login umgeleitet.

Erstellen: Klicken Sie auf "Kunde hinzufügen". Füllen Sie das Formular aus und speichern Sie. Der Dialog schließt sich, eine grüne Snackbar erscheint und der Kunde ist in der Tabelle.

Validierung: Versuchen Sie, das Formular mit einer ungültigen E-Mail (z.B. test@) abzuschicken. Das Formular blockiert und zeigt eine rote Fehlermeldung an.

Bearbeiten: Klicken Sie auf das Stift-Symbol. Das Popup öffnet sich mit den vorausgefüllten Daten. Ändern Sie den Namen und speichern Sie. Die Tabelle aktualisiert sich sofort.

Suche & Pagination: Tippen Sie in die Suchleiste. Die Tabelle filtert in Echtzeit.

Löschen: Klicken Sie auf das Mülleimer-Symbol. Ein Dialog fragt nach Bestätigung. Klicken Sie auf "Löschen". Die Zeile verschwindet.

Responsive UI: Verkleinern Sie das Browserfenster auf Handygröße. Die Links verschwinden, ein Hamburger-Menü erscheint. Klicken Sie darauf, um das Seitenmenü zu öffnen.

i18n (Deutsch): Führen Sie ng build --configuration=de aus. Öffnen Sie den Ordner dist/customer-management/de/browser. Die App ist komplett auf Deutsch.

🧪 5. Unit-Tests ausführen
Um die Unit-Tests auszuführen und den Coverage-Bericht zu sehen (kritische Dateien >80%):

7. Sicherheitshinweise
   JWT-Speicherung: Tokens werden im localStorage gespeichert. Hinweis: In einer Produktionsumgebung sind HttpOnly Cookies zu empfehlen, um XSS-Risiken zu mindern.

Route Guards: Clientseitige Guards dienen der Benutzerführung (UX). Die wahre Sicherheit liegt in der Validierung des JWTs durch das Backend bei jeder Anfrage.

XSS-Schutz: Angulars Standard-Sanitisierung ist aktiv. Das @-Symbol wird in Templates maskiert (&#64;).

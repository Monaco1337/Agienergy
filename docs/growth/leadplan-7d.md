# AGI Energy - 7-Tage Lead Operations Masterplan

> Stand: Juni 2026 - Owner: Growth/Operations - Status: Operativ
> Positionierung: Persoenliche Energiepruefung statt anonymer Tarifportale.
> Trustline: Keine automatische Vertragsumstellung. Keine Verpflichtung. Persoenliche Rueckmeldung.

---

## 1. Executive Entscheidung

**Ehrliche Standortbestimmung (keine Garantien):**

1. **1.000 qualifizierte Leads/Woche sind machbar, aber nicht in Woche 1.**
   Realistischer Pfad: Woche 1: 150-300 Leads (Setup + erste Skalierung), Woche 2: 400-650, Woche 3: 700-900, Woche 4: 1.000+ wenn alle Hebel greifen.
2. **Hauptengpaesse** in dieser Reihenfolge: (a) Paid-Budget unter EUR 20k/Woche, (b) Landingpage-Conversion-Rate unter 5 %, (c) CRM-Response-Zeit ueber 5 Min auf Hot-Leads, (d) Beratungskapazitaet (5 Partner, ca. 20-40 Leads/Tag/Partner sauber bearbeitbar = Kapazitaetsdecke ~140-200 Leads/Tag).
3. **SEO ist kein Kanal fuer Woche 1.** SEO ist 90-180-Tage-Hebel. Wir bauen ihn parallel auf, aber das Wochenziel haengt an **Paid Search + Meta Lead Ads + Microsoft Ads + Retargeting**.
4. **Empfohlene Mindestinvestition**, um in Woche 3-4 das Ziel zu schlagen: **EUR 22.000-28.000/Woche Paid-Spend** (Search ~55 %, Meta ~30 %, Bing ~10 %, Retargeting ~5 %) + **EUR 2.000-3.000/Woche Tooling/Creative**.
5. **Kapazitaetscheck VOR Skalierung:** Bei 1.000 Leads/Woche brauchen wir realistisch **2-3 zusaetzliche Bearbeiter** oder eine Pre-Qualifizierungs-Stufe (Auto-Sortierung + Voicebot/SMS-Triage), sonst implodiert die Bearbeitungsqualitaet.

**Entscheidung, die du jetzt treffen musst:**
- (a) Aggressiv: EUR 25k/Woche Paid + Kapazitaetserweiterung -> realistischer 1.000er Korridor ab Woche 3.
- (b) Ambitioniert: EUR 15k/Woche -> 500-700 Leads/Woche als Plateau, Ziel 1.000 erst ab Monat 2.
- (c) Konservativ: EUR 7-10k/Woche -> 250-400 Leads/Woche, gesundes Wachstum aber 1.000er Ziel nicht erreichbar.


## 2. Lead-Ziel-Rechnung (1.000 / Woche = 142 / Tag)

**Definition qualifizierter Lead** (Wiederholung): Name + Telefon ODER E-Mail + Leistungsinteresse + Consent + DSGVO-Hinweis bestaetigt + Dublettencheck bestanden + kein Spam-/Fake-Signal.

### Grundgleichung
```
Leads = Visitors x LP_CR x Form_Completion x Qualified_Rate
```
- LP_CR = Anteil Visitors, die das Formular starten
- Form_Completion = Anteil Formular-Starter, die abschicken
- Qualified_Rate = Anteil Submits, die unsere Qualifizierungsregeln bestehen (ohne Fake/Dublette)

### Realistische Bandbreite Energie-Vertical Deutschland
| Metrik             | Pessimistisch | Realistisch | Stark |
|--------------------|---------------|-------------|-------|
| LP_CR (Visit -> Start)     | 6 %  | 12 % | 22 % |
| Form_Completion (Start -> Submit) | 35 % | 55 % | 70 % |
| Qualified_Rate     | 70 % | 82 % | 92 % |
| Effektive Submit-CR (Visit -> qualified) | **1,5 %** | **5,4 %** | **14,2 %** |

### Was bedeutet 1.000 Leads/Woche in Traffic?
| Effektive CR | Benoetigte Visits/Woche | Visits/Tag |
|--------------|-------------------------|------------|
| 1,5 %        | ~67.000                 | ~9.500     |
| 3,0 %        | ~33.300                 | ~4.760     |
| 5,0 %        | ~20.000                 | ~2.860     |
| 7,0 %        | ~14.300                 | ~2.040     |
| 10,0 %       | ~10.000                 | ~1.430     |

**Realistische Working-Assumption**: 5 % effektive CR (Mix aus High-Intent-Search + Meta).
**Daraus**: ~20.000 Visits/Woche fuer 1.000 Leads.

### CPL-Bandbreiten (Cost per qualified Lead, NETT)
| Kanal                        | CPL-Korridor | Sweet Spot |
|------------------------------|--------------|------------|
| Google Search High-Intent    | EUR 18-45    | EUR 25     |
| Microsoft Ads (Bing/Edge)    | EUR 12-28    | EUR 18     |
| Meta Lead Ads (Instant Form) | EUR  8-22    | EUR 14     |
| Meta -> LP (Click)           | EUR 14-30    | EUR 20     |
| Google Display + Discovery   | EUR 15-35    | EUR 22     |
| Retargeting (alle)           | EUR  6-15    | EUR  9     |
| B2B Outbound Gewerbe         | EUR 25-60    | EUR 40     |
| Partnerempfehlung            | EUR  5-15 (effektiv) | EUR 8 |

### 3 Szenarien fuer 1.000 Leads/Woche
| Szenario      | Mix-CPL | Spend/Woche | Spend/Tag | Visits/Wo |
|---------------|---------|-------------|-----------|-----------|
| Konservativ   | EUR 28  | EUR 28.000  | EUR 4.000 | ~20.000   |
| Ambitioniert  | EUR 22  | EUR 22.000  | EUR 3.140 | ~20.000   |
| Aggressiv     | EUR 17  | EUR 17.000  | EUR 2.430 | ~20.000   |

**Aggressiv (EUR 17 Mix-CPL)** ist nur erreichbar mit:
- LP_CR konstant > 12 % (Top-Funnel-Test gewonnen)
- Retargeting-Anteil > 15 % der Conversions
- Sauber gefuelltes Pixel/Conversion-API (mind. 3 Wochen Datenhistorie)
- Hoher Anteil Meta Instant Forms (Tradeoff: niedrigere Qualitaet)

### Break-even-Logik (Beispielrechnung)
Wenn der Lifetime-Value eines Energieprueflead bei euch im Schnitt EUR X liegt (Provision + Folgegeschaeft), dann:
- **Maximaler CPL = X x Abschlussquote x Sicherheitsmarge (0,5-0,7)**
- Beispiel: Avg-Provision EUR 90, Abschlussquote 18 %, Marge 0,6 -> max CPL EUR 9,72
- Bei realistischem Mix-CPL 22 -> entweder Abschlussquote hochziehen (>40 %) oder Provision/LTV anders rechnen (Wiederkaufer, Folgeleistungen, Cross-Sell)

**Kritische Annahmen, die kippen koennen:**
1. Wenn LP_CR < 5 %: Plan kippt, Budget unrealistisch.
2. Wenn CRM-Antwortzeit > 60 Min: Abschlussquote bricht 30-50 % ein.
3. Wenn Beratungskapazitaet nicht mitwaechst: Leads veralten, Conversion verbrennt.
4. Wenn Quality-Score in Google Ads < 6: CPC explodiert, CPL kippt.


## 3. Budget-Szenarien

### Szenario A: Konservativ (Markt-Lern-Modus)
- **Budget**: EUR 7.000-10.000 / Woche
- **Realistisches Ergebnis Woche 4**: 250-400 qualifizierte Leads / Woche
- **CPL-Ziel**: EUR 20-30
- **Risiko**: 1.000er-Ziel unerreichbar. OK fuer ersten Monat zum Lernen.
- **Empfohlen wenn**: Beratungskapazitaet noch nicht skaliert, CRM-Prozess unerprobt.

### Szenario B: Ambitioniert (Solides Wachstum)
- **Budget**: EUR 14.000-18.000 / Woche
- **Realistisches Ergebnis Woche 4**: 500-750 qualifizierte Leads / Woche
- **CPL-Ziel**: EUR 22-28
- **Risiko**: 1.000er-Ziel knapp verfehlt, aber stabiles 70-80 % Plateau.
- **Empfohlen wenn**: 1-2 weitere Bearbeiter on board, Funnel laeuft seit min. 1 Woche.

### Szenario C: Aggressiv (Empfohlen fuer 1.000er Ziel)
- **Budget**: EUR 22.000-28.000 / Woche
- **Realistisches Ergebnis Woche 4-5**: 900-1.300 qualifizierte Leads / Woche
- **CPL-Ziel**: EUR 18-25 (durch Skaleneffekte)
- **Risiko**: Setzt **funktionierende CRM-Pipeline + min. 7-8 aktive Bearbeiter (oder Pre-Qual-Stage) voraus**.
- **Empfohlen wenn**: Bereit, mit Vollgas, klar definierten Stop-Loss-Regeln und engmaschigem War Room zu fahren.

### Budget-Verteilung pro Szenario (Empfehlung)
| Kanal              | Konservativ | Ambitioniert | Aggressiv |
|--------------------|-------------|--------------|-----------|
| Google Search Ads  | 55 %        | 52 %         | 50 %      |
| Meta Lead/Click    | 25 %        | 28 %         | 28 %      |
| Microsoft Ads      | 8 %         | 10 %         | 12 %      |
| Retargeting (alle) | 5 %         | 6 %          | 7 %       |
| Display/Discovery  | 5 %         | 3 %          | 2 %       |
| Reserve/Tests      | 2 %         | 1 %          | 1 %       |

### Risiko bei zu niedrigem Budget
- Unter EUR 5.000/Woche: Google-Algorithmen lernen nicht sauber (Lernphase pro Kampagne braucht 50+ Conversions). CPL hoch, Daten schwach.
- Unter EUR 10.000/Woche: Retargeting-Audiences unter Mindestgroesse (~1.000), Meta-Algo lernt nicht.
- Unter EUR 15.000/Woche: 1.000er-Ziel ohne Sonderfaktoren (SEO-Boost, Partnerwelle) **nicht** erreichbar.


## 4. Kanal-Mix (priorisiert nach Geschwindigkeit)

Reihenfolge = Hebel-Reihenfolge in Woche 1.

### A. Google Search Ads (Hauptkanal, Tag 1)
- **Warum**: Hoechste Intent-Dichte, sofortiger Traffic, Skalierbar.
- **Setup**: 4 Kampagnen (Strom, Gas, PV, Gewerbe), je 3-4 Ad Groups nach Intent-Cluster.
- **Targeting**: Exakt + Phrase (kein Broad in Woche 1). Standortausschluesse: AT/CH/EU-Ausland.
- **Gebote**: Manuell CPC oder Maximize Conversions mit tCPA-Cap erst nach 30 Conversions/Kampagne.
- **Negativlisten** zentral als Shared Set (siehe Sektion 5).

### B. Microsoft Ads (Bing/Edge, Tag 2)
- **Warum**: 8-15 % Marktanteil DE, deutlich guenstiger als Google (Faktor 0,5-0,7 CPC), aelterer + zahlungskraeftiger Userbase.
- **Setup**: Import der Google-Kampagnen, eigene UTM-Parameter (`utm_source=bing`), eigene Conversion-Tracking, separate Budgets.
- **Spezial**: Yahoo + AOL Search Partners pruefen (DE meist deaktivieren wg. Quality).

### C. Meta Lead Ads (Tag 2)
- **Warum**: Niedrige CPL durch Instant Forms, gute Visual-Hooks, breite Reichweite.
- **Setup**: 2 Tracks
  - **Track A: Instant Form** (sehr niedriger CPL ~EUR 8-15, aber niedrigere Qualitaet). Pflicht: Custom Intro Screen mit Trustline.
  - **Track B: Conversion -> LP** (CPL ~EUR 18-25, hoehere Qualitaet, fuettert Pixel sauberer).
- **Aufteilung**: 60 % Track A, 40 % Track B in Woche 1; nach Qualitaets-Auswertung anpassen.

### D. TikTok / Reels / Shorts (Tag 4, optional)
- **Nur einsteigen wenn**: 3+ seriose Creator-Videos verfuegbar (UGC-Stil, echte Mitarbeiter oder lizensierte Stock-Performer, keine Fake-Personas).
- **Hooks**: "Warum ist meine Stromrechnung so hoch?" / "Was bedeuten die Posten auf der Jahresabrechnung?" / "Lohnt sich Photovoltaik 2026?"
- **Format**: 9-25 Sek, Sub-Titles, klarer CTA "Persoenliche Pruefung anfragen".
- **Budget**: 5-10 % vom Gesamt-Spend ab Tag 5.

### E. Retargeting (Tag 1 Pixel, Tag 3 aktiv)
Audiences:
1. Alle Website-Besucher 30 Tage
2. Formular-Starter (form_start, kein submit) 14 Tage
3. Spezifische LP-Besucher (Strom/Gas/PV/Gewerbe) 30 Tage
4. Video-View > 50 % (Meta/TikTok) 30 Tage
5. Email-Liste (eigene Bestandskontakte mit Marketing-Opt-in) hochgeladen

### F. B2B Outbound Gewerbeenergie (Tag 4)
- **Erlaubt** (UWG/DSGVO konform): Brief (Postversand), LinkedIn Outreach (echte Profile, keine Bots), persoenlicher Telefonkontakt nur an Geschaeftskunden mit "mutmasslichem geschaeftlichem Interesse" gem. UWG (sauber dokumentieren).
- **Nicht erlaubt**: Cold E-Mail an Privatkunden, ungefragte Cold-WhatsApp, gekaufte B2B-Listen ohne Recherche.
- **Zielbranchen**: Handwerk (Bauwesen, Sanitaer, Elektro), Gastronomie/Hotellerie, Praxen, Fitnessstudios, Kanzleien, Steuerbueros, Werkstaetten, Wohnungsverwaltungen.

### G. Partnerkanaele (Tag 4-5, mittelfristig groesster Hebel)
- **Immobilienverwalter / Hausverwaltungen**: jaehrliche Nebenkostenabrechnung -> natuerlicher Anlass.
- **Energieberater**: ergaenzendes Produkt (sie machen die Beratung, wir die Vertragspruefung).
- **PV-Monteure / Solar-Handwerker**: Cross-Sell PV-Eignungspruefung an deren Kundenstamm.
- **Steuerberater**: Gewerbekunden-Channel.
- **Modell**: Empfehlungsprovision sauber vertraglich, Affiliate-Link mit eigener UTM, Co-Branding-Landingpage.

### Geschwindigkeits-Ranking (so schnell liefert ein Kanal Leads)
1. Google Search Ads: Tag 1, Stunde 6 nach Live (sofort)
2. Microsoft Ads: Tag 1-2 (Import + Approval)
3. Meta Lead Ads: Tag 2 (Approval-Time)
4. Retargeting: Tag 3-4 (Audience-Aufbau)
5. TikTok: Tag 4 (Creative-Produktion)
6. B2B Outbound: Tag 7-14 (Recherche + Erstkontakt)
7. Partner: Tag 14-30 (Aufbau Beziehungen)
8. SEO: Monat 2-6 (lang)


## 5. Kampagnenarchitektur

Konvention: `[Plattform]-[Vertikal]-[Intent]-[Region/Geo]`

### Google Search Ads - Kampagnen

#### G-Strom-HighIntent-DE
- **Zielgruppe**: Privatkunden mit konkretem Strompreis-/Vertragsschmerz
- **Suchintention**: Vertragspruefung, Rechnung zu hoch, Anbieterwechsel-Recherche
- **Keyword-Cluster** (Exakt + Phrase):
  - "stromvertrag pruefen", "stromrechnung pruefen", "stromrechnung zu hoch"
  - "strompreis pruefen lassen", "strom abschlag zu hoch"
  - "stromanbieter wechseln", "stromanbieter wechsel beratung"
  - "stromtarif pruefen", "stromtarif vergleichen persoenlich"
- **Negative Keywords** (Shared Set "Strom-Excl"):
  - "kostenlos", "gewinnspiel", "jobs", "ausbildung", "lehrer", "fahrradverleih"
  - "fanta", "gitarrenverstaerker", "elektriker job", "muenchen wlan"
  - alle Mitbewerber-Namen (Check24, Verivox, etc.) ausser bewusst Conquest
- **Anzeigenwinkel**: Persoenliche Pruefung statt Tarifportal
- **Landingpage**: `/stromvertrag-pruefen` (neu, siehe Sektion 6)
- **Formularvariante**: 3-Schritt Strom
- **Lead-Scoring-Regel**: +20 wenn Telefon vorhanden, +15 wenn Upload, +10 wenn Abschlag >100 EUR
- **Tagesbudget-Prio**: Hoch (40 % vom Google-Budget)
- **Skalierungsregel**: Wenn CPL < 28 und Qualified-Rate > 75 % -> Budget +20 % alle 48 h
- **Pausenregel**: Wenn CPL > 50 und kein Drift in 48 h -> pause + Audit

#### G-Gas-HighIntent-DE
- **Cluster**: "gasvertrag pruefen", "gasrechnung zu hoch", "gaspreis pruefen", "gasanbieter wechseln", "gasabschlag gestiegen"
- **Negatives**: "tankstelle", "gasgrill", "gasflasche", "campinggas", "lachgas"
- **LP**: `/gasvertrag-pruefen`
- **Budget-Prio**: Mittel (20 % Google)

#### G-Jahresabrechnung-DE
- **Cluster**: "jahresabrechnung strom pruefen", "jahresabrechnung gas pruefen", "stromabrechnung verstehen", "nebenkostenabrechnung pruefen", "abrechnung zu hoch"
- **Negatives**: "muster", "vorlage", "formular", "excel", "rechtsanwalt"
- **LP**: `/jahresabrechnung-pruefen`
- **Saison-Boost**: Maerz-Mai + September-November (Abrechnungswellen)

#### G-Photovoltaik-DE
- **Cluster**: "photovoltaik lohnt sich", "photovoltaik pruefen", "pv eignung haus", "solar anlage planung", "photovoltaik dach pruefen"
- **Negatives**: "balkonkraftwerk plug" (eigene LP), "second hand", "selber bauen", "diy"
- **LP**: `/photovoltaik-pruefen`
- **Hinweis**: Hoeherer CPL, aber hoeherer LTV.

#### G-Gewerbe-DE
- **Cluster**: "gewerbestrom pruefen", "gewerbegas vergleich beratung", "energiekosten gewerbe senken", "stromkosten bueroflaeche", "energiebedarf gastronomie"
- **Negatives**: "foerderung", "kfw", "bafa antrag" (eigene LP fuer Foerder-Search), "ausbildung"
- **LP**: `/gewerbeenergie-pruefen`
- **Targeting**: ggf. Standorterweiterung um Gewerbegebiete

### Microsoft Ads
- **Import 1:1** der Google-Kampagnen, identisches Negative-Set
- **Eigene UTMs**: `utm_source=bing`
- **Tageslimit**: 30-50 % der Google-Tagesbudgets, da kleinerer Markt

### Meta Lead Ads - Kampagnen

#### M-Strom-LeadForm-DE
- **Hook**: "Stromrechnung zu hoch? Persoenlich pruefen lassen."
- **Audience**: 25-65, DE, Interessen: Haus, Eigentum, Energie, Nachhaltigkeit
- **Lookalike**: LAL 1-3 % aus bestehenden Lead-Daten (sobald 200+ Leads)
- **Form Intro**: Trustline + 3-Punkte-Liste was wir machen
- **CPL-Ziel**: < EUR 14

#### M-Gas-LeadForm-DE
- **Hook**: "Gasabschlag gestiegen? Vertrag und Verbrauch pruefen lassen."

#### M-PV-LP-DE (Klick zur LP, nicht Instant Form)
- **Warum LP statt Instant Form**: PV-Leads brauchen mehr Info-Tiefe, Instant Form ist zu duenn fuer Qualitaet.
- **Hook**: "Photovoltaik geplant? Eignung strukturiert einschaetzen lassen."

#### M-Gewerbe-LP-DE
- **Targeting**: Beruf-Targeting (Unternehmer, Gastro-Inhaber, Praxisinhaber), nicht im B2C-Feed mischen

#### M-Retargeting-Allgemein-DE
- **Audiences**: Website-Besucher 30d + Form-Abbrecher 14d
- **Creatives**: Spezifische Reminder ("Du hattest die Pruefung begonnen...")
- **Frequency Cap**: max 3/Woche pro User

### Pausenregeln (alle Kampagnen)
- CPL > 200 % vom Ziel-CPL in 48 h -> pause
- CTR < 1,5 % bei Search in 48 h mit >500 Impressionen -> Copy ueberarbeiten
- Qualified-Rate < 50 % in 48 h -> Audit (Form, Audience, Quality-Filter)
- 0 Conversions in 5 Tagen bei >EUR 200 Spend -> pause + Restart-Diagnose


## 6. Landingpage-System

### Mapping bestehend -> neu (in Next.js anlegen)
Aktuell verfuegbar im Repo: `/energiecheck`, `/stromkosten-senken`, `/gaskosten-senken`, `/photovoltaik-beratung`, `/gewerbe-energiecheck`, `/energieberatung-deutschland`.

Empfohlene neue / parallele Routen (intent-naeher zum Suchbegriff = bessere QS):
| Neue Route                    | Inhalt-Fokus                       | Ersetzt/Ergaenzt        |
|-------------------------------|------------------------------------|--------------------------|
| `/energiepruefung`            | Allgemein, Hub-Seite               | Ergaenzt `/energiecheck` |
| `/stromvertrag-pruefen`       | Strom-Vertragspruefung             | Erg. `/stromkosten-senken` |
| `/gasvertrag-pruefen`         | Gas-Vertragspruefung               | Erg. `/gaskosten-senken` |
| `/jahresabrechnung-pruefen`   | Abrechnungspruefung Strom+Gas      | NEU                      |
| `/photovoltaik-pruefen`       | PV-Eignungspruefung                | Erg. `/photovoltaik-beratung` |
| `/gewerbeenergie-pruefen`     | Gewerbeenergie                     | Erg. `/gewerbe-energiecheck` |
| `/anbieterwechsel-pruefen`    | Wechselberatung allgemein          | NEU                      |

Empfehlung: **Nicht** alle alten Routen loeschen (SEO-Equity), sondern beide URLs parallel halten und Ads nur auf die neuen, intent-spezifischen Seiten linken. Auf den alten Seiten 301 oder Canonical pruefen.

### Pflicht-Bausteine pro Landingpage (in dieser Reihenfolge)
1. **Hero**
   - H1 mit Such-Intent-Sprache (z.B. "Stromvertrag persoenlich pruefen lassen")
   - Subline mit Trustline: "Keine automatische Vertragsumstellung. Keine Verpflichtung. Persoenliche Rueckmeldung."
   - **Primaere CTA above the fold**: Formular direkt rechts oder unter H1 (Mobile: unter Subline)
   - Trust-Anker: "Unabhaengig, Datenschutz, EU-Server"
2. **Problem-Verstaendnis** (3 Bulletpoints): Was die Zielgruppe gerade nervt
3. **Wie wir pruefen** (4-5 Schritte): Was wir konkret tun, was nicht
4. **Was wir brauchen**: 1-2 Saetze Unterlagen (immer optional!)
5. **3-5 Schritte Ablauf**: Anfrage -> Rueckruf/Mail in 24 h -> Pruefung -> Einschaetzung -> Entscheidung
6. **Trust-Bar**: Datenschutz-Hinweis, EU-Hosting, DSGVO, Verschluesselte Uebertragung, keine Vertragsumstellung
7. **FAQ** (mindestens 6 Fragen, schema.org/FAQPage Markup)
8. **Zweiter CTA**: Wiederholung Formular oder Telefon-Button
9. **Footer**: Impressum, Datenschutz, Kontakt

### Verboten auf allen LPs
- Sparversprechen ohne Beleg ("Bis zu X EUR sparen!")
- Fake-Bewertungen, Fake-Logos ("ARD geprueft", "Stiftung Warentest" ohne Lizenz)
- Erfundene Fallstudien
- Countdown-Timer ohne realen Grund
- Pop-Ups, die Bedienung blockieren (das Cookie-Modal ist gesetzlich, das ist OK)
- "Sofort wechseln"-Buttons (wir wechseln nichts automatisch!)

### Mobile-Pflichten
- LP rendert in < 2,5 s LCP auf 4G
- Formular Step 1 ist within Viewport Mobile
- CTAs min 48 px Hoehe
- Keine horizontale Scrollbar
- Safe-Area Insets respektieren (iOS)

### Performance-Ziele pro LP
- LP_CR (Visit -> Form-Start) > 12 %
- Form_Completion > 55 %
- Effektive CR > 6 %
- Bounce < 55 %
- LCP < 2,5 s, CLS < 0,1, INP < 200 ms


## 7. Formular-System (mehrstufig, max. 3 Steps)

### Grundprinzipien
- Maximal 3 sichtbare Schritte (mit Progress-Bar)
- Pflichtfelder: nur was wirklich gebraucht wird, alles andere optional
- Upload immer optional, mit ermutigendem Microcopy: "Spart Ihnen Zeit - persoenlich geprueft"
- WhatsApp-Opt-in nur als zusaetzliche, getrennte Checkbox
- Auto-Save: Bei Schritt-Wechsel im Session-Storage zwischenspeichern (Wiederherstellen bei Reload)
- Inline-Validierung statt End-Validierung

### Schritt 1 - "Was moechten Sie pruefen lassen?"
- Radio-/Card-Auswahl (Single Choice in der Standardvariante):
  - Strom (Privat)
  - Gas (Privat)
  - Photovoltaik
  - Gewerbeenergie (Strom/Gas/Mix)
  - Jahresabrechnung pruefen
  - Anbieterwechsel beraten
  - Verbrauchsoptimierung
- Pre-Fill aus URL-Parameter moeglich (`?topic=strom`), damit Ad-Klick direkt vorbereitet ist

### Schritt 2 - "Ihre Situation"
- Haushalt oder Gewerbe (Radio)
- PLZ (Pflicht - fuer Routing)
- Ort (Auto-Suggest auf Basis PLZ)
- Aktueller Anbieter (optional, Free-Text mit Autocomplete-Liste haeufiger Anbieter)
- Monatlicher Abschlag in EUR (optional, Number)
- Jahresverbrauch in kWh (optional, Number)
- **Upload-Feld optional** und visuell zurueckhaltend (kein Pflichtgefuehl)
  - Microcopy: "Optional: Aktuelle Jahresabrechnung hochladen. Vertraulich, EU-Server, persoenlich geprueft."

### Schritt 3 - "Wer sind Sie?"
- Vorname + Nachname (Pflicht)
- Telefon (empfohlen, aber nicht zwingend Pflicht)
- E-Mail (Pflicht wenn Telefon fehlt - Min-Eins-Regel: Mindestens eine Kontaktmoeglichkeit)
- Bevorzugte Kontaktart (Radio: Telefon / E-Mail / WhatsApp)
- WhatsApp-Opt-in als separate Checkbox, **nur wenn** WhatsApp ausgewaehlt
- Consent-Checkbox (Pflicht, NICHT pre-checked):
  > "Ich stimme zu, dass meine Angaben und optional hochgeladenen Unterlagen zur Bearbeitung meiner Anfrage, zur Kontaktaufnahme und zur Erstellung einer persoenlichen Einschaetzung verarbeitet werden. Die Hinweise zur Datenverarbeitung habe ich gelesen."
- Submit-Button: "Persoenliche Pruefung anfragen"

### Technische Anforderungen
- Honeypot-Field gegen Bot-Spam
- Server-side Validierung (nicht nur Client)
- Rate-Limit pro IP (max 5 Submits / 10 Min)
- Dublettencheck (E-Mail oder Telefon-Nummer normalisiert) bei Submit
- Consent-Logging: IP-Hash (DSGVO), Zeitstempel, User-Agent, Consent-Text-Version
- UTM-Logging: alle utm_*, gclid, fbclid, msclkid, ref (server-side)
- Reverse-IP-Lookup fuer Gewerbe (B2B-Anreicherung optional)
- Captcha nur als Fallback bei verdaechtigem Traffic (sonst CR-Killer)

### Spam-/Fake-Schutz Heuristiken
- Free-Text-Felder: keine URLs, kein Cyrillisches/Asiatisches Skript (unless explicit DE-Hinweis)
- Telefonnummer: Plausibilitaetscheck (DE-Vorwahl, mind. 7 Ziffern nach Vorwahl)
- E-Mail: SMTP/MX-Pruefung im Background (nicht synchron, sonst CR-Killer)
- PLZ: nur 5-stellige DE-PLZ erlaubt
- Submit-Zeit < 3 s: Bot-Verdacht -> Soft-Reject

### Dublettenstrategie
- **Exakte Dublette** (gleiche E-Mail + gleiches Topic in 30 Tagen): Soft-Notify, kein neuer Lead, append zur bestehenden Akte als "Re-Engagement".
- **Verdacht-Dublette** (gleicher Name + gleiche PLZ + anderes Topic): Markieren, Bearbeiter checked.
- **Telefon-Dublette**: Wie E-Mail-Dublette.


## 8. Tracking-System

### Architektur
- **Frontend**: GTM (Google Tag Manager) als zentraler Hub
- **Server-Side**: GA4 + Meta Conversion API + Microsoft UET via Server-Side GTM (Cloud Run / Vercel Edge)
- **Datenbank**: Eigenes `events`-Table im Postgres (schon vorhanden) als Source of Truth, doppelte Buchung in GA4 fuer Werbe-Plattformen.
- **Consent-Gate**: Alle Marketing-/Conversion-Tags feuern erst nach Consent (technisch noetige Cookies vorher OK).

### Pflicht-Events
| Event                  | Trigger                          | Wichtige Properties |
|------------------------|----------------------------------|---------------------|
| `page_view`            | Seitenaufruf                     | route, source, medium, campaign, device, consent_state, timestamp |
| `cta_click`            | Klick auf primaere CTA           | cta_id, route, position |
| `form_start`           | erste Eingabe im Formular        | form_id, route, service_interest |
| `form_step_1_complete` | Schritt 1 abgeschlossen          | service_interest, time_on_step |
| `form_step_2_complete` | Schritt 2 abgeschlossen          | hh_or_gewerbe, postal_code |
| `form_submit`          | finale Abgabe (Server-Event)     | lead_id, lead_score, qualified |
| `upload_started`       | Datei-Auswahl                    | mime_type |
| `upload_completed`     | Upload erfolgreich               | file_size, file_count |
| `phone_click`          | tel:-Link Klick                  | source_section |
| `email_click`          | mailto:-Link                     | source_section |
| `whatsapp_optin`       | WA-Checkbox aktiviert            | --  |
| `lead_qualified`       | Backend qualifiziert Lead        | lead_id, score |
| `lead_disqualified`    | Backend disqualifiziert          | lead_id, reason |
| `duplicate_detected`   | Dublette erkannt                 | match_field |
| `callback_scheduled`   | Bearbeiter terminiert Anruf      | lead_id, slot |

### Gemeinsame Event-Properties (alle Events)
```
route, source, medium, campaign, ad_group, keyword,
creative_id, landing_page, service_interest, city,
device, consent_state, timestamp
```

### Server-Side Conversion-Buchung
- **Google Ads**: Enhanced Conversions via Google Ads API (Email-Hash bei Submit).
- **Meta**: Conversion API mit Event-ID-Dedupe gegen Browser-Pixel.
- **Microsoft**: UET-API mit hashed Email.
- **Vorteil**: Wirbt iOS-/Adblocker-resistent, hoehere Match-Rate, niedrigerer CPL.

### Attribution
- Last-non-direct Click als Defaultfenster 30 Tage.
- View-Through-Conversions nur fuer Display/YT (1 Tag).
- UTMs werden bei Submit in `lead.attribution` Snapshot abgelegt (versioniert).

### Datenschutz / Consent
- Consent Mode v2 (GA4) aktivieren.
- Ohne Marketing-Consent: Ping nur fuer "essential" + Conversion-Modeling (anonymisiert).
- Pixel-Code laedt nur in den Consent-Cookie-Buckets.


## 9. CRM-Pipeline

> Eure CRM-Pipeline laeuft bereits im Admin-Panel (Operations Center). Die folgenden Stages und Felder ergaenzen / verschaerfen das vorhandene Modell.

### Stages (linear, aber Rueckspruenge erlaubt)
1. **Neuer Lead** (Default beim Submit)
2. **Dublettenpruefung** (Auto-Step in <30 Sek)
3. **Kontaktversuch 1** (SLA: < 15 Min bei Hot-Lead, < 4 h sonst)
4. **Kontaktversuch 2** (SLA: + 24 h)
5. **Kontakt erreicht**
6. **Unterlagen angefragt**
7. **Unterlagen erhalten**
8. **Pruefung laeuft**
9. **Empfehlung erstellt**
10. **Wechsel-/PV-/Gewerbeberatung moeglich**
11. **Nicht qualifiziert**
12. **Kein Interesse**
13. **Nicht erreichbar** (nach 3 Versuchen, abgestuft)
14. **Abgeschlossen**

### Pflicht-Felder pro Lead
- `lead_id` (uuid)
- `created_at` (timestamp)
- `attribution`: source, medium, campaign, ad_group, keyword, creative_id, landing_page, gclid, fbclid, msclkid
- `service_interest` (strom / gas / pv / gewerbe / abrechnung / wechsel / verbrauch)
- `customer_type` (haushalt / gewerbe)
- `postal_code`, `city`
- `contact`: first_name, last_name, phone, email, preferred_contact
- `consent`: timestamp, ip_hash, ua, version
- `upload_status` (none / pending / received)
- `duplicate_status` (clean / duplicate / suspect)
- `lead_score` (0-100)
- `qualification` (qualified / disqualified / pending)
- `stage` (oben)
- `next_step` (free-text, default "Erster Anruf")
- `next_step_due_at` (timestamp - SLA-getrieben)
- `assigned_to` (Partner-Username)
- `last_activity_at`
- `notes` (history)

### SLA-Regeln (kritisch!)
- **Hot-Lead** (Score >= 70 oder Upload vorhanden oder Gewerbe): **15-Minuten-Regel** im Tageszeitraum 08-20 Uhr.
- **Warm-Lead** (Score 40-69): < 4 h.
- **Cold-Lead** (Score < 40 oder nur E-Mail): < 24 h.
- Out-of-Hours: erster Versuch am naechsten Morgen 09:00.

### Auto-Routing-Regel (Distribution)
Es laeuft bereits ein Routing-Modul - empfohlene Schaerfung:
- Erst nach Region (PLZ-Praefix) zuordnen
- Dann nach Spezialisierung (Strom/Gas/PV/Gewerbe)
- Dann nach Auslastung (`active_leads / capacity` aufsteigend)
- Hot-Leads bevorzugt an Top-Performer

### Eskalation
- Wenn Lead 2 h ohne Kontaktversuch in "Neuer Lead" -> Admin-Alarm
- Wenn Lead 48 h ohne Stage-Wechsel -> Auto-Notification an Bearbeiter + Admin
- Wenn 3x "Nicht erreicht" -> auto -> "Nicht erreichbar", E-Mail mit Termin-Link an Kunden


## 10. Lead-Scoring (0-100)

### Berechnungs-Modell (additiv, gecappt auf 100)
| Signal                                | Punkte |
|---------------------------------------|--------|
| Telefonnummer vorhanden + plausibel   | +20    |
| Upload Jahresabrechnung vorhanden     | +15    |
| Monatlicher Abschlag >= EUR 100       | +10    |
| Monatlicher Abschlag >= EUR 200       | +15 (statt 10) |
| Jahresverbrauch > 4.000 kWh (HH)      | +10    |
| Jahresverbrauch > 10.000 kWh (Gewerbe)| +20    |
| Customer Type = Gewerbe               | +10    |
| Service Interest = PV + Hauseigentuemer signal | +10 |
| Rueckrufwunsch (preferred_contact=phone) | +10 |
| WhatsApp-Opt-in                       | +5     |
| Vollstaendige Kontaktdaten (Name + Tel + Mail) | +5 |
| Quelle = Google Search High-Intent    | +5     |
| Quelle = Meta Instant Form            | -5     |
| **Negativsignale**                    |        |
| Nur E-Mail (kein Telefon)             | -5     |
| Submit-Zeit < 5 s                     | -15    |
| Verdacht Fake-Daten (Heuristik)       | -25    |
| Dublette (E-Mail oder Telefon)        | -50    |
| Ungueltige Telefonnummer              | -15    |
| Ungueltige E-Mail (Format)            | -10    |

### Kategorien
- **Hot (70-100)**: 15-Min-SLA, sofortiges Pop-Up im Operations Center
- **Warm (40-69)**: 4-h-SLA, Standard-Bearbeitung
- **Cold (1-39)**: 24-h-SLA, mit Pre-Qualifizierungs-E-Mail
- **Disqualified (<=0)**: nicht weiterleiten, manuell pruefen ob legit

### Dynamische Re-Scoring
- Nach erstem Kontaktversuch: +5 wenn erreicht, -10 wenn 1. Versuch keine Antwort
- Nach Upload: +15 (rueckwirkend)
- Nach 2. Versuch ohne Antwort: -15
- Score wird in CRM-Historie versioniert (jeder Score-Wechsel ist auditbar)


## 11. Creative-System (Anzeigenwinkel)

> Alle Texte sind als Vorlage zu verstehen. Vor Veroeffentlichung muss jede Variante von der Compliance-Verantwortlichen (UWG/DSGVO) freigegeben werden.

### Verbotene Formulierungen (uebergreifend)
- "Sparen Sie garantiert / sofort / bis zu X EUR" (ohne Beleg = UWG-Risiko)
- "Bester / guenstigster / Testsieger" (ohne Quelle)
- "Sofort wechseln / automatisch wechseln"
- "Kostenfrei wechseln" (kann irrefuehren, wir wechseln nichts)
- "Vom Staat gefoerdert" (irrefuehrend ausser konkret bei BAFA/KfW PV)
- Kuenstliche Knappheit ("Nur heute / nur fuer 24 h")
- "100 % Erfolgsquote"

### Winkel 1: Stromrechnung zu hoch
**Headlines (5)**
1. "Stromrechnung zu hoch? Persoenlich pruefen lassen."
2. "Stromvertrag pruefen - statt anonymes Tarifportal."
3. "Persoenliche Energiepruefung. Keine Verpflichtung."
4. "Stromabschlag gestiegen? Wir pruefen den Hintergrund."
5. "Strom: Vertrag, Verbrauch, Anbieter - persoenlich eingeordnet."

**Primary Texts (5)**
1. "Sie haben das Gefuehl, Ihre Stromrechnung passt nicht? Unser Energie-Team prueft Vertrag, Verbrauch und Markt-Optionen - persoenlich und unverbindlich."
2. "Tarifportale zeigen Ihnen eine Liste. Wir pruefen Ihren konkreten Vertrag und sagen, was sich wirklich rechnet."
3. "Keine automatische Vertragsumstellung. Keine Verpflichtung. Wir hoeren zu, pruefen und melden uns mit einer Einschaetzung."
4. "Stromvertrag, Abschlag, Jahresabrechnung - oft passt eines nicht. Wir helfen, das auseinanderzudividieren."
5. "Wir sind kein Tarifvergleich. Wir sind eine persoenliche Energiepruefung fuer Haushalte und Unternehmen in Deutschland."

**Descriptions (3)**
1. "Persoenliche Pruefung. EU-Server. DSGVO-konform."
2. "Unverbindlich anfragen. Wir melden uns persoenlich."
3. "Vertrag und Verbrauch verstehen - statt Tarifportal."

**CTA-Varianten (3)**: "Pruefung anfragen" | "Jetzt einschaetzen lassen" | "Persoenlich pruefen"

**Hooks Video/Reels (3)**
1. "Warum bekomme ich auf einmal 200 EUR mehr Abschlag?" - Mitarbeiter erklaert
2. "Was steht auf meiner Jahresabrechnung wirklich drauf?" - Walkthrough
3. "Was ist der Unterschied zwischen Tarifportal und persoenlicher Pruefung?" - 30s

**Bild/Creative-Ideen (3)**
1. Schreibtisch mit Jahresabrechnung, Hand mit Stift, Markierung
2. Person am Telefon, ruhig, ueber 35, Wohnzimmer
3. Splitscreen: links Tarifportal-Tabelle, rechts ein Mensch erklaert

### Winkel 2: Gasabschlag gestiegen
**Headlines**
1. "Gasabschlag gestiegen? Wir pruefen den Hintergrund."
2. "Gasvertrag persoenlich pruefen lassen."
3. "Gaspreis und Verbrauch nachvollziehbar einordnen."
4. "Gasanbieter wechseln? Erst pruefen lassen."
5. "Persoenliche Gas-Pruefung statt anonymes Portal."

**Primary Texts**
1. "Ihr Gas-Abschlag ist gestiegen und Sie wissen nicht, ob es gerechtfertigt ist? Wir pruefen Vertrag und Verbrauch."
2. "Tarifportale rechnen Theorie. Wir pruefen Ihre konkrete Situation."
3. "Persoenliche Einschaetzung statt anonyme Tabelle - ohne Verpflichtung."
4. "Vertrag, Verbrauch, Anbieter - wir bringen Klarheit, ohne dass Sie etwas wechseln muessen."
5. "Wir sind die persoenliche Energiepruefung fuer Privat- und Gewerbekunden."

**Descriptions**: "Unverbindlich. Persoenlich. DSGVO-konform." | "Vertrag pruefen - ohne Wechsel-Druck." | "Wir hoeren zu, pruefen und melden uns."

### Winkel 3: Jahresabrechnung
**Headlines**
1. "Jahresabrechnung erhalten? Verstaendlich pruefen lassen."
2. "Was bedeutet die Nachzahlung auf der Abrechnung?"
3. "Jahresabrechnung Strom oder Gas - wir erklaeren."
4. "Persoenliche Pruefung Ihrer Jahresabrechnung."
5. "Abrechnung pruefen - bevor Sie nachzahlen."

**Primary**: 1. "Jahresabrechnung erhalten und keine Lust auf Recherche? Wir pruefen sie persoenlich." 2. "Abschlag, Verbrauch, Tarifwechsel - wir ordnen die wichtigsten Posten ein." 3. "Statt Stunden im Kundenportal: 5 Minuten Pruefung anfragen - wir melden uns." 4. "Persoenlich, ohne Wechsel-Druck, DSGVO-konform." 5. "Wir sagen Ihnen, was die Abrechnung wirklich bedeutet."

### Winkel 4: Photovoltaik
**Headlines**
1. "Photovoltaik geplant? Eignung strukturiert einschaetzen lassen."
2. "Lohnt sich PV fuer Ihr Dach? Persoenlich pruefen."
3. "PV-Beratung ohne Verkaufsdruck."
4. "Vorher pruefen statt nachher aergern."
5. "Persoenliche PV-Eignungspruefung."

**Primary**: 1. "Bevor Sie Angebote vergleichen: lassen Sie Ihr Vorhaben strukturiert einschaetzen." 2. "Dach, Verbrauch, Foerderung - wir pruefen, ob und wie PV fuer Sie sinnvoll ist." 3. "Keine Beauftragung. Wir geben eine Einschaetzung, Sie entscheiden in Ruhe." 4. "Persoenlich, neutral, ohne Provisionsdruck eines Installateurs." 5. "Photovoltaik ist eine 20-Jahre-Entscheidung. Wir nehmen uns Zeit fuer die Pruefung."

### Winkel 5: Gewerbeenergie
**Headlines**
1. "Gewerbeenergie pruefen: Strom, Gas, Verbrauch."
2. "Strompreise fuer Betriebe - persoenlich eingeordnet."
3. "Gewerbevertrag pruefen statt Tarifportal."
4. "Energiebudget Gewerbe: pruefen und planen."
5. "Persoenliche Gewerbeenergie-Pruefung."

**Primary**: 1. "Energiekosten sind im Betrieb oft groesster variabler Posten. Wir pruefen Vertraege und Verbrauchsmuster." 2. "Unabhaengig von einem konkreten Anbieter - wir liefern eine sachliche Einschaetzung." 3. "Restaurant, Werkstatt, Praxis, Buero - wir pruefen, was zu Ihrer Lastkurve passt." 4. "Keine automatische Umstellung, keine Verpflichtung." 5. "Eine seriose Energiepruefung dauert keine Wochen - aber sie spart langfristig."

### Winkel 6: Statt Tarifportal
**Headlines**
1. "Persoenliche Energiepruefung statt anonymem Tarifportal."
2. "Statt Tabelle: ein echter Ansprechpartner."
3. "Wir vergleichen nicht. Wir pruefen Ihren Vertrag."
4. "Beratung statt Vergleichsmaschine."
5. "Keine Tarifliste. Eine klare Einschaetzung."

**Primary**: 1. "Tarifportale zeigen, was es gibt. Wir sagen, was zu Ihnen passt - oder ob Sie schon gut liegen." 2. "Eine seriose Pruefung braucht Kontext: Verbrauch, Vertrag, Lebenssituation." 3. "Wir sind unabhaengig von einem konkreten Anbieter und pruefen ergebnisoffen." 4. "Keine Provisionsfalle. Eine ehrliche Einschaetzung." 5. "Wir sind die persoenliche Alternative zu Vergleichsportalen."


## 12. Google Ads Copy (Responsive Search Ads)

> Pro Kampagne 1 RSA mit max. 15 Headlines, 4 Descriptions. Headlines <=30 Zeichen, Descriptions <=90 Zeichen.

### G-Strom-HighIntent

**Headlines (15)**
1. Stromvertrag persoenlich pruefen
2. Strompreis pruefen lassen
3. Stromrechnung zu hoch?
4. Strom: persoenliche Pruefung
5. Anbieterwechsel? Erst pruefen
6. Persoenliche Energiepruefung
7. Statt Tarifportal: pruefen
8. Strom-Vertrag einordnen
9. Vertrag und Verbrauch checken
10. Strom: ohne Wechsel-Druck
11. AGI Energy - persoenliche Pruefung
12. Keine Verpflichtung
13. DSGVO-konform, EU-Server
14. In 24 h Rueckmeldung
15. Strom: unverbindlich anfragen

**Descriptions (4)**
1. Persoenliche Pruefung Ihres Stromvertrags. Keine automatische Umstellung, keine Verpflichtung.
2. Wir pruefen Vertrag, Verbrauch und Anbieter-Optionen. Sie entscheiden in Ruhe.
3. Persoenlicher Ansprechpartner statt anonymem Tarifportal. DSGVO-konform.
4. Anfrage in unter 2 Minuten. Persoenliche Rueckmeldung per Telefon oder E-Mail.

**Sitelinks**
- "Jahresabrechnung pruefen" -> /jahresabrechnung-pruefen
- "Anbieterwechsel beraten" -> /anbieterwechsel-pruefen
- "Gewerbestrom pruefen" -> /gewerbeenergie-pruefen
- "Photovoltaik einschaetzen" -> /photovoltaik-pruefen

**Callouts**
- Unverbindlich
- Persoenlich
- DSGVO-konform
- EU-Server
- Keine Wechsel-Pflicht
- Antwort innerhalb 24 h

**Structured Snippets**
- Leistung: Stromvertragspruefung, Gasvertragspruefung, PV-Eignung, Gewerbeenergie

### G-Gas-HighIntent

**Headlines (15)**
1. Gasvertrag persoenlich pruefen
2. Gaspreis pruefen lassen
3. Gasrechnung zu hoch?
4. Gas: persoenliche Pruefung
5. Gasanbieter wechseln? Pruefen
6. Persoenliche Energiepruefung
7. Statt Tarifportal: pruefen
8. Gas-Vertrag einordnen
9. Vertrag und Verbrauch checken
10. Gas: ohne Wechsel-Druck
11. AGI Energy - Gaspruefung
12. Keine Verpflichtung
13. DSGVO-konform, EU-Server
14. In 24 h Rueckmeldung
15. Gas: unverbindlich anfragen

**Descriptions (4)**
1. Persoenliche Pruefung Ihres Gasvertrags. Keine automatische Umstellung.
2. Vertrag, Verbrauch, Anbieter - wir pruefen unabhaengig und unverbindlich.
3. Statt Tarifportal: ein echter Ansprechpartner. DSGVO-konform.
4. Anfrage in 2 Minuten. Wir melden uns persoenlich per Telefon oder E-Mail.

### G-Jahresabrechnung

**Headlines (15)**
1. Jahresabrechnung pruefen
2. Stromabrechnung verstehen
3. Gasabrechnung pruefen lassen
4. Nachzahlung? Pruefen lassen
5. Abrechnung persoenlich einordnen
6. Statt Recherche: pruefen lassen
7. Was bedeutet die Abrechnung?
8. AGI Energy - Pruefung
9. Persoenliche Einschaetzung
10. Keine Wechsel-Pflicht
11. Anfrage in 2 Minuten
12. Rueckmeldung in 24 h
13. DSGVO, EU-Server
14. Unverbindlich pruefen
15. Statt Portal: ein Mensch

**Descriptions (4)**
1. Wir pruefen Ihre Jahresabrechnung persoenlich. Verstaendlich. Ohne Wechsel-Druck.
2. Nachzahlung gerechtfertigt? Tarif zu hoch? Wir ordnen die Posten ein.
3. Anfrage in unter 2 Minuten. Persoenlicher Rueckruf oder E-Mail.
4. DSGVO-konform, EU-Server, keine automatische Vertragsumstellung.

### G-PV

**Headlines (15)**
1. Photovoltaik-Eignung pruefen
2. Lohnt sich PV fuer Ihr Dach?
3. PV-Beratung ohne Druck
4. PV: persoenliche Pruefung
5. Vor Angebot: einschaetzen
6. PV-Eignungspruefung
7. Photovoltaik fuer Eigenheim
8. AGI Energy - PV-Pruefung
9. Persoenliche Einschaetzung
10. Statt Installateur-Druck
11. Unabhaengige Pruefung
12. Foerderung pruefen
13. Anfrage in 2 Minuten
14. DSGVO-konform
15. In 24 h Antwort

**Descriptions (4)**
1. Wir pruefen, ob Photovoltaik fuer Ihr Dach und Ihren Verbrauch sinnvoll ist.
2. Neutral, unabhaengig, ohne Verkaufsdruck eines Installateurs.
3. Dach, Verbrauch, Foerderung - strukturierte Einschaetzung in 24 h.
4. Persoenlich. DSGVO-konform. Keine Verpflichtung.

### G-Gewerbe

**Headlines (15)**
1. Gewerbestrom pruefen lassen
2. Gewerbegas Vertrag pruefen
3. Energiekosten Betrieb senken
4. Gewerbeenergie persoenlich
5. Statt Tarifportal: Pruefung
6. Strom Gewerbe einschaetzen
7. AGI Energy - Gewerbe
8. Persoenliche Energiepruefung
9. Restaurant, Praxis, Buero
10. Unabhaengige Pruefung
11. Anfrage in 2 Minuten
12. Rueckmeldung in 24 h
13. Vertraulich, DSGVO
14. EU-Server
15. Ohne Wechsel-Pflicht

**Descriptions (4)**
1. Wir pruefen Vertraege, Lastkurven und Verbrauchsmuster Ihres Betriebs.
2. Restaurant, Werkstatt, Praxis, Buero - persoenliche Energiepruefung.
3. Keine automatische Umstellung. Unabhaengig vom Anbieter.
4. Anfrage in 2 Minuten. Persoenliche Einschaetzung per Telefon oder E-Mail.


## 13. Meta Ads Copy

### 10 Primary Texts
1. "Stromrechnung zu hoch? Wir pruefen Ihren Vertrag persoenlich - ohne Wechsel-Druck."
2. "Tarifportale zeigen eine Liste. Wir pruefen Ihre konkrete Situation."
3. "Anfrage in 2 Minuten. Persoenliche Rueckmeldung per Telefon oder E-Mail."
4. "Energiepruefung fuer Haushalt und Gewerbe. DSGVO-konform, EU-Server."
5. "Keine automatische Vertragsumstellung. Keine Verpflichtung."
6. "Vertrag, Verbrauch, Anbieter - wir ordnen das persoenlich ein."
7. "Photovoltaik geplant? Lassen Sie die Eignung neutral pruefen - vor dem ersten Angebot."
8. "Gasabschlag gestiegen? Wir pruefen, ob das gerechtfertigt ist."
9. "Jahresabrechnung erhalten und nicht sicher, was die Posten bedeuten? Wir helfen."
10. "Gewerbeenergie pruefen: Strom, Gas, Verbrauch. Persoenlich statt Tabelle."

### 10 Headlines
1. Persoenliche Energiepruefung
2. Stromvertrag pruefen lassen
3. Gasvertrag persoenlich pruefen
4. Jahresabrechnung einordnen
5. PV-Eignung pruefen lassen
6. Gewerbeenergie persoenlich
7. Statt Tarifportal: Pruefung
8. Energiepruefung statt Vergleichsportal
9. Vertrag pruefen - ohne Wechsel
10. AGI Energy - persoenliche Pruefung

### 5 Descriptions
1. "Unverbindlich. Persoenlich. DSGVO-konform."
2. "Anfrage in 2 Minuten. Rueckmeldung in 24 h."
3. "Keine automatische Vertragsumstellung."
4. "EU-Server, vertrauliche Bearbeitung."
5. "Strom, Gas, PV, Gewerbe - persoenlich geprueft."

### 5 Lead-Form-Intros (Meta Instant Form)
1. "Hallo! Wir pruefen Ihre Energie-Situation persoenlich - keine automatische Umstellung, keine Verpflichtung. Bitte 3 kurze Schritte, danach melden wir uns."
2. "Wir helfen Ihnen, Vertrag und Verbrauch einzuordnen. Unverbindlich, vertraulich, DSGVO-konform."
3. "Bevor Sie Tarifportale durchklicken: lassen Sie Ihre Situation persoenlich pruefen."
4. "Photovoltaik-Eignung: wir pruefen Dach, Verbrauch und Foerderung neutral."
5. "Gewerbeenergie verstaendlich pruefen: Strom, Gas, Verbrauchsmuster."

### 5 Formular-Fragen (Custom Questions im Instant Form)
1. "Was moechten Sie pruefen lassen?" (Strom / Gas / PV / Gewerbe / Jahresabrechnung)
2. "Wie kontaktieren wir Sie am liebsten?" (Telefon / E-Mail / WhatsApp)
3. "Wie hoch ist Ihr aktueller monatlicher Abschlag? (optional)"
4. "Sind Sie Haushalt oder Gewerbe?"
5. "Welche PLZ haben Sie?"

### 5 Retargeting-Anzeigen
1. "Sie haben Ihre Anfrage begonnen - moechten Sie sie in 60 Sekunden abschliessen?"
2. "Noch unsicher? Persoenliche Pruefung ist unverbindlich und kostenlos."
3. "Erinnerung: Ihre Energiepruefung wartet auf Sie."
4. "Anbieterwechsel ist kein Muss - aber eine Pruefung lohnt sich."
5. "Wir melden uns nur, wenn Sie es wuenschen. Anfrage abschliessen?"

### 5 Creative-Briefings
1. **"Schreibtisch-Szene"**: Reale Person, ueber 35, blaettert in einer Jahresabrechnung mit Stift in der Hand. Helle, warme Office-Atmosphaere. 16:9 + 9:16 + 4:5.
2. **"Telefonierende Person"**: Mensch sitzt zu Hause oder im Buero, ruhig am Telefon. Keine Stock-Plastik. 9:16 fuer Reels.
3. **"Split: Portal vs Mensch"**: Animationsclip 12 s. Links eine grosse, kalte Tarif-Tabelle, rechts ein Berater am Schreibtisch. Voice-over: "Tarifportale zeigen eine Liste. Wir pruefen Ihren konkreten Vertrag."
4. **"Erklaerer Jahresabrechnung"**: Statisches Bild der Abrechnung mit hervorgehobenen Posten + 3 Bulletpoints daneben. Klare typografische Hierarchie.
5. **"PV-Dach-Pruefung"**: Drohnenaufnahme oder klare Illustration eines Dachs, mit Overlay-Kasten "Eignung pruefen - neutral, ohne Verkaufsdruck".

### Ton-Regeln Meta
- Direkt, ruhig, sachlich
- Keine Ausrufezeichen-Stapel
- Keine Emojis, ausser dezent (max 1 pro Post: Stecker, Sonne, Haus)
- Keine Coupon-Sprache, keine Tarifportal-Optik (kein "Jetzt Bestpreis sichern!")
- Keine Panikmache ("Strompreis explodiert!")


## 14. Outbound-System fuer Gewerbeenergie

> Recht: B2B-Kaltakquise per Telefon ist in DE nur erlaubt, wenn ein "mutmassliches geschaeftliches Interesse" gem. UWG §7 vorliegt UND nachvollziehbar dokumentiert ist. Cold-E-Mail an B2B ohne vorherige Geschaeftsbeziehung ist riskant. Briefe sind frei. LinkedIn-Direct-Outreach im professionellen Kontext ist OK, sofern nicht massenhaft / automatisiert.

### Zielbranchen (priorisiert nach Verbrauchsintensitaet)
| Branche                | Verbrauchsmerkmal                 | CPL-Korridor B2B |
|------------------------|------------------------------------|-------------------|
| Gastronomie/Hotellerie | Hoher Strom, oft Gas, lange Oeffnungszeiten | EUR 40-80   |
| Handwerk (Sanitaer/Elektro/Bauwesen) | Werkstattstrom, Maschinen | EUR 30-60 |
| Praxen (Arzt/Zahn/Physio) | Geraete-Strom, regelmaessiger Verbrauch | EUR 35-70 |
| Fitnessstudios         | Strom + Heizung, lange Oeffnung    | EUR 40-80 |
| Werkstaetten / Kfz     | Maschinen, Druckluft, Heizung       | EUR 30-60 |
| Bueros / Kanzleien     | Klima, Server, Beleuchtung          | EUR 40-90 |
| Hausverwaltungen       | Gemeinschaftsstrom Liegenschaften   | EUR 30-50 |

### Segmentierungslogik
- Region (Bundesland, dann PLZ-Cluster)
- Branche (NACE/WZ-Code)
- Mitarbeiterzahl (10-200 = Sweet Spot)
- Standort-Charakteristik (Gewerbegebiet, Innenstadt)
- Vermutete Energieintensitaet (aus Branche abgeleitet)

### Value Proposition Gewerbe
"Wir pruefen Ihre Energievertraege und Verbrauchsmuster strukturiert - unabhaengig vom Anbieter, mit Blick auf Lastkurven und Tarifoptionen. Sie bekommen eine schriftliche Einschaetzung, keine Verkaufsschau."

### Saubere Kontaktwege (Pflicht-Reihenfolge)
1. **Brief (Tag 1)**: Personalisiertes Anschreiben + Visitenkarte + QR-Code zur LP `/gewerbeenergie-pruefen?ref=brief-{batchid}`
2. **LinkedIn (Tag 3-5)**: persoenliche Verbindungseinladung mit kurzem, individuellem Hinweis (kein Copy-Paste)
3. **Telefon (Tag 7-10)**: nur an die im UWG-Sinne plausiblen Ansprechpartner, nicht "alle Nummern aus dem Branchenbuch"
4. **Re-Kontakt nach 30 Tagen**: zweiter Brief oder Postkarte mit Branchen-Insight

### Gespraechsleitfaden (Telefon, B2B)
1. **Einstieg (15 s)**: "Guten Tag, mein Name ist X von AGI Energy. Ich rufe an, weil wir Gewerbebetriebe wie Ihren bei der Pruefung von Energievertraegen unterstuetzen. Stoere ich gerade?"
2. **Pain identifizieren**: "Haben Sie zuletzt mal auf die Entwicklung Ihrer Strom-/Gaskosten geschaut?"
3. **Wert anbieten**: "Wir machen eine kurze, strukturierte Pruefung. Sie bekommen eine schriftliche Einschaetzung - ohne dass etwas umgestellt wird."
4. **Naechster Schritt**: "Soll ich Ihnen eine kurze Uebersicht zuschicken oder direkt einen Termin fuer das Pruefgespraech vorbereiten?"
5. **Out**: "Vielen Dank fuer Ihre Zeit. Ich melde mich noch einmal per E-Mail mit den Eckpunkten."

### Follow-up-Logik
- T+1 Tag: E-Mail mit Zusammenfassung + LP-Link (nur wenn explizit erlaubt im Telefonat)
- T+7: LinkedIn-Nachricht oder Brief 2
- T+30: Branchen-Insight per E-Mail (nur Opt-in-Liste)
- T+90: Saisonaler Re-Touch

### CRM-Felder fuer B2B-Outbound (zusaetzlich)
- `company_name`, `vat_id`, `industry`, `employees`, `decision_maker_role`
- `outreach_channel_used` (brief / linkedin / call)
- `consent_to_email` (Datum + Quelle)
- `last_touch_at`, `next_touch_at`
- `objection_log` (welche Einwaende kamen)

### Qualifizierungsfragen B2B
1. Wer kuemmert sich aktuell um Ihre Energievertraege?
2. Wann lief Ihr letzter Vertrag aus / wann laeuft er aus?
3. Wie hoch sind Ihre Jahresverbraeuche (kWh)?
4. Haben Sie Lastspitzen oder spezielle Tarife (Leistungsmessung)?
5. Ist eine schriftliche Einschaetzung von Interesse?

### Uebergabe an Beratung
- Bei Interesse: Termin im Operations Center anlegen, `assigned_to` = Spezialist Gewerbe (z.B. Andreas Drauschke, falls dort spezialisiert), `service_interest` = "gewerbe"


## 15. Partner-System

### Zielpartner (priorisiert)
1. **Immobilienverwalter / Hausverwaltungen** (Top-Hebel: ganze Liegenschafts-Portfolios)
2. **Energieberater (zertifiziert, GIH/dena-Liste)**
3. **PV-Monteure / Solaranlagen-Installateure**
4. **Steuerberater fuer Gewerbe** (Cross-Sell Gewerbeenergie)
5. **Wohnungsgenossenschaften**
6. **Lokale Unternehmernetzwerke (BVMW, Wirtschaftsjunioren, IHK)**
7. **Handwerkskammern / Innungen**
8. **Branchen-spezifisch**: Gastro-Verbaende, Fitnessstudio-Netzwerke

### Nutzenargument pro Partnergruppe
| Partner            | Nutzen fuer Partner                                | Nutzen fuer Endkunde         |
|--------------------|----------------------------------------------------|-------------------------------|
| Hausverwaltung     | Service-Erweiterung ohne Aufwand, Provision        | Persoenliche Pruefung der Nebenkosten |
| Energieberater     | Ergaenzendes Produkt (Vertragsfokus statt Sanierung) | Komplettpaket                |
| PV-Monteur         | Pre-Qualifizierte Leads aus PV-Eignungspruefung    | Neutrale Pruefung vorab       |
| Steuerberater      | Mehrwert fuer Gewerbekunden                        | Energiekosten = Steuerthema   |
| Wohnungsgenossenschaft | Mehrwert-Service fuer Mitglieder                | Persoenliche Beratung         |

### Kooperationsmodell (Optionen)
A. **Empfehlungsprovision** (Anteil pro qualifiziertem Lead oder Abschluss). Vorher schriftlich vereinbart, rechtlich gepruefte Vertraege.
B. **Co-Branding-Landingpage** (`partner.agienergy.de/[partner-slug]` oder Whitelabel-Embed).
C. **Affiliate-Link** mit UTM-Tracking + Provision pro qualifiziertem Lead.
D. **Whitelabel-Embed** des Energieprueffunnels in die Partner-Website (iframe oder Web Component).

### Rechtliche Pruefhinweise
- Provisionsmodelle sind bei bestimmten reglementierten Berufen (Steuerberater, Anwaelte) ggf. unzulaessig - immer mit Berufsrecht abklaeren.
- Energieberater duerfen keine "vermittlungsbezogenen" Geschaefte machen, ohne Gewerbe anzumelden - Empfehlung muss redlich sein.
- Hausverwaltungen brauchen i.d.R. eine Einwilligung der Eigentuemerversammlung fuer Empfehlungen mit Provision.

### Partner-Landingpage `/partner`
- Wertversprechen fuer Partner (3 Bulletpoints)
- Funktionsweise (4 Schritte)
- Beispiel-Provisionsmodell
- Kontakt-Formular fuer Partnerantrag
- Datenschutz + AVV-Anhang verfuegbar

### Lead-Uebergabeprozess
1. Partner generiert Lead ueber Affiliate-Link oder gemeinsame LP
2. UTM `utm_source=partner`, `utm_medium=referral`, `utm_campaign=partner-{slug}`
3. Lead landet im normalen CRM, markiert mit `referral_partner_id`
4. Bei Abschluss: Provision-Eintrag in `commissions`-Table (vorhanden), Status "pending"
5. Monatliche Auszahlung an Partner mit Reporting

### Provisions-/Empfehlungslogik
- Pro qualifiziertem Lead (Definition siehe oben): X EUR (zu definieren)
- Pro Abschluss / erfolgreichem Vertragsabschluss: Y % vom Vermittlungserloes
- Beides nur **mit rechtlich gepruefter Vereinbarung** und ohne Provisionsversprechen, die in Konflikt mit Berufsrecht der Partner stehen

### Anti-Fake-Regeln
- Keine "Fake-Partner" in der Website-Vertrauensliste
- Logos nur mit schriftlicher Freigabe
- Keine Testimonials, die wir nicht beweisen koennen


## 16. 7-Tage-Execution-Plan

> Owner-Beispiel-Spalte ist Platzhalter - anpassen.

### Tag 1 (Fundament)
| Block       | Aktion                                                                 | Owner    | Done-Definition |
|-------------|------------------------------------------------------------------------|----------|------------------|
| 09:00-11:00 | Tracking-Audit: GTM, GA4, Meta Pixel + CAPI, MS UET, Conversions       | Kevin    | Alle Events feuern testweise korrekt |
| 11:00-13:00 | Landingpages anlegen/ueberarbeiten: 7 Routen (Sektion 6)               | Eng-Team | URLs live, LP_CR-Tracking aktiv |
| 13:00-15:00 | Formular finalisieren: 3 Steps, Consent, Honeypot, Spam-Heuristik      | Eng-Team | Test-Submit erzeugt Lead im CRM |
| 15:00-17:00 | CRM-Pipeline-Stages + SLA-Regeln + Eskalations-Notifications einbauen  | Kevin    | Alarm bei 2h-Stau aktiv |
| 17:00-18:00 | Legal-Check: alle Headlines/Descriptions/LP-Texte                       | Compliance | Freigabe-Doc unterschrieben |
| 18:00-20:00 | Ad-Kampagnen vorbereiten (Search + Meta), Conversions verknuepft       | Kevin    | Kampagnen "Paused" status, ready to launch |

### Tag 2 (Go-Live Paid)
| Block       | Aktion                                                                 |
|-------------|------------------------------------------------------------------------|
| 09:00       | Google Search Ads aktivieren (5 Kampagnen, manuelles CPC, tight Budgets) |
| 11:00       | Microsoft Ads aktivieren (Import + UET-Check)                          |
| 13:00       | Meta Lead Ads aktivieren (Instant Form + LP-Click)                     |
| 15:00       | Retargeting-Setup: Pixel-Audiences definieren (laden 24-48h)           |
| 17:00       | Erste Creatives final (statisch 4:5, 1:1, 9:16)                        |
| Laufend     | Tagesziel Tag 2: 15-40 Leads (Lernphase)                                |

### Tag 3 (Erste Optimierung)
| Block       | Aktion                                                                 |
|-------------|------------------------------------------------------------------------|
| 09:00-11:00 | Daten-Review: Spend, CPL, CTR, LP_CR, Form_Completion                  |
| 11:00-13:00 | Suchbegriffsbericht Google + Microsoft, neue Negative Keywords         |
| 13:00-15:00 | Formular-Abbruch-Funnel analysieren (Heatmap optional)                 |
| 15:00-17:00 | A/B-Test starten: Hero-H1 vs Variante, Trustline vs ohne               |
| 17:00       | Tagesziel: 30-60 Leads                                                  |

### Tag 4 (Skalieren Gewinner + Outbound starten)
| Block       | Aktion                                                                 |
|-------------|------------------------------------------------------------------------|
| 09:00       | Budget shift: Verlierer -20 %, Gewinner +20 %                          |
| 10:00       | Retargeting-Kampagnen aktivieren (genug Audience da)                   |
| 12:00       | B2B-Outbound-Setup: Brief-Versand vorbereiten, LinkedIn-Outreach-Pool  |
| 14:00       | Partner-Akquise starten: 5 Hausverwaltungen + 5 Energieberater anschreiben |
| 16:00       | Neue Anzeigenwinkel ausrollen (Winkel 3 + 5 z.B.)                      |
| Tagesziel   | 50-90 Leads                                                             |

### Tag 5 (Creative-Refresh + LP-Variante)
| Block       | Aktion                                                                 |
|-------------|------------------------------------------------------------------------|
| 09:00       | CPL pro Kampagne pruefen, schwache Anzeigen ersetzen                   |
| 11:00       | Zweite LP-Variante live (anderer Hero, anderer Form-Style)             |
| 13:00       | Lead-Qualitaet auswerten: Qualified-Rate, Hot/Warm/Cold-Verteilung     |
| 15:00       | CRM-Speed-Audit: SLAs eingehalten? Eskalationen geprueft?              |
| Tagesziel   | 70-110 Leads                                                            |

### Tag 6 (Aggressives Skalieren)
| Block       | Aktion                                                                 |
|-------------|------------------------------------------------------------------------|
| 09:00       | Gewinner-Kampagnen Budget +30-50 %                                     |
| 11:00       | Regionale Cluster-Kampagnen anlegen (Top-PLZ-Cluster)                  |
| 13:00       | Call-/WhatsApp-Response-Zeit Audit: Hot-Lead < 15 Min?                 |
| 15:00       | Gewerbeenergie separat skalieren (eigene Anzeigen + LP)                |
| Tagesziel   | 90-140 Leads                                                            |

### Tag 7 (Review + Wochenplanung)
| Block       | Aktion                                                                 |
|-------------|------------------------------------------------------------------------|
| 09:00-11:00 | Wochenreport: Spend, Leads, CPL, Qualified-Rate, Conv-Rate per Kanal   |
| 11:00-13:00 | Kanalvergleich, Entscheidung: was skaliert in Woche 2                  |
| 13:00-15:00 | Budgetplan Woche 2 vorbereiten                                          |
| 15:00       | SEO-Plan parallel weiterfuehren (Content-Briefings)                     |
| Tagesziel   | 100-160 Leads (Wochenende oft -20 %, also flat zu Tag 6)                |

### Wochenziel realistisch
- Konservativ: 280-450 Leads
- Ambitioniert: 450-650 Leads
- Aggressiv: 600-850 Leads
- 1000+ erst ab Woche 3-4 realistisch


## 17. Daily War Room

### Morgens (08:00-09:00)
**Pflicht-Checks:**
1. Spend gestern vs. Budget (Abweichung > 15 % flaggen)
2. Leads gestern (Anzahl + Qualified-Rate)
3. CPL gestern (vs. 3-Tage-MA)
4. Conversion Rate per Kampagne
5. Kampagnenfehler (disapproved Ads, Pixel-Probleme)
6. CRM-Rueckstand: wie viele Leads in "Neuer Lead" laenger als 2 h?
7. Top 3 Suchbegriffe der letzten 24 h
8. Anomalien (CTR drop, Bounce up, LP-Errors)

**Daily Stand-up (15 Min):** Highlights / Blockers / Decisions

### Mittags (12:30-13:30)
- Suchbegriffsbericht checken, Negative Keywords ergaenzen
- Schwache Anzeigen unter Quality-Score 5 pausieren
- Gewinner-Anzeigen mit hoher CTR identifizieren
- Landingpage-Daten: Top-Drop-Offs?
- Formularabbrueche (Step 1->2 / 2->3) auswerten

### Abends (17:30-18:30)
- Leadqualitaet bewerten (Sample 10 Leads pro Kampagne)
- Budget-Adjustments fuer naechsten Tag
- Neue Tests anlegen (max 1 Test pro Hebel gleichzeitig)
- Tagesreport an Stakeholder (kurzes Slack/E-Mail-Update)

### Notfall-Trigger (sofort handeln)
- CPL > 200 % vom Ziel in 3 h
- Conversion-Tracking-Lueke (0 Conversions in 2 h trotz Traffic)
- Quality-Score Crash (gross 3+ Punkte runter)
- Pixel-Block / iOS-Issue
- Kampagne disapproved
- 0 Leads in einem 4-h-Block (Tracking-Audit ad-hoc)


## 18. KPI-Dashboard

### Primary Metrics (Daily)
| KPI                          | Ziel Woche 1 | Ziel Woche 4 |
|------------------------------|--------------|--------------|
| Spend                        | < EUR 4.500/Tag | < EUR 4.500/Tag (effizienter) |
| Leads (qualified)            | 30-90/Tag    | 140+/Tag     |
| CPL (qualified)              | < EUR 35     | < EUR 22     |
| MQL-Rate (Marketing Qualified) | >= 75 %    | >= 85 %      |
| SQL-Rate (Sales Qualified, nach Kontakt) | >= 50 % | >= 65 % |
| Kontaktquote (Lead -> erreicht) | >= 60 %   | >= 80 %      |
| Formularstart-Rate           | >= 10 %      | >= 14 %      |
| Formularabschluss-Rate       | >= 45 %      | >= 60 %      |
| Upload-Rate                  | >= 20 %      | >= 35 %      |
| Rueckruf-Rate (innerhalb SLA) | >= 80 %     | >= 95 %      |
| Conversion Rate (LP gesamt)  | >= 4 %       | >= 6 %       |
| CPQL (Cost per Qualified Lead) | < EUR 35   | < EUR 22     |
| No-Show / Fake-Lead-Rate     | < 8 %        | < 4 %        |
| Bearbeitungsgeschwindigkeit Hot-Leads | < 30 Min Median | < 15 Min Median |

### Secondary Metrics (Weekly)
- Umsatzpotenzial pro Kanal (Anzahl Leads x Avg-Provision-Erwartung)
- LTV-Schaetzung pro Quelle
- Abschlussquote (Lead -> Vertrag) pro Bearbeiter
- Provisionsvolumen pending vs paid
- Beschwerden / Spam-Reports / Opt-Outs

### Channel Breakdown View
Pro Kanal taeglich:
- Spend, Impressions, Clicks, CTR, CPC, Conversions, CPL, Qualified-Rate, Lead-Score-Avg

### Funnel-View
Visits -> Form-Start -> Step 1 -> Step 2 -> Step 3 -> Submit -> Qualified -> Contacted -> Closed
Drop-Off pro Stufe als Prozent + absolut.

### Tooling-Empfehlung
- **Looker Studio** (kostenlos, Google Ads/Bing/Meta-Connector) als Haupt-Dashboard
- Eigene DB-View aus Postgres (`events` + `leads` + `attribution`) als Source of Truth
- Slack-Alerts bei Notfall-Triggern


## 19. Skalierungsregeln

### Wenn CPL unter Ziel UND Qualitaet hoch (Qualified >= 75 %)
- Budget +20-30 % alle 48 h (nicht mehr, sonst kippt Lernphase)
- Gewinner-Creatives duplizieren in neue Ad-Set-Variante (ATC)
- Keyword-Liste erweitern (Phrase + breitere Begriffe)
- Regionale Kampagnen ausbauen (Top-PLZ als eigene Geo)
- Ggf. SKAGs / Single-Keyword-Ad-Groups fuer Top-Performer

### Wenn CPL hoch UND Qualitaet gut
- Landingpage optimieren (Hero-A/B, Trustline, Form-Reihenfolge)
- Keywords enger fassen (mehr Exakt, weniger Phrase)
- Anzeigenversprechen schaerfen (Verstaendlichkeit, Klarheit)
- Zielgruppe enger fassen (Alter, Interessen, Region)
- Bieten reduzieren um -10 %, schauen ob CR haelt

### Wenn CPL niedrig UND Qualitaet schlecht (Qualified < 60 %)
- Formular qualifizierender machen (z.B. Telefon Pflicht statt empfohlen)
- Fake-/Low-Intent-Quellen pausieren (oft Display, Meta-Audience-Network)
- Lead-Scoring verschaerfen (Mindest-Threshold heben)
- Sub-Source-Analyse (welche Placements / Apps / Keywords liefern Schrott?)

### Wenn keine Leads
1. Tracking pruefen (feuern Conversion-Events sauber? Pixel-Helper, GTM-Debug)
2. Formular pruefen (Submit funktional? Server-Error 500?)
3. Angebot pruefen (Hero-Versprechen klar? Trust ausreichend?)
4. Anzeigenrelevanz (CTR-Drop = Copy schwach)
5. Landingpage-Hero (Above-the-Fold CR-Check)
6. Budget (zu klein = Algorithmen lernen nicht)
7. Approval-Status (Ad disapproved?)

### Hartes Stop-Loss
- Wenn nach 5 Tagen + EUR 500 Spend pro Kampagne null Leads -> pausieren + root cause
- Wenn Qualified-Rate < 30 % in 48 h und nicht behebbar -> pausieren

### Pacing-Regeln
- Erste 7 Tage: lieber zu vorsichtig skalieren als ueber-skalieren (Lernphasen kaputt machen kostet 1-2 Wochen Recovery)
- Tag 8-14: normalisierte Skalierungs-Sprints (alle 2-3 Tage budget shift)
- Tag 15+: schnellere Iterationen erlaubt, da Daten reichen


## 20. Risikoregister

| # | Risiko | Auswirkung | Fruehindikator | Gegenmassnahme | Owner | Eskalation |
|---|--------|------------|----------------|----------------|-------|------------|
| 1 | Zu wenig Budget | Algorithmen lernen nicht, 1.000er Ziel unerreichbar | Spend < EUR 12k/Wo + plateau bei < 400 Leads | Budget hochfahren oder Ziel revidieren | CEO/Growth | sofort |
| 2 | Schlechte Leadqualitaet | Bearbeiter verbrennen Zeit, Abschlussquote sinkt | Qualified-Rate < 60 % | Form schaerfen, Audience enger, Quality-Filter | Growth | nach 48 h |
| 3 | Rechtlich riskante Claims | Abmahnung, Account-Sperre | Compliance-Audit findet "garantiert" o.ae. | Texte freezen, Legal-Review, Korrektur | Compliance | sofort |
| 4 | Tracking-Luecken | Bid-Algos blind, falsche Decisions | 0 Conv-Events trotz Traffic | GTM/Pixel-Debug, Conv-API checken | Eng-Team | sofort |
| 5 | Langsame Leadbearbeitung | Hot-Leads verpuffen, Beschwerden | Hot-Lead-Response > 30 Min | SLA-Audit, Bearbeiter aufstocken, Auto-Notif | Operations | 24 h |
| 6 | Schwache Landingpage | LP_CR < 5 %, Spend brennt | LP_CR < 6 % konsistent | Hero-AB, Form-Reihenfolge, Speed-Audit | Eng-Team | 48 h |
| 7 | Zu langes Formular | Drop-Off Step 1->2 > 60 % | Funnel-Drop sichtbar | Felder reduzieren, Step 2 optional | Eng-Team | 48 h |
| 8 | Zu schwache Creatives | CTR < 1,5 %, CPC hoch | CTR-Drop nach 3 Tagen | Creative-Refresh, neue Hooks | Creative | 72 h |
| 9 | Zu breite Keywords | Schrott-Traffic | Search-Term-Liste mit irrelevanten Begriffen | Negatives erweitern, Match-Type enger | Growth | 24 h |
| 10 | Fake-Leads | CPL irrefuehrend gut, Qualitaet schlecht | Anstieg Submits mit ungueltigen Telefonnummern | Captcha als Fallback, Honeypot pruefen, IP-Rate | Eng-Team | sofort |
| 11 | Duplicate Leads | Beschwerden, Doppelbearbeitung | duplicate_status-Anteil > 8 % | Dublettencheck strenger, Cooling-Period | Eng-Team | 48 h |
| 12 | DSGVO-Probleme | Bussgeld, Abmahnung | Consent-Audit findet Pixel-Feuern vor Consent | Consent-Mode v2 erzwingen, Audit | Compliance | sofort |
| 13 | Uebertriebene Sparversprechen | UWG-Abmahnung | Text-Audit findet "sparen" / "garantiert" | Texte streichen | Compliance | sofort |
| 14 | Fehlende Beratungskapazitaet | Leads veralten, Conversion-Sturz | Lead-Backlog > 50 in Stage "Neuer Lead" | Personal aufstocken oder Spend drosseln | Operations | 24 h |
| 15 | Vercel-/Infra-Outage | Komplett-Verlust Leads waehrend Spend laeuft | Uptime-Alert | Status-Page-Monitoring, Failover-Plan | Eng-Team | sofort |
| 16 | Konto-Sperren Ads | Spend-Stop, Reputationsverlust | Disapproval-E-Mail | Account-Hygiene, Backup-Account vorbereiten | Growth | sofort |


## 21. To-do-Liste fuer die naechsten 24 Stunden

### Block A: Strategische Entscheidungen (1-2 h)
- [ ] Budget-Szenario entscheiden (A/B/C aus Sektion 3)
- [ ] Beratungskapazitaet pruefen: koennen die 5 Partner 100+ Leads/Tag bedienen?
- [ ] Falls nein: 6./7. Partner anwerben oder Pre-Qualifizierungs-Stufe planen
- [ ] Legal-Owner benennen (UWG/DSGVO-Final-Reviewer)

### Block B: Technisches Fundament (4-6 h)
- [ ] Vercel-Env `NEXT_PUBLIC_SITE_URL=https://www.agienergy.de` setzen (Sitemap-Fix)
- [ ] GTM-Container erstellen, in Layout einbauen (Consent-gegated)
- [ ] GA4 + Meta Pixel + MS UET in GTM einbauen (alle nach Consent)
- [ ] Conversion-API server-side vorbereiten (Meta + Google Enhanced)
- [ ] Event-Schema implementieren (Pflicht-Events Sektion 8) - mind. `page_view`, `form_start`, `form_submit`, `lead_qualified` Tag 1
- [ ] Lead-Scoring-Funktion einbauen (Sektion 10)
- [ ] Honeypot + Rate-Limit + Dublettencheck im Formular

### Block C: Landingpages (4-6 h)
- [ ] Neue Routen anlegen: `/energiepruefung`, `/stromvertrag-pruefen`, `/gasvertrag-pruefen`, `/jahresabrechnung-pruefen`, `/photovoltaik-pruefen`, `/gewerbeenergie-pruefen`, `/anbieterwechsel-pruefen`
- [ ] LP-Template mit Hero + Trustline + Form above the fold
- [ ] FAQ-Schema einbauen (schema.org/FAQPage)
- [ ] Speed-Audit (LCP < 2,5 s, CLS < 0,1)
- [ ] Sitemap aktualisieren (alle neuen Routen)

### Block D: Ads Setup (3-4 h)
- [ ] Google Ads Account-Hygiene: Conversion-Goals, Audience-Manager, Negativ-Listen
- [ ] 5 Search-Kampagnen anlegen (Status: Paused)
- [ ] Microsoft Ads Account anlegen + Import vorbereiten
- [ ] Meta Business Manager: Pixel + Conversion-API, Lead-Forms vorbereiten
- [ ] UTM-Konventionen dokumentieren (Sektion 8)
- [ ] Ad-Copy laut Sektion 12/13 anlegen (jeweils 1 RSA pro Kampagne)

### Block E: Creative (2-3 h)
- [ ] 5 statische Bilder fuer Meta (4:5 + 1:1 + 9:16) - aus Briefing Sektion 13
- [ ] 1 Erklaer-Reel (12-25 s) "Tarifportal vs Pruefung"
- [ ] 1 Reel "Jahresabrechnung verstehen"

### Block F: CRM-Hygiene (1-2 h)
- [ ] Hot-Lead-Notification im Operations Center pruefen
- [ ] SLA-Reminders (15-Min-Regel) implementieren / verifizieren
- [ ] Partner-Auslastung (capacity) auf realistische Zahlen setzen
- [ ] `lead_score` als Spalte / Anzeige in der UI sichtbar

### Block G: Compliance (1 h)
- [ ] Datenschutz-Hinweis-Version pruefen (Stand und Aktualitaet)
- [ ] Consent-Logging-Format validieren (siehe Sektion 8)
- [ ] Impressum + AGB final pruefen
- [ ] Ad-Copy-Freeze: Alle finalen Texte in Sektion 12 + 13 freigeben oder korrigieren

### Block H: Reporting-Skeleton (1 h)
- [ ] Looker-Studio-Dashboard mit Spend / Leads / CPL / Qualified-Rate aufsetzen
- [ ] Slack-Channel `#agi-growth-warroom` mit Notfall-Triggern (Sektion 17)

---

## Anhang: Zugehoerige Implementierungsanker im Repo

- Storage / Schema: `packages/storage/src/postgresAdapter.ts`, `packages/storage/src/postgresSchema.sql`
- Lead-Routing: `apps/web/lib/agi/routing.ts`
- Lead-Mutations: `apps/web/app/actions/leadMutations.ts`
- Bestehende Landingpages: `apps/web/app/{stromkosten-senken,gaskosten-senken,photovoltaik-beratung,gewerbe-energiecheck,energieberatung-deutschland,energiecheck}/page.tsx`
- Neue Intent-Landingpages (No-Spend SEO): `apps/web/app/{jahresabrechnung-pruefen,stromvertrag-pruefen,gasvertrag-pruefen,anbieterwechsel-pruefen}/page.tsx`
- SEO-Schemas (Organization, Service, FAQ, Breadcrumb): `apps/web/lib/seoSchemas.ts`
- Sitemap: `apps/web/app/sitemap.ts` (Site-URL haerter verankert auf agienergy.de)
- Robots: `apps/web/app/robots.ts`
- Consent-Modal: `apps/web/components/landing/ConsentBanner.tsx`
- Operations Center: `apps/web/app/admin/(authed)/*`

---

## Anhang B: No-Spend-Modus - Realistischer Pfad ohne Werbebudget

> Stand der Entscheidung: kein Werbebudget verfuegbar. Dieser Anhang ueberschreibt die Budget-Annahmen aus Abschnitt 1-3.

### B1. Ehrliche Korrektur der Zielgroesse

**1.000 Leads/Woche sind ohne Paid-Spend nicht in absehbarer Zeit erreichbar.** Wer das verspricht, luegt.

Realistischer Korridor ohne Werbebudget:

| Zeitraum | Erwartung qualifizierter Leads/Woche | Voraussetzungen |
|---|---|---|
| Woche 1-2 | 5-20 | LP-Hygiene, Google Search Console, GMB-Eintrag, 5 Partner-Posts/Woche, klassischer Direkt-Traffic + Mund-zu-Mund |
| Woche 3-4 | 15-40 | Erste organische Indexierung greift, 4 neue Intent-LPs ranken auf Long-Tail, Partner-Empfehlungen laufen an |
| Monat 2 | 40-120 | Topical Authority sichtbar, FAQ-Rich-Snippets in den SERPs, 2-3 Partnerschaften aktiv |
| Monat 3 | 80-200 | SEO-Hauptkurve greift, Newsletter-Liste auf ~500-1.500, Empfehlungsschleife aktiv |
| Monat 4-6 | 150-400 | Marken-Suchvolumen waechst, Bestandskunden-Empfehlungen werden zur staerksten Quelle |

**Wann waeren ueberhaupt 500-1.000 Leads/Woche ohne Spend denkbar?** Frueheste sinnvolle Annahme: Monat 8-12, *und nur* mit konsistent veroeffentlichten Inhalten (mind. 2 Artikel/Woche), aktivem Partnernetz (10+ Partner), Lokalpresse-Erwaehnungen und systematischer Bestandskunden-Aktivierung. Vorher ist es nicht serioes.

### B2. Was im Code bereits gebaut wurde (No-Spend-relevant)

- **4 neue SEO-Intent-LPs** mit Service-Schema und FAQ-Schema:
  - `/jahresabrechnung-pruefen` - hochintentes Volumen, Saisonpeak Q1
  - `/stromvertrag-pruefen` - Vertragspruefungs-Intent
  - `/gasvertrag-pruefen` - Vertragspruefungs-Intent
  - `/anbieterwechsel-pruefen` - Wechsel-Intent
- **Bestehende Topic-LPs** mit Canonical + Service-Schema nachgeruestet (Strom, Gas, PV, Gewerbe, Energiecheck).
- **301-Redirects** fuer Synonym-URLs (`/energiepruefung`, `/photovoltaik-pruefen`, `/gewerbeenergie-pruefen`) - vermeidet Duplicate-Content, buendelt Ranking-Signal.
- **Globales Organization + WebSite JSON-LD** im Root-Layout - Voraussetzung fuer Sitelinks und Knowledge-Panel.
- **OpenGraph + Twitter-Card-Defaults** - jeder Share wirkt sauber, ohne dass jemand etwas tun muss.
- **Sitemap auf Default-URL `https://www.agienergy.de` haerter verankert** - Search-Console-Problem (vorher `localhost`) ist auch ohne Vercel-Env gefixt.
- **Footer-Block "Schnellprüfung"** verlinkt die 4 neuen LPs sitewide - massiver Internal-Linking-Effekt.

### B3. Was der Inhaber/Betreiber manuell tun muss (kein Code, je 30-60 Min)

| Aktion | Aufwand | Wirkung |
|---|---:|---|
| Google Search Console: Property fuer `https://www.agienergy.de` anlegen, Sitemap einreichen | 20 Min | Indexierung, Ranking-Diagnose |
| Google Business Profile (kostenlos) fuer AGI Energy anlegen, Region/Branche/Beschreibung pflegen | 30 Min | Local-Pack-Sichtbarkeit, Brand-Treffer |
| Bing Webmaster Tools: Property anlegen, Sitemap einreichen | 10 Min | ~6-10 % zusaetzlicher organischer Traffic |
| LinkedIn Unternehmensseite mit klarer Positionierung + 1 Post/Woche (Owner persoenlich) | 30 Min Setup + 15 Min/Woche | B2B-Trust, organische Reichweite ohne Spend |
| Bestandskunden-Empfehlungs-E-Mail: 1x raus, persoenlich formuliert, 1 Frage: "Wer in deinem Umfeld haette gerade eine Strom-/Gasabrechnung, die wir pruefen sollen?" | 60 Min | Konvertiert deutlich besser als jede Anzeige |
| 3-5 lokale Multiplikatoren ansprechen (Steuerberater, Handwerker, Wohnungsverwalter): "Wir pruefen kostenlos die Energieabrechnung euerer Kunden, wenn ihr es weiterempfehlt" | 1-2 h | Klassische Empfehlungspartnerschaft, nachhaltigste Lead-Quelle |
| Eine Pressemeldung an 5-10 Regionalmedien (Idee: "Was Verbraucher bei der Jahresabrechnung uebersehen") | 2-3 h | 1-2 redaktionelle Erwaehnungen reichen fuer Authority + organischen Traffic |

### B4. Konkrete No-Spend-Wochenroutine (realistisch, durchhaltbar)

**Montag (60 Min):**
- 1 LinkedIn-Post (Mini-Case: "Wir haben heute bei Familie X einen Abschlag um 22 % reduziert - hier ist, was wir geprueft haben")
- Kurzer Check Search Console (Klicks, Impressionen)

**Dienstag (45 Min):**
- 1 kurzer Blog-/Ratgeber-Artikel (200-400 Wo., einfach gehalten) zu einem Long-Tail-Thema. Ziele: "Stromabrechnung Nachzahlung Begruendung pruefen", "Gasanbieterwechsel sinnvoll 2026", "Photovoltaik Eigenheim Wirtschaftlichkeit Berechnung".
- Im Footer verlinken oder als Beitrag in neuer Route `/ratgeber/[slug]` (kann spaeter ergaenzt werden).

**Mittwoch (30 Min):**
- 1 Multiplikator ansprechen (Steuerberater/Verwalter/Handwerker per E-Mail oder LinkedIn).

**Donnerstag (45 Min):**
- 1 Empfehlungs-Bitte an 2-3 zufriedene Bestandskunden, persoenlich.

**Freitag (30 Min):**
- KPI-Stand: Wieviele Leads kamen, woher? Welche Suchbegriffe in der Console wachsen? Was hat funktioniert?

**Wochenende:** Ruhe. Burnout-Schutz. Lead-Bearbeitung am Montag mit klarem Kopf.

### B5. KPI fuer No-Spend (anders als die Paid-KPIs in Abschnitt 16)

| KPI | Ziel Monat 1 | Ziel Monat 3 | Ziel Monat 6 |
|---|---:|---:|---:|
| Organische Klicks/Tag (GSC) | 5-15 | 30-60 | 80-200 |
| Indexierte Seiten | 10-15 | 25-40 | 50-100 |
| Backlinks (organisch + Partner) | 3-8 | 15-30 | 40-80 |
| Empfehlungsleads/Woche | 1-3 | 5-10 | 15-30 |
| Conversion-Rate LP -> Lead | 3-5 % | 5-8 % | 7-12 % |
| Bearbeitungs-Reaktionszeit (Stunden) | <4 | <2 | <1 |

### B6. Was du NICHT tun solltest, weil es Substanz kostet

- Massen-Outreach ohne Doppel-Opt-In (UWG-Risiko, Spam-Reputation).
- Gekaufte Backlinks (Google-Penalty-Risiko, Geldverbrennung).
- Lead-Listen kaufen (rechtlich heikel, Conversion bei <0,5 %).
- Aggressive "Garantiert Sparen"-Headlines (UWG, Vertrauensschaden).
- Push-Notifications, Pop-ups, Exit-Intent-Modals - schreckt Premium-Zielgruppe ab.

### B7. Bedingung fuer den naechsten Schritt

Sobald die organische Pipeline stabil **30-60 Leads/Woche** liefert UND die Bearbeitung in <2 h Reaktionszeit laeuft, lohnt sich der Einstieg in kleinen, kontrollierten Paid-Spend (Abschnitt 3, Szenario C). Vorher ist Werbebudget verschwendetes Geld, weil das Bottleneck im Funnel und in der Bearbeitung sitzt, nicht im Traffic.

**Klar formuliert:** Ohne Paid-Spend ist 1.000 Leads/Woche kein realistisches Quartalsziel. Was realistisch ist: ein gesundes, organisches Fundament, das in 4-6 Monaten 150-400 Leads/Woche liefert - das sind 8.000-20.000 qualifizierte Leads im Jahr, ohne einen Euro Werbung. Damit kann man arbeiten.



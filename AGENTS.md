# Antigravity Project Richtlijnen & UI Voorkeuren - Peter Vroon ComStudio

Deze richtlijnen gelden voor alle aanpassingen en uitbreidingen in deze repository.

## 1. UI & Design Standaard: "Smooth, Donker & Nooit Lomp of Wit Vierkant"
- **Geen grote witte of vierkante blokken:** Gebruik nooit standaard witte vierkante tooltips, popups of lompe kaders.
- **Altijd "smooth" en afgerond:**
  - Badges, labels en tooltips hebben altijd afgeronde pil-vormen (`border-radius: 999px` of subtiel afgeronde hoeken `12px - 16px`).
  - Gebruik donkere glas-esthetiek (glassmorphism met `rgba(9, 14, 26, 0.88)` tot `0.94`, `backdrop-filter: blur(16px)`, subtiele neon borders `rgba(0, 242, 254, 0.35)`).
- **Smartphone-optimalisatie:**
  - Op mobiel (schermen $\le$ 680px) moeten labels en knoppen compact, strak en subtiel zijn (`0.64rem - 0.72rem`).
  - Vaste elementen moeten vloeiend meeschalen zonder overflow of afsnijding.

## 2. Bedieningsfilosofie: "Voorkant Eerst"
- **Altijd starten met de Voorkant (het Overzicht):** De app start bij het openen altijd direct met het overzicht van alle uitluisterkanalen (frequenties, scannerkanalen, apparaten). De gebruiker ziet nooit direct een technische achterkant of een leeg scherm.
- **Laatste kanaal onthouden:** Het laatst beluisterde kanaal staat bij herstart altijd direct bovenaan op positie 1 met een gouden `🕒 Laatst Geluisterd` badge.
- **Zwevende Mini-HUD:** Blijf op het overzicht navigeren terwijl onderin een zwevende mini-speler de actuele frequentie, audio en squelch bedient.

## 3. Helpfile & Documentatie Standaard
- Direct toegankelijke Help-modal (`💡 Help`) met dynamische functielijst gesynchroniseerd via `version.json` en `build.py` met de `✓ Altijd Actueel` badge.

## 4. Deployment & GitHub Online Standaard: Alleen Online via GitHub
- **Niet lokaal, alleen online via GitHub Pages:** Alle updates worden direct vastgelegd in Git en gepusht naar de `main` branch op GitHub (`https://petervroon-tech.github.io/comstudio/`), waarna GitHub Actions CI/CD de nieuwste versie direct live zet.
- **Automatische live update:** Apps controleren via `version.json` periodiek of er online een nieuwere build beschikbaar is en verversen direct met 1 klik.

## 5. Mobile/Tablet Conventies & UX Standaard ("KISS")
- **Mobile-friendly single-focus intent:** Eenvoudig, doelgericht en zonder overbodige desktop-complexiteit ("Keep it Simple and Sweet - KISS").
- **Directe Feedback op Knoppen/Acties (Click/Tick):** Informeer de gebruiker direct over status (gelukt, fout, aantal geladen kanalen/berichten).
- **Leesbaarheid & Makkelijke Scroll:** Knoppen en teksten geheel leesbaar zonder afkapping; vloeiende touch-scroll (`-webkit-overflow-scrolling: touch`).
- **Datavalidatie & Bronvermelding:** Maak in de UI altijd inzichtelijk waar audio, positie- of telemetriedata vandaan komt (bv. ProRail GSM-R, Kustwacht VHF, LiveATC, etc.).

## 6. Audio Standaard: Uitsluitend Echte Menselijke Stemmen, 0% Computerstemmen
- **Geen computerstemmen:** Gebruik NOOIT synthetische computerstemmen (geen Web Speech API / SpeechSynthesis).
- **100% Echte Stemmen & Live Feeds:** Alle audio is afkomstig van authentieke radio-opnames, live scanner feeds en echte menselijke communicatiestromen. Elk kanaal speelt direct echte menselijke zend- en luistergesprekken af.


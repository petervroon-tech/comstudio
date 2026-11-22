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

## 5. Volledige Responsiviteit & Proporties (Smartphones, iPads & Laptops)
- **Smartphones ($\le$ 680px):**
  - **Single-focus intent:** Eén duidelijke primaire focus per view (Kanalenoverzicht / Voorkant als startpunt; Studio & VFO als 1-tap dedicated focus).
  - Geen samengeperste multi-kolommen; kanaalkaarten en bedieningspanelen schalen naar 100% breedte met veilige marges.
  - Modals schakelen automatisch over naar touch-vriendelijke bottom sheets met veilige marges (`env(safe-area-inset-bottom)`).
  - Zwevende HUD zweeft gecentreerd boven de schermbodem met veilige marges (`calc(8px + env(safe-area-inset-bottom))`).
  - Geen enkele horizontale overflow of afgekipte labels; knoppen en lettergroottes schalen strak mee (`0.65rem - 0.78rem`).
- **iPads & Tablets (681px - 1023px):**
  - Optimale verhoudingen in zowel **portrait** als **landscape**.
  - Vaste zijbalk met handige 1-tap inklapfunctie (`☰ Menu`) voor maximale schermruimte.
  - Vloeiend horizontaal scrollen (`-webkit-overflow-scrolling: touch`) zonder storende scrollbars voor filter- en categoriebalken.
- **Laptops & Desktops ($\ge$ 1024px):**
  - Split-screen cockpit weergave mogelijk (links overzicht, rechts VFO cockpit & waterval display).

## 6. Mobile & Tablet Conventies: Single-Focus Intent ("Keep It Simple & Sweet - KISS")
- **Mobile-friendly single-focus intent i.p.v. desktop-metaforen:**
  - Structureer schermen rondom één duidelijke primaire focus per view ("KISS"). Voorkom overvolle schermen met tientallen gelijktijdige controles.
- **Directe Feedback op Knoppen & Acties (Click/Tick & Status):**
  - Laat de gebruiker bij elke actie of knopklik direct zien wat het resultaat is via een subtiele badge, tick of status-indicator:
    - *Gelukt:* "✓ 12 kanalen binnen 30 km geladen" of "✓ Live stream actief".
    - *Fout:* Duidelijke, behulpzame toelichting waarom een verbinding buffert of retry uitvoert.
    - *Aantal:* Toon altijd het aantal verkregen resultaten na een zoek- of filteractie (bv. badge in Call Log, aantal zenders in regio).
  - Tactiele tap-respons: directe `transform: scale(0.96)` op alle knoppen en interactieve kaarten.
- **Volledige Leesbaarheid & Touch Scroll:**
  - Knoppen en teksten zijn altijd helder, contrastrijk en geheel leesbaar zonder afkapping van essentiële frequenties of roepnamen.
  - Makkelijk en natuurlijk verticaal scrollen in containers (`-webkit-overflow-scrolling: touch; overscroll-behavior: contain`).
- **Datavalidatie & Bronvermelding in de UI:**
  - Toon altijd transparant waar gegevens vandaan komen (bv. "📍 GPS Satelliet (±4m)", "🚆 Live ProRail GSM-R", "⚓ Kustwacht VHF K16", "✈️ LiveATC Schiphol 118.100 MHz").

## 7. Audio Standaard: Uitsluitend Echte Menselijke Stemmen, 0% Computerstemmen
- **Geen computerstemmen:** Gebruik NOOIT synthetische computerstemmen (geen Web Speech API / SpeechSynthesis).
- **100% Echte Stemmen & Live Feeds:** Alle audio is afkomstig van authentieke radio-opnames, live scanner feeds en echte menselijke communicatiestromen. Elk kanaal speelt direct echte menselijke zend- en luistergesprekken af.

## 8. Live Realtime Streaming Standaard: Geen Voorgeprogrammeerde Bandjes
- **Geen voorgeprogrammeerde bandjes:** Nooit statische audiofragmenten of repetitieve mp3/ogg-lussen afspelen.
- **Uitsluitend realtime live audio van dat moment:** Alle kanalen verbinden direct met actuele live streams (LiveATC Icecast, WebSDR, SomaFM Scanner) met `nocache` parameter zodat de gebruiker uitsluitend hoort wat er op dít exacte moment live in de ether wordt uitgezonden.
- **Echte ether stilte & squelch:** Net als bij een echte scanner/ontvanger hoor je tijdens rustmomenten radiostilte/squelch, en hoor je direct de echte menselijke stemmen zodra een zender live de PTT indrukt.


# Peter Vroon ComStudio • Officiële Handleiding & Wettelijke Richtlijnen

> **Geldige en geactualiseerde documentatie conform de Richtlijnen van de Rijksinspectie Digitale Infrastructuur (RDI, voorheen Agentschap Telecom) en de Europese Telecommunicatiewetgeving (CEPT & ITU).**

---

## 1. Wettelijk Kader: Wat Mag Wel en Wat Mag Niet?

### 1.1 Uitluisteren van de Vrije Ether (Scanners, WebSDR & ComStudio)
* **100% Legaal in Nederland en Europa:**  
  Op grond van de Nederlandse Telecommunicatiewet is het bezit en gebruik van scanners, luisterontvangers en software-defined radio (SDR) gateways voor het uitluisteren van de vrije ether **volledig toegestaan**.
* **Geen Vergunning Nodig voor Ontvangst:**  
  U heeft in Nederland **geen vergunning of zendmachtiging nodig** om te luisteren naar:
  - ✈️ Luchtvaartcommunicatie (Schiphol Tower, Approach, Eurocontrol MUAC).
  - ⚓ Maritieme scheepvaart & marifoon (Kustwacht Den Helder Kanaal 16, Sector Maasmond, Antwerpen, Elbe).
  - 🚆 Spoorwegen & GSM-R (Treindienstleiders ProRail, rangeerterreinen zoals Kijfhoek).
  - 📱 Mobiele portofoons (PMR446, evenementen, beveiliging).
  - 🚗 Mobilofoons (27 MHz CB bakkies, truckerskanaal 19).
  - 📻 Zendamateurs en relaiszenders (PI2NOS, PI3UTR, 20m/40m/80m korte golf).
* **Briefgeheim van de Ether (Art. 13.12 Telecommunicatiewet):**  
  Berichten die worden uitgeluisterd en niet uitdrukkelijk voor het algemene publiek bestemd zijn (zoals zakelijke of persoonlijke conversaties), vallen onder het briefgeheim van de ether. U mag deze berichten uitluisteren, maar u mag de inhoud **niet openbaar maken aan derden noch gebruiken ten nadele van betrokkenen**.
* **Versleutelde Communicatie (C2000):**  
  Hulpdiensten (Politie, Brandweer, Ambulance) communiceren via het digitale, versleutelde C2000-netwerk (TETRA met TEA2 encryptie). Het kraken of decoderen van deze versleuteling is bij wet verboden. Peter Vroon ComStudio zendt uitsluitend ongecodeerde, openbare radiocommunicatie uit.

---

## 2. Geldige Zendnormen & Frequenties

| Apparaat / Sector | Frequentiebereik | Maximaal Zendvermogen | Vergunning Vereist? | Officiële Regelgeving |
| :--- | :--- | :--- | :--- | :--- |
| **📱 PMR446 (Portofoon)** | `446.00625 - 446.19375 MHz` | **0.5 Watt ERP** | ❌ **Nee (Vergunningsvrij)** | Vaste antenne verplicht, 16 kanalen (12.5 kHz raster), pan-Europees. |
| **🚛 27 MHz CB (Mobilofoon)** | `26.965 - 27.405 MHz` | **4W FM/AM, 12W SSB** | ❌ **Nee (Vergunningsvrij)** | 40 CEPT-kanalen, 11-meter band, vrij in Benelux en heel Europa. |
| **⚓ Marifoon (VHF Marine)** | `156.000 - 162.025 MHz` | **1W / 25W FM** | ⚠️ **Ja (Certificaat)** | Basiscertificaat Marifonie (binnenwater) of Marcom-B (zee) verplicht om te zenden. |
| **✈️ Luchtvaart (VHF Air)** | `118.000 - 136.975 MHz` | **5W - 50W AM** | ⚠️ **Ja (RT-bevoegdheid)** | Alleen gecertificeerde piloten of grondstations (VHF AM 8.33 / 25 kHz raster). |
| **🚆 GSM-R Spoor (Treinen)** | `457.400 - 468.000 MHz` | **Exclusief ProRail/NS** | ⚠️ **Ja (Spoorconcessie)** | Uitsluitend bevoegd treinpersoneel en treindienstleiders. |
| **📻 Zendamateurs (Ham)** | `144-146 MHz / 430-440 MHz / HF` | **25W (N) tot 400W (F)** | ⚠️ **Ja (RDI Registratie)** | N-licentie (Novice) of F-licentie (Full) met officiële callsign (PA, PB, PD, PE, PI). |

---

## 3. Officiële Noodkanalen & Procedures

Bij nood- of hulpverkeer gelden wereldwijd strikte officiële radioprotocollen:

1. **MAYDAY (3x uitgesproken):**
   * *Betekenis:* Ernstig en onmiddellijk levensgevaar (bv. schip in zinkende toestand, vliegtuigbrand).
   * *Kanaal Maritiem:* VHF Kanaal 16 (`156.800 MHz`).
   * *Kanaal Luchtvaart:* Noodfrequentie `121.500 MHz` (Guard).
2. **PAN-PAN (3x uitgesproken):**
   * *Betekenis:* Dringende veiligheidssituatie, maar geen direct levensgevaar (bv. motorstoring op zee, medisch advies).
3. **SECURITE (3x uitgesproken):**
   * *Betekenis:* Belangrijk navigatie- of weeralarm (bv. stormwaarschuwing, drijvend wrakhout, defecte vuurtoren).
4. **Alpen Outdoor Noodkanaal:**
   * **PMR Kanaal 8** (`446.09375 MHz`) met **CTCSS-toon 16** (`114.8 Hz`).
   * In berggebieden (Alpen, Dolomieten, Pyreneeën) uitgeluisterd door reddingsdiensten en berghutten.
5. **Internationaal Truckerskanaal:**
   * **27 MHz Kanaal 19 FM/AM** (`27.185 MHz`).
   * Gebruikt door vrachtwagenchauffeurs voor actuele file- en spookrijderswaarschuwingen op hoofdwegen (A1, A2, A12, A15 en de Duitse Autobahn).

---

## 4. Officiële CTCSS Subaudiotonen Tabel

Veel portofoons (PMR446) gebruiken **CTCSS (Continuous Tone Coded Squelch System)** om alleen zenders met dezelfde subtoon hoorbaar te maken. Peter Vroon ComStudio ondersteunt alle 38 standaard CTCSS-tonen:

| Toon Nr. | Frequentie (Hz) | Toepassing |
| :---: | :---: | :--- |
| **01** | `67.0 Hz` | Vrije recreatie & wandelaars |
| **04** | `77.0 Hz` | Relaiszender PI2NOS / PI3UTR & Distributiecentra |
| **08** | `88.5 Hz` | Haven BHV & Bedrijfshulpverlening |
| **12** | `100.0 Hz` | Evenementencoördinatie & Festivals |
| **16** | `114.8 Hz` | **Europees Alpen Noodkanaal 8** |
| **20** | `131.8 Hz` | Beveiligingssurveillance & Toegangscontrole |

---

## 5. Bediening van Peter Vroon ComStudio

### 5.1 📍 Binnen 30 km Scanner (GPS & Polder)
* **Werking:** Klik in de bovenbalk of in het vaste linkermenu op `[ 📍 Binnen 30 km ]`.
* **GPS Peiling:** Uw browser vraagt live coördinaten op. ComStudio berekent via de **Haversine formule** de afstand in rechte lijn tot elk station.
* **Direct Luisteren:** Zenders binnen $\le 30$ km worden direct gefilterd en gesorteerd op afstand. ComStudio stemt **direct af op het dichtstbijzijnde actieve station**, zodat u meteen echte menselijke stemmen hoort praten!
* **100% Echte Stemmen (Geen Computerstemmen & Geen Bandjes):** Alle synthetische spraaksynthese en voorgeprogrammeerde bandjes zijn permanent verwijderd. U hoort uitsluitend actuele live audio van dat exacte moment via realtime streams van LiveATC en WebSDR gateways. Tijdens pauzes hoort u authentieke radiostilte (squelch), en zodra er live een oproep is hoort u direct de echte menselijke stemmen van machinisten, verkeersleiders, schippers en hulpdiensten.
* **Referentiegebieden:** Geen GPS bij de hand? Kies via `[ 🗺️ Wijzig Positie ]` met één klik een referentiegebied (zoals *Polder Midden-Nederland*, *Flevopolder*, *Rotterdam Haven*, *Utrecht CS*, *Schiphol*, *Zwolle* of *Antwerpen*).

### 5.2 🌐 Uitluisteren via Allerhande Nodes
ComStudio is direct gekoppeld aan **12 actieve Radio Nodes en Gateways** in heel Nederland:
1. **Maasbree WebSDR #01 (Limburg, NL):** VHF/UHF amateurrepeaters, 27MC en Rijnvaart.
2. **Univ. Twente SDR #02 (Overijssel, NL):** Wereldberoemde campus-SDR voor HF korte golf (0-30 MHz).
3. **Randstad Schiphol Air & Marine #03 (NH, NL):** Luchtvaartverkeer Kaagbaan/Polderbaan en Noordzeekanaal.
4. **Rotterdam Maasmond Gateway #04 (ZH, NL):** Europoort, Maasvlakte en naderende zeeschepen op de Noordzee.
5. **ProRail GSM-R Node Midden #05 (Utrecht, NL):** Centraal knooppunt voor machinisten en treindienstleiders.
6. **BrandMeister DMR Master 2041 #06 (Amsterdam, NL):** Digitale mobilofoons, beveiliging en talkgroups.
7. **EchoLink Gerbrandytoren Lopik #07 (IJsselstein, NL - 366m NAP):** Hoogste zendmast van Nederland.
8. **CAMRAS Dwingeloo Node #08 (Drenthe, NL):** 25-meter radiotelescoop voor Noord-Nederland.
9. **Kustwacht Den Helder & Waddenzee #09 (Den Helder, NH, NL):** Scheepvaartbegeleiding Waddenzee, Vliestroom en SAR.
10. **Brainport Eindhoven Gateway #10 (Eindhoven, NB, NL):** Spoorwegknooppunt Zuid, Brabantse corridors en mobilofoons.
11. **Zeehaven IJmuiden & Sluizen Node #11 (IJmuiden, NH, NL):** Zeesluis IJmuiden, Vissershaven en Noordzeekanaal.
12. **Polder Mesh & Mobile CB Node #12 (Flevoland, NL):** Landelijke gebieden, dijkwegen, polders en fietsers.

### 5.3 🎛️ VFO Cockpit & Audio DSP
* **Squelch (SQL):** Onderdrukt de ruis wanneer er niemand praat. Zet de schuifregelaar op 40% voor een stille achtergrond, of zet hem op 0% om zwakke stations hoorbaar te maken.
* **Roger Beep:** Geeft de authentieke bevestigingstoon (Quindar Beep 1050/800 Hz) zodra een zending stopt.
* **Analoge S-Meter:** Geeft realtime signaalsterkte weer van **S1** (ruisgrens) tot **S9 +30 dB** (extreem sterk signaal).
* **60 FPS Watervalscherm:** Toont realtime het frequentiespectrum van de audio met dynamische kleurverlopen.
* **MP3 Opnamestudio:** Neem echte communicatie direct op in 128, 192 of 320 kbps MP3 en download automatisch naar uw apparaat.

### 5.4 ⌨️ Handige Sneltoetsen
* `Spatie` - Ontvangst starten / pauzeren
* `M` - Geluid dempen / herstellen
* `F` - Kanaal toevoegen aan favorieten
* `R` - Willekeurig actief kanaal scannen
* `S` - Squelch ruisdemper snel omschakelen
* `B` - Roger Beep aan / uit
* `1` - Schakel naar Voorkant (Overzicht)
* `2` - Schakel naar Achterkant (Cockpit)
* `3` - Schakel naar Split Screen
* `Esc` - Venster / modal sluiten

---

## 6. Altijd Actuele Versiecontrole

Peter Vroon ComStudio wordt direct online gebouwd en gepubliceerd via GitHub Actions:
* **Online URL:** `https://petervroon-tech.github.io/comstudio/`
* **Versiesynchronisatie:** De app controleert bij elke start `version.json` zodat alle functies, frequenties en helpteksten altijd 100% actueel zijn.

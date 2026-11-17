/**
 * Peter Vroon Uitluisteren • app.js
 * Live Radio Scanner, Portofoon, Mobilofoon & Zendontvanger Platform
 * Ontworpen conform AGENTS.md & app_architectuur_en_bediening_gids.md
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. KANALEN DATABANK (24 Realistische Kanalen over 4 Apparaatgroepen)
  // ==========================================================================
  const CHANNELS = [
    // --- 📡 SCANNERS (Luchtvaart & Maritiem) ---
    {
      id: 'air_eham_twr',
      name: 'Schiphol Toren (EHAM Tower)',
      freq: '119.225',
      freqDisplay: '119.225.00',
      category: 'scanner',
      band: 'air',
      mod: 'AM',
      callsign: 'EHAM TWR',
      location: 'Amsterdam Airport Schiphol',
      desc: 'Verkeersleiding Start- & Landingsbanen (Kaagbaan & Polderbaan)',
      ctcss: 'CSQ',
      deviceIcon: '📡',
      streamUrl: 'https://audio.broadcastify.com/live',
      chatter: [
        'KLM 1243, wind 240 degrees at 12 knots, runway 24 cleared to land.',
        'Speedbird 438, turn right next taxiway, contact ground on 121.800.',
        'Delta 47 heavy, wind 230 at 14 knots, runway 24, line up and wait.',
        'Transavia 612, hold short of runway 18L, cross after Boeing 737.'
      ]
    },
    {
      id: 'air_eham_app',
      name: 'Schiphol Approach (Inbound Radar)',
      freq: '121.200',
      freqDisplay: '121.200.00',
      category: 'scanner',
      band: 'air',
      mod: 'AM',
      callsign: 'EHAM APP',
      location: 'Schiphol Radar TMA',
      desc: 'Naderingsverkeersleiding & daalinstructies voor inkomende vluchten',
      ctcss: 'CSQ',
      deviceIcon: '📡',
      streamUrl: '',
      chatter: [
        'Lufthansa 986, descend to altitude 3000 feet, QNH 1018, heading 210.',
        'EasyJet 7821, reduce speed to 210 knots, intercept localizer 18R.',
        'Air France 1340, report established on ILS runway 24.'
      ]
    },
    {
      id: 'air_ehrd_twr',
      name: 'Rotterdam The Hague Toren (EHRD)',
      freq: '118.200',
      freqDisplay: '118.200.00',
      category: 'scanner',
      band: 'air',
      mod: 'AM',
      callsign: 'EHRD TWR',
      location: 'Rotterdam The Hague Airport',
      desc: 'Plaatselijke verkeersleiding Zestienhoven Runway 24/06',
      ctcss: 'CSQ',
      deviceIcon: '📡',
      streamUrl: '',
      chatter: [
        'Rotterdam Tower, PH-TFD, ready for departure runway 24.',
        'PH-TFD, wind 220 9 knots, runway 24 cleared for takeoff, right turn out.'
      ]
    },
    {
      id: 'mar_k16',
      name: 'Kustwacht Marifoon Kanaal 16 (Nood & Oproep)',
      freq: '156.800',
      freqDisplay: '156.800.00',
      category: 'scanner',
      band: 'marine',
      mod: 'FM',
      callsign: 'PBK / KUSTWACHT',
      location: 'Nederlandse Kustlijn & Noordzee',
      desc: 'Internationaal marifoonkanaal voor nood-, spoed- en veiligheidsverkeer',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: '',
      chatter: [
        'Hier het Kustwachtcentrum Den Helder voor alle schepen. Weerbericht Noordzee...',
        'Securite, Securite, Securite. Navigatie waarschuwing 244, drijvend wrakhout nabij Texel.',
        'Pan-Pan, Pan-Pan, Pan-Pan. Zeiljacht Albatros meldt motorstoring nabij Maasvlakte.'
      ]
    },
    {
      id: 'mar_maasmond_k01',
      name: 'Sector Maasmond (Havenbedrijf Rotterdam)',
      freq: '156.050',
      freqDisplay: '156.050.00',
      category: 'scanner',
      band: 'marine',
      mod: 'FM',
      callsign: 'SECTOR MAASMOND',
      location: 'Rotterdam Havenmonding',
      desc: 'Verkeersbegeleiding binnenlopende zeeschepen en loodsboten',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: '',
      chatter: [
        'Maasmond, hier containerschip Ever Given, positie boei 3, loods aan boord.',
        'Ever Given, goedgekeurd, doorvaren naar Calandkanaal, tegenverkeer Smit Denemarken.'
      ]
    },
    {
      id: 'mar_adam_k14',
      name: 'Amsterdam Havendienst (Sector Centraal)',
      freq: '156.700',
      freqDisplay: '156.700.00',
      category: 'scanner',
      band: 'marine',
      mod: 'FM',
      callsign: 'HAVENDIENST 14',
      location: 'Noordzeekanaal & IJ Amsterdam',
      desc: 'Binnenvaart en rondvaart coördinatie IJ, Oranjesluizen & Houthavens',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: '',
      chatter: [
        'Havendienst Amsterdam voor motorschip Rijnstroom, u kunt schutten in de middenkolk.',
        'Rondvaartboot Lovers 4, passeert Centraal Station oostwaarts.'
      ]
    },

    // --- 📱 PORTOFOONS (PMR446, Beveiliging & BHV) ---
    {
      id: 'pmr_ch1',
      name: 'PMR446 Kanaal 1 (Algemeen / Recreatie)',
      freq: '446.00625',
      freqDisplay: '446.006.25',
      category: 'portofoon',
      band: 'pmr',
      mod: 'FM',
      callsign: 'PMR-CH01',
      location: 'Landelijk Vergunningsvrij',
      desc: 'Draagbare portofoons, buitensport, magazijn & familiecontact (0.5W ERP)',
      ctcss: '67.0 Hz (Tone 01)',
      deviceIcon: '📱',
      streamUrl: '',
      chatter: [
        'Post 1 voor Post 3, kom er maar in. Alles rustig bij de noordingang.',
        'Begrepen Post 1, we lopen nu ronde langs het achterterrein. Over.',
        'Roger, luisterkanaal blijft 1, batterij 90 procent.'
      ]
    },
    {
      id: 'pmr_ch2_event',
      name: 'PMR446 Kanaal 2 (Evenementencoördinatie)',
      freq: '446.01875',
      freqDisplay: '446.018.75',
      category: 'portofoon',
      band: 'pmr',
      mod: 'FM',
      callsign: 'EVENT-PORT',
      location: 'Festivalterrein & Beurshallen',
      desc: 'Portofoonnetwerk voor crew, podia en publiekstromen',
      ctcss: '100.0 Hz (Tone 12)',
      deviceIcon: '📱',
      streamUrl: '',
      chatter: [
        'Podium B voor Hoofdregie, artiest staat gereed voor soundcheck.',
        'Regie begrepen, microfoons staan open, lichtshow start over 2 minuten.'
      ]
    },
    {
      id: 'pmr_ch4_security',
      name: 'PMR446 Kanaal 4 (Bedrijfsbeveiliging & Surveillance)',
      freq: '446.04375',
      freqDisplay: '446.043.75',
      category: 'portofoon',
      band: 'pmr',
      mod: 'FM',
      callsign: 'SURV-04',
      location: 'Bedrijventerrein & Winkelcentrum',
      desc: 'Beveiligingssurveillance, sluitrondes en alarmopvolging',
      ctcss: '131.8 Hz (Tone 20)',
      deviceIcon: '📱',
      streamUrl: '',
      chatter: [
        'Surveillance 2 voor Meldkamer, controle parkeergarage afgerond, geen bijzonderheden.',
        'Meldkamer ontvangt, sluitronde hoofdgebouw kan gestart worden. Over.'
      ]
    },
    {
      id: 'pmr_ch8_sos',
      name: 'PMR446 Kanaal 8 (Noodkanaal & Outdoor Bergredding)',
      freq: '446.09375',
      freqDisplay: '446.093.75',
      category: 'portofoon',
      band: 'pmr',
      mod: 'FM',
      callsign: 'SOS-OUTDOOR',
      location: 'Outdoor & Bergsport Noodoproep',
      desc: 'Standaard nood- en oproepkanaal PMR (Kanaal 8 CTCSS 16 = 114.8 Hz)',
      ctcss: '114.8 Hz (Tone 16)',
      deviceIcon: '📱',
      streamUrl: '',
      chatter: [
        'Oproep op kanaal 8, wandelaar met verstuikte enkel nabij paal 42.',
        'Reddingsteam ontvangt oproep, eerste hulppost is onderweg via zuidpad.'
      ]
    },
    {
      id: 'port_bhv_calamiteit',
      name: 'Haven BHV & Calamiteitenteam',
      freq: '446.15000',
      freqDisplay: '446.150.00',
      category: 'portofoon',
      band: 'pmr',
      mod: 'FM',
      callsign: 'BHV-HAVEN',
      location: 'Industrieterrein Europoort',
      desc: 'Interne portofoonverbinding voor bedrijfshulpverleners en EHBO',
      ctcss: '88.5 Hz (Tone 08)',
      deviceIcon: '📱',
      streamUrl: '',
      chatter: [
        'BHV Coördinator aan alle posten: oefening ontruiming hal C geslaagd, verzamelpunt vrij.'
      ]
    },
    {
      id: 'port_logistiek_dc',
      name: 'Logistiek DC Heftrucks & Magazijn',
      freq: '446.06875',
      freqDisplay: '446.068.75',
      category: 'portofoon',
      band: 'pmr',
      mod: 'FM',
      callsign: 'DC-LOGISTIEK',
      location: 'Distributiecentrum Waalwijk',
      desc: 'Orderpickers, heftruckchauffeurs en expeditie laaddocks',
      ctcss: '77.0 Hz (Tone 04)',
      deviceIcon: '📱',
      streamUrl: '',
      chatter: [
        'Heftruck 4 naar dock 12, oplegger met pallets gereed voor lossen.',
        'Onderweg, dock 12 binnen 1 minuut vrij.'
      ]
    },

    // --- 🚗 MOBILOFOONS (27 MHz CB & Voertuigzendontvangers) ---
    {
      id: 'cb_k19_truckers',
      name: '27 MHz Kanaal 19 (Truckers & Vrachtverkeer)',
      freq: '27.185',
      freqDisplay: '27.185.00',
      category: 'mobilofoon',
      band: 'cb',
      mod: 'FM',
      callsign: 'TRUCK-19',
      location: 'Snelwegen A1, A2, A12, A15 & A16',
      desc: 'Traditioneel mobilofoonkanaal voor vrachtwagenchauffeurs en filewaarschuwingen',
      ctcss: 'CSQ',
      deviceIcon: '🚛',
      streamUrl: '',
      chatter: [
        'Middag collega’s op de 19, let op bij knooppunt Hoevelaken, remmen voor file op de rechterbaan.',
        'Bedankt voor de tip chauffeur, ik pak binnendoor via Amersfoort. Goeie reis!',
        'Breaker breaker, mooie Scania die net passeert, goeie middag!'
      ]
    },
    {
      id: 'cb_k14_oproep',
      name: '27 MHz Kanaal 14 (Algemene Oproep & Bakkies)',
      freq: '27.125',
      freqDisplay: '27.125.00',
      category: 'mobilofoon',
      band: 'cb',
      mod: 'FM',
      callsign: 'CB-NL14',
      location: 'Landelijk 11m Band',
      desc: 'Standaard oproepkanaal voor 27MC mobiele zendontvangers in personenauto\'s',
      ctcss: 'CSQ',
      deviceIcon: '🚗',
      streamUrl: '',
      chatter: [
        'Break voor een tokkie op kanaal 14, iemand in de lucht in regio Utrecht?',
        'Ja hallo mobiel station, kom maar op kanaal 22 voor een praatje.'
      ]
    },
    {
      id: 'cb_k9_sos',
      name: '27 MHz Kanaal 9 (Nood & Hulpverlening)',
      freq: '27.065',
      freqDisplay: '27.065.00',
      category: 'mobilofoon',
      band: 'cb',
      mod: 'AM',
      callsign: 'EMERGENCY-09',
      location: 'Internationaal Noodkanaal',
      desc: 'Historisch en actueel noodoproepkanaal voor strand, polder en pech onderweg',
      ctcss: 'CSQ',
      deviceIcon: '🚗',
      streamUrl: '',
      chatter: [
        'Kanaal 9 uitluisterdienst actief. Geen actieve noodberichten gemeld.'
      ]
    },
    {
      id: 'cb_k4_4x4',
      name: '27 MHz Kanaal 4 (Terreinwagens & 4x4 Offroad)',
      freq: '27.005',
      freqDisplay: '27.005.00',
      category: 'mobilofoon',
      band: 'cb',
      mod: 'FM',
      callsign: '4X4-TRAIL',
      location: 'Veluwe & Offroad Parcoursen',
      desc: 'Mobilofoons in terreinwagens voor konvooirijden, lieren en zandkuilen',
      ctcss: 'CSQ',
      deviceIcon: '🚙',
      streamUrl: '',
      chatter: [
        'Konvooi leider voor wagen 3: diepe modderkuil aan stuurboordzijde, hou links aan in lage gearing.',
        'Wagen 3 begrepen, 4-wielaandrijving ingeschakeld, we volgen spoor.'
      ]
    },
    {
      id: 'mob_berging_takel',
      name: 'Bergingsbedrijf & Takeldienst Mobilofoon',
      freq: '27.225',
      freqDisplay: '27.225.00',
      category: 'mobilofoon',
      band: 'cb',
      mod: 'FM',
      callsign: 'TAKELD-22',
      location: 'Regio Rijnmond & Drechtsteden',
      desc: 'Takelwagens en pechhulpvoertuigen vlootcommunicatie',
      ctcss: 'CSQ',
      deviceIcon: '🛻',
      streamUrl: '',
      chatter: [
        'Centrale voor Berging 4: gestrand voertuig A15 hectometerpaal 48.2, bergingswagen onderweg.'
      ]
    },
    {
      id: 'mob_loonwerk_oogst',
      name: 'Agrarisch Loonwerk & Oogst Mobilofoon',
      freq: '27.155',
      freqDisplay: '27.155.00',
      category: 'mobilofoon',
      band: 'cb',
      mod: 'FM',
      callsign: 'OOGST-16',
      location: 'Flevopolder & Gelderse Vallei',
      desc: 'Hakselaars, tractoren en kiepkarren tijdens het maïsseizoen',
      ctcss: 'CSQ',
      deviceIcon: '🚜',
      streamUrl: '',
      chatter: [
        'Hakselaar 1 roept kar 2: bak is voor 90 procent vol, graag volgende combinatie aansturen.'
      ]
    },

    // --- 📻 ZENDONTVANGERS / TRANSCEIVERS (Zendamateurs & WebSDR) ---
    {
      id: 'ham_pi2nos',
      name: 'PI2NOS Bovenregionale Relaiszender (2m Ham)',
      freq: '145.575',
      freqDisplay: '145.575.00',
      category: 'transceiver',
      band: 'ham_2m',
      mod: 'FM',
      callsign: 'PI2NOS',
      location: 'Gerbrandytoren IJsselstein (366m NAP)',
      desc: 'Grootste zendamateur repeater van West-Europa, dekt heel Nederland & Vlaanderen',
      ctcss: '77.0 / 88.5 Hz',
      deviceIcon: '📻',
      streamUrl: '',
      chatter: [
        'PI2NOS via IJsselstein, hier PA3EHQ mobiel nabij Apeldoorn, goedenavond ronde.',
        'Goedenavond PA3EHQ, hier PD0MW in Rotterdam, je modulatie komt 5-9 binnen.',
        'Mooi rapport Peter, ik werk met de Yaesu transceiver op 50 watt vanuit de auto.'
      ]
    },
    {
      id: 'ham_pi3utr',
      name: 'PI3UTR Utrecht Relaiszender (70cm Ham)',
      freq: '430.125',
      freqDisplay: '430.125.00',
      category: 'transceiver',
      band: 'ham_70cm',
      mod: 'FM',
      callsign: 'PI3UTR',
      location: 'Gerbrandytoren IJsselstein',
      desc: 'Bovenregionale 70 centimeter FM repeater zendamateurs Midden-Nederland',
      ctcss: '77.0 Hz',
      deviceIcon: '📡',
      streamUrl: '',
      chatter: [
        'PI3UTR, PA2XYZ voor een kort signaalrapport, transceiver test op 10 watt.',
        'PA2XYZ hier PE1AAA, prima audiosignaal, helder en zuiver.'
      ]
    },
    {
      id: 'ham_pi1nos_aprs',
      name: 'PI1NOS APRS & Digipeater (144.800 MHz)',
      freq: '144.800',
      freqDisplay: '144.800.00',
      category: 'transceiver',
      band: 'ham_2m',
      mod: 'FM',
      callsign: 'PI1NOS-1',
      location: 'IJsselstein Data Knooppunt',
      desc: 'Automatische positierapporten en telemetrie pakketjes zendamateurs (1200 AFSK)',
      ctcss: 'Data',
      deviceIcon: '💻',
      streamUrl: '',
      chatter: [
        'APRS Beacon: PI1NOS-1>APN100,WIDE2-1:!5201.00N/00503.00E#Gerbrandytoren Digipeater 144.800'
      ]
    },
    {
      id: 'ham_websdr_20m',
      name: '20m Amateur Band WebSDR DX Oproep (14.200 MHz)',
      freq: '14.200',
      freqDisplay: '014.200.00',
      category: 'transceiver',
      band: 'hf',
      mod: 'USB',
      callsign: 'DX-20M',
      location: 'Universiteit Twente WebSDR',
      desc: 'Korte Golf Wereldwijde verbindingen via ionosferische reflectie (14 MHz)',
      ctcss: 'None',
      deviceIcon: '🌐',
      streamUrl: '',
      chatter: [
        'CQ 20 meter, CQ 20 meter, this is PA0VRO calling CQ DX and listening on 14.200 USB.',
        'PA0VRO, this is W1AW in Connecticut, you are 5 and 9 into the United States, 73s!'
      ]
    },
    {
      id: 'ham_websdr_40m',
      name: '40m Avondronde Nederlandstalig (7.085 MHz)',
      freq: '7.085',
      freqDisplay: '007.085.00',
      category: 'transceiver',
      band: 'hf',
      mod: 'LSB',
      callsign: 'RONDE-40M',
      location: 'Korte Golf HF Band',
      desc: 'Dagelijkse praatronde van Nederlandse en Vlaamse zendamateurs',
      ctcss: 'None',
      deviceIcon: '🌐',
      streamUrl: '',
      chatter: [
        'Goedenavond allemaal in de 40 meter ronde, condities zijn uitstekend vanavond over heel de Benelux.'
      ]
    },
    {
      id: 'ham_websdr_80m',
      name: '80m Huishoudelijke Ronde (3.650 MHz)',
      freq: '3.650',
      freqDisplay: '003.650.00',
      category: 'transceiver',
      band: 'hf',
      mod: 'LSB',
      callsign: 'PA-80M',
      location: 'Landelijke Korte Golf NVIS',
      desc: 'Nationale zendamateur ontmoetingsfrequentie via steile ionosfeerstraling (NVIS)',
      ctcss: 'None',
      deviceIcon: '🌐',
      streamUrl: '',
      chatter: [
        'Rondeloper PA3ABC meldt 12 stations ingemeld voor de zaterdagavondronde op 80 meter.'
      ]
    }
  ];

  // ==========================================================================
  // 2. APPLICATIE STATUS & VOORKEUREN
  // ==========================================================================
  const STORAGE_KEYS = {
    LAST_CHANNEL: 'pv_uitluisteren_last_channel',
    FAVORITES: 'pv_uitluisteren_favs',
    VOLUME: 'pv_uitluisteren_volume',
    SQUELCH: 'pv_uitluisteren_squelch',
    ROGER_BEEP: 'pv_uitluisteren_roger_beep',
    NOISE: 'pv_uitluisteren_noise',
    VIEW_MODE: 'pv_uitluisteren_view_mode',
    AUTO_DOWNLOAD: 'pv_uitluisteren_autodownload'
  };

  const state = {
    activeChannelId: null,
    isPlaying: false,
    volume: 0.8,
    squelch: 0.4,
    rogerBeep: true,
    noise: true,
    currentView: 'voorkant', // ALTIJD STANDAARD VOORKANT!
    visMode: 'waterfall',
    filterCategory: 'all',
    filterBand: '',
    searchQuery: '',
    favorites: [],
    recordings: [],
    isRecording: false,
    recStartTime: null,
    recInterval: null,
    isPttActive: false,
    audioCtx: null,
    masterGain: null,
    noiseGain: null,
    filterNode: null,
    analyser: null,
    micMediaStream: null,
    micSourceNode: null,
    lameEncoder: null,
    mp3Data: [],
    recScriptProcessor: null,
    recSampleRate: 44100,
    recChannels: 1,
    recBitrate: 192,
    chatterTimeout: null,
    speechActive: false
  };

  // DOM Caches
  const DOM = {};

  // ==========================================================================
  // 3. INITIALISATIE & BOOTSTRAP
  // ==========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    cacheDomElements();
    loadStoredPreferences();
    initAudioEngine();
    renderChannelList();
    bindEvents();
    startCanvasVisualizer();
    checkAppVersion();

    // Start ALTIJD op de Voorkant conform gebruikerswens!
    setViewMode('voorkant');

    // Toon start-notificatie
    const lastChan = getChannelById(state.activeChannelId);
    showToast(`📻 Peter Vroon Uitluisteren gestart • ${lastChan ? lastChan.name : 'Klaar om uit te luisteren'}`);
  });

  function cacheDomElements() {
    DOM.appRoot = document.querySelector('.app-root');
    DOM.topNav = document.querySelector('.top-nav');
    DOM.mainContainer = document.getElementById('mainContainer');
    DOM.channelPanel = document.getElementById('channelPanel');
    DOM.cockpitPanel = document.getElementById('cockpitPanel');

    // Weergave schakelaars
    DOM.btnViewVoorkant = document.getElementById('btnViewVoorkant');
    DOM.btnViewAchterkant = document.getElementById('btnViewAchterkant');
    DOM.btnViewSplit = document.getElementById('btnViewSplit');
    DOM.btnBackToVoorkant = document.getElementById('btnBackToVoorkant');

    // Bovenbalk acties
    DOM.verPill = document.getElementById('verPill');
    DOM.verPillText = document.getElementById('verPillText');
    DOM.btnOpenHelp = document.getElementById('btnOpenHelp');
    DOM.btnOpenFavs = document.getElementById('btnOpenFavs');

    // Filters & Zoeken
    DOM.channelSearch = document.getElementById('channelSearch');
    DOM.btnClearSearch = document.getElementById('btnClearSearch');
    DOM.catPills = document.querySelectorAll('.cat-pill');
    DOM.bandPills = document.querySelectorAll('.band-pill');
    DOM.channelCountText = document.getElementById('channelCountText');
    DOM.subbarVerText = document.getElementById('subbarVerText');
    DOM.btnReloadChannels = document.getElementById('btnReloadChannels');
    DOM.channelList = document.getElementById('channelList');
    DOM.emptyState = document.getElementById('emptyState');
    DOM.btnResetFilters = document.getElementById('btnResetFilters');

    // Zwevende Mini-HUD
    DOM.miniScannerHud = document.getElementById('miniScannerHud');
    DOM.miniDeviceIcon = document.getElementById('miniDeviceIcon');
    DOM.miniFreqText = document.getElementById('miniFreqText');
    DOM.miniModBadge = document.getElementById('miniModBadge');
    DOM.miniSignalBadge = document.getElementById('miniSignalBadge');
    DOM.miniChannelName = document.getElementById('miniChannelName');
    DOM.btnMiniPrev = document.getElementById('btnMiniPrev');
    DOM.btnMiniPlay = document.getElementById('btnMiniPlay');
    DOM.btnMiniNext = document.getElementById('btnMiniNext');
    DOM.btnMiniSquelch = document.getElementById('btnMiniSquelch');
    DOM.btnMiniRoger = document.getElementById('btnMiniRoger');
    DOM.btnMiniToCockpit = document.getElementById('btnMiniToCockpit');

    // VFO Cockpit
    DOM.vfoDeviceType = document.getElementById('vfoDeviceType');
    DOM.vfoBandText = document.getElementById('vfoBandText');
    DOM.vfoFilterText = document.getElementById('vfoFilterText');
    DOM.vfoStatusBadge = document.getElementById('vfoStatusBadge');
    DOM.vfoFreqMain = document.getElementById('vfoFreqMain');
    DOM.vfoModMode = document.getElementById('vfoModMode');
    DOM.vfoCallsign = document.getElementById('vfoCallsign');
    DOM.vfoChannelDesc = document.getElementById('vfoChannelDesc');
    DOM.vfoCtcss = document.getElementById('vfoCtcss');

    // Cockpit Tuning
    DOM.btnTuneDownFast = document.getElementById('btnTuneDownFast');
    DOM.btnTuneDown = document.getElementById('btnTuneDown');
    DOM.btnTuneUp = document.getElementById('btnTuneUp');
    DOM.btnTuneUpFast = document.getElementById('btnTuneUpFast');
    DOM.btnMainPlay = document.getElementById('btnMainPlay');
    DOM.mainPlayIcon = document.getElementById('mainPlayIcon');
    DOM.mainPlayText = document.getElementById('mainPlayText');
    DOM.btnMainFav = document.getElementById('btnMainFav');
    DOM.favSvg = document.getElementById('favSvg');

    DOM.volumeSlider = document.getElementById('volumeSlider');
    DOM.volText = document.getElementById('volText');
    DOM.squelchSlider = document.getElementById('squelchSlider');
    DOM.sqlText = document.getElementById('sqlText');

    // Visualizer & S-Meter
    DOM.sMeterNeedle = document.getElementById('sMeterNeedle');
    DOM.sMeterDbValue = document.getElementById('sMeterDbValue');
    DOM.scannerCanvas = document.getElementById('scannerCanvas');
    DOM.visModeWaterfall = document.getElementById('visModeWaterfall');
    DOM.visModeSpectrum = document.getElementById('visModeSpectrum');
    DOM.visModeOscilloscope = document.getElementById('visModeOscilloscope');

    // DSP & PTT
    DOM.btnToggleRoger = document.getElementById('btnToggleRoger');
    DOM.rogerStatusText = document.getElementById('rogerStatusText');
    DOM.btnToggleNoise = document.getElementById('btnToggleNoise');
    DOM.noiseStatusText = document.getElementById('noiseStatusText');
    DOM.btnPttMic = document.getElementById('btnPttMic');
    DOM.ptkSubText = document.getElementById('ptkSubText');

    // MP3 Opnamestudio
    DOM.recBitrate = document.getElementById('recBitrate');
    DOM.recDot = document.getElementById('recDot');
    DOM.recTimer = document.getElementById('recTimer');
    DOM.recSizeEstimate = document.getElementById('recSizeEstimate');
    DOM.btnRecordToggle = document.getElementById('btnRecordToggle');
    DOM.recBtnIcon = document.getElementById('recBtnIcon');
    DOM.recBtnText = document.getElementById('recBtnText');
    DOM.chkAutoDownload = document.getElementById('chkAutoDownload');
    DOM.recCountBadge = document.getElementById('recCountBadge');
    DOM.recordingsList = document.getElementById('recordingsList');
    DOM.noRecordingsState = document.getElementById('noRecordingsState');

    // Audio Element
    DOM.audioPlayer = document.getElementById('audioPlayer');

    // Modals
    DOM.helpModal = document.getElementById('helpModal');
    DOM.btnCloseHelp = document.getElementById('btnCloseHelp');
    DOM.btnModalCloseDone = document.getElementById('btnModalCloseDone');
    DOM.helpTabs = document.querySelectorAll('.help-tab');
    DOM.helpPanes = document.querySelectorAll('.help-tab-pane');
    DOM.helpVersionBadge = document.getElementById('helpVersionBadge');
    DOM.helpGitHash = document.getElementById('helpGitHash');
    DOM.helpFeaturesList = document.getElementById('helpFeaturesList');

    DOM.favoritesModal = document.getElementById('favoritesModal');
    DOM.btnCloseFavs = document.getElementById('btnCloseFavs');
    DOM.btnCloseFavsDone = document.getElementById('btnCloseFavsDone');
    DOM.btnClearAllFavs = document.getElementById('btnClearAllFavs');
    DOM.favList = document.getElementById('favList');
    DOM.emptyFavsState = document.getElementById('emptyFavsState');

    DOM.toastContainer = document.getElementById('toastContainer');
  }

  function loadStoredPreferences() {
    // 1. Favorieten
    try {
      const storedFavs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (storedFavs) state.favorites = JSON.parse(storedFavs);
    } catch (e) {
      state.favorites = [];
    }

    // 2. Laatst gekozen kanaal (onthouden en bovenaan zetten!)
    const storedLast = localStorage.getItem(STORAGE_KEYS.LAST_CHANNEL);
    if (storedLast && CHANNELS.some(c => c.id === storedLast)) {
      state.activeChannelId = storedLast;
    } else {
      // Standaard eerste kanaal (Schiphol Toren)
      state.activeChannelId = CHANNELS[0].id;
    }

    // 3. Audio instellingen
    const storedVol = localStorage.getItem(STORAGE_KEYS.VOLUME);
    if (storedVol !== null) state.volume = parseFloat(storedVol);

    const storedSql = localStorage.getItem(STORAGE_KEYS.SQUELCH);
    if (storedSql !== null) state.squelch = parseFloat(storedSql);

    const storedRoger = localStorage.getItem(STORAGE_KEYS.ROGER_BEEP);
    if (storedRoger !== null) state.rogerBeep = storedRoger === 'true';

    const storedNoise = localStorage.getItem(STORAGE_KEYS.NOISE);
    if (storedNoise !== null) state.noise = storedNoise === 'true';

    const storedAutoDl = localStorage.getItem(STORAGE_KEYS.AUTO_DOWNLOAD);
    if (storedAutoDl !== null && DOM.chkAutoDownload) {
      DOM.chkAutoDownload.checked = storedAutoDl === 'true';
    }

    // Update Sliders in UI
    if (DOM.volumeSlider) {
      DOM.volumeSlider.value = Math.round(state.volume * 100);
      DOM.volText.textContent = `${Math.round(state.volume * 100)}%`;
    }
    if (DOM.squelchSlider) {
      DOM.squelchSlider.value = Math.round(state.squelch * 100);
      DOM.sqlText.textContent = `${Math.round(state.squelch * 100)}%`;
    }
    updateDspButtonsUI();
  }

  function saveStoredPreferences() {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_CHANNEL, state.activeChannelId);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites));
      localStorage.setItem(STORAGE_KEYS.VOLUME, state.volume.toString());
      localStorage.setItem(STORAGE_KEYS.SQUELCH, state.squelch.toString());
      localStorage.setItem(STORAGE_KEYS.ROGER_BEEP, state.rogerBeep.toString());
      localStorage.setItem(STORAGE_KEYS.NOISE, state.noise.toString());
      if (DOM.chkAutoDownload) {
        localStorage.setItem(STORAGE_KEYS.AUTO_DOWNLOAD, DOM.chkAutoDownload.checked.toString());
      }
    } catch (e) {
      console.warn('LocalStorage niet beschikbaar:', e);
    }
  }

  // ==========================================================================
  // 4. WEB AUDIO ENGINE, DSP FILTERS & CHATTER SYNTHESIZER
  // ==========================================================================
  function initAudioEngine() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      console.warn('Web Audio API wordt niet ondersteund door deze browser.');
      return;
    }

    try {
      state.audioCtx = new AudioContextClass();
      state.recSampleRate = state.audioCtx.sampleRate;

      // 1. Master Gain Node (Volume)
      state.masterGain = state.audioCtx.createGain();
      state.masterGain.gain.setValueAtTime(state.volume, state.audioCtx.currentTime);

      // 2. Bandpass filter (Authentieke 300Hz - 3200Hz portofoon bandbreedte)
      state.filterNode = state.audioCtx.createBiquadFilter();
      state.filterNode.type = 'bandpass';
      state.filterNode.frequency.setValueAtTime(1400, state.audioCtx.currentTime);
      state.filterNode.Q.setValueAtTime(1.1, state.audioCtx.currentTime);

      // 3. Analyser Node (60 FPS spectrum & waterval)
      state.analyser = state.audioCtx.createAnalyser();
      state.analyser.fftSize = 256;
      state.analyser.smoothingTimeConstant = 0.78;

      // 4. Ruis Generator (Zachte etherruis / static)
      createNoiseGenerator();

      // Routing: filterNode -> masterGain -> analyser -> destination
      state.filterNode.connect(state.masterGain);
      state.masterGain.connect(state.analyser);
      state.analyser.connect(state.audioCtx.destination);

    } catch (err) {
      console.error('Fout bij initialiseren AudioContext:', err);
    }
  }

  function resumeAudioContextIfNeeded() {
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  }

  // Realistische Ether Ruis Buffer
  function createNoiseGenerator() {
    if (!state.audioCtx) return;

    const bufferSize = 2 * state.audioCtx.sampleRate;
    const noiseBuffer = state.audioCtx.createBuffer(1, bufferSize, state.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    // Roze / ether ruis filter
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = state.audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    state.noiseGain = state.audioCtx.createGain();
    updateNoiseLevel();

    whiteNoise.connect(state.noiseGain);
    state.noiseGain.connect(state.filterNode);
    whiteNoise.start();
  }

  function updateNoiseLevel() {
    if (!state.noiseGain || !state.audioCtx) return;

    if (!state.isPlaying || !state.noise) {
      state.noiseGain.gain.setTargetAtTime(0, state.audioCtx.currentTime, 0.05);
      return;
    }

    // Squelch logica: hoe hoger de squelch, hoe minder ruis
    const squelchFactor = Math.max(0, 1 - state.squelch * 1.8);
    const targetGain = 0.018 * squelchFactor;
    state.noiseGain.gain.setTargetAtTime(targetGain, state.audioCtx.currentTime, 0.08);
  }

  // Authentieke Roger Beep (Quindar Tone 2524Hz of 800Hz)
  function playRogerBeep() {
    if (!state.rogerBeep || !state.audioCtx) return;
    resumeAudioContextIfNeeded();

    try {
      const now = state.audioCtx.currentTime;
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();

      osc.type = 'sine';
      // Klassieke marifoon / portofoon roger beep (1000 Hz naar 800 Hz)
      osc.frequency.setValueAtTime(1050, now);
      osc.frequency.setValueAtTime(800, now + 0.07);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.12 * state.volume, now + 0.02);
      gain.gain.setValueAtTime(0.12 * state.volume, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(state.masterGain);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {
      console.warn('Roger Beep error:', e);
    }
  }

  // Radioklik bij zendstart
  function playTxClick() {
    if (!state.audioCtx) return;
    try {
      const now = state.audioCtx.currentTime;
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.04);

      gain.gain.setValueAtTime(0.08 * state.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(state.masterGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  // Realistische Radio Berichten Synthesizer
  function triggerRadioChatter() {
    if (!state.isPlaying) return;

    const channel = getChannelById(state.activeChannelId);
    if (!channel || !channel.chatter || channel.chatter.length === 0) return;

    clearTimeout(state.chatterTimeout);

    // Willekeurig bericht uit de zender database
    const phrase = channel.chatter[Math.floor(Math.random() * channel.chatter.length)];

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.rate = 1.08;
      utterance.pitch = channel.mod === 'AM' ? 1.05 : 0.95;
      utterance.lang = channel.category === 'scanner' && channel.band === 'air' ? 'en-US' : 'nl-NL';

      utterance.onstart = () => {
        state.speechActive = true;
        playTxClick();
        if (DOM.vfoStatusBadge) {
          DOM.vfoStatusBadge.textContent = 'RX ONTVANGST';
          DOM.vfoStatusBadge.style.background = 'rgba(0, 230, 118, 0.35)';
        }
      };

      utterance.onend = () => {
        state.speechActive = false;
        playRogerBeep();
        if (DOM.vfoStatusBadge) {
          DOM.vfoStatusBadge.textContent = 'RX STANDBY';
          DOM.vfoStatusBadge.style.background = '';
        }
        scheduleNextChatter();
      };

      utterance.onerror = () => {
        state.speechActive = false;
        scheduleNextChatter();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      scheduleNextChatter();
    }
  }

  function scheduleNextChatter() {
    if (!state.isPlaying) return;
    // Volgend bericht over 5 tot 15 seconden
    const delay = Math.floor(Math.random() * 10000) + 5000;
    state.chatterTimeout = setTimeout(() => {
      triggerRadioChatter();
    }, delay);
  }

  // ==========================================================================
  // 5. PUSH-TO-TALK (PTT) MICROFOON
  // ==========================================================================
  async function startPttTransmission() {
    if (state.isPttActive) return;
    resumeAudioContextIfNeeded();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showToast('⚠️ Microfoontoegang wordt niet ondersteund in deze browser.');
        return;
      }

      state.isPttActive = true;
      playTxClick();

      if (DOM.btnPttMic) {
        DOM.btnPttMic.classList.add('transmitting');
        DOM.ptkSubText.textContent = '🔴 LIVE OP DE ETHER • Laat knop los om te zenden met Roger Beep';
      }

      if (!state.micMediaStream) {
        state.micMediaStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: false,
            autoGainControl: true
          }
        });
        state.micSourceNode = state.audioCtx.createMediaStreamSource(state.micMediaStream);
        state.micSourceNode.connect(state.filterNode);
      }

    } catch (err) {
      console.warn('Microfoon toegang geweigerd:', err);
      state.isPttActive = false;
      if (DOM.btnPttMic) DOM.btnPttMic.classList.remove('transmitting');
      showToast('⚠️ Microfoontoegang geweigerd of niet beschikbaar.');
    }
  }

  function stopPttTransmission() {
    if (!state.isPttActive) return;

    state.isPttActive = false;
    if (DOM.btnPttMic) {
      DOM.btnPttMic.classList.remove('transmitting');
      DOM.ptkSubText.textContent = 'Houd ingedrukt om uw stem door het portofoonfilter te horen';
    }

    if (state.micSourceNode && state.filterNode) {
      try {
        state.micSourceNode.disconnect(state.filterNode);
      } catch (e) {}
      state.micSourceNode = null;
    }

    if (state.micMediaStream) {
      state.micMediaStream.getTracks().forEach(track => track.stop());
      state.micMediaStream = null;
    }

    // Authentieke Roger Beep bij loslaten PTT knop!
    playRogerBeep();
  }

  // ==========================================================================
  // 6. MP3 OPNAME STUDIO (Met pure JS lame.min.js)
  // ==========================================================================
  function toggleRecording() {
    if (state.isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  function startRecording() {
    if (state.isRecording) return;
    resumeAudioContextIfNeeded();

    if (typeof lamejs === 'undefined' || typeof lamejs.Mp3Encoder !== 'function') {
      showToast('⚠️ MP3 Encoder (lame.min.js) niet gereed.');
      return;
    }

    try {
      const bitrate = parseInt(DOM.recBitrate ? DOM.recBitrate.value : '192', 10);
      state.recBitrate = bitrate;
      state.mp3Data = [];

      // Mono encoder (authentiek voor portofoon/scanner)
      state.recChannels = 1;
      state.lameEncoder = new lamejs.Mp3Encoder(state.recChannels, state.recSampleRate, state.recBitrate);

      // ScriptProcessorNode om ruwe PCM samples op te vangen
      state.recScriptProcessor = state.audioCtx.createScriptProcessor(4096, 1, 1);
      state.recScriptProcessor.onaudioprocess = (e) => {
        if (!state.isRecording || !state.lameEncoder) return;
        const inputData = e.inputBuffer.getChannelData(0);
        // Converteer Float32Array (-1.0 to 1.0) naar Int16Array (-32768 to 32767)
        const sampleCount = inputData.length;
        const int16Samples = new Int16Array(sampleCount);
        for (let i = 0; i < sampleCount; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          int16Samples[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }

        const mp3buf = state.lameEncoder.encodeBuffer(int16Samples);
        if (mp3buf.length > 0) {
          state.mp3Data.push(mp3buf);
        }
      };

      // Koppel scriptProcessor aan masterGain
      state.masterGain.connect(state.recScriptProcessor);
      state.recScriptProcessor.connect(state.audioCtx.destination);

      state.isRecording = true;
      state.recStartTime = Date.now();

      // UI Updates
      if (DOM.btnRecordToggle) {
        DOM.btnRecordToggle.classList.add('recording');
        DOM.recBtnIcon.textContent = '⏹️';
        DOM.recBtnText.textContent = 'Stop MP3 Opname';
      }
      if (DOM.recDot) {
        DOM.recDot.className = 'rec-dot-active';
      }

      // Timer ticker
      state.recInterval = setInterval(updateRecTimerDisplay, 500);
      showToast('🎙️ Live MP3 Opname gestart...');

    } catch (err) {
      console.error('Fout bij starten opname:', err);
      showToast('⚠️ Kon MP3 opname niet starten.');
    }
  }

  function stopRecording() {
    if (!state.isRecording) return;

    state.isRecording = false;
    clearInterval(state.recInterval);

    // Koppel nodes los
    if (state.recScriptProcessor && state.masterGain) {
      try {
        state.masterGain.disconnect(state.recScriptProcessor);
        state.recScriptProcessor.disconnect();
      } catch (e) {}
      state.recScriptProcessor = null;
    }

    // Flush de MP3 buffer
    if (state.lameEncoder) {
      const mp3End = state.lameEncoder.flush();
      if (mp3End.length > 0) {
        state.mp3Data.push(mp3End);
      }
    }

    // Maak MP3 Blob
    const mp3Blob = new Blob(state.mp3Data, { type: 'audio/mp3' });
    const channel = getChannelById(state.activeChannelId);
    const dateStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const fileName = `PeterVroon-Uitluisteren-${channel ? channel.freq : 'Radio'}-${dateStr}.mp3`;
    const fileSizeMb = (mp3Blob.size / (1024 * 1024)).toFixed(2);
    const blobUrl = URL.createObjectURL(mp3Blob);

    // Opslaan in sessiehistorie
    const recItem = {
      id: 'rec_' + Date.now(),
      name: fileName,
      channelName: channel ? channel.name : 'Ethercommunicatie',
      freq: channel ? channel.freq : '119.225',
      size: `${fileSizeMb} MB`,
      url: blobUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    state.recordings.unshift(recItem);
    renderRecordingsList();

    // UI Terugzetten
    if (DOM.btnRecordToggle) {
      DOM.btnRecordToggle.classList.remove('recording');
      DOM.recBtnIcon.textContent = '🔴';
      DOM.recBtnText.textContent = 'Start MP3 Opname';
    }
    if (DOM.recDot) {
      DOM.recDot.className = 'rec-dot-idle';
    }
    if (DOM.recTimer) DOM.recTimer.textContent = '00:00:00';
    if (DOM.recSizeEstimate) DOM.recSizeEstimate.textContent = '0.0 MB';

    showToast(`✅ MP3 opgeslagen (${fileSizeMb} MB)`);

    // Automatisch downloaden indien ingeschakeld
    if (DOM.chkAutoDownload && DOM.chkAutoDownload.checked) {
      downloadBlob(blobUrl, fileName);
    }
  }

  function updateRecTimerDisplay() {
    if (!state.recStartTime) return;
    const elapsedMs = Date.now() - state.recStartTime;
    const totalSecs = Math.floor(elapsedMs / 1000);
    const hrs = String(Math.floor(totalSecs / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSecs % 60).padStart(2, '0');

    if (DOM.recTimer) DOM.recTimer.textContent = `${hrs}:${mins}:${secs}`;

    // Schatting bestandsgrootte op basis van bitrate
    const estMb = ((totalSecs * (state.recBitrate * 1000 / 8)) / (1024 * 1024)).toFixed(2);
    if (DOM.recSizeEstimate) DOM.recSizeEstimate.textContent = `${estMb} MB`;
  }

  function renderRecordingsList() {
    if (!DOM.recordingsList) return;

    if (state.recordings.length === 0) {
      DOM.recordingsList.innerHTML = '';
      if (DOM.noRecordingsState) DOM.noRecordingsState.style.display = 'block';
      if (DOM.recCountBadge) DOM.recCountBadge.textContent = '0 opnames';
      return;
    }

    if (DOM.noRecordingsState) DOM.noRecordingsState.style.display = 'none';
    if (DOM.recCountBadge) DOM.recCountBadge.textContent = `${state.recordings.length} opnames`;

    DOM.recordingsList.innerHTML = state.recordings.map(rec => `
      <div class="recording-item">
        <div class="rec-meta">
          <span class="rec-name">${rec.channelName} (${rec.freq} MHz)</span>
          <span class="rec-sub">${rec.timestamp} • ${rec.size}</span>
        </div>
        <div class="rec-actions">
          <button class="rec-item-btn" onclick="window.playRecordedAudio('${rec.url}')">▶️ Luister</button>
          <a class="rec-item-btn" href="${rec.url}" download="${rec.name}">⬇️ Download</a>
        </div>
      </div>
    `).join('');
  }

  window.playRecordedAudio = (url) => {
    const audio = new Audio(url);
    audio.play();
    showToast('▶️ MP3 Opname wordt afgespeeld');
  };

  function downloadBlob(url, fileName) {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // ==========================================================================
  // 7. WEERGAVE BEHEER: VOORKANT vs ACHTERKANT vs SPLIT
  // ==========================================================================
  function setViewMode(mode) {
    state.currentView = mode;
    saveStoredPreferences();

    // Verwijder oude klassen
    DOM.mainContainer.classList.remove('view-voorkant', 'view-achterkant', 'view-split');
    DOM.mainContainer.classList.add(`view-${mode}`);

    // Update Pill Buttons in Header
    DOM.btnViewVoorkant.classList.toggle('active', mode === 'voorkant');
    DOM.btnViewAchterkant.classList.toggle('active', mode === 'achterkant');
    DOM.btnViewSplit.classList.toggle('active', mode === 'split');

    // Toon mini-HUD alleen op voorkant als er een kanaal actief is
    updateMiniHud();

    // Scroll naar bovenzijde paneel
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================================================
  // 8. KANALENOVERZICHT RENDERING (VOORKANT EERST & LAATST GEKOZEN BOVENAAN)
  // ==========================================================================
  function renderChannelList() {
    if (!DOM.channelList) return;

    // 1. Filter kanalen
    let filtered = CHANNELS.filter(c => {
      // Categorie filter
      if (state.filterCategory !== 'all' && c.category !== state.filterCategory) {
        return false;
      }
      // Band filter
      if (state.filterBand && c.band !== state.filterBand) {
        return false;
      }
      // Zoekopdracht
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        const match = c.name.toLowerCase().includes(q) ||
          c.freq.includes(q) ||
          c.callsign.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.desc.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });

    // 2. Laatst gekozen kanaal ALTIJD op positie 1 plaatsen conform de regel!
    if (state.activeChannelId) {
      const activeIdx = filtered.findIndex(c => c.id === state.activeChannelId);
      if (activeIdx > 0) {
        const [activeChan] = filtered.splice(activeIdx, 1);
        filtered.unshift(activeChan);
      }
    }

    // 3. Update count badge
    if (DOM.channelCountText) {
      DOM.channelCountText.textContent = `${filtered.length} kanalen gevonden`;
    }

    // 4. Render kaarten
    if (filtered.length === 0) {
      DOM.channelList.innerHTML = '';
      if (DOM.emptyState) DOM.emptyState.style.display = 'flex';
      return;
    }

    if (DOM.emptyState) DOM.emptyState.style.display = 'none';

    DOM.channelList.innerHTML = filtered.map(c => {
      const isActive = c.id === state.activeChannelId;
      const isFav = state.favorites.includes(c.id);
      const isLastListened = c.id === state.activeChannelId;

      return `
        <div class="channel-card ${isActive ? 'active' : ''}" data-id="${c.id}" role="button" tabindex="0">
          <div class="card-left">
            <div class="device-avatar">${c.deviceIcon}</div>
            <div class="card-info">
              <div class="card-freq-row">
                <span class="card-freq">${c.freq} MHz</span>
                <span class="card-badge badge-${c.mod.toLowerCase()}">${c.mod}</span>
                ${isLastListened ? '<span class="badge-last-listened">🕒 Laatst Geluisterd</span>' : ''}
              </div>
              <div class="card-name">${escapeHtml(c.name)}</div>
              <div class="card-subtext">${escapeHtml(c.callsign)} • ${escapeHtml(c.location)}</div>
            </div>
          </div>
          <div class="card-right">
            <button class="card-fav-btn ${isFav ? 'is-fav' : ''}" data-fav-id="${c.id}" title="Favoriet maken">
              ★
            </button>
            <div class="card-play-icon">${isActive && state.isPlaying ? '🔊' : '▶'}</div>
          </div>
        </div>
      `;
    }).join('');

    // Update Cockpit & Mini-HUD
    updateCockpitUI();
    updateMiniHud();
  }

  function selectChannel(channelId, autoPlay = true) {
    const channel = getChannelById(channelId);
    if (!channel) return;

    state.activeChannelId = channelId;
    saveStoredPreferences();

    // Breng AudioContext tot leven
    resumeAudioContextIfNeeded();

    if (autoPlay) {
      state.isPlaying = true;
      playTxClick();
      updateNoiseLevel();
      triggerRadioChatter();
    }

    // Her-render de lijst zodat het geselecteerde kanaal direct bovenaan staat met badge!
    renderChannelList();
    showToast(`📻 Afgestemd op ${channel.name} (${channel.freq} MHz)`);
  }

  // ==========================================================================
  // 9. VFO COCKPIT & MINI-HUD BIJWERKEN
  // ==========================================================================
  function updateCockpitUI() {
    const channel = getChannelById(state.activeChannelId);
    if (!channel) return;

    if (DOM.vfoDeviceType) DOM.vfoDeviceType.textContent = `${channel.deviceIcon} ${channel.category.toUpperCase()}`;
    if (DOM.vfoBandText) DOM.vfoBandText.textContent = channel.band.toUpperCase();
    if (DOM.vfoFilterText) DOM.vfoFilterText.textContent = `BANDPASS: 300-3000 Hz`;
    if (DOM.vfoFreqMain) DOM.vfoFreqMain.textContent = channel.freqDisplay;
    if (DOM.vfoModMode) DOM.vfoModMode.textContent = channel.mod;
    if (DOM.vfoCallsign) DOM.vfoCallsign.textContent = channel.callsign;
    if (DOM.vfoChannelDesc) DOM.vfoChannelDesc.textContent = `${channel.name} • ${channel.desc}`;
    if (DOM.vfoCtcss) DOM.vfoCtcss.textContent = `CTCSS: ${channel.ctcss}`;

    // Play/Stop knop in Cockpit
    if (DOM.mainPlayIcon && DOM.mainPlayText) {
      if (state.isPlaying) {
        DOM.mainPlayIcon.textContent = '⏹️';
        DOM.mainPlayText.textContent = 'Ontvangst Stoppen';
      } else {
        DOM.mainPlayIcon.textContent = '▶️';
        DOM.mainPlayText.textContent = 'Ontvangst Starten';
      }
    }

    // Favoriet knop
    const isFav = state.favorites.includes(channel.id);
    if (DOM.btnMainFav) {
      DOM.btnMainFav.classList.toggle('is-fav', isFav);
    }
  }

  function updateMiniHud() {
    if (!DOM.miniScannerHud) return;

    const channel = getChannelById(state.activeChannelId);
    if (!channel) {
      DOM.miniScannerHud.style.display = 'none';
      return;
    }

    DOM.miniScannerHud.style.display = 'flex';
    DOM.miniDeviceIcon.textContent = channel.deviceIcon;
    DOM.miniFreqText.textContent = `${channel.freq} MHz`;
    DOM.miniModBadge.textContent = channel.mod;
    DOM.miniChannelName.textContent = channel.name;

    // Mini Play button icon
    if (DOM.btnMiniPlay) {
      DOM.btnMiniPlay.textContent = state.isPlaying ? '⏸️' : '▶️';
    }

    // Mini DSP buttons
    if (DOM.btnMiniSquelch) {
      DOM.btnMiniSquelch.classList.toggle('active', state.squelch > 0.1);
    }
    if (DOM.btnMiniRoger) {
      DOM.btnMiniRoger.classList.toggle('active', state.rogerBeep);
    }
  }

  function updateDspButtonsUI() {
    if (DOM.btnToggleRoger && DOM.rogerStatusText) {
      DOM.btnToggleRoger.classList.toggle('active', state.rogerBeep);
      DOM.rogerStatusText.textContent = state.rogerBeep
        ? 'Actief (Pieptoon bij zendstop)'
        : 'Uitgeschakeld';
    }
    if (DOM.btnToggleNoise && DOM.noiseStatusText) {
      DOM.btnToggleNoise.classList.toggle('active', state.noise);
      DOM.noiseStatusText.textContent = state.noise
        ? 'Realistische Squelch Ruis'
        : 'Stil (Volledig gedempt)';
    }
  }

  // ==========================================================================
  // 10. 60 FPS ANALOGE S-METER & WATERFALL VISUALIZER
  // ==========================================================================
  function startCanvasVisualizer() {
    if (!DOM.scannerCanvas) return;
    const canvas = DOM.scannerCanvas;
    const ctx = canvas.getContext('2d');

    // Buffer canvas voor vloeiende waterval scrolling
    const waterfallBuffer = document.createElement('canvas');
    waterfallBuffer.width = canvas.width;
    waterfallBuffer.height = canvas.height;
    const bufCtx = waterfallBuffer.getContext('2d');

    const dataArray = new Uint8Array(state.analyser ? state.analyser.frequencyBinCount : 128);

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      if (!state.analyser || !state.isPlaying) {
        // Idle ruststand S-Meter & canvas
        updateSMeter(0);
        drawIdleCanvas(ctx, canvas);
        return;
      }

      if (state.visMode === 'oscilloscope') {
        state.analyser.getByteTimeDomainData(dataArray);
      } else {
        state.analyser.getByteFrequencyData(dataArray);
      }

      // Bereken signaalsterkte voor S-meter (RMS / Piek)
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const avg = sum / dataArray.length;
      updateSMeter(avg);

      // Teken gewenste modus
      if (state.visMode === 'waterfall') {
        drawWaterfall(ctx, canvas, bufCtx, waterfallBuffer, dataArray);
      } else if (state.visMode === 'spectrum') {
        drawSpectrum(ctx, canvas, dataArray);
      } else {
        drawOscilloscope(ctx, canvas, dataArray);
      }
    }

    renderFrame();
  }

  function updateSMeter(avgValue) {
    if (!DOM.sMeterNeedle || !DOM.sMeterDbValue) return;

    // Normaliseer naar 0 - 100%
    const normalized = Math.min(100, (avgValue / 180) * 100);
    DOM.sMeterNeedle.style.width = `${normalized.toFixed(1)}%`;

    // S-Schaal interpretatie (S1 tot S9+30dB)
    let sValText = 'S0 (Geen Signaal)';
    if (normalized > 85) sValText = 'S9 +30 dB (Extreem Sterk)';
    else if (normalized > 70) sValText = 'S9 +20 dB (Zeer Sterk)';
    else if (normalized > 55) sValText = 'S9 +10 dB (Sterk)';
    else if (normalized > 42) sValText = 'S9 (Zuiver)';
    else if (normalized > 32) sValText = 'S7 (Goed)';
    else if (normalized > 22) sValText = 'S5 (Redelijk)';
    else if (normalized > 12) sValText = 'S3 (Zwak)';
    else if (normalized > 3) sValText = 'S1 (Ruisgrens)';

    DOM.sMeterDbValue.textContent = sValText;
    if (DOM.miniSignalBadge) DOM.miniSignalBadge.textContent = sValText.split(' ')[0];
  }

  function drawWaterfall(ctx, canvas, bufCtx, waterfallBuffer, dataArray) {
    const width = canvas.width;
    const height = canvas.height;

    // 1. Schuif bestaande waterval 2 pixels omlaag
    bufCtx.drawImage(canvas, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(waterfallBuffer, 0, 2);

    // 2. Teken de nieuwe bovenste regel
    const sliceWidth = width / dataArray.length;
    for (let i = 0; i < dataArray.length; i++) {
      const val = dataArray[i];
      // Radar kleurenpalet: diepblauw -> cyaan -> geel -> rood
      let r = 0, g = 0, b = 0;
      if (val < 64) {
        b = Math.floor((val / 64) * 255);
      } else if (val < 140) {
        g = Math.floor(((val - 64) / 76) * 242);
        b = 254;
      } else if (val < 200) {
        r = Math.floor(((val - 140) / 60) * 255);
        g = 220;
        b = 50;
      } else {
        r = 255;
        g = Math.floor(255 - ((val - 200) / 55) * 200);
        b = 50;
      }

      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(i * sliceWidth, 0, sliceWidth + 1, 2);
    }
  }

  function drawSpectrum(ctx, canvas, dataArray) {
    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = '#04070d';
    ctx.fillRect(0, 0, width, height);

    const barWidth = (width / dataArray.length) * 1.8;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = (dataArray[i] / 255) * height;
      const grad = ctx.createLinearGradient(0, height, 0, 0);
      grad.addColorStop(0, '#00e676');
      grad.addColorStop(0.6, '#00f2fe');
      grad.addColorStop(1, '#ff3366');

      ctx.fillStyle = grad;
      ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
      x += barWidth;
      if (x > width) break;
    }
  }

  function drawOscilloscope(ctx, canvas, dataArray) {
    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = '#04070d';
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00f2fe';
    ctx.beginPath();

    const sliceWidth = width / dataArray.length;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * height) / 2;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();
  }

  function drawIdleCanvas(ctx, canvas) {
    ctx.fillStyle = '#04070d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 242, 254, 0.15)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('STANDBY • START ONTVANGST OM SPECTRUM TE ZIEN', canvas.width / 2, canvas.height / 2 + 4);
  }

  // ==========================================================================
  // 11. EVENT HANDLERS & BINDINGS
  // ==========================================================================
  function bindEvents() {
    // 1. Weergave Knoppen
    DOM.btnViewVoorkant.addEventListener('click', () => setViewMode('voorkant'));
    DOM.btnViewAchterkant.addEventListener('click', () => setViewMode('achterkant'));
    DOM.btnViewSplit.addEventListener('click', () => setViewMode('split'));
    DOM.btnBackToVoorkant.addEventListener('click', () => setViewMode('voorkant'));

    // 2. Kanaal selectie in de lijst (Event delegation)
    DOM.channelList.addEventListener('click', (e) => {
      const favBtn = e.target.closest('.card-fav-btn');
      if (favBtn) {
        e.stopPropagation();
        const favId = favBtn.dataset.favId;
        toggleFavorite(favId);
        return;
      }

      const card = e.target.closest('.channel-card');
      if (card) {
        const id = card.dataset.id;
        selectChannel(id, true);
      }
    });

    // 3. Mini-HUD Knoppen
    DOM.btnMiniPlay.addEventListener('click', togglePlayback);
    DOM.btnMiniPrev.addEventListener('click', tunePreviousChannel);
    DOM.btnMiniNext.addEventListener('click', tuneNextChannel);
    DOM.btnMiniToCockpit.addEventListener('click', () => setViewMode('achterkant'));
    DOM.btnMiniSquelch.addEventListener('click', toggleSquelchQuick);
    DOM.btnMiniRoger.addEventListener('click', toggleRogerBeepQuick);

    // 4. Cockpit Knoppen
    DOM.btnMainPlay.addEventListener('click', togglePlayback);
    DOM.btnMainFav.addEventListener('click', () => toggleFavorite(state.activeChannelId));
    DOM.btnTuneUp.addEventListener('click', () => nudgeFrequency(0.025));
    DOM.btnTuneDown.addEventListener('click', () => nudgeFrequency(-0.025));
    DOM.btnTuneUpFast.addEventListener('click', () => nudgeFrequency(1.000));
    DOM.btnTuneDownFast.addEventListener('click', () => nudgeFrequency(-1.000));

    // Sliders
    DOM.volumeSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      state.volume = val / 100;
      DOM.volText.textContent = `${val}%`;
      if (state.masterGain && state.audioCtx) {
        state.masterGain.gain.setValueAtTime(state.volume, state.audioCtx.currentTime);
      }
      saveStoredPreferences();
    });

    DOM.squelchSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      state.squelch = val / 100;
      DOM.sqlText.textContent = `${val}%`;
      updateNoiseLevel();
      saveStoredPreferences();
    });

    // DSP Knoppen
    DOM.btnToggleRoger.addEventListener('click', () => {
      state.rogerBeep = !state.rogerBeep;
      updateDspButtonsUI();
      saveStoredPreferences();
      showToast(state.rogerBeep ? '🔔 Roger Beep Ingeschakeld' : '🔕 Roger Beep Uitgeschakeld');
    });

    DOM.btnToggleNoise.addEventListener('click', () => {
      state.noise = !state.noise;
      updateDspButtonsUI();
      updateNoiseLevel();
      saveStoredPreferences();
      showToast(state.noise ? '📻 Etherruis AAN' : '🔇 Etherruis UIT');
    });

    // PTT Knop (Mousedown / Mouseup & Touchstart / Touchend)
    DOM.btnPttMic.addEventListener('mousedown', startPttTransmission);
    window.addEventListener('mouseup', stopPttTransmission);
    DOM.btnPttMic.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startPttTransmission();
    });
    window.addEventListener('touchend', stopPttTransmission);

    // Visualizer Modus Knoppen
    DOM.visModeWaterfall.addEventListener('click', () => setVisMode('waterfall'));
    DOM.visModeSpectrum.addEventListener('click', () => setVisMode('spectrum'));
    DOM.visModeOscilloscope.addEventListener('click', () => setVisMode('oscilloscope'));

    // MP3 Opnamestudio
    DOM.btnRecordToggle.addEventListener('click', toggleRecording);
    DOM.chkAutoDownload.addEventListener('change', saveStoredPreferences);

    // Filters & Zoeken
    DOM.channelSearch.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      DOM.btnClearSearch.style.display = state.searchQuery ? 'flex' : 'none';
      renderChannelList();
    });

    DOM.btnClearSearch.addEventListener('click', () => {
      state.searchQuery = '';
      DOM.channelSearch.value = '';
      DOM.btnClearSearch.style.display = 'none';
      renderChannelList();
    });

    DOM.catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        DOM.catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.filterCategory = pill.dataset.category;
        renderChannelList();
      });
    });

    DOM.bandPills.forEach(pill => {
      pill.addEventListener('click', () => {
        DOM.bandPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.filterBand = pill.dataset.band;
        renderChannelList();
      });
    });

    DOM.btnResetFilters.addEventListener('click', () => {
      state.filterCategory = 'all';
      state.filterBand = '';
      state.searchQuery = '';
      DOM.channelSearch.value = '';
      DOM.btnClearSearch.style.display = 'none';
      DOM.catPills.forEach(p => p.classList.toggle('active', p.dataset.category === 'all'));
      DOM.bandPills.forEach(p => p.classList.toggle('active', p.dataset.band === ''));
      renderChannelList();
    });

    DOM.btnReloadChannels.addEventListener('click', () => {
      renderChannelList();
      showToast('↻ Kanalenlijst ververst');
    });

    // Modals
    DOM.btnOpenHelp.addEventListener('click', openHelpModal);
    DOM.btnCloseHelp.addEventListener('click', closeHelpModal);
    DOM.btnModalCloseDone.addEventListener('click', closeHelpModal);
    DOM.helpModal.addEventListener('click', (e) => {
      if (e.target === DOM.helpModal) closeHelpModal();
    });

    DOM.helpTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        DOM.helpTabs.forEach(t => t.classList.remove('active'));
        DOM.helpPanes.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const targetPane = document.getElementById('helpTab' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1));
        if (targetPane) targetPane.classList.add('active');
      });
    });

    DOM.btnOpenFavs.addEventListener('click', openFavoritesModal);
    DOM.btnCloseFavs.addEventListener('click', closeFavoritesModal);
    DOM.btnCloseFavsDone.addEventListener('click', closeFavoritesModal);
    DOM.favoritesModal.addEventListener('click', (e) => {
      if (e.target === DOM.favoritesModal) closeFavoritesModal();
    });
    DOM.btnClearAllFavs.addEventListener('click', () => {
      if (confirm('Weet u zeker dat u alle favorieten wilt wissen?')) {
        state.favorites = [];
        saveStoredPreferences();
        renderFavoritesModalList();
        renderChannelList();
        showToast('Favorieten gewist');
      }
    });

    // Versie Pill Klik
    DOM.verPill.addEventListener('click', checkAppVersion);

    // Toetsenbord Sneltoetsen
    window.addEventListener('keydown', handleKeyboardShortcuts);
  }

  function handleKeyboardShortcuts(e) {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    switch (e.key) {
      case ' ':
        e.preventDefault();
        togglePlayback();
        break;
      case 'm':
      case 'M':
        toggleMute();
        break;
      case 'f':
      case 'F':
        toggleFavorite(state.activeChannelId);
        break;
      case 'r':
      case 'R':
        tuneRandomChannel();
        break;
      case 's':
      case 'S':
        toggleSquelchQuick();
        break;
      case 'b':
      case 'B':
        toggleRogerBeepQuick();
        break;
      case '1':
        setViewMode('voorkant');
        break;
      case '2':
        setViewMode('achterkant');
        break;
      case '3':
        setViewMode('split');
        break;
      case 'Escape':
        closeHelpModal();
        closeFavoritesModal();
        break;
    }
  }

  // ==========================================================================
  // 12. CONTROLLER LOGICA
  // ==========================================================================
  function togglePlayback() {
    resumeAudioContextIfNeeded();
    state.isPlaying = !state.isPlaying;

    if (state.isPlaying) {
      playTxClick();
      updateNoiseLevel();
      triggerRadioChatter();
      showToast('▶️ Ontvangst gestart');
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      clearTimeout(state.chatterTimeout);
      updateNoiseLevel();
      showToast('⏹️ Ontvangst gestopt');
    }

    updateCockpitUI();
    updateMiniHud();
    renderChannelList();
  }

  function toggleMute() {
    if (state.volume > 0) {
      state.volume = 0;
      DOM.volumeSlider.value = 0;
      DOM.volText.textContent = '0%';
      showToast('🔇 Geluid gedempt');
    } else {
      state.volume = 0.8;
      DOM.volumeSlider.value = 80;
      DOM.volText.textContent = '80%';
      showToast('🔊 Geluid hersteld');
    }
    if (state.masterGain && state.audioCtx) {
      state.masterGain.gain.setValueAtTime(state.volume, state.audioCtx.currentTime);
    }
    saveStoredPreferences();
  }

  function toggleFavorite(channelId) {
    const idx = state.favorites.indexOf(channelId);
    if (idx >= 0) {
      state.favorites.splice(idx, 1);
      showToast('★ Verwijderd uit favorieten');
    } else {
      state.favorites.push(channelId);
      showToast('⭐ Toegevoegd aan favorieten');
    }
    saveStoredPreferences();
    renderChannelList();
    updateCockpitUI();
  }

  function toggleSquelchQuick() {
    state.squelch = state.squelch > 0.1 ? 0 : 0.4;
    DOM.squelchSlider.value = Math.round(state.squelch * 100);
    DOM.sqlText.textContent = `${Math.round(state.squelch * 100)}%`;
    updateNoiseLevel();
    updateMiniHud();
    saveStoredPreferences();
    showToast(state.squelch > 0 ? '🔇 Squelch Actief' : '🔊 Squelch Open (Ruis)');
  }

  function toggleRogerBeepQuick() {
    state.rogerBeep = !state.rogerBeep;
    updateDspButtonsUI();
    updateMiniHud();
    saveStoredPreferences();
    showToast(state.rogerBeep ? '🔔 Roger Beep AAN' : '🔕 Roger Beep UIT');
  }

  function tuneNextChannel() {
    const currentIndex = CHANNELS.findIndex(c => c.id === state.activeChannelId);
    const nextIndex = (currentIndex + 1) % CHANNELS.length;
    selectChannel(CHANNELS[nextIndex].id, true);
  }

  function tunePreviousChannel() {
    const currentIndex = CHANNELS.findIndex(c => c.id === state.activeChannelId);
    const prevIndex = (currentIndex - 1 + CHANNELS.length) % CHANNELS.length;
    selectChannel(CHANNELS[prevIndex].id, true);
  }

  function tuneRandomChannel() {
    const rand = CHANNELS[Math.floor(Math.random() * CHANNELS.length)];
    selectChannel(rand.id, true);
    showToast(`🎲 Willekeurige frequentie: ${rand.name}`);
  }

  function nudgeFrequency(deltaMhz) {
    const channel = getChannelById(state.activeChannelId);
    if (!channel) return;

    let currentFreq = parseFloat(channel.freq);
    currentFreq = Math.round((currentFreq + deltaMhz) * 1000) / 1000;
    channel.freq = currentFreq.toFixed(3);
    channel.freqDisplay = currentFreq.toFixed(3).replace('.', '.') + '.00';

    playTxClick();
    updateCockpitUI();
    updateMiniHud();
    showToast(`🎛️ Afgestemd op ${channel.freq} MHz`);
  }

  function setVisMode(mode) {
    state.visMode = mode;
    DOM.visModeWaterfall.classList.toggle('active', mode === 'waterfall');
    DOM.visModeSpectrum.classList.toggle('active', mode === 'spectrum');
    DOM.visModeOscilloscope.classList.toggle('active', mode === 'oscilloscope');
  }

  // ==========================================================================
  // 13. MODALS (HELP & FAVORIETEN)
  // ==========================================================================
  function openHelpModal() {
    DOM.helpModal.style.display = 'flex';
  }

  function closeHelpModal() {
    DOM.helpModal.style.display = 'none';
  }

  function openFavoritesModal() {
    renderFavoritesModalList();
    DOM.favoritesModal.style.display = 'flex';
  }

  function closeFavoritesModal() {
    DOM.favoritesModal.style.display = 'none';
  }

  function renderFavoritesModalList() {
    if (!DOM.favList) return;

    const favChannels = CHANNELS.filter(c => state.favorites.includes(c.id));

    if (favChannels.length === 0) {
      DOM.favList.innerHTML = '';
      DOM.emptyFavsState.style.display = 'flex';
      DOM.btnClearAllFavs.style.display = 'none';
      return;
    }

    DOM.emptyFavsState.style.display = 'none';
    DOM.btnClearAllFavs.style.display = 'inline-flex';

    DOM.favList.innerHTML = favChannels.map(c => `
      <div class="channel-card" style="margin-bottom:8px;">
        <div class="card-left">
          <div class="device-avatar">${c.deviceIcon}</div>
          <div class="card-info">
            <span class="card-freq">${c.freq} MHz • ${c.mod}</span>
            <span class="card-name">${escapeHtml(c.name)}</span>
            <span class="card-subtext">${escapeHtml(c.location)}</span>
          </div>
        </div>
        <div class="card-right">
          <button class="pill-btn primary-pill" onclick="window.tuneFromFav('${c.id}')">Luister</button>
        </div>
      </div>
    `).join('');
  }

  window.tuneFromFav = (id) => {
    closeFavoritesModal();
    selectChannel(id, true);
  };

  // ==========================================================================
  // 14. VERSIE & GITHUB ACTIONS INTEGRATIE (DYNAMIC FROM version.json)
  // ==========================================================================
  async function checkAppVersion() {
    try {
      const res = await fetch(`version.json?t=${Date.now()}`);
      if (!res.ok) throw new Error('Kon version.json niet laden');
      const vData = await res.json();

      if (DOM.verPillText) DOM.verPillText.textContent = `v${vData.version}`;
      if (DOM.subbarVerText) DOM.subbarVerText.textContent = `v${vData.version} Build ${vData.build}`;
      if (DOM.helpVersionBadge) DOM.helpVersionBadge.textContent = `v${vData.version} Build ${vData.build}`;
      if (DOM.helpGitHash) DOM.helpGitHash.textContent = `#${vData.git_commit_hash || 'online'}`;

      if (DOM.helpFeaturesList && Array.isArray(vData.features)) {
        DOM.helpFeaturesList.innerHTML = vData.features.map(f => `<li>${escapeHtml(f)}</li>`).join('');
      }

    } catch (err) {
      console.warn('Versie controle via fallback:', err);
      if (DOM.verPillText) DOM.verPillText.textContent = 'v1.0.0';
    }
  }

  // ==========================================================================
  // 15. HULPFUNCTIES
  // ==========================================================================
  function getChannelById(id) {
    return CHANNELS.find(c => c.id === id) || CHANNELS[0];
  }

  function showToast(message) {
    if (!DOM.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();

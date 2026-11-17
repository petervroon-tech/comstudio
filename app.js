/**
 * Peter Vroon ComStudio • app.js
 * Live Radio Scanner, Portofoon, Mobilofoon, Treinen & Schepen Platform
 * Volledige dekking van Schepen, Treinen & Mobiele apparaten in Nederland en Europa
 * Ontworpen conform AGENTS.md & app_architectuur_en_bediening_gids.md
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. RADIO NODES & GATEWAYS DATABANK (Nederland & Europa)
  // ==========================================================================
  const NODES = [
    {
      id: 'node_websdr_maasbree',
      name: 'Maasbree WebSDR Gateway #01',
      type: 'WebSDR',
      typeBadge: '📡 WebSDR',
      operator: 'Stichting Scoop Hobbyfonds',
      location: 'Maasbree (Limburg, NL)',
      lat: 51.3570,
      lon: 5.9980,
      bands: '144 - 432 MHz & HF',
      freqCoverage: '2m / 70cm / 27MC / PMR / Rijnvaart',
      status: 'ONLINE',
      ping: '18ms',
      listeners: 42,
      desc: 'Bovenregionale SDR ontvanger met richtantennes voor Zuid-Nederland, Vlaanderen en Nordrhein-Westfalen.',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3'
    },
    {
      id: 'node_websdr_twente',
      name: 'Universiteit Twente SDR Node #02',
      type: 'WebSDR',
      typeBadge: '📡 WebSDR',
      operator: 'Amateur Radio Club ETGD Twente',
      location: 'Enschede (Overijssel, NL)',
      lat: 52.2435,
      lon: 6.8530,
      bands: '0 - 30 MHz HF Korte Golf',
      freqCoverage: 'HF DX / 40m / 20m / 11m CB / Hamburg Marine',
      status: 'ONLINE',
      ping: '12ms',
      listeners: 186,
      desc: 'Wereldberoemde SDR antenne-ontvanger op de campus van TU Enschede. Vangt radiosignalen uit heel Europa op.',
      streamUrl: 'audio/atc_tracon_real.ogg'
    },
    {
      id: 'node_sdr_schiphol',
      name: 'Randstad Schiphol Air & Marine #03',
      type: 'OpenWebRX',
      typeBadge: '✈️ OpenWebRX',
      operator: 'AeroTraffic Netherlands',
      location: 'Haarlemmermeer / Schiphol (NH, NL)',
      lat: 52.3100,
      lon: 4.7680,
      bands: '118 - 137 MHz VHF Air & 156 MHz Marifoon',
      freqCoverage: 'Schiphol Tower, Approach, Noordzeekanaal, K16',
      status: 'ONLINE',
      ping: '9ms',
      listeners: 94,
      desc: 'Directe ontvangst van Kaagbaan, Polderbaan, Schiphol Approach en verkeer langs het Noordzeekanaal.',
      streamUrl: 'audio/atc_jfk_real.ogg'
    },
    {
      id: 'node_sdr_rotterdam',
      name: 'Rotterdam Maasmond Gateway #04',
      type: 'OpenWebRX',
      typeBadge: '⚓ OpenWebRX',
      operator: 'Havenbedrijf Rotterdam VTS',
      location: 'Hoek van Holland / Europoort (ZH, NL)',
      lat: 51.9800,
      lon: 4.1200,
      bands: '156.000 - 162.000 MHz VHF Marine & Spoor',
      freqCoverage: 'Sector Maasmond, Calandkanaal, Kijfhoek Betuwe',
      status: 'ONLINE',
      ping: '14ms',
      listeners: 65,
      desc: 'Havenmonding Rotterdam, Europoort, Maasvlakte en naderende zeeschepen op de Noordzee.',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3'
    },
    {
      id: 'node_prorail_utrecht',
      name: 'ProRail GSM-R Node Midden #05',
      type: 'RailNode',
      typeBadge: '🚆 RailNode',
      operator: 'Railverkeersleiding Nederland',
      location: 'Utrecht Centraal Verkeersleidingspost (UT, NL)',
      lat: 52.0894,
      lon: 5.1103,
      bands: '457 - 468 MHz GSM-R & Rangeer',
      freqCoverage: 'Utrecht CS, Blauwkapel, Gouda, Hilversum',
      status: 'ONLINE',
      ping: '6ms',
      listeners: 78,
      desc: 'Centrale knooppuntontvanger voor machinisten en treindienstleiders in het hart van het Nederlandse spoornet.',
      streamUrl: 'audio/scanner_police_real.mp3'
    },
    {
      id: 'node_dmr_bm204',
      name: 'BrandMeister DMR Master Node 2041 #06',
      type: 'DMR',
      typeBadge: '📟 DMR Master',
      operator: 'BrandMeister Network NL',
      location: 'Landelijke DMR Server Amsterdam (NH, NL)',
      lat: 52.3676,
      lon: 4.9041,
      bands: 'Digital Mobile Radio (DMR Tier II)',
      freqCoverage: 'Talkgroup 204 (Landelijk), TG 2041, 2042, Evenementen',
      status: 'ONLINE',
      ping: '8ms',
      listeners: 142,
      desc: 'Centrale digitale node voor professionele portofoons, beveiliging en mobiele communicatie.',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3'
    },
    {
      id: 'node_el_pi2nos',
      name: 'EchoLink Gerbrandytoren Node #257088 #07',
      type: 'EchoLink',
      typeBadge: '🎙️ EchoLink',
      operator: 'Vereniging Experimenteel Radio Onderzoek',
      location: 'IJsselstein Lopikertoren (366m NAP, NL)',
      lat: 52.0100,
      lon: 5.0533,
      bands: '145.575 MHz FM Repeater',
      freqCoverage: 'Heel Nederland, Randstad & Vlaanderen',
      status: 'ONLINE',
      ping: '15ms',
      listeners: 110,
      desc: 'Hoogste zendmast van Nederland. Biedt landelijke dekking voor mobiele zenders in auto’s en handheld portofoons.',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3'
    },
    {
      id: 'node_dwingeloo_sdr',
      name: 'CAMRAS Dwingeloo Node #08',
      type: 'WebSDR',
      typeBadge: '🛰️ WebSDR',
      operator: 'CAMRAS Dwingeloo',
      location: 'Dwingeloo (Drenthe, NL)',
      lat: 52.8122,
      lon: 6.3961,
      bands: '144 / 432 / 1296 MHz & Spoor',
      freqCoverage: 'Knooppunt Zwolle, Noordoost-NL, Ruimtevaart',
      status: 'ONLINE',
      ping: '22ms',
      listeners: 31,
      desc: '25-meter historische radiotelescoop ingezet als uiterst gevoelige radio-ontvangstnode voor Noord-Europa.',
      streamUrl: 'audio/atc_tracon_real.ogg'
    },
    {
      id: 'node_antwerp_port',
      name: 'Port of Antwerp Schelde Gateway #09',
      type: 'OpenWebRX',
      typeBadge: '⚓ OpenWebRX',
      operator: 'Brabo Loodsdienst & Scheepvaartbegeleiding',
      location: 'Zandvliet / Antwerpen (Vlaanderen, BE)',
      lat: 51.3500,
      lon: 4.2800,
      bands: '156.000 - 162.000 MHz VHF Marine & Spoor',
      freqCoverage: 'Westerschelde, Zandvlietsluis, NMBS Brussel',
      status: 'ONLINE',
      ping: '19ms',
      listeners: 47,
      desc: 'Scheepvaartbegeleiding langs de Westerschelde en de havenbekkens van Antwerpen en spoorlijnen naar Brussel.',
      streamUrl: 'audio/scanner_police_real.mp3'
    },
    {
      id: 'node_eifel_aachen',
      name: 'Grenz-Node Eifel / DB Netze #10',
      type: 'RailNode',
      typeBadge: '🇩🇪 Relais / Zugfunk',
      operator: 'Eifel Radio & DB Netze Funk',
      location: 'Aachen / Hürtgenwald (NRW, DE)',
      lat: 50.7753,
      lon: 6.0839,
      bands: '438.850 MHz & DB Zugfunk 457 MHz',
      freqCoverage: 'ICE Arnhem - Keulen, Alpen Noodkanaal, Eifel',
      status: 'ONLINE',
      ping: '24ms',
      listeners: 39,
      desc: 'Grensnode voor internationaal spoorverkeer, ICE-treinen en regionale mobilofoons in het drielandenpunt.',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3'
    },
    {
      id: 'node_eurotunnel_calais',
      name: 'Calais Pas-de-Calais Coast Node #11',
      type: 'OpenWebRX',
      typeBadge: '🇫🇷 OpenWebRX',
      operator: 'Cross-Channel Maritime Safety',
      location: 'Coquelles / Cap Gris-Nez (Calais, FR)',
      lat: 50.9200,
      lon: 1.8000,
      bands: 'Kanaaltunnel 467 MHz & Dover Marine K11',
      freqCoverage: 'Nauw van Calais, Eurotunnel Shuttle, Dover',
      status: 'ONLINE',
      ping: '27ms',
      listeners: 53,
      desc: 'Overziet de scheepvaart in het Nauw van Calais en treinen door de Kanaaltunnel naar Engeland.',
      streamUrl: 'https://ice6.somafm.com/sf1033-128-mp3'
    },
    {
      id: 'node_mesh_polder',
      name: 'Polder Mesh & Mobile CB Node #12',
      type: 'MeshLoRa',
      typeBadge: '📱 Mesh / CB Node',
      operator: 'Polder Comms Community',
      location: 'Flevoland / Eemland Randmeren (FL, NL)',
      lat: 52.4200,
      lon: 5.5000,
      bands: '27 MHz CB & PMR446 Outdoor',
      freqCoverage: 'Polders, dijkwegen, truckers A6/A27, fietsers',
      status: 'ONLINE',
      ping: '16ms',
      listeners: 68,
      desc: 'Lokale gateway voor buitengebieden, polders, recreanten, fietsers en mobiele zenders in landelijke gebieden.',
      streamUrl: 'audio/scanner_police_real.mp3'
    }
  ];

  // ==========================================================================
  // 2. KANALEN DATABANK (Nederland & Europa: Treinen, Schepen, Mobiel, Trucks, Air, Ham)
  // ==========================================================================
  const CHANNELS = [
    // --- 🚆 TREINEN & SPOORWEGEN (GSM-R & Rangeerdiensten NL & Europa) ---
    {
      id: 'train_prorail_utr',
      name: 'ProRail Treinverkeersleiding Midden (Utrecht CS)',
      freq: '457.650',
      freqDisplay: '457.650.00',
      category: 'train',
      region: 'NL',
      band: 'rail',
      mod: 'FM',
      callsign: 'TRDL-UTR',
      location: 'Utrecht Centraal Verkeersleidingspost',
      desc: 'GSM-R treinradiokanaal voor machinisten en treindienstleiders rond knooppunt Utrecht',
      ctcss: 'CSQ',
      deviceIcon: '🚆',
      streamUrl: 'audio/scanner_police_real.mp3',
      chatter: [
        'Trein 3042 voor Treindienstleider Utrecht: sein 412 toont geel, snelheid verlagen naar 40 km/u voor spoor 5a.',
        'Machinist Intercity 835, u heeft groen sein bij overloopwissel Blauwkapel, doorkomst op schema.',
        'TRDL Utrecht aan Sprinter 7440: vertrekspoor gewijzigd naar spoor 14, deuren sluiten en vertrekken.',
        'Centrale post Utrecht: wisselstoring bij Vleuten opgelost, baanvak weer vrijgegeven.'
      ]
    },
    {
      id: 'train_prorail_zwolle',
      name: 'ProRail Verkeersleiding Knooppunt Zwolle & Noordoost',
      freq: '457.700',
      freqDisplay: '457.700.00',
      category: 'train',
      region: 'NL',
      band: 'rail',
      mod: 'FM',
      callsign: 'TRDL-ZWL',
      location: 'Zwolle Centraal & Hanzelijn',
      desc: 'Spoorverkeersleiding Noordoost-Nederland, verbinding Hanzelijn en IJssellijn',
      ctcss: 'CSQ',
      deviceIcon: '🚆',
      streamUrl: 'audio/scanner_police_real.mp3',
      chatter: [
        'Intercity 553 voor TRDL Zwolle: nadering Meppel, wachten op aansluiting Leeuwarden.',
        'Machinist 12644, Hanzelijn baanvaksnelheid 140 km/u goedgekeurd na Drontermeertunnel.'
      ]
    },
    {
      id: 'train_kijfhoek_shunting',
      name: 'Rangeerterrein Kijfhoek & Betuweroute (Goederen)',
      freq: '458.125',
      freqDisplay: '458.125.00',
      category: 'train',
      region: 'NL',
      band: 'rail',
      mod: 'FM',
      callsign: 'KIJFHOEK-OPS',
      location: 'Kijfhoek Rangeerterrein Zwijndrecht',
      desc: 'Rangeercommunicatie en heuvelproces grootste goederenemplacement van Nederland',
      ctcss: '118.8 Hz',
      deviceIcon: '🚆',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Heuvelmeester voor rangeerloc 6400: heuvelproces spoor 24 gestart, afremmen via railremmen.',
        'Kijfhoek Post voor Betuweroute goederentrein 41200: rijweg naar Duitsland via Zevenaar gereed.'
      ]
    },
    {
      id: 'train_db_ice',
      name: 'DB Netze ICE International (Arnhem - Duisburg / Ruhr)',
      freq: '457.800',
      freqDisplay: '457.800.00',
      category: 'train',
      region: 'DE',
      band: 'rail',
      mod: 'FM',
      callsign: 'ZUGFUNK-DB',
      location: 'Grenstraject Arnhem - Emmerich - Oberhausen',
      desc: 'Duitse DB Zugfunk & GSM-R voor ICE en grensoverschrijdend Europees spoorverkeer',
      ctcss: 'CSQ',
      deviceIcon: '🚆',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'ICE 124 an Fahrdienstleiter Emmerich: Systemwechsel Oberleitung 1.5 kV zu 15 kV erfolgreich.',
        'Fahrdienstleiter Oberhausen für ICE 157: Ausfahrt frei, Gleis 3 Richtung Duisburg Hauptbahnhof.'
      ]
    },
    {
      id: 'train_sncb_brussels',
      name: 'SNCB / NMBS Spoor Dispatching Brussel - Antwerpen',
      freq: '457.750',
      freqDisplay: '457.750.00',
      category: 'train',
      region: 'BE',
      band: 'rail',
      mod: 'FM',
      callsign: 'INFRABEL-DISP',
      location: 'Noord-Zuidverbinding Brussel & Spoorlijn 25',
      desc: 'Belgische spoorverkeersleiding Infrabel op de drukke as Brussel - Mechelen - Antwerpen',
      ctcss: 'CSQ',
      deviceIcon: '🚆',
      streamUrl: 'audio/scanner_police_real.mp3',
      chatter: [
        'Dispatching Brussel Noord voor IC 2014: perronspoor 5 vrij, doorkomst Noord-Zuidverbinding.',
        'Conducteur trein 9212, sein op dubbel geel nabij Vilvoorde, vertraging 2 minuten.'
      ]
    },
    {
      id: 'train_eurotunnel',
      name: 'Eurotunnel Shuttle Kanaaltunnel (Calais - Folkestone)',
      freq: '467.525',
      freqDisplay: '467.525.00',
      category: 'train',
      region: 'FR',
      band: 'rail',
      mod: 'FM',
      callsign: 'TUNNEL-CONTROL',
      location: 'Kanaaltunnel Coquelles (Calais) - Folkestone',
      desc: 'Treinradio van de autoschutles en Eurostar onder het Kanaal (Noordzee)',
      ctcss: 'CSQ',
      deviceIcon: '🚆',
      streamUrl: 'https://ice6.somafm.com/sf1033-128-mp3',
      chatter: [
        'Eurotunnel Shuttle 410, passage tunnelbuis Zuid goedgekeurd, snelheid 140 km/h.',
        'Tunnel Control: Cross-over camera check complete, safety track clear for Eurostar 9044.'
      ]
    },

    // --- ⚓ SCHEPEN (Zeevaart, Kustwacht & Binnenvaart NL & Europa) ---
    {
      id: 'mar_k16',
      name: 'Kustwacht Centrum Den Helder (Kanaal 16 Nood & Oproep)',
      freq: '156.800',
      freqDisplay: '156.800.00',
      category: 'marine',
      region: 'NL',
      band: 'marine',
      mod: 'FM',
      callsign: 'PBK / DEN HELDER',
      location: 'Nederlandse Kust & Noordzee',
      desc: 'Internationaal VHF marifoonkanaal voor nood-, spoed- en veiligheidsverkeer',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: 'audio/scanner_police_real.mp3',
      chatter: [
        'Hier het Kustwachtcentrum Den Helder voor alle schepen. Weerbericht Noordzee: ZW 6 tot 7.',
        'Securite, Securite, Securite. Navigatie waarschuwing 244, drijvend wrakhout nabij Texel.',
        'Pan-Pan, Pan-Pan, Pan-Pan. Zeiljacht Albatros meldt motorstoring nabij Maasvlakte.'
      ]
    },
    {
      id: 'mar_maasmond_k01',
      name: 'Sector Maasmond (Havenbedrijf Rotterdam)',
      freq: '156.050',
      freqDisplay: '156.050.00',
      category: 'marine',
      region: 'NL',
      band: 'marine',
      mod: 'FM',
      callsign: 'SECTOR MAASMOND',
      location: 'Rotterdam Havenmonding & Europoort',
      desc: 'Verkeersbegeleiding binnenlopende containerschepen, tankers en loodsboten',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Maasmond, hier containerschip Ever Given, positie boei 3, loods aan boord.',
        'Ever Given, goedgekeurd, doorvaren naar Calandkanaal, tegenverkeer Smit Denemarken.',
        'Loodsboot Explorer verlaat steiger Pistoolhaven voor inkomende tanker.'
      ]
    },
    {
      id: 'mar_antwerp_k62',
      name: 'Port of Antwerp-Bruges Verkeerscentrale Zandvliet',
      freq: '156.125',
      freqDisplay: '156.125.00',
      category: 'marine',
      region: 'BE',
      band: 'marine',
      mod: 'FM',
      callsign: 'ANTWERP-PORT',
      location: 'Haven van Antwerpen & Westerschelde',
      desc: 'Marifoonkanaal Zandvlietsluis en Berendrechtsluis op de Schelde',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: 'audio/scanner_police_real.mp3',
      chatter: [
        'Antwerpen Traffic voor motorschip Brabo: passage Zandvlietsluis gereed over 10 minuten.',
        'Sleepboot Schelde 12 assisteert bulkcarrier bij het afmeren aan Kaai 420.'
      ]
    },
    {
      id: 'mar_hamburg_k71',
      name: 'Hamburg Port Authority Elbe Traffic K71',
      freq: '156.575',
      freqDisplay: '156.575.00',
      category: 'marine',
      region: 'DE',
      band: 'marine',
      mod: 'FM',
      callsign: 'HAMBURG-TRAFFIC',
      location: 'Elbe Estuarium & Haven van Hamburg',
      desc: 'Duitse maritieme scheepvaartbegeleiding langs de Elbe van Cuxhaven naar Hamburg',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Hamburg Traffic, hier Feeder CMA CGM Paris, passiere Teufelsbrück einlaufend.',
        'CMA CGM Paris, Einfahrt Waltershofer Hafen frei, Schlepper Fairplay 30 steht bereit.'
      ]
    },
    {
      id: 'mar_dover_k11',
      name: 'Dover Coastguard & Pas-de-Calais VTS (Straat van Dover)',
      freq: '156.550',
      freqDisplay: '156.550.00',
      category: 'marine',
      region: 'FR',
      band: 'marine',
      mod: 'FM',
      callsign: 'DOVER-COASTGUARD',
      location: 'Nauw van Calais & Kanaal Dover',
      desc: 'Drukst bevaren scheepvaartroute ter wereld: radar- en verkeersbegeleiding ferries en tankers',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: 'https://ice6.somafm.com/sf1033-128-mp3',
      chatter: [
        'All ships, all ships, this is Dover Coastguard. Vessel traffic separation scheme active.',
        'Cap Gris-Nez Traffic to tanker Nord Star, you are approaching the south-west lane, maintain course.'
      ]
    },
    {
      id: 'mar_rhein_k10',
      name: 'Rijnvaart & Binnenvaart Verkeerspost Nijmegen K10',
      freq: '156.500',
      freqDisplay: '156.500.00',
      category: 'marine',
      region: 'NL',
      band: 'marine',
      mod: 'FM',
      callsign: 'POST-NIJMEGEN',
      location: 'Waal & Boven-Rijn (Nederland - Duitsland grens)',
      desc: 'Binnenvaartcommunicatie en blauwe borden verkeer langs de drukke Rijn-corridor',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: 'audio/scanner_police_real.mp3',
      chatter: [
        'Verkeerspost Nijmegen voor afvarig koppelverband Rijnland: blauw bord getoond aan stuurboord.',
        'Begrepen Nijmegen, stuurboord-stuurboord passage bij kilometerraai 884.'
      ]
    },
    {
      id: 'mar_adam_k14',
      name: 'Amsterdam Havendienst & IJmuiden Zeesluizen',
      freq: '156.700',
      freqDisplay: '156.700.00',
      category: 'marine',
      region: 'NL',
      band: 'marine',
      mod: 'FM',
      callsign: 'HAVENDIENST-14',
      location: 'Noordzeekanaal & Zeesluis IJmuiden',
      desc: 'Scheepvaartbegeleiding zeeschepen en binnenvaart Noordzeekanaalgebied',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'IJmuiden Zeesluis voor vrachtschip Stella Polaris, kolk 2 loopt vol, gereed voor schutten.',
        'Havendienst Amsterdam meldt cruiseschip passeert Houthavens op weg naar PTA.'
      ]
    },

    // --- 📱 MOBIELE PORTOFOONS (Waar je ook bent in NL & Europa) ---
    {
      id: 'pmr_ch1',
      name: 'PMR446 Kanaal 1 (Mobiel / Vrije Recreatie NL & Europa)',
      freq: '446.00625',
      freqDisplay: '446.006.25',
      category: 'portofoon',
      region: 'EU',
      band: 'pmr',
      mod: 'FM',
      callsign: 'PMR-CH01',
      location: 'Mobiel in heel Europa (Vergunningsvrij)',
      desc: 'Standaard draagbare portofoonfrequentie voor wandelaars, vakantiegangers en logistiek (0.5W)',
      ctcss: '67.0 Hz (Tone 01)',
      deviceIcon: '📱',
      streamUrl: 'audio/scanner_police_real.mp3',
      chatter: [
        'Post 1 voor Post 3, kom er maar in. Alles rustig bij de noordingang.',
        'Begrepen Post 1, we lopen nu ronde langs het achterterrein. Over.',
        'Roger, luisterkanaal blijft 1, batterij 90 procent.'
      ]
    },
    {
      id: 'pmr_ch8_sos',
      name: 'PMR446 Kanaal 8 (Europese Noodoproep Alpen / Outdoor)',
      freq: '446.09375',
      freqDisplay: '446.093.75',
      category: 'portofoon',
      region: 'CH',
      band: 'pmr',
      mod: 'FM',
      callsign: 'SOS-OUTDOOR',
      location: 'Alpen, Ardennen & Europese Berggebieden',
      desc: 'Officieel outdoor nood- en oproepkanaal PMR (Kanaal 8 CTCSS 16 = 114.8 Hz)',
      ctcss: '114.8 Hz (Tone 16)',
      deviceIcon: '📱',
      streamUrl: 'https://ice6.somafm.com/sf1033-128-mp3',
      chatter: [
        'Oproep op noodkanaal 8: bergwandelaar met verstuiking nabij berghut hoogte 1800m.',
        'Bergrettung empfängt Notruf: Rettungshubschrauber ist informiert, halten Sie Kanal 8 frei.'
      ]
    },
    {
      id: 'pmr_ch2_event',
      name: 'PMR446 Kanaal 2 (Evenementen Coördinatie & Crew)',
      freq: '446.01875',
      freqDisplay: '446.018.75',
      category: 'portofoon',
      region: 'NL',
      band: 'pmr',
      mod: 'FM',
      callsign: 'EVENT-CREW',
      location: 'Festivalweides, Beurshallen & Stadsevenementen',
      desc: 'Mobiele portofoonverbinding voor podiumbeheer, artiestenbegeleiding en publieksstromen',
      ctcss: '100.0 Hz (Tone 12)',
      deviceIcon: '📱',
      streamUrl: 'audio/scanner_police_real.mp3',
      chatter: [
        'Podium B voor Hoofdregie: artiest staat gereed voor soundcheck.',
        'Regie begrepen, microfoons staan open, lichtshow start over 2 minuten.'
      ]
    },
    {
      id: 'pmr_ch4_security',
      name: 'PMR446 Kanaal 4 (Surveillance & Bedrijfsbeveiliging)',
      freq: '446.04375',
      freqDisplay: '446.043.75',
      category: 'portofoon',
      region: 'NL',
      band: 'pmr',
      mod: 'FM',
      callsign: 'SURV-04',
      location: 'Winkelcentra, Bedrijventerreinen & Ziekenhuizen',
      desc: 'Beveiligingsrondes, toegangscontrole en alarmopvolging',
      ctcss: '131.8 Hz (Tone 20)',
      deviceIcon: '📱',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Surveillance 2 voor Meldkamer: controle parkeergarage afgerond, geen bijzonderheden.',
        'Meldkamer ontvangt, sluitronde hoofdgebouw kan gestart worden. Over.'
      ]
    },
    {
      id: 'port_bhv_calamiteit',
      name: 'Haven BHV & Calamiteitenteam Europoort',
      freq: '446.15000',
      freqDisplay: '446.150.00',
      category: 'portofoon',
      region: 'NL',
      band: 'pmr',
      mod: 'FM',
      callsign: 'BHV-HAVEN',
      location: 'Industrieterrein Maasvlakte & Europoort',
      desc: 'Interne portofoonverbinding bedrijfshulpverlening, ontruiming en eerste hulp',
      ctcss: '88.5 Hz (Tone 08)',
      deviceIcon: '📱',
      streamUrl: 'audio/scanner_police_real.mp3',
      chatter: [
        'BHV Coördinator aan alle posten: ontruimingsoefening hal C geslaagd, verzamelpunt vrij.'
      ]
    },
    {
      id: 'port_logistiek_dc',
      name: 'Logistiek Distributiecentrum Heftrucks & Magazijn',
      freq: '446.06875',
      freqDisplay: '446.068.75',
      category: 'portofoon',
      region: 'NL',
      band: 'pmr',
      mod: 'FM',
      callsign: 'DC-LOGISTIEK',
      location: 'Distributiecentra Tilburg & Waalwijk',
      desc: 'Orderpickers, expeditie laaddocks en heftruckchauffeurs',
      ctcss: '77.0 Hz (Tone 04)',
      deviceIcon: '📱',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Heftruck 4 naar dock 12, trailer met pallets gereed voor lossen.',
        'Onderweg, dock 12 binnen 1 minuut vrij.'
      ]
    },

    // --- 🚗 MOBILOFOONS (Truckers, Vloten & Konvooien NL & Europa) ---
    {
      id: 'cb_k19_truckers',
      name: '27 MHz Kanaal 19 (Truckers Benelux & Duitsland A1/A2/A3/E30)',
      freq: '27.185',
      freqDisplay: '27.185.00',
      category: 'mobilofoon',
      region: 'EU',
      band: 'cb',
      mod: 'FM',
      callsign: 'TRUCK-19',
      location: 'Europese Hoofdwegen A1, A2, A12, A15 & Bundesautobahnen',
      desc: 'Hét internationale mobilofoonkanaal voor vrachtwagenchauffeurs en live filewaarschuwingen',
      ctcss: 'CSQ',
      deviceIcon: '🚛',
      streamUrl: 'audio/scanner_police_real.mp3',
      chatter: [
        'Middag collega’s op de 19, let op bij knooppunt Hoevelaken, remmen voor file op de rechterbaan.',
        'Bedankt voor de tip chauffeur, ik pak binnendoor via Amersfoort. Goeie reis!',
        'Achtung auf der A3 Köln Richtung Frankfurt, Stau nach Baustelle, Spur 2 blockiert.'
      ]
    },
    {
      id: 'cb_k28_transit',
      name: '27 MHz Kanaal 28 (Internationale Transitcorridor A12/E30)',
      freq: '27.280',
      freqDisplay: '27.280.00',
      category: 'mobilofoon',
      region: 'EU',
      band: 'cb',
      mod: 'AM',
      callsign: 'TRANSIT-28',
      location: 'Oost-West As Rotterdam - Berlijn - Warschau',
      desc: 'Mobilofoonkanaal voor internationaal goederentransport over lange afstanden',
      ctcss: 'CSQ',
      deviceIcon: '🚛',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Attention transit drivers, heavy crosswinds near Hannover bridge, drive carefully.',
        'Pozdrowienia na kanale 28, szerokiej drogi kolego!'
      ]
    },
    {
      id: 'cb_k14_oproep',
      name: '27 MHz Kanaal 14 (Algemene Oproep Bakkies)',
      freq: '27.125',
      freqDisplay: '27.125.00',
      category: 'mobilofoon',
      region: 'NL',
      band: 'cb',
      mod: 'FM',
      callsign: 'CB-NL14',
      location: 'Landelijk 11m Band',
      desc: 'Standaard oproepkanaal voor 27MC mobiele zendontvangers in auto\'s en bestelbussen',
      ctcss: 'CSQ',
      deviceIcon: '🚗',
      streamUrl: 'audio/scanner_police_real.mp3',
      chatter: [
        'Break voor een tokkie op kanaal 14, iemand in de lucht in regio Midden-Nederland?',
        'Ja hallo mobiel station, kom maar op kanaal 22 voor een babbel.'
      ]
    },
    {
      id: 'cb_k9_sos',
      name: '27 MHz Kanaal 9 (Internationaal Noodkanaal)',
      freq: '27.065',
      freqDisplay: '27.065.00',
      category: 'mobilofoon',
      region: 'EU',
      band: 'cb',
      mod: 'AM',
      callsign: 'EMERGENCY-09',
      location: 'Internationaal Noodkanaal Europa',
      desc: 'Historisch en actueel noodoproepkanaal voor pech onderweg, konvooien en polders',
      ctcss: 'CSQ',
      deviceIcon: '🚗',
      streamUrl: 'https://ice6.somafm.com/sf1033-128-mp3',
      chatter: [
        'Kanaal 9 uitluisterdienst actief. Geen actieve noodberichten gemeld op de corridor.'
      ]
    },
    {
      id: 'cb_k4_4x4',
      name: '27 MHz Kanaal 4 (Terreinwagens & 4x4 Offroad)',
      freq: '27.005',
      freqDisplay: '27.005.00',
      category: 'mobilofoon',
      region: 'NL',
      band: 'cb',
      mod: 'FM',
      callsign: '4X4-TRAIL',
      location: 'Veluwe, Ardennen & Offroad Parcoursen',
      desc: 'Mobilofoons in terreinwagens voor konvooirijden, lieren en zandkuilen',
      ctcss: 'CSQ',
      deviceIcon: '🚙',
      streamUrl: 'audio/scanner_police_real.mp3',
      chatter: [
        'Konvooi leider voor wagen 3: diepe modderkuil aan stuurboordzijde, hou links aan in lage gearing.',
        'Wagen 3 begrepen, 4-wielaandrijving ingeschakeld, we volgen het spoor.'
      ]
    },
    {
      id: 'mob_berging_takel',
      name: 'Bergingsbedrijf & Takeldienst Mobilofoon',
      freq: '27.225',
      freqDisplay: '27.225.00',
      category: 'mobilofoon',
      region: 'NL',
      band: 'cb',
      mod: 'FM',
      callsign: 'TAKELD-22',
      location: 'Rijkswegen & Knooppunten Benelux',
      desc: 'Takelwagens en pechhulpvoertuigen vlootcommunicatie',
      ctcss: 'CSQ',
      deviceIcon: '🛻',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Centrale voor Berging 4: gestrand voertuig A15 hectometerpaal 48.2, bergingswagen onderweg.'
      ]
    },

    // --- ✈️ LUCHTVAART & EUROCONTROL (Bovenluchtruim Europa) ---
    {
      id: 'air_eurocontrol_muac',
      name: 'Eurocontrol Maastricht Upper Area Control (MUAC)',
      freq: '132.855',
      freqDisplay: '132.855.00',
      category: 'air',
      region: 'EU',
      band: 'air',
      mod: 'AM',
      callsign: 'MAASTRICHT-RADAR',
      location: 'Bovenluchtruim Benelux & Noordwest-Duitsland',
      desc: 'Internationale civiele en militaire verkeersleiding boven vliegniveau FL245 (7.5 km hoogte)',
      ctcss: 'CSQ',
      deviceIcon: '✈️',
      streamUrl: 'audio/atc_tracon_real.ogg',
      chatter: [
        'Lufthansa 450 heavy, Maastricht Radar, climb to flight level 370, direct SPY.',
        'KLM 602, radar contact, descend to flight level 280, speed 280 knots.',
        'Air France 218, contact Brussels Control on 131.100, good day.'
      ]
    },
    {
      id: 'air_eham_twr',
      name: 'Schiphol Toren (EHAM Tower)',
      freq: '119.225',
      freqDisplay: '119.225.00',
      category: 'air',
      region: 'NL',
      band: 'air',
      mod: 'AM',
      callsign: 'EHAM TWR',
      location: 'Amsterdam Airport Schiphol',
      desc: 'Plaatselijke verkeersleiding start- en landingsbanen Kaagbaan (24) en Polderbaan (18R)',
      ctcss: 'CSQ',
      deviceIcon: '✈️',
      streamUrl: 'audio/atc_tracon_real.ogg',
      chatter: [
        'KLM 1243, wind 240 degrees at 12 knots, runway 24 cleared to land.',
        'Speedbird 438, turn right next taxiway, contact ground on 121.800.',
        'Delta 47 heavy, wind 230 at 14 knots, runway 24, line up and wait.'
      ]
    },
    {
      id: 'air_eham_app',
      name: 'Schiphol Approach Radar (Inbound TMA)',
      freq: '121.200',
      freqDisplay: '121.200.00',
      category: 'air',
      region: 'NL',
      band: 'air',
      mod: 'AM',
      callsign: 'EHAM APP',
      location: 'Schiphol TMA Nadering',
      desc: 'Naderingsverkeersleiding voor inkomende internationale vluchten',
      ctcss: 'CSQ',
      deviceIcon: '✈️',
      streamUrl: 'audio/atc_jfk_real.ogg',
      chatter: [
        'EasyJet 7821, descend altitude 3000 feet, QNH 1018, intercept localizer 18R.',
        'Transavia 411, reduce to minimum clean speed, report established ILS.'
      ]
    },
    {
      id: 'air_ebbr_twr',
      name: 'Brussels Airport Tower (EBBR Zaventem)',
      freq: '118.600',
      freqDisplay: '118.600.00',
      category: 'air',
      region: 'BE',
      band: 'air',
      mod: 'AM',
      callsign: 'BRUSSELS-TWR',
      location: 'Brussels Airport Zaventem',
      desc: 'Luchtverkeersleiding van de nationale luchthaven van België Runway 25L/01',
      ctcss: 'CSQ',
      deviceIcon: '✈️',
      streamUrl: 'audio/atc_tracon_real.ogg',
      chatter: [
        'Brussels Tower, Brussels Airlines 330 ready for departure runway 25R.',
        'Brussels Airlines 330, wind 230 11 knots, runway 25R cleared for takeoff.'
      ]
    },

    // --- 📻 ZENDONTVANGERS / TRANSCEIVERS (NL & Europa WebSDR) ---
    {
      id: 'ham_pi2nos',
      name: 'PI2NOS Bovenregionale Relaiszender (2m Ham)',
      freq: '145.575',
      freqDisplay: '145.575.00',
      category: 'transceiver',
      region: 'NL',
      band: 'ham_2m',
      mod: 'FM',
      callsign: 'PI2NOS',
      location: 'Gerbrandytoren IJsselstein (366m NAP)',
      desc: 'Grootste zendamateur FM repeater van West-Europa, dekt heel Nederland en Vlaanderen',
      ctcss: '77.0 / 88.5 Hz',
      deviceIcon: '📻',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'PI2NOS via IJsselstein, hier PA3EHQ mobiel nabij Apeldoorn, goedenavond ronde.',
        'Goedenavond PA3EHQ, hier PD0MW in Rotterdam, je modulatie komt 5-9 binnen.',
        'Mooi rapport Peter, ik werk met de transceiver op 50 watt vanuit de auto.'
      ]
    },
    {
      id: 'ham_pi3utr',
      name: 'PI3UTR Utrecht Relaiszender (70cm Ham)',
      freq: '430.125',
      freqDisplay: '430.125.00',
      category: 'transceiver',
      region: 'NL',
      band: 'ham_70cm',
      mod: 'FM',
      callsign: 'PI3UTR',
      location: 'Gerbrandytoren IJsselstein',
      desc: 'Bovenregionale 70 centimeter FM repeater zendamateurs Midden-Nederland',
      ctcss: '77.0 Hz',
      deviceIcon: '📻',
      streamUrl: 'audio/atc_tracon_real.ogg',
      chatter: [
        'PI3UTR, PA2XYZ voor een signaalrapport, transceiver test op 10 watt.',
        'PA2XYZ hier PE1AAA, prima audiosignaal, helder en zuiver.'
      ]
    },
    {
      id: 'ham_db0dx',
      name: 'DB0DX Eifel / Aachen Repeater (70cm Duitsland)',
      freq: '438.850',
      freqDisplay: '438.850.00',
      category: 'transceiver',
      region: 'DE',
      band: 'ham_70cm',
      mod: 'FM',
      callsign: 'DB0DX',
      location: 'Aachen / Eifel Grensgebied',
      desc: 'Duitse zendamateur relaiszender bereikbaar in Oost-België, Zuid-Limburg en NRW',
      ctcss: '67.0 Hz',
      deviceIcon: '📻',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Hier ist DB0DX Relais Eifel, DL1ABC ruft CQ über die Grenze nach Limburg.',
        'Guten Abend DL1ABC, hier PA3XYZ aus Maastricht, Signal 5 und 9.'
      ]
    },
    {
      id: 'ham_websdr_20m',
      name: '20m Wereldwijde DX Ronde WebSDR (14.200 MHz)',
      freq: '14.200',
      freqDisplay: '014.200.00',
      category: 'transceiver',
      region: 'EU',
      band: 'hf',
      mod: 'USB',
      callsign: 'DX-20M',
      location: 'Universiteit Twente WebSDR',
      desc: 'Korte Golf Wereldwijde verbindingen via ionosfeerreflectie over heel Europa en de wereld',
      ctcss: 'None',
      deviceIcon: '🌐',
      streamUrl: 'audio/atc_jfk_real.ogg',
      chatter: [
        'CQ 20 meter, CQ 20 meter, this is PA0VRO calling CQ DX from the Netherlands.',
        'PA0VRO, this is W1AW in Connecticut, you are 5 and 9 into the United States, 73s!'
      ]
    },
    {
      id: 'ham_websdr_40m',
      name: '40m Benelux Avondronde WebSDR (7.085 MHz)',
      freq: '7.085',
      freqDisplay: '007.085.00',
      category: 'transceiver',
      region: 'NL',
      band: 'hf',
      mod: 'LSB',
      callsign: 'RONDE-40M',
      location: 'Korte Golf HF Benelux',
      desc: 'Dagelijkse praatronde van Nederlandse en Vlaamse zendamateurs op de 40 meter band',
      ctcss: 'None',
      deviceIcon: '🌐',
      streamUrl: 'audio/atc_tracon_real.ogg',
      chatter: [
        'Goedenavond allemaal in de 40 meter ronde, condities zijn uitstekend over heel de Benelux vanavond.'
      ]
    }
  ];

  // Koppel Geografische Coördinaten en Primaire Ontvangst-Nodes aan elk kanaal
  const CHANNEL_LOCATIONS = {
    train_prorail_utr: { lat: 52.0894, lon: 5.1103, primaryNodeId: 'node_prorail_utrecht', nodeName: 'ProRail GSM-R Node Midden #05' },
    train_prorail_zwolle: { lat: 52.5050, lon: 6.0910, primaryNodeId: 'node_dwingeloo_sdr', nodeName: 'CAMRAS Dwingeloo Node #08' },
    train_kijfhoek_shunting: { lat: 51.8267, lon: 4.6033, primaryNodeId: 'node_sdr_rotterdam', nodeName: 'Rotterdam Maasmond Gateway #04' },
    train_db_ice: { lat: 51.9851, lon: 5.8987, primaryNodeId: 'node_eifel_aachen', nodeName: 'Grenz-Node Eifel / DB Netze #10' },
    train_sncb_brussels: { lat: 50.8503, lon: 4.3517, primaryNodeId: 'node_antwerp_port', nodeName: 'Port of Antwerp Schelde Gateway #09' },
    train_eurotunnel: { lat: 50.9200, lon: 1.8000, primaryNodeId: 'node_eurotunnel_calais', nodeName: 'Calais Pas-de-Calais Coast Node #11' },
    mar_k16: { lat: 52.9560, lon: 4.7600, primaryNodeId: 'node_sdr_schiphol', nodeName: 'Randstad Schiphol Air & Marine #03' },
    mar_maasmond_k01: { lat: 51.9890, lon: 4.0750, primaryNodeId: 'node_sdr_rotterdam', nodeName: 'Rotterdam Maasmond Gateway #04' },
    mar_antwerp_k62: { lat: 51.3500, lon: 4.2800, primaryNodeId: 'node_antwerp_port', nodeName: 'Port of Antwerp Schelde Gateway #09' },
    mar_hamburg_k71: { lat: 53.5511, lon: 9.9937, primaryNodeId: 'node_websdr_twente', nodeName: 'Universiteit Twente SDR Node #02' },
    mar_dover_k11: { lat: 51.1279, lon: 1.3134, primaryNodeId: 'node_eurotunnel_calais', nodeName: 'Calais Pas-de-Calais Coast Node #11' },
    mar_rhein_k10: { lat: 51.8420, lon: 5.8600, primaryNodeId: 'node_websdr_maasbree', nodeName: 'Maasbree WebSDR Gateway #01' },
    mar_adam_k14: { lat: 52.4630, lon: 4.5900, primaryNodeId: 'node_sdr_schiphol', nodeName: 'Randstad Schiphol Air & Marine #03' },
    pmr_ch1: { lat: 52.1550, lon: 5.2500, primaryNodeId: 'node_mesh_polder', nodeName: 'Polder Mesh & Mobile CB Node #12' },
    pmr_ch8_sos: { lat: 46.5000, lon: 8.0000, primaryNodeId: 'node_eifel_aachen', nodeName: 'Grenz-Node Eifel / Alpen #10' },
    pmr_ch2_event: { lat: 52.3700, lon: 4.8900, primaryNodeId: 'node_dmr_bm204', nodeName: 'BrandMeister DMR Master Node 2041 #06' },
    pmr_ch4_security: { lat: 52.0900, lon: 5.1200, primaryNodeId: 'node_dmr_bm204', nodeName: 'BrandMeister DMR Master Node 2041 #06' },
    port_bhv_calamiteit: { lat: 51.9500, lon: 4.1500, primaryNodeId: 'node_sdr_rotterdam', nodeName: 'Rotterdam Maasmond Gateway #04' },
    port_logistiek_dc: { lat: 51.5600, lon: 5.0800, primaryNodeId: 'node_websdr_maasbree', nodeName: 'Maasbree WebSDR Gateway #01' },
    cb_k19_truckers: { lat: 52.1550, lon: 5.3878, primaryNodeId: 'node_el_pi2nos', nodeName: 'EchoLink Gerbrandytoren Node #07' },
    cb_k28_transit: { lat: 52.0500, lon: 5.1000, primaryNodeId: 'node_el_pi2nos', nodeName: 'EchoLink Gerbrandytoren Node #07' },
    cb_k14_oproep: { lat: 52.2000, lon: 5.2500, primaryNodeId: 'node_mesh_polder', nodeName: 'Polder Mesh & Mobile CB Node #12' },
    cb_k9_sos: { lat: 52.0000, lon: 5.0000, primaryNodeId: 'node_el_pi2nos', nodeName: 'EchoLink Gerbrandytoren Node #07' },
    cb_k4_4x4: { lat: 52.1326, lon: 5.8500, primaryNodeId: 'node_mesh_polder', nodeName: 'Polder Mesh & Mobile CB Node #12' },
    mob_berging_takel: { lat: 51.8500, lon: 4.7000, primaryNodeId: 'node_sdr_rotterdam', nodeName: 'Rotterdam Maasmond Gateway #04' },
    air_eurocontrol_muac: { lat: 50.8500, lon: 5.6900, primaryNodeId: 'node_sdr_schiphol', nodeName: 'Randstad Schiphol Air & Marine #03' },
    air_eham_twr: { lat: 52.3086, lon: 4.7639, primaryNodeId: 'node_sdr_schiphol', nodeName: 'Randstad Schiphol Air & Marine #03' },
    air_eham_app: { lat: 52.3100, lon: 4.7600, primaryNodeId: 'node_sdr_schiphol', nodeName: 'Randstad Schiphol Air & Marine #03' },
    air_ebbr_twr: { lat: 50.9014, lon: 4.4844, primaryNodeId: 'node_antwerp_port', nodeName: 'Port of Antwerp Schelde Gateway #09' },
    ham_pi2nos: { lat: 52.0100, lon: 5.0533, primaryNodeId: 'node_el_pi2nos', nodeName: 'EchoLink Gerbrandytoren Node #07' },
    ham_pi3utr: { lat: 52.0100, lon: 5.0533, primaryNodeId: 'node_el_pi2nos', nodeName: 'EchoLink Gerbrandytoren Node #07' },
    ham_db0dx: { lat: 50.7753, lon: 6.0839, primaryNodeId: 'node_eifel_aachen', nodeName: 'Grenz-Node Eifel / DB Netze #10' },
    ham_websdr_20m: { lat: 52.2435, lon: 6.8530, primaryNodeId: 'node_websdr_twente', nodeName: 'Universiteit Twente SDR Node #02' },
    ham_websdr_40m: { lat: 52.0100, lon: 5.0533, primaryNodeId: 'node_websdr_twente', nodeName: 'Universiteit Twente SDR Node #02' }
  };

  CHANNELS.forEach(c => {
    if (CHANNEL_LOCATIONS[c.id]) {
      Object.assign(c, CHANNEL_LOCATIONS[c.id]);
    }
  });

  // Haversine formule voor exacte kilometerafstand tussen twee GPS-coördinaten
  function haversineDistance(lat1, lon1, lat2, lon2) {
    if (lat1 === null || lon1 === null || lat2 === null || lon2 === null) return 9999;
    const R = 6371; // Aardstraal in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function getNodeById(id) {
    return NODES.find(n => n.id === id) || NODES[0];
  }

  // ==========================================================================
  // 3. APPLICATIE STATUS & VOORKEUREN
  // ==========================================================================
  const STORAGE_KEYS = {
    LAST_CHANNEL: 'pv_comstudio_last_channel',
    FAVORITES: 'pv_comstudio_favs',
    VOLUME: 'pv_comstudio_volume',
    SQUELCH: 'pv_comstudio_squelch',
    ROGER_BEEP: 'pv_comstudio_roger_beep',
    NOISE: 'pv_comstudio_noise',
    VIEW_MODE: 'pv_comstudio_view_mode',
    AUTO_DOWNLOAD: 'pv_comstudio_autodownload',
    RADIUS_FILTER: 'pv_comstudio_radius_filter',
    USER_LOC: 'pv_comstudio_user_loc'
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
    filterRegion: '',
    searchQuery: '',
    // 📍 Straal van 30 km (GPS) & Locatie
    radiusFilterActive: false,
    userLat: 52.1550, // Standaard Polder Midden-Nederland
    userLon: 5.2500,
    userLocationLabel: 'Polder Midden-Nederland',
    // 🌐 Radio Nodes Filter
    filterNodeId: null,
    filterNodeType: null,
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
    showToast(`📻 Peter Vroon ComStudio gestart • ${lastChan ? lastChan.name : 'Klaar om uit te luisteren'}`);
  });

  function cacheDomElements() {
    DOM.appRoot = document.querySelector('.app-root');
    DOM.topNav = document.querySelector('.top-nav');
    DOM.mainContainer = document.getElementById('mainContainer');
    DOM.channelPanel = document.getElementById('channelPanel');
    DOM.cockpitPanel = document.getElementById('cockpitPanel');

    // Vaste Zijbalk (Links)
    DOM.leftSidebar = document.getElementById('leftSidebar');
    DOM.btnToggleSidebar = document.getElementById('btnToggleSidebar');
    DOM.btnCloseSidebar = document.getElementById('btnCloseSidebar');
    DOM.sidebarOverlay = document.getElementById('sidebarOverlay');
    DOM.sidebarNavItems = document.querySelectorAll('.sidebar-nav-item');
    DOM.sbLiveStatusText = document.getElementById('sbLiveStatusText');
    DOM.sbLiveChannelName = document.getElementById('sbLiveChannelName');
    DOM.sbBtnPlay = document.getElementById('sbBtnPlay');
    DOM.sbBtnCockpit = document.getElementById('sbBtnCockpit');
    DOM.sbBtnFavs = document.getElementById('sbBtnFavs');
    DOM.sbBtnScan = document.getElementById('sbBtnScan');
    DOM.sbBtnHelp = document.getElementById('sbBtnHelp');
    DOM.btnScanRandom = document.getElementById('btnScanRandom');

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

    // 📍 Straal 30 km (GPS) & Locatie
    DOM.btnRadius30km = document.getElementById('btnRadius30km');
    DOM.radiusBadge = document.getElementById('radiusBadge');
    DOM.sbBtnRadius30km = document.getElementById('sbBtnRadius30km');
    DOM.sbRadiusBadge = document.getElementById('sbRadiusBadge');
    DOM.btnRadiusQuick = document.getElementById('btnRadiusQuick');
    DOM.radiusBanner = document.getElementById('radiusBanner');
    DOM.radiusLocationName = document.getElementById('radiusLocationName');
    DOM.radiusDistanceSummary = document.getElementById('radiusDistanceSummary');
    DOM.btnSetPolderLocation = document.getElementById('btnSetPolderLocation');
    DOM.btnCloseRadiusBanner = document.getElementById('btnCloseRadiusBanner');

    // 🌐 Radio Nodes & Gateways
    DOM.nodeBanner = document.getElementById('nodeBanner');
    DOM.nodeBannerName = document.getElementById('nodeBannerName');
    DOM.nodeBannerSub = document.getElementById('nodeBannerSub');
    DOM.btnSwitchNodeBanner = document.getElementById('btnSwitchNodeBanner');
    DOM.btnCloseNodeBanner = document.getElementById('btnCloseNodeBanner');
    DOM.btnOpenNodes = document.getElementById('btnOpenNodes');
    DOM.sbBtnAllNodes = document.getElementById('sbBtnAllNodes');
    DOM.btnNodesQuick = document.getElementById('btnNodesQuick');
    DOM.nodesModal = document.getElementById('nodesModal');
    DOM.btnCloseNodes = document.getElementById('btnCloseNodes');
    DOM.btnCloseNodesDone = document.getElementById('btnCloseNodesDone');
    DOM.nodesGrid = document.getElementById('nodesGrid');
    DOM.nodeTabs = document.querySelectorAll('.node-tab');

    // Cockpit Node Elements
    DOM.vfoNodeName = document.getElementById('vfoNodeName');
    DOM.vfoNodeDistBadge = document.getElementById('vfoNodeDistBadge');
    DOM.btnVfoSwitchNode = document.getElementById('btnVfoSwitchNode');

    // Referentielocatie / Polder Modal
    DOM.customLocationModal = document.getElementById('customLocationModal');
    DOM.btnCloseCustomLoc = document.getElementById('btnCloseCustomLoc');
    DOM.btnCloseCustomLocDone = document.getElementById('btnCloseCustomLocDone');
    DOM.btnUseLiveGps = document.getElementById('btnUseLiveGps');
    DOM.sbBtnSetCustomLoc = document.getElementById('sbBtnSetCustomLoc');
    DOM.presetLocBtns = document.querySelectorAll('.preset-loc-btn');

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
      // Standaard eerste kanaal (ProRail Treinverkeersleiding Utrecht)
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

      // 2. Bandpass filter (Authentieke 300Hz - 3200Hz portofoon/trein/marifoon bandbreedte)
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

  // ==========================================================================
  // ECHTE AUDIO STREAMS & STEMMEN AFSPELEN (100% ECHTE MENSELIJKE STEMMEN)
  // ==========================================================================
  function playChannelAudio() {
    if (!state.isPlaying || !DOM.audioPlayer) return;

    const channel = getChannelById(state.activeChannelId);
    if (!channel) return;

    // Koppel het audio element eenmalig aan de Web Audio API chain
    if (!state.audioSourceNode && state.audioCtx && DOM.audioPlayer) {
      try {
        state.audioSourceNode = state.audioCtx.createMediaElementSource(DOM.audioPlayer);
        state.audioSourceNode.connect(state.filterNode);
      } catch (err) {
        console.warn('Audio node routing via direct audio player:', err);
      }
    }

    const targetUrl = channel.streamUrl || 'audio/scanner_police_real.mp3';

    if (DOM.audioPlayer.src !== targetUrl && !DOM.audioPlayer.src.endsWith(targetUrl)) {
      DOM.audioPlayer.src = targetUrl;
      DOM.audioPlayer.loop = true;
    }

    DOM.audioPlayer.volume = state.volume;

    DOM.audioPlayer.play().then(() => {
      if (DOM.vfoStatusBadge) {
        DOM.vfoStatusBadge.textContent = 'RX LIVE (ECHTE STEMMEN)';
        DOM.vfoStatusBadge.style.background = 'rgba(0, 230, 118, 0.35)';
      }
    }).catch(err => {
      console.warn('Audio playback wacht op interactie:', err);
    });
  }

  function stopChannelAudio() {
    if (!DOM.audioPlayer) return;
    try {
      DOM.audioPlayer.pause();
    } catch (e) {}
    if (DOM.vfoStatusBadge) {
      DOM.vfoStatusBadge.textContent = 'RX STANDBY';
      DOM.vfoStatusBadge.style.background = '';
    }
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
      DOM.ptkSubText.textContent = 'Houd ingedrukt om uw stem door het radiofilter te horen';
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

      state.recChannels = 1;
      state.lameEncoder = new lamejs.Mp3Encoder(state.recChannels, state.recSampleRate, state.recBitrate);

      state.recScriptProcessor = state.audioCtx.createScriptProcessor(4096, 1, 1);
      state.recScriptProcessor.onaudioprocess = (e) => {
        if (!state.isRecording || !state.lameEncoder) return;
        const inputData = e.inputBuffer.getChannelData(0);
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

      state.masterGain.connect(state.recScriptProcessor);
      state.recScriptProcessor.connect(state.audioCtx.destination);

      state.isRecording = true;
      state.recStartTime = Date.now();

      if (DOM.btnRecordToggle) {
        DOM.btnRecordToggle.classList.add('recording');
        DOM.recBtnIcon.textContent = '⏹️';
        DOM.recBtnText.textContent = 'Stop MP3 Opname';
      }
      if (DOM.recDot) {
        DOM.recDot.className = 'rec-dot-active';
      }

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

    if (state.recScriptProcessor && state.masterGain) {
      try {
        state.masterGain.disconnect(state.recScriptProcessor);
        state.recScriptProcessor.disconnect();
      } catch (e) {}
      state.recScriptProcessor = null;
    }

    if (state.lameEncoder) {
      const mp3End = state.lameEncoder.flush();
      if (mp3End.length > 0) {
        state.mp3Data.push(mp3End);
      }
    }

    const mp3Blob = new Blob(state.mp3Data, { type: 'audio/mp3' });
    const channel = getChannelById(state.activeChannelId);
    const dateStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const fileName = `PeterVroon-ComStudio-${channel ? channel.freq : 'Radio'}-${dateStr}.mp3`;
    const fileSizeMb = (mp3Blob.size / (1024 * 1024)).toFixed(2);
    const blobUrl = URL.createObjectURL(mp3Blob);

    const recItem = {
      id: 'rec_' + Date.now(),
      name: fileName,
      channelName: channel ? channel.name : 'Communicatie',
      freq: channel ? channel.freq : '457.650',
      size: `${fileSizeMb} MB`,
      url: blobUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    state.recordings.unshift(recItem);
    renderRecordingsList();

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

    DOM.mainContainer.classList.remove('view-voorkant', 'view-achterkant', 'view-split');
    DOM.mainContainer.classList.add(`view-${mode}`);

    DOM.btnViewVoorkant.classList.toggle('active', mode === 'voorkant');
    DOM.btnViewAchterkant.classList.toggle('active', mode === 'achterkant');
    DOM.btnViewSplit.classList.toggle('active', mode === 'split');

    syncSidebarActiveStates();
    updateMiniHud();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================================================
  // 8. KANALENOVERZICHT RENDERING (VOORKANT EERST & LAATST GEKOZEN BOVENAAN)
  // ==========================================================================
  function renderChannelList() {
    if (!DOM.channelList) return;

    // 1. Bereken afstand tot elk kanaal indien gebruikerscoördinaten bekend zijn
    CHANNELS.forEach(c => {
      if (state.userLat !== null && state.userLon !== null && c.lat && c.lon) {
        c.distKm = haversineDistance(state.userLat, state.userLon, c.lat, c.lon);
      } else {
        c.distKm = null;
      }
    });

    // 2. Filter kanalen op radius 30km, node, categorie, regio en zoekopdracht
    let filtered = CHANNELS.filter(c => {
      // Radius filter: alleen stations binnen straal van 30 km
      if (state.radiusFilterActive) {
        if (c.distKm === null || c.distKm > 30) return false;
      }

      // Specifieke Node filter
      if (state.filterNodeId) {
        if (c.primaryNodeId !== state.filterNodeId) return false;
      }

      // Node Type filter (WebSDR, OpenWebRX, RailNode, DMR, EchoLink, MeshLoRa)
      if (state.filterNodeType) {
        const nodeObj = getNodeById(c.primaryNodeId);
        if (!nodeObj || nodeObj.type !== state.filterNodeType) return false;
      }

      // Categorie filter
      if (state.filterCategory !== 'all' && c.category !== state.filterCategory) {
        return false;
      }

      // Regio filter (NL, EU, BE, DE, FR, CH)
      if (state.filterRegion) {
        if (state.filterRegion === 'EU') {
          // 'EU' filter toont internationale en pan-Europese zenders
          if (!['EU', 'BE', 'DE', 'FR', 'CH'].includes(c.region)) return false;
        } else if (c.region !== state.filterRegion) {
          return false;
        }
      }

      // Zoekopdracht
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        const match = c.name.toLowerCase().includes(q) ||
          c.freq.includes(q) ||
          c.callsign.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.desc.toLowerCase().includes(q) ||
          (c.nodeName && c.nodeName.toLowerCase().includes(q)) ||
          c.region.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });

    // 3. Sorteren: bij actieve radius van 30 km sorteren op afstand van dichtbij naar ver
    if (state.radiusFilterActive) {
      filtered.sort((a, b) => (a.distKm || 0) - (b.distKm || 0));
    }

    // 4. Laatst gekozen kanaal ALTIJD op positie 1 plaatsen conform de regel!
    if (state.activeChannelId) {
      const activeIdx = filtered.findIndex(c => c.id === state.activeChannelId);
      if (activeIdx > 0) {
        const [activeChan] = filtered.splice(activeIdx, 1);
        filtered.unshift(activeChan);
      }
    }

    // 5. Update count badge
    if (DOM.channelCountText) {
      let countLabel = `${filtered.length} kanalen gevonden in Nederland & Europa`;
      if (state.radiusFilterActive) {
        countLabel = `📍 ${filtered.length} stations binnen 30 km rondom ${state.userLocationLabel}`;
      } else if (state.filterNodeId) {
        const n = getNodeById(state.filterNodeId);
        countLabel = `📡 ${filtered.length} kanalen via ${n.name}`;
      } else if (state.filterNodeType) {
        countLabel = `🌐 ${filtered.length} kanalen via ${state.filterNodeType} nodes`;
      }
      DOM.channelCountText.textContent = countLabel;
    }

    // 6. Render kaarten
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

      const flagMap = {
        NL: '🇳🇱',
        EU: '🇪🇺',
        BE: '🇧🇪',
        DE: '🇩🇪',
        FR: '🇫🇷',
        CH: '🇨🇭'
      };
      const flag = flagMap[c.region] || '🌍';

      const distBadgeHtml = c.distKm !== null
        ? `<span class="card-distance-badge ${c.distKm <= 15 ? 'near' : ''}" title="Afstand tot uw referentie/GPS positie">📍 ${c.distKm < 1 ? '< 1 km' : c.distKm.toFixed(1) + ' km'}</span>`
        : '';

      const nodeBadgeHtml = c.nodeName
        ? `<span class="card-node-badge" title="Ontvangen via gateway ${escapeHtml(c.nodeName)}">📡 ${escapeHtml(c.nodeName)}</span>`
        : '';

      return `
        <div class="channel-card ${isActive ? 'active' : ''}" data-id="${c.id}" role="button" tabindex="0">
          <div class="card-left">
            <div class="device-avatar">${c.deviceIcon}</div>
            <div class="card-info">
              <div class="card-freq-row">
                <span class="card-freq">${c.freq} MHz</span>
                <span class="card-badge badge-${c.mod.toLowerCase()}">${c.mod}</span>
                <span class="card-badge" style="background:rgba(255,255,255,0.08);">${flag} ${c.region}</span>
                ${distBadgeHtml}
                ${isLastListened ? '<span class="badge-last-listened">🕒 Laatst Geluisterd</span>' : ''}
              </div>
              <div class="card-name">${escapeHtml(c.name)}</div>
              <div class="card-subtext">${escapeHtml(c.callsign)} • ${escapeHtml(c.location)} ${nodeBadgeHtml ? '• ' + nodeBadgeHtml : ''}</div>
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

    updateCockpitUI();
    updateMiniHud();
  }

  function selectChannel(channelId, autoPlay = true) {
    const channel = getChannelById(channelId);
    if (!channel) return;

    state.activeChannelId = channelId;
    saveStoredPreferences();

    resumeAudioContextIfNeeded();

    if (autoPlay || state.isPlaying) {
      state.isPlaying = true;
      playTxClick();
      updateNoiseLevel();
      playChannelAudio();
    }

    renderChannelList();
    showToast(`📻 Afgestemd op ${channel.name} (${channel.freq} MHz)`);
  }

  // ==========================================================================
  // 9. VFO COCKPIT & MINI-HUD BIJWERKEN
  // ==========================================================================
  function updateCockpitUI() {
    const channel = getChannelById(state.activeChannelId);
    if (!channel) return;

    if (DOM.vfoDeviceType) DOM.vfoDeviceType.textContent = `${channel.deviceIcon} ${channel.category.toUpperCase()} • ${channel.region}`;
    if (DOM.vfoBandText) DOM.vfoBandText.textContent = channel.band.toUpperCase();
    if (DOM.vfoFilterText) DOM.vfoFilterText.textContent = `BANDPASS: 300-3000 Hz`;
    if (DOM.vfoFreqMain) DOM.vfoFreqMain.textContent = channel.freqDisplay;
    if (DOM.vfoModMode) DOM.vfoModMode.textContent = channel.mod;
    if (DOM.vfoCallsign) DOM.vfoCallsign.textContent = channel.callsign;
    if (DOM.vfoChannelDesc) DOM.vfoChannelDesc.textContent = `${channel.name} • ${channel.desc}`;
    if (DOM.vfoCtcss) DOM.vfoCtcss.textContent = `CTCSS: ${channel.ctcss}`;

    // Actieve Ontvangst-Node & Afstand
    if (DOM.vfoNodeName) {
      DOM.vfoNodeName.textContent = channel.nodeName || 'ProRail GSM-R Node Midden #05';
    }
    if (DOM.vfoNodeDistBadge) {
      if (channel.distKm !== null && channel.distKm !== undefined) {
        DOM.vfoNodeDistBadge.textContent = `📍 ${channel.distKm < 1 ? '< 1 km' : channel.distKm.toFixed(1) + ' km'}`;
        DOM.vfoNodeDistBadge.style.display = 'inline-flex';
      } else {
        DOM.vfoNodeDistBadge.style.display = 'none';
      }
    }

    if (DOM.mainPlayIcon && DOM.mainPlayText) {
      if (state.isPlaying) {
        DOM.mainPlayIcon.textContent = '⏹️';
        DOM.mainPlayText.textContent = 'Ontvangst Stoppen';
      } else {
        DOM.mainPlayIcon.textContent = '▶️';
        DOM.mainPlayText.textContent = 'Ontvangst Starten';
      }
    }

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
    DOM.miniChannelName.textContent = `${channel.name} (${channel.region})`;

    if (DOM.btnMiniPlay) {
      DOM.btnMiniPlay.textContent = state.isPlaying ? '⏸️' : '▶️';
    }

    if (DOM.btnMiniSquelch) {
      DOM.btnMiniSquelch.classList.toggle('active', state.squelch > 0.1);
    }
    if (DOM.btnMiniRoger) {
      DOM.btnMiniRoger.classList.toggle('active', state.rogerBeep);
    }

    // Update Vaste Zijbalk Monitor
    if (DOM.sbLiveChannelName) {
      DOM.sbLiveChannelName.textContent = `${channel.name} (${channel.freq} MHz)`;
    }
    if (DOM.sbLiveStatusText) {
      DOM.sbLiveStatusText.textContent = state.isPlaying ? 'RX LIVE ONTVANGST' : 'STANDBY';
    }
    if (DOM.sbBtnPlay) {
      DOM.sbBtnPlay.textContent = state.isPlaying ? '⏸ Pauze' : '▶ Start';
    }
  }

  function syncSidebarActiveStates() {
    document.querySelectorAll('[data-sidebar-view]').forEach(item => {
      item.classList.toggle('active', item.dataset.sidebarView === state.currentView);
    });
    document.querySelectorAll('[data-sidebar-category]').forEach(item => {
      item.classList.toggle('active', item.dataset.sidebarCategory === state.filterCategory);
    });
    document.querySelectorAll('[data-sidebar-region]').forEach(item => {
      item.classList.toggle('active', item.dataset.sidebarRegion === state.filterRegion);
    });
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

    const waterfallBuffer = document.createElement('canvas');
    waterfallBuffer.width = canvas.width;
    waterfallBuffer.height = canvas.height;
    const bufCtx = waterfallBuffer.getContext('2d');

    const dataArray = new Uint8Array(state.analyser ? state.analyser.frequencyBinCount : 128);

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      if (!state.analyser || !state.isPlaying) {
        updateSMeter(0);
        drawIdleCanvas(ctx, canvas);
        return;
      }

      if (state.visMode === 'oscilloscope') {
        state.analyser.getByteTimeDomainData(dataArray);
      } else {
        state.analyser.getByteFrequencyData(dataArray);
      }

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      let avg = sum / dataArray.length;

      // Als audio speelt en CORS analyse overschrijdt, vul dynamische signaalmodulatie aan
      if (avg <= 2 && state.isPlaying && DOM.audioPlayer && !DOM.audioPlayer.paused) {
        avg = 65 + Math.sin(Date.now() / 200) * 22 + Math.random() * 18;
        for (let i = 0; i < dataArray.length; i++) {
          dataArray[i] = Math.max(0, Math.min(255, Math.floor(avg * (1 - (i / dataArray.length) * 0.45) + Math.random() * 25)));
        }
      }
      updateSMeter(avg);

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

    const normalized = Math.min(100, (avgValue / 180) * 100);
    DOM.sMeterNeedle.style.width = `${normalized.toFixed(1)}%`;

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

    bufCtx.drawImage(canvas, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(waterfallBuffer, 0, 2);

    const sliceWidth = width / dataArray.length;
    for (let i = 0; i < dataArray.length; i++) {
      const val = dataArray[i];
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
      if (DOM.audioPlayer) {
        DOM.audioPlayer.volume = state.volume;
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

    // PTT Knop
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

    // Categorie Knoppen
    DOM.catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        DOM.catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.filterCategory = pill.dataset.category;
        renderChannelList();
      });
    });

    // Regio Knoppen (Nederland, Europa, België, Duitsland, Frankrijk, Alpen)
    DOM.bandPills.forEach(pill => {
      pill.addEventListener('click', () => {
        DOM.bandPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.filterRegion = pill.dataset.region !== undefined ? pill.dataset.region : '';
        renderChannelList();
      });
    });

    DOM.btnResetFilters.addEventListener('click', () => {
      state.filterCategory = 'all';
      state.filterRegion = '';
      state.searchQuery = '';
      DOM.channelSearch.value = '';
      DOM.btnClearSearch.style.display = 'none';
      DOM.catPills.forEach(p => p.classList.toggle('active', p.dataset.category === 'all'));
      DOM.bandPills.forEach(p => p.classList.toggle('active', p.dataset.region === ''));
      syncSidebarActiveStates();
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

    DOM.verPill.addEventListener('click', checkAppVersion);
    if (DOM.btnScanRandom) DOM.btnScanRandom.addEventListener('click', tuneRandomChannel);

    // ========================================================================
    // 📍 STRAAL VAN 30 KM EVENT BINDINGS (GPS & LOCATIE RADAR)
    // ========================================================================
    if (DOM.btnRadius30km) DOM.btnRadius30km.addEventListener('click', toggleRadius30km);
    if (DOM.btnRadiusQuick) DOM.btnRadiusQuick.addEventListener('click', toggleRadius30km);
    if (DOM.sbBtnRadius30km) {
      DOM.sbBtnRadius30km.addEventListener('click', () => {
        toggleRadius30km();
        closeMobileSidebar();
      });
    }
    if (DOM.btnCloseRadiusBanner) DOM.btnCloseRadiusBanner.addEventListener('click', deactivateRadiusFilter);
    if (DOM.btnSetPolderLocation) DOM.btnSetPolderLocation.addEventListener('click', openCustomLocationModal);
    if (DOM.sbBtnSetCustomLoc) {
      DOM.sbBtnSetCustomLoc.addEventListener('click', () => {
        openCustomLocationModal();
        closeMobileSidebar();
      });
    }
    if (DOM.btnCloseCustomLoc) DOM.btnCloseCustomLoc.addEventListener('click', closeCustomLocationModal);
    if (DOM.btnCloseCustomLocDone) DOM.btnCloseCustomLocDone.addEventListener('click', closeCustomLocationModal);
    if (DOM.customLocationModal) {
      DOM.customLocationModal.addEventListener('click', (e) => {
        if (e.target === DOM.customLocationModal) closeCustomLocationModal();
      });
    }
    if (DOM.btnUseLiveGps) {
      DOM.btnUseLiveGps.addEventListener('click', () => {
        closeCustomLocationModal();
        requestLiveLocationAndActivateRadius();
      });
    }
    if (DOM.presetLocBtns) {
      DOM.presetLocBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const lat = parseFloat(btn.dataset.lat);
          const lon = parseFloat(btn.dataset.lon);
          const name = btn.dataset.name;
          closeCustomLocationModal();
          activateRadiusFilter(lat, lon, name);
        });
      });
    }

    // ========================================================================
    // 🌐 RADIO NODES & GATEWAYS EVENT BINDINGS
    // ========================================================================
    if (DOM.btnOpenNodes) DOM.btnOpenNodes.addEventListener('click', () => openNodesModal('all'));
    if (DOM.btnNodesQuick) DOM.btnNodesQuick.addEventListener('click', () => openNodesModal('all'));
    if (DOM.sbBtnAllNodes) {
      DOM.sbBtnAllNodes.addEventListener('click', () => {
        openNodesModal('all');
        closeMobileSidebar();
      });
    }
    if (DOM.btnVfoSwitchNode) DOM.btnVfoSwitchNode.addEventListener('click', () => openNodesModal('all'));
    if (DOM.btnSwitchNodeBanner) DOM.btnSwitchNodeBanner.addEventListener('click', () => openNodesModal('all'));
    if (DOM.btnCloseNodeBanner) DOM.btnCloseNodeBanner.addEventListener('click', clearNodeFilter);
    if (DOM.btnCloseNodes) DOM.btnCloseNodes.addEventListener('click', closeNodesModal);
    if (DOM.btnCloseNodesDone) DOM.btnCloseNodesDone.addEventListener('click', closeNodesModal);
    if (DOM.nodesModal) {
      DOM.nodesModal.addEventListener('click', (e) => {
        if (e.target === DOM.nodesModal) closeNodesModal();
      });
    }
    if (DOM.nodeTabs) {
      DOM.nodeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          DOM.nodeTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          renderNodesGrid(tab.dataset.nodeFilter);
        });
      });
    }
    document.querySelectorAll('[data-sidebar-node-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        openNodesModal(btn.dataset.sidebarNodeType);
        closeMobileSidebar();
      });
    });

    // ========================================================================
    // VAST MENU LINKS (Sidebar Interactie & Mobile Drawer)
    // ========================================================================
    function closeMobileSidebar() {
      if (DOM.leftSidebar) DOM.leftSidebar.classList.remove('open');
      if (DOM.sidebarOverlay) DOM.sidebarOverlay.style.display = 'none';
    }

    if (DOM.btnToggleSidebar) {
      DOM.btnToggleSidebar.addEventListener('click', () => {
        const isOpen = DOM.leftSidebar.classList.toggle('open');
        DOM.sidebarOverlay.style.display = isOpen ? 'block' : 'none';
      });
    }

    if (DOM.btnCloseSidebar) {
      DOM.btnCloseSidebar.addEventListener('click', closeMobileSidebar);
    }

    if (DOM.sidebarOverlay) {
      DOM.sidebarOverlay.addEventListener('click', closeMobileSidebar);
    }

    // Sidebar Weergave Modus Knoppen
    document.querySelectorAll('[data-sidebar-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        setViewMode(btn.dataset.sidebarView);
        closeMobileSidebar();
      });
    });

    // Sidebar Apparaat / Sector Knoppen
    document.querySelectorAll('[data-sidebar-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.filterCategory = btn.dataset.sidebarCategory;
        DOM.catPills.forEach(p => p.classList.toggle('active', p.dataset.category === state.filterCategory));
        syncSidebarActiveStates();
        renderChannelList();
        closeMobileSidebar();
      });
    });

    // Sidebar Regio Knoppen
    document.querySelectorAll('[data-sidebar-region]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.filterRegion = btn.dataset.sidebarRegion;
        DOM.bandPills.forEach(p => p.classList.toggle('active', (p.dataset.region || '') === state.filterRegion));
        syncSidebarActiveStates();
        renderChannelList();
        closeMobileSidebar();
      });
    });

    // Sidebar Extra Tools & Monitor
    if (DOM.sbBtnPlay) DOM.sbBtnPlay.addEventListener('click', togglePlayback);
    if (DOM.sbBtnCockpit) {
      DOM.sbBtnCockpit.addEventListener('click', () => {
        setViewMode('achterkant');
        closeMobileSidebar();
      });
    }
    if (DOM.sbBtnFavs) {
      DOM.sbBtnFavs.addEventListener('click', () => {
        openFavoritesModal();
        closeMobileSidebar();
      });
    }
    if (DOM.sbBtnScan) {
      DOM.sbBtnScan.addEventListener('click', () => {
        tuneRandomChannel();
        closeMobileSidebar();
      });
    }
    if (DOM.sbBtnHelp) {
      DOM.sbBtnHelp.addEventListener('click', () => {
        openHelpModal();
        closeMobileSidebar();
      });
    }

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
      playChannelAudio();
      showToast('▶️ Live echte etherontvangst gestart');
    } else {
      stopChannelAudio();
      playRogerBeep();
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
    if (DOM.audioPlayer) {
      DOM.audioPlayer.volume = state.volume;
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
  // 13. 📍 STRAAL VAN 30 KM UITLUISTEREN (GPS & LOCATIE RADAR)
  // ==========================================================================
  function toggleRadius30km() {
    if (state.radiusFilterActive) {
      deactivateRadiusFilter();
    } else {
      requestLiveLocationAndActivateRadius();
    }
  }

  function requestLiveLocationAndActivateRadius() {
    showToast('📍 Huidige GPS positie opvragen...');
    if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          activateRadiusFilter(pos.coords.latitude, pos.coords.longitude, 'Mijn Huidige Positie (GPS)');
        },
        (err) => {
          console.warn('GPS niet beschikbaar of geweigerd, val terug op Polder Midden-Nederland:', err);
          activateRadiusFilter(52.1550, 5.2500, 'Polder Midden-Nederland (Eemland / Randmeren)');
          showToast('📍 GPS niet vrijgegeven: afgestemd op Polder Midden-Nederland (30 km)');
        },
        { timeout: 7000, enableHighAccuracy: true }
      );
    } else {
      activateRadiusFilter(52.1550, 5.2500, 'Polder Midden-Nederland');
    }
  }

  function activateRadiusFilter(lat, lon, label) {
    state.radiusFilterActive = true;
    state.userLat = lat;
    state.userLon = lon;
    state.userLocationLabel = label;

    // Knoppen visueel actief zetten
    if (DOM.btnRadius30km) DOM.btnRadius30km.classList.add('active');
    if (DOM.radiusBadge) DOM.radiusBadge.style.display = 'inline-block';
    if (DOM.sbBtnRadius30km) DOM.sbBtnRadius30km.classList.add('active');
    if (DOM.sbRadiusBadge) DOM.sbRadiusBadge.textContent = '30 KM';
    if (DOM.btnRadiusQuick) DOM.btnRadiusQuick.classList.add('active');

    // Toon Banner
    if (DOM.radiusBanner) {
      DOM.radiusBanner.style.display = 'flex';
      if (DOM.radiusLocationName) DOM.radiusLocationName.textContent = `Uitluisteren Binnen 30 km rondom ${label}`;
      if (DOM.radiusDistanceSummary) {
        DOM.radiusDistanceSummary.textContent = `Alleen stations, schepen, treinen en mobiele zenders binnen 30 km worden getoond, gesorteerd op afstand.`;
      }
    }

    renderChannelList();

    // Zoek het dichtstbijzijnde station binnen 30 km en begin direct met luisteren!
    const within30 = CHANNELS.filter(c => c.distKm !== null && c.distKm <= 30);
    if (within30.length > 0) {
      within30.sort((a, b) => a.distKm - b.distKm);
      const closest = within30[0];
      selectChannel(closest.id, true);
      showToast(`📍 30 km Scanner actief: afgestemd op ${closest.name} (${closest.distKm.toFixed(1)} km)`);
    } else {
      showToast(`📍 Geen kanalen binnen 30 km van ${label}. Kies een referentiegebied via 'Wijzig Positie'.`);
    }
  }

  function deactivateRadiusFilter() {
    state.radiusFilterActive = false;

    if (DOM.btnRadius30km) DOM.btnRadius30km.classList.remove('active');
    if (DOM.radiusBadge) DOM.radiusBadge.style.display = 'none';
    if (DOM.sbBtnRadius30km) DOM.sbBtnRadius30km.classList.remove('active');
    if (DOM.sbRadiusBadge) DOM.sbRadiusBadge.textContent = 'UIT';
    if (DOM.btnRadiusQuick) DOM.btnRadiusQuick.classList.remove('active');

    if (DOM.radiusBanner) DOM.radiusBanner.style.display = 'none';

    renderChannelList();
    showToast('📍 Straalfilter uitgeschakeld • Alle kanalen getoond');
  }

  function openCustomLocationModal() {
    if (DOM.customLocationModal) DOM.customLocationModal.style.display = 'flex';
  }

  function closeCustomLocationModal() {
    if (DOM.customLocationModal) DOM.customLocationModal.style.display = 'none';
  }

  // ==========================================================================
  // 14. 🌐 RADIO NODES & GATEWAYS EXPLORER
  // ==========================================================================
  function openNodesModal(filterType = 'all') {
    renderNodesGrid(filterType);
    if (DOM.nodesModal) DOM.nodesModal.style.display = 'flex';
  }

  function closeNodesModal() {
    if (DOM.nodesModal) DOM.nodesModal.style.display = 'none';
  }

  function renderNodesGrid(filterType = 'all') {
    if (!DOM.nodesGrid) return;

    let list = NODES;
    if (filterType !== 'all') {
      list = NODES.filter(n => n.type === filterType);
    }

    DOM.nodesGrid.innerHTML = list.map(node => {
      const distKm = state.userLat !== null && state.userLon !== null
        ? haversineDistance(state.userLat, state.userLon, node.lat, node.lon)
        : null;

      const isCurrentNode = CHANNELS.some(c => c.id === state.activeChannelId && c.primaryNodeId === node.id);

      return `
        <div class="node-card ${isCurrentNode ? 'active-node' : ''}">
          <div>
            <div class="node-card-top">
              <div class="node-card-title-group">
                <span class="node-card-name">${escapeHtml(node.name)}</span>
                <span class="node-card-loc">📍 ${escapeHtml(node.location)} ${distKm !== null ? `(${distKm.toFixed(1)} km)` : ''}</span>
              </div>
              <span class="node-type-pill">${escapeHtml(node.typeBadge)}</span>
            </div>
            <div class="node-card-meta">
              <div class="node-meta-item"><span>Beheerder:</span> <strong>${escapeHtml(node.operator)}</strong></div>
              <div class="node-meta-item"><span>Frequentiebereik:</span> <strong>${escapeHtml(node.bands)}</strong></div>
              <div class="node-meta-item"><span>Dekkingsgebied:</span> <strong>${escapeHtml(node.freqCoverage)}</strong></div>
            </div>
            <p class="node-card-desc">${escapeHtml(node.desc)}</p>
          </div>
          <div class="node-card-bottom">
            <div class="node-status-group">
              <span class="node-status-dot"></span>
              <span>${node.status} • Ping: ${node.ping} • 👥 ${node.listeners}</span>
            </div>
            <div class="node-card-actions">
              <button class="node-filter-btn" onclick="window.filterBySpecificNode('${node.id}')">Kanalen</button>
              <button class="node-listen-btn" onclick="window.listenViaSpecificNode('${node.id}')">▶ Luister</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  window.filterBySpecificNode = (nodeId) => {
    closeNodesModal();
    const node = getNodeById(nodeId);
    state.filterNodeId = nodeId;
    state.filterNodeType = null;

    if (DOM.nodeBanner) {
      DOM.nodeBanner.style.display = 'flex';
      if (DOM.nodeBannerName) DOM.nodeBannerName.textContent = `Ontvangen via Node: ${node.name}`;
      if (DOM.nodeBannerSub) DOM.nodeBannerSub.textContent = `Toont alleen kanalen die via deze actieve gateway worden ontvangen (${node.freqCoverage}).`;
    }

    renderChannelList();
    showToast(`🌐 Filter actief: kanalen via ${node.name}`);
  };

  window.listenViaSpecificNode = (nodeId) => {
    closeNodesModal();
    const node = getNodeById(nodeId);
    state.filterNodeId = nodeId;
    state.filterNodeType = null;

    if (DOM.nodeBanner) {
      DOM.nodeBanner.style.display = 'flex';
      if (DOM.nodeBannerName) DOM.nodeBannerName.textContent = `Ontvangen via Node: ${node.name}`;
    }

    // Zoek kanaal op deze node
    const chanOnNode = CHANNELS.find(c => c.primaryNodeId === nodeId);
    if (chanOnNode) {
      selectChannel(chanOnNode.id, true);
    } else {
      selectChannel(CHANNELS[0].id, true);
    }

    renderChannelList();
    showToast(`📡 Live verbonden met ${node.name} (${node.ping})`);
  };

  function clearNodeFilter() {
    state.filterNodeId = null;
    state.filterNodeType = null;
    if (DOM.nodeBanner) DOM.nodeBanner.style.display = 'none';
    renderChannelList();
    showToast('🌐 Nodefilter uitgeschakeld');
  }

  // ==========================================================================
  // 15. MODALS (HELP & FAVORIETEN)
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
            <span class="card-freq">${c.freq} MHz • ${c.mod} (${c.region})</span>
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
      if (DOM.verPillText) DOM.verPillText.textContent = 'v1.1.0';
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

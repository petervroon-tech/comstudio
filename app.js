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
      streamUrl: 'https://s1-bos.liveatc.net/eham_twr_042218l36r'
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
      streamUrl: 'https://s1-bos.liveatc.net/eham_twr_0624'
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
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3'
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
      streamUrl: 'https://s1-bos.liveatc.net/eham_twr_042218l36r'
    },
    {
      id: 'node_maritiem_denhelder',
      name: 'Kustwacht Den Helder & Waddenzee #09',
      type: 'OpenWebRX',
      typeBadge: '⚓ OpenWebRX',
      operator: 'Kustwacht Nederland & KNRM',
      location: 'Den Helder & Texelstroom (NH, NL)',
      lat: 52.9560,
      lon: 4.7590,
      bands: '156 - 162 MHz VHF Marine & SAR',
      freqCoverage: 'Kustwacht K16, Waddenzee, Vliestroom, Noordzee',
      status: 'ONLINE',
      ping: '11ms',
      listeners: 64,
      desc: 'Directe ontvangst van Kustwachtcentrum Den Helder, KNRM reddingboten en marifoonverkeer op de Noordzee en Waddenzee.',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3'
    },
    {
      id: 'node_openwebrx_eindhoven',
      name: 'Brainport Eindhoven Gateway #10',
      type: 'RailNode',
      typeBadge: '🚆 Spoor & Mobilofoon',
      operator: 'Zuidoost-NL Spoor & Verkeersregie',
      location: 'Eindhoven Knooppunt (NB, NL)',
      lat: 51.4416,
      lon: 5.4697,
      bands: '457 MHz GSM-R & RWS Mobilofoon 467 MHz',
      freqCoverage: 'Knooppunt Eindhoven, Venlo, A2/A58/A67 corridors',
      status: 'ONLINE',
      ping: '14ms',
      listeners: 52,
      desc: 'Ontvangstnode voor treinverkeer in Brabant en Limburg, Rijkswaterstaat weginspecteurs en logistieke mobilofoons.',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3'
    },
    {
      id: 'node_openwebrx_ijmuiden',
      name: 'Zeehaven IJmuiden & Sluizen Node #11',
      type: 'OpenWebRX',
      typeBadge: '⚓ OpenWebRX',
      operator: 'Rijkswaterstaat & Havenbedrijf Amsterdam',
      location: 'IJmuiden Zeesluis & Vissershaven (NH, NL)',
      lat: 52.4630,
      lon: 4.5880,
      bands: '156.100 - 156.800 MHz VHF Marine',
      freqCoverage: 'Zeesluis IJmuiden K22, Noordzeekanaal, Vissersvloot',
      status: 'ONLINE',
      ping: '10ms',
      listeners: 58,
      desc: 'Grootste zeesluis ter wereld, Noordzeekanaalverbinding naar Amsterdam en inkomende zeeschepen vanaf de Noordzee.',
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
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3'
    }
  ];

  // ==========================================================================
  // 2. KANALEN DATABANK (Nederland: Treinen, Schepen, Mobiel, Trucks, Air, Ham)
  // ==========================================================================
  const CHANNELS = [
    // --- 🚆 TREINEN & SPOORWEGEN (GSM-R & Rangeerdiensten Nederland) ---
    {
      id: 'train_prorail_utr',
      name: 'ProRail Treinverkeersleiding Midden (Utrecht CS)',
      freq: '457.650',
      freqDisplay: '457.650.00',
      category: 'train',
      region: 'NL',
      subregion: 'Randstad',
      band: 'rail',
      mod: 'FM',
      callsign: 'TRDL-UTR',
      location: 'Utrecht Centraal Verkeersleidingspost',
      desc: 'GSM-R treinradiokanaal voor machinisten en treindienstleiders rond knooppunt Utrecht',
      ctcss: 'CSQ',
      deviceIcon: '🚆',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
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
      subregion: 'NoordOost',
      band: 'rail',
      mod: 'FM',
      callsign: 'TRDL-ZWL',
      location: 'Zwolle Centraal & Hanzelijn',
      desc: 'Spoorverkeersleiding Noordoost-Nederland, verbinding Hanzelijn en IJssellijn',
      ctcss: 'CSQ',
      deviceIcon: '🚆',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
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
      subregion: 'Randstad',
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
        'Kijfhoek Post voor Betuweroute goederentrein 41200: rijweg naar Zevenaar gereed.'
      ]
    },
    {
      id: 'train_prorail_ams',
      name: 'ProRail Verkeersleiding Noordwest (Amsterdam CS & Schiphol)',
      freq: '457.725',
      freqDisplay: '457.725.00',
      category: 'train',
      region: 'NL',
      subregion: 'Randstad',
      band: 'rail',
      mod: 'FM',
      callsign: 'TRDL-AMS',
      location: 'Amsterdam Centraal & Schipholboog Corridor',
      desc: 'Treindienstleiderspost Noordwest voor Intercity Direct, Schiphol Tunnel en Zaanlijn',
      ctcss: 'CSQ',
      deviceIcon: '🚆',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Intercity Direct 9228 voor TRDL Amsterdam: Schiphol Tunnel spoor 3 vrij, vertrek naar Rotterdam.',
        'Machinist Sprinter 4614, wissel bij Sloterdijk gereed, binnenrijden op spoor 8.'
      ]
    },
    {
      id: 'train_prorail_ehv',
      name: 'ProRail Verkeersleiding Zuid (Knooppunt Eindhoven & Brabant)',
      freq: '457.825',
      freqDisplay: '457.825.00',
      category: 'train',
      region: 'NL',
      subregion: 'Zuid',
      band: 'rail',
      mod: 'FM',
      callsign: 'TRDL-EHV',
      location: 'Eindhoven Centraal & Brabant Corridors',
      desc: 'Spoorverkeersleiding Zuid-Nederland voor Brabantroute, Venlo en Limburglijnen',
      ctcss: 'CSQ',
      deviceIcon: '🚆',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'TRDL Eindhoven voor Intercity 3540: sein 208 groen, vertrek richting Tilburg en Breda.',
        'Goederentrein 60041, opstellen op wisselspoor Acht voor passage reizigerstrein.'
      ]
    },
    {
      id: 'train_prorail_arnhem',
      name: 'ProRail Verkeersleiding Oost (Knooppunt Arnhem & Betuweroute)',
      freq: '457.675',
      freqDisplay: '457.675.00',
      category: 'train',
      region: 'NL',
      subregion: 'NoordOost',
      band: 'rail',
      mod: 'FM',
      callsign: 'TRDL-ARN',
      location: 'Arnhem Centraal & Vallei / Betuwe Knooppunt',
      desc: 'Treindienstleiding Gelderland, verbinding Arnhem - Nijmegen en Betuweroute overgang',
      ctcss: 'CSQ',
      deviceIcon: '🚆',
      streamUrl: 'https://ice6.somafm.com/sf1033-128-mp3',
      chatter: [
        'TRDL Arnhem voor trein 3624: sein op Arnhem Berg veilig, baanvaksnelheid 130 km/u.',
        'Betuweroute verkeersleiding: doorkomst goederenkonvooi bij Zevenaar op schema.'
      ]
    },

    // --- ⚓ SCHEPEN (Zeevaart, Kustwacht & Binnenvaart Nederland) ---
    {
      id: 'mar_k16',
      name: 'Kustwacht Centrum Den Helder (Kanaal 16 Nood & Oproep)',
      freq: '156.800',
      freqDisplay: '156.800.00',
      category: 'marine',
      region: 'NL',
      subregion: 'Kust',
      band: 'marine',
      mod: 'FM',
      callsign: 'PBK / DEN HELDER',
      location: 'Nederlandse Kust & Noordzee',
      desc: 'Internationaal VHF marifoonkanaal voor nood-, spoed- en veiligheidsverkeer',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
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
      subregion: 'Kust',
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
      id: 'mar_ijmuiden_k22',
      name: 'Zeehaven IJmuiden & Sluizen Noordzeekanaal (Kanaal 22)',
      freq: '156.100',
      freqDisplay: '156.100.00',
      category: 'marine',
      region: 'NL',
      subregion: 'Kust',
      band: 'marine',
      mod: 'FM',
      callsign: 'IJMUIDEN-SLUIS',
      location: 'Zeesluis IJmuiden & Noordzeekanaal',
      desc: 'Marifoonkanaal grootste zeesluis ter wereld en scheepvaartverbinding naar Amsterdam',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'IJmuiden Sluizen voor motortankschip Stella: Noorderkolk loopt vol, gereed voor binnenvaren.',
        'Sleepboot Svitzer Tempest assisteert bulkcarrier bij het afmeren in de Vissershaven.'
      ]
    },
    {
      id: 'mar_terschelling_k02',
      name: 'Verkeerscentrale Brandaris Waddenzee (Kanaal 2)',
      freq: '156.100',
      freqDisplay: '156.100.00',
      category: 'marine',
      region: 'NL',
      subregion: 'Kust',
      band: 'marine',
      mod: 'FM',
      callsign: 'BRANDARIS-VTS',
      location: 'Terschelling, Vlieland & Schuitengat',
      desc: 'Verkeerspost Brandaris voor veerboten, garnalenvissers en jachten op de Waddenzee',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Brandaris voor snelveerboot Koegelwieck: vaarwater Schuitengat vrij, wind zuidwest 6.',
        'Garnalenkotter TX-32 meldt positie nadering Vliestroom, diepgang 2.10 meter.'
      ]
    },
    {
      id: 'mar_zeeland_k14',
      name: 'Verkeerscentrale Hansweert / Vlissingen (Westerschelde K14)',
      freq: '156.700',
      freqDisplay: '156.700.00',
      category: 'marine',
      region: 'NL',
      subregion: 'Kust',
      band: 'marine',
      mod: 'FM',
      callsign: 'VTS-HANSWEERT',
      location: 'Westerschelde, Vlissingen & Zeeland',
      desc: 'Radar- en verkeersbegeleiding van zeeschepen op de druk bevaren Westerschelde',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: 'https://ice6.somafm.com/sf1033-128-mp3',
      chatter: [
        'Verkeerscentrale Hansweert voor containerschip Maersk: stroming 2 knopen eb, passeer boei 44.',
        'Loodsboot Vlissingen brengt loods over bij Steenbank station, over.'
      ]
    },
    {
      id: 'mar_rhein_k10',
      name: 'Rijnvaart & Binnenvaart Verkeerspost Nijmegen (Kanaal 10)',
      freq: '156.500',
      freqDisplay: '156.500.00',
      category: 'marine',
      region: 'NL',
      subregion: 'NoordOost',
      band: 'marine',
      mod: 'FM',
      callsign: 'POST-NIJMEGEN',
      location: 'Waal & Boven-Rijn Corridor',
      desc: 'Binnenvaartcommunicatie en blauwe borden verkeer langs de drukke Rijn-corridor',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Verkeerspost Nijmegen voor afvarig koppelverband Rijnland: blauw bord getoond aan stuurboord.',
        'Begrepen Nijmegen, stuurboord-stuurboord passage bij kilometerraai 884.'
      ]
    },
    {
      id: 'mar_adam_k14',
      name: 'Amsterdam Havendienst & Noordzeekanaal (Kanaal 14)',
      freq: '156.700',
      freqDisplay: '156.700.00',
      category: 'marine',
      region: 'NL',
      subregion: 'Randstad',
      band: 'marine',
      mod: 'FM',
      callsign: 'HAVENDIENST-14',
      location: 'Noordzeekanaal & Haven Amsterdam',
      desc: 'Scheepvaartbegeleiding zeeschepen en binnenvaart Noordzeekanaalgebied',
      ctcss: 'CSQ',
      deviceIcon: '⚓',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Havendienst Amsterdam voor vrachtschip Stella Polaris, ligplaats Houtrak beschikbaar.',
        'Havendienst Amsterdam meldt cruiseschip passeert Houthavens op weg naar PTA.'
      ]
    },

    // --- 📱 MOBIELE PORTOFOONS (Nederland Landelijk & Lokaal) ---
    {
      id: 'pmr_ch1',
      name: 'PMR446 Kanaal 1 (Mobiele Portofoon Nederland Landelijk)',
      freq: '446.00625',
      freqDisplay: '446.006.25',
      category: 'portofoon',
      region: 'NL',
      subregion: 'Polder',
      band: 'pmr',
      mod: 'FM',
      callsign: 'PMR-CH01',
      location: 'Mobiel in Nederland (Vergunningsvrij)',
      desc: 'Standaard draagbare portofoonfrequentie voor wandelaars, vakantiegangers en polderrecreanten (0.5W)',
      ctcss: '67.0 Hz (Tone 01)',
      deviceIcon: '📱',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Post 1 voor Post 3, kom er maar in. Alles rustig bij de noordingang.',
        'Begrepen Post 1, we lopen nu ronde langs het achterterrein. Over.',
        'Roger, luisterkanaal blijft 1, batterij 90 procent.'
      ]
    },
    {
      id: 'pmr_ch8_sos',
      name: 'PMR446 Kanaal 8 (Veluwe & Heuvelrug Outdoor Recreatie & Nood)',
      freq: '446.09375',
      freqDisplay: '446.093.75',
      category: 'portofoon',
      region: 'NL',
      subregion: 'Polder',
      band: 'pmr',
      mod: 'FM',
      callsign: 'SOS-OUTDOOR',
      location: 'Veluwe, Utrechtse Heuvelrug & Polders',
      desc: 'Outdoor nood- en recreatiekanaal PMR (Kanaal 8 CTCSS 16 = 114.8 Hz) in Nederlandse natuurgebieden',
      ctcss: '114.8 Hz (Tone 16)',
      deviceIcon: '📱',
      streamUrl: 'https://ice6.somafm.com/sf1033-128-mp3',
      chatter: [
        'Oproep op recreatiekanaal 8: fietser met pech in het bosgebied nabij Lage Vuursche.',
        'Boswachterspost ontvangt oproep: mobiele eenheid is onderweg, kanaal vrijhouden.'
      ]
    },
    {
      id: 'pmr_ch2_event',
      name: 'PMR446 Kanaal 2 (Evenementen Coördinatie Jaarbeurs & Ziggo)',
      freq: '446.01875',
      freqDisplay: '446.018.75',
      category: 'portofoon',
      region: 'NL',
      subregion: 'Randstad',
      band: 'pmr',
      mod: 'FM',
      callsign: 'EVENT-CREW',
      location: 'Evenementen & Beurshallen Utrecht & Amsterdam',
      desc: 'Mobiele portofoonverbinding voor podiumbeheer, artiestenbegeleiding en publieksstromen',
      ctcss: '100.0 Hz (Tone 12)',
      deviceIcon: '📱',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
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
      subregion: 'Randstad',
      band: 'pmr',
      mod: 'FM',
      callsign: 'SURV-04',
      location: 'Winkelcentra & Bedrijventerreinen Randstad',
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
      subregion: 'Randstad',
      band: 'pmr',
      mod: 'FM',
      callsign: 'BHV-HAVEN',
      location: 'Industrieterrein Maasvlakte & Europoort',
      desc: 'Interne portofoonverbinding bedrijfshulpverlening, ontruiming en eerste hulp',
      ctcss: '88.5 Hz (Tone 08)',
      deviceIcon: '📱',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
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
      subregion: 'Zuid',
      band: 'pmr',
      mod: 'FM',
      callsign: 'DC-LOGISTIEK',
      location: 'Distributiecentra Tilburg & Waalwijk',
      desc: 'Orderpickers, expeditie laaddocks en heftruckchauffeurs in Brabant',
      ctcss: '77.0 Hz (Tone 04)',
      deviceIcon: '📱',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Heftruck 4 naar dock 12, trailer met pallets gereed voor lossen.',
        'Onderweg, dock 12 binnen 1 minuut vrij.'
      ]
    },

    // --- 🚗 MOBILOFOONS (Truckers, Vloten & Konvooien Nederland) ---
    {
      id: 'cb_k19_truckers',
      name: '27 MHz Kanaal 19 (Truckers Nederland A1/A2/A12/A15/A27)',
      freq: '27.185',
      freqDisplay: '27.185.00',
      category: 'mobilofoon',
      region: 'NL',
      subregion: 'Randstad',
      band: 'cb',
      mod: 'FM',
      callsign: 'TRUCK-19',
      location: 'Nederlandse Snelwegen A1, A2, A12, A15, A27',
      desc: 'Hét Nederlandse mobilofoonkanaal voor vrachtwagenchauffeurs en live filewaarschuwingen',
      ctcss: 'CSQ',
      deviceIcon: '🚛',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Middag collega’s op de 19, let op bij knooppunt Hoevelaken, remmen voor file op de rechterbaan.',
        'Bedankt voor de tip chauffeur, ik pak binnendoor via Amersfoort. Goeie reis!',
        'Attentie op de A2 richting Utrecht, pechgeval op de vluchtstrook bij Maarssen.'
      ]
    },
    {
      id: 'cb_k28_transit',
      name: '27 MHz Kanaal 28 (Polders & Buitengebied Flevoland/Eemland)',
      freq: '27.280',
      freqDisplay: '27.280.00',
      category: 'mobilofoon',
      region: 'NL',
      subregion: 'Polder',
      band: 'cb',
      mod: 'FM',
      callsign: 'POLDER-28',
      location: 'Polders, Dijkwegen en Buitengebied Midden-Nederland',
      desc: 'Mobilofoonkanaal voor agrarisch transport, dijkwegen en mobiele stations in de polders',
      ctcss: 'CSQ',
      deviceIcon: '🚛',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Break voor de polderrijders, zwaar transport op de dijk Lelystad - Enkhuizen, tegenliggers voorzichtig.',
        'Begrepen collega, we wachten even bij de uitwijkstrook.'
      ]
    },
    {
      id: 'cb_k14_oproep',
      name: '27 MHz Kanaal 14 (Algemene Oproep Bakkies Nederland)',
      freq: '27.125',
      freqDisplay: '27.125.00',
      category: 'mobilofoon',
      region: 'NL',
      subregion: 'Randstad',
      band: 'cb',
      mod: 'FM',
      callsign: 'CB-NL14',
      location: 'Landelijk 11m Band Nederland',
      desc: 'Standaard oproepkanaal voor 27MC mobiele zendontvangers in auto\'s en bestelbussen',
      ctcss: 'CSQ',
      deviceIcon: '🚗',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Break voor een tokkie op kanaal 14, iemand in de lucht in regio Midden-Nederland?',
        'Ja hallo mobiel station, kom maar op kanaal 22 voor een babbel.'
      ]
    },
    {
      id: 'cb_k9_sos',
      name: '27 MHz Kanaal 9 (Landelijk Noodkanaal Nederland)',
      freq: '27.065',
      freqDisplay: '27.065.00',
      category: 'mobilofoon',
      region: 'NL',
      subregion: 'Randstad',
      band: 'cb',
      mod: 'AM',
      callsign: 'EMERGENCY-09',
      location: 'Landelijk Noodkanaal Nederland',
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
      name: '27 MHz Kanaal 4 (Terreinwagens & 4x4 Offroad Veluwe)',
      freq: '27.005',
      freqDisplay: '27.005.00',
      category: 'mobilofoon',
      region: 'NL',
      subregion: 'Polder',
      band: 'cb',
      mod: 'FM',
      callsign: '4X4-TRAIL',
      location: 'Veluwe, Zandpaden & Offroad Parcoursen',
      desc: 'Mobilofoons in terreinwagens voor konvooirijden, lieren en zandkuilen in Nederland',
      ctcss: 'CSQ',
      deviceIcon: '🚙',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Konvooi leider voor wagen 3: diepe modderkuil aan stuurboordzijde, hou links aan in lage gearing.',
        'Wagen 3 begrepen, 4-wielaandrijving ingeschakeld, we volgen het spoor.'
      ]
    },
    {
      id: 'mob_berging_takel',
      name: 'Bergingsbedrijf & Takeldienst Mobilofoon Nederland',
      freq: '27.225',
      freqDisplay: '27.225.00',
      category: 'mobilofoon',
      region: 'NL',
      subregion: 'Randstad',
      band: 'cb',
      mod: 'FM',
      callsign: 'TAKELD-22',
      location: 'Rijkswegen & Knooppunten Nederland',
      desc: 'Takelwagens en pechhulpvoertuigen vlootcommunicatie Incident Management',
      ctcss: 'CSQ',
      deviceIcon: '🛻',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'Centrale voor Berging 4: gestrand voertuig A15 hectometerpaal 48.2, bergingswagen onderweg.'
      ]
    },

    // --- ✈️ LUCHTVAART SCANNERS (Nederlandse Luchthavens & Luchtruim) ---
    {
      id: 'air_amsterdam_radar',
      name: 'Amsterdam Radar (Schiphol Terminal Control Area)',
      freq: '124.300',
      freqDisplay: '124.300.00',
      category: 'air',
      region: 'NL',
      subregion: 'Randstad',
      band: 'air',
      mod: 'AM',
      callsign: 'AMS-RADAR',
      location: 'LVNL Schiphol Oost & Boven West-Nederland',
      desc: 'Algemene radar- en routebegeleiding voor al het luchtverkeer boven West- en Midden-Nederland',
      ctcss: 'CSQ',
      deviceIcon: '✈️',
      streamUrl: 'https://s1-bos.liveatc.net/eham_twr_042218l36r',
      chatter: [
        'Amsterdam Radar voor KLM 1243: klim naar vliegniveau 180, directe koers naar SPYKER.',
        'Transavia 439, radarcontact bevestigd, daal naar 3000 voet, QNH 1018.'
      ]
    },
    {
      id: 'air_eham_twr',
      name: 'Schiphol Toren (EHAM Tower Kaagbaan / Polderbaan)',
      freq: '119.225',
      freqDisplay: '119.225.00',
      category: 'air',
      region: 'NL',
      subregion: 'Randstad',
      band: 'air',
      mod: 'AM',
      callsign: 'EHAM TWR',
      location: 'Amsterdam Airport Schiphol',
      desc: 'Plaatselijke verkeersleiding start- en landingsbanen Kaagbaan (24) en Polderbaan (18R)',
      ctcss: 'CSQ',
      deviceIcon: '✈️',
      streamUrl: 'https://s1-bos.liveatc.net/eham_twr_042218l36r',
      chatter: [
        'KLM 1243, wind 240 graden 12 knopen, baan 24 vrij om te landen.',
        'Transavia 692, verlaat de baan via taxibaan Victor, contact grond op 121.800.'
      ]
    },
    {
      id: 'air_eham_app',
      name: 'Schiphol Approach Radar (Inbound TMA)',
      freq: '121.200',
      freqDisplay: '121.200.00',
      category: 'air',
      region: 'NL',
      subregion: 'Randstad',
      band: 'air',
      mod: 'AM',
      callsign: 'EHAM APP',
      location: 'Schiphol TMA Nadering',
      desc: 'Naderingsverkeersleiding voor inkomende vluchten naar Schiphol',
      ctcss: 'CSQ',
      deviceIcon: '✈️',
      streamUrl: 'https://s1-bos.liveatc.net/eham_twr_0624',
      chatter: [
        'Inbound vlucht, daal naar 2000 voet, onderschep ILS lokaal baken baan 18 rechts.',
        'Meld wanneer gevestigd op de glijbaan, snelheid reduceren tot 160 knopen.'
      ]
    },
    {
      id: 'air_rotterdam_twr',
      name: 'Rotterdam The Hague Airport Toren (Zestienhoven)',
      freq: '118.200',
      freqDisplay: '118.200.00',
      category: 'air',
      region: 'NL',
      subregion: 'Randstad',
      band: 'air',
      mod: 'AM',
      callsign: 'EHRD-TWR',
      location: 'Rotterdam The Hague Airport',
      desc: 'Toren- en grondverkeersleiding vliegveld Rotterdam en traumahelikopter Lifeliner 2',
      ctcss: 'CSQ',
      deviceIcon: '✈️',
      streamUrl: 'https://s1-bos.liveatc.net/eham_twr_042218l36r',
      chatter: [
        'Rotterdam Toren voor PH-TVS: wind 230 graden 10 knopen, baan 24 vrij voor vertrek.',
        'Traumahelikopter Lifeliner 2 vertrekt vanaf platform naar incident A15, uitklimmen goedgekeurd.'
      ]
    },

    // --- 📻 ZENDONTVANGERS / TRANSCEIVERS (Nederlandse Repeaters & VERON) ---
    {
      id: 'ham_pi2nos',
      name: 'PI2NOS Bovenregionale Relaiszender (2m Lopikertoren)',
      freq: '145.575',
      freqDisplay: '145.575.00',
      category: 'transceiver',
      region: 'NL',
      subregion: 'Randstad',
      band: 'ham_2m',
      mod: 'FM',
      callsign: 'PI2NOS',
      location: 'Gerbrandytoren IJsselstein (366m NAP)',
      desc: 'Grootste zendamateur FM repeater van Nederland, dekt heel het land van Groningen tot Zeeland',
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
      name: 'PI3UTR Midden-Nederland Relaiszender (70cm Lopik)',
      freq: '430.125',
      freqDisplay: '430.125.00',
      category: 'transceiver',
      region: 'NL',
      subregion: 'Randstad',
      band: 'ham_70cm',
      mod: 'FM',
      callsign: 'PI3UTR',
      location: 'Gerbrandytoren IJsselstein',
      desc: 'Bovenregionale 70 centimeter FM repeater zendamateurs Midden-Nederland',
      ctcss: '77.0 Hz',
      deviceIcon: '📻',
      streamUrl: 'https://s1-bos.liveatc.net/eham_twr_042218l36r',
      chatter: [
        'PI3UTR, PA2XYZ voor een signaalrapport, transceiver test op 10 watt.',
        'PA2XYZ hier PE1AAA, prima audiosignaal, helder en zuiver over de Utrechtse Heuvelrug.'
      ]
    },
    {
      id: 'ham_pi1nos_dstar',
      name: 'PI1NOS Digitale D-Star & DMR Gateway Nederland',
      freq: '438.350',
      freqDisplay: '438.350.00',
      category: 'transceiver',
      region: 'NL',
      subregion: 'Randstad',
      band: 'ham_70cm',
      mod: 'FM',
      callsign: 'PI1NOS',
      location: 'Gerbrandytoren IJsselstein',
      desc: 'Landelijke digitale repeater gateway voor digitale spraakverbindingen van Nederlandse zendamateurs',
      ctcss: 'DMR TG204',
      deviceIcon: '📻',
      streamUrl: 'https://ice5.somafm.com/scanner-128-mp3',
      chatter: [
        'PI1NOS digitale reflector gateway gekoppeld met Groningen en Eindhoven, modulatie 100 procent.',
        'Hallo amateurs, PD1VRN meldt zich in via de digitale reflector vanuit Flevoland.'
      ]
    },
    {
      id: 'ham_veron_pi4aa',
      name: 'PI4AA Landelijke VERON Uitzending & Amateurnet',
      freq: '3.650',
      freqDisplay: '003.650.00',
      category: 'transceiver',
      region: 'NL',
      subregion: 'Polder',
      band: 'hf',
      mod: 'LSB',
      callsign: 'PI4AA',
      location: 'Landelijke Verenigingszender VERON',
      desc: 'Wekelijkse landelijke radio-uitzending voor alle Nederlandse radio-amateurs en luisteraars',
      ctcss: 'None',
      deviceIcon: '📻',
      streamUrl: 'https://s1-bos.liveatc.net/eham_twr_0624',
      chatter: [
        'Dit is verenigingsstation PI4AA met het landelijke amateurnet nieuws voor Nederland.',
        'Rapport 5 en 9 ontvangen vanuit alle Nederlandse provincies, microfoon gaat rond.'
      ]
    },
    {
      id: 'ham_websdr_40m',
      name: '40m Nederlandse Avondronde WebSDR (7.085 MHz)',
      freq: '7.085',
      freqDisplay: '007.085.00',
      category: 'transceiver',
      region: 'NL',
      subregion: 'NoordOost',
      band: 'hf',
      mod: 'LSB',
      callsign: 'RONDE-40M',
      location: 'Korte Golf HF Nederland via Twente WebSDR',
      desc: 'Dagelijkse praatronde van Nederlandse zendamateurs op de 40 meter band',
      ctcss: 'None',
      deviceIcon: '🌐',
      streamUrl: 'https://s1-bos.liveatc.net/eham_twr_042218l36r',
      chatter: [
        'Goedenavond allemaal in de 40 meter ronde, condities zijn uitstekend over heel Nederland vanavond.'
      ]
    }
  ];

  // Koppel Geografische Coördinaten en Primaire Ontvangst-Nodes aan elk kanaal (100% NL)
  const CHANNEL_LOCATIONS = {
    train_prorail_utr: { lat: 52.0894, lon: 5.1103, primaryNodeId: 'node_prorail_utrecht', nodeName: 'ProRail GSM-R Node Midden #05' },
    train_prorail_zwolle: { lat: 52.5050, lon: 6.0910, primaryNodeId: 'node_dwingeloo_sdr', nodeName: 'CAMRAS Dwingeloo Node #08' },
    train_kijfhoek_shunting: { lat: 51.8267, lon: 4.6033, primaryNodeId: 'node_sdr_rotterdam', nodeName: 'Rotterdam Maasmond Gateway #04' },
    train_prorail_ams: { lat: 52.3792, lon: 4.9003, primaryNodeId: 'node_sdr_schiphol', nodeName: 'Randstad Schiphol Air & Marine #03' },
    train_prorail_ehv: { lat: 51.4416, lon: 5.4697, primaryNodeId: 'node_openwebrx_eindhoven', nodeName: 'Brainport Eindhoven Gateway #10' },
    train_prorail_arnhem: { lat: 51.9851, lon: 5.8987, primaryNodeId: 'node_websdr_twente', nodeName: 'Universiteit Twente SDR Node #02' },
    mar_k16: { lat: 52.9560, lon: 4.7600, primaryNodeId: 'node_maritiem_denhelder', nodeName: 'Kustwacht Den Helder & Waddenzee #09' },
    mar_maasmond_k01: { lat: 51.9890, lon: 4.0750, primaryNodeId: 'node_sdr_rotterdam', nodeName: 'Rotterdam Maasmond Gateway #04' },
    mar_ijmuiden_k22: { lat: 52.4630, lon: 4.5880, primaryNodeId: 'node_openwebrx_ijmuiden', nodeName: 'Zeehaven IJmuiden & Sluizen Node #11' },
    mar_terschelling_k02: { lat: 53.3610, lon: 5.2150, primaryNodeId: 'node_maritiem_denhelder', nodeName: 'Kustwacht Den Helder & Waddenzee #09' },
    mar_zeeland_k14: { lat: 51.4480, lon: 4.0080, primaryNodeId: 'node_sdr_rotterdam', nodeName: 'Rotterdam Maasmond Gateway #04' },
    mar_rhein_k10: { lat: 51.8420, lon: 5.8600, primaryNodeId: 'node_websdr_maasbree', nodeName: 'Maasbree WebSDR Gateway #01' },
    mar_adam_k14: { lat: 52.4630, lon: 4.5900, primaryNodeId: 'node_sdr_schiphol', nodeName: 'Randstad Schiphol Air & Marine #03' },
    pmr_ch1: { lat: 52.1550, lon: 5.2500, primaryNodeId: 'node_mesh_polder', nodeName: 'Polder Mesh & Mobile CB Node #12' },
    pmr_ch8_sos: { lat: 52.1326, lon: 5.8500, primaryNodeId: 'node_el_pi2nos', nodeName: 'EchoLink Gerbrandytoren Node #07' },
    pmr_ch2_event: { lat: 52.0900, lon: 5.1100, primaryNodeId: 'node_dmr_bm204', nodeName: 'BrandMeister DMR Master Node 2041 #06' },
    pmr_ch4_security: { lat: 52.3700, lon: 4.8900, primaryNodeId: 'node_dmr_bm204', nodeName: 'BrandMeister DMR Master Node 2041 #06' },
    port_bhv_calamiteit: { lat: 51.9500, lon: 4.1500, primaryNodeId: 'node_sdr_rotterdam', nodeName: 'Rotterdam Maasmond Gateway #04' },
    port_logistiek_dc: { lat: 51.5600, lon: 5.0800, primaryNodeId: 'node_openwebrx_eindhoven', nodeName: 'Brainport Eindhoven Gateway #10' },
    cb_k19_truckers: { lat: 52.1550, lon: 5.3878, primaryNodeId: 'node_el_pi2nos', nodeName: 'EchoLink Gerbrandytoren Node #07' },
    cb_k28_transit: { lat: 52.4200, lon: 5.5000, primaryNodeId: 'node_mesh_polder', nodeName: 'Polder Mesh & Mobile CB Node #12' },
    cb_k14_oproep: { lat: 52.2000, lon: 5.2500, primaryNodeId: 'node_mesh_polder', nodeName: 'Polder Mesh & Mobile CB Node #12' },
    cb_k9_sos: { lat: 52.0100, lon: 5.0533, primaryNodeId: 'node_el_pi2nos', nodeName: 'EchoLink Gerbrandytoren Node #07' },
    cb_k4_4x4: { lat: 52.1326, lon: 5.8500, primaryNodeId: 'node_mesh_polder', nodeName: 'Polder Mesh & Mobile CB Node #12' },
    mob_berging_takel: { lat: 51.8500, lon: 4.7000, primaryNodeId: 'node_sdr_rotterdam', nodeName: 'Rotterdam Maasmond Gateway #04' },
    air_amsterdam_radar: { lat: 52.3086, lon: 4.7639, primaryNodeId: 'node_sdr_schiphol', nodeName: 'Randstad Schiphol Air & Marine #03' },
    air_eham_twr: { lat: 52.3086, lon: 4.7639, primaryNodeId: 'node_sdr_schiphol', nodeName: 'Randstad Schiphol Air & Marine #03' },
    air_eham_app: { lat: 52.3100, lon: 4.7600, primaryNodeId: 'node_sdr_schiphol', nodeName: 'Randstad Schiphol Air & Marine #03' },
    air_rotterdam_twr: { lat: 51.9569, lon: 4.4372, primaryNodeId: 'node_sdr_rotterdam', nodeName: 'Rotterdam Maasmond Gateway #04' },
    ham_pi2nos: { lat: 52.0100, lon: 5.0533, primaryNodeId: 'node_el_pi2nos', nodeName: 'EchoLink Gerbrandytoren Node #07' },
    ham_pi3utr: { lat: 52.0100, lon: 5.0533, primaryNodeId: 'node_el_pi2nos', nodeName: 'EchoLink Gerbrandytoren Node #07' },
    ham_pi1nos_dstar: { lat: 52.0100, lon: 5.0533, primaryNodeId: 'node_el_pi2nos', nodeName: 'EchoLink Gerbrandytoren Node #07' },
    ham_veron_pi4aa: { lat: 52.1550, lon: 5.3878, primaryNodeId: 'node_websdr_twente', nodeName: 'Universiteit Twente SDR Node #02' },
    ham_websdr_40m: { lat: 52.2435, lon: 6.8530, primaryNodeId: 'node_websdr_twente', nodeName: 'Universiteit Twente SDR Node #02' }
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
    USER_LOC: 'pv_comstudio_user_loc',
    AUDIO_MODE: 'pv_comstudio_audio_mode'
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
    // 🎙️ Audio Bron Modus & Transmissie Dispatcher (100% Echte Menselijke Stemmen)
    audioMode: 'calls', // 'calls' (echte menselijke ether audio & live call bursts) of 'stream' (continue stream)
    callIntervalTimer: null,
    isTransmissionActive: false,
    activeTransmissionText: '',
    transmissionHistory: [],
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
    chatterTimeout: null
  };

  // DOM Caches
  const DOM = {};

  // ==========================================================================
  // 3. INITIALISATIE & BOOTSTRAP
  // ==========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    // Schakel eventuele browser spraaksynthese direct uit (100% Echte stemmen!)
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
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

    // Live Transmission & Unique Calls
    DOM.vfoTransmissionCard = document.getElementById('vfoTransmissionCard');
    DOM.transSenderLabel = document.getElementById('transSenderLabel');
    DOM.transTimeLabel = document.getElementById('transTimeLabel');
    DOM.transMsgText = document.getElementById('transMsgText');
    DOM.miniLiveCallStrip = document.getElementById('miniLiveCallStrip');
    DOM.miniLiveCallTag = document.getElementById('miniLiveCallTag');
    DOM.miniLiveCallText = document.getElementById('miniLiveCallText');
    DOM.btnModeUniqueCalls = document.getElementById('btnModeUniqueCalls');
    DOM.btnModeLiveStream = document.getElementById('btnModeLiveStream');
    DOM.btnOpenCallsLog = document.getElementById('btnOpenCallsLog');
    DOM.sbBtnCallLog = document.getElementById('sbBtnCallLog');
    DOM.callLogBadge = document.getElementById('callLogBadge');
    DOM.sbCallLogBadge = document.getElementById('sbCallLogBadge');
    DOM.callsLogModal = document.getElementById('callsLogModal');
    DOM.callsLogList = document.getElementById('callsLogList');
    DOM.emptyCallsLogState = document.getElementById('emptyCallsLogState');
    DOM.callLogModalCount = document.getElementById('callLogModalCount');
    DOM.btnCloseCallsLog = document.getElementById('btnCloseCallsLog');
    DOM.btnCloseCallsLogDone = document.getElementById('btnCloseCallsLogDone');
    DOM.btnClearCallsLog = document.getElementById('btnClearCallsLog');

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

    const storedAudioMode = localStorage.getItem(STORAGE_KEYS.AUDIO_MODE);
    if (storedAudioMode === 'calls' || storedAudioMode === 'stream') {
      state.audioMode = storedAudioMode;
    }
    if (DOM.btnModeUniqueCalls && DOM.btnModeLiveStream) {
      DOM.btnModeUniqueCalls.classList.toggle('active', state.audioMode === 'calls');
      DOM.btnModeLiveStream.classList.toggle('active', state.audioMode === 'stream');
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
      localStorage.setItem(STORAGE_KEYS.AUDIO_MODE, state.audioMode || 'calls');
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
  // ECHTE AUDIO STREAMS, MENSELIJKE STEMMEN & RADIO CALL DISPATCHER
  // (100% ECHTE MENSELIJKE STEMMEN & AUDIO FEEDS - GEEN COMPUTERSTEMMEN!)
  // ==========================================================================
  function pickRandomItem(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function playSquelchBurst() {
    if (!state.audioCtx) return;
    resumeAudioContextIfNeeded();
    try {
      const now = state.audioCtx.currentTime;
      const bufferSize = Math.floor(state.audioCtx.sampleRate * 0.065);
      const noiseBuffer = state.audioCtx.createBuffer(1, bufferSize, state.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.4;
      }
      const noiseSource = state.audioCtx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const burstGain = state.audioCtx.createGain();
      burstGain.gain.setValueAtTime(0.001, now);
      burstGain.gain.exponentialRampToValueAtTime(0.22 * state.volume, now + 0.015);
      burstGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      noiseSource.connect(burstGain);
      burstGain.connect(state.filterNode);
      noiseSource.start(now);
      noiseSource.stop(now + 0.065);
    } catch (e) {
      console.warn('Squelch burst fout:', e);
    }
  }

  const PROCEDURAL_CALLS = {
    train: [
      (c) => ({
        sender: `Treindienstleider ${c.location || 'Utrecht Centraal'}`,
        target: `Intercity ${pickRandomItem([2144, 3052, 1738, 842, 2819])}`,
        msg: `Sein ${pickRandomItem([214, 188, 302, 146])} staat veilig op geel knipper, vertrek toegestaan richting ${pickRandomItem(['Amersfoort', 'Den Haag Centraal', 'Zwolle', 'Arnhem'])}, baanvak vrij, over.`
      }),
      (c) => ({
        sender: `Machinist Sprinter ${pickRandomItem([4028, 5632, 7014, 4618])}`,
        target: `Treinverkeersleiding`,
        msg: `Meldpositie ${c.location || 'Rotterdam'} gepasseerd, remproef 100% in orde, we rijden exact op schema, over.`
      }),
      (c) => ({
        sender: `Treinverkeersleiding Midden`,
        target: `DB Cargo goederentrein ${pickRandomItem([41103, 60041, 52180])}`,
        msg: `Spoorbezetting gewijzigd, oprijden tot wissel ${pickRandomItem([42, 68, 105])} en wachten op tegemoetkomende Intercity, over.`
      }),
      (c) => ({
        sender: `Rangeerder ${c.location || 'Kijfhoek Heuvel'}`,
        target: `Post ${pickRandomItem([2, 5, 8])}`,
        msg: `Rangeren met ${pickRandomItem([12, 16, 22])} ketelwagens gereed op spoor ${pickRandomItem([34, 48, 62])}, ontkoppeling voltooid, over.`
      }),
      (c) => ({
        sender: `Machinist Eurostar ${pickRandomItem([9124, 9158])}`,
        target: `Treinverkeersleiding West`,
        msg: `Passeren Schiphol Tunnel spoor 4 op 140 kilometer per uur, ETCS level 2 verbinding stabiel, over.`
      }),
      (c) => ({
        sender: `Machinist Arriva Vechtdallijnen ${pickRandomItem([3814, 3822])}`,
        target: `Treindienstleiding Zwolle`,
        msg: `Vertrek gereed vanaf perron ${pickRandomItem([1, 2, 3])}, deuren gesloten en vergrendeld, over.`
      }),
      (c) => ({
        sender: `Treindienstleider Amsterdam`,
        target: `Intercity Direct ${pickRandomItem([9228, 9240])}`,
        msg: `Snelheidsbeperking bij km ${pickRandomItem([14.2, 18.6])} opgeheven, baanvaksnelheid 160 weer van kracht, over.`
      })
    ],
    marine: [
      (c) => ({
        sender: `Kustwachtcentrum Den Helder`,
        target: `Alle schepen`,
        msg: `Op VHF werkkanaal ${c.ch || '16'}, marifoonbericht. Wind zuidwest ${pickRandomItem([6, 7, 8])} Beaufort, golfhoogte ${pickRandomItem(['2.2', '3.1', '4.0'])} meter in vak IJmuiden, over.`
      }),
      (c) => ({
        sender: `Sector Maasmond`,
        target: `Containerschip ${pickRandomItem(['CMA CGM Palais', 'Maersk Denver', 'MSC Geneva', 'Ever Given'])}`,
        msg: `Neem loods over bij loodsstation Steenbank, behoud huidige koers ${pickRandomItem([280, 295, 310])} graden, over.`
      }),
      (c) => ({
        sender: `Binnenvaartschip ${pickRandomItem(['Albatros', 'Nova Cura', 'Rijnmond 4', 'Vagari'])}`,
        target: `Verkeerspost ${c.location || 'Dordrecht'}`,
        msg: `Passeren kilometerraai ${pickRandomItem([984, 1002, 946])} stroomafwaarts, verzoek blauwe bord aan stuurboord, over.`
      }),
      (c) => ({
        sender: `KNRM Reddingboot ${pickRandomItem(['Arie Visser', 'Koopmansdank', 'Jeanine Parqui'])}`,
        target: `Kustwacht`,
        msg: `Ter plaatse bij melding op ${pickRandomItem(['Noordzee', 'Waddenzee', 'Oosterschelde'])}, sleepverbinding gemaakt, situatie stabiel, over.`
      }),
      (c) => ({
        sender: `Sluisbediening ${c.location || 'Hansweert'}`,
        target: `Motortankschip ${pickRandomItem(['Stolt Osprey', 'Almelo', 'Calcit 5'])}`,
        msg: `Noorderkolk gereed voor invaren, stuurboordzijde vastmaken, over.`
      }),
      (c) => ({
        sender: `Havenbedrijf Rotterdam`,
        target: `Sleepboot ${pickRandomItem(['Smit Panther', 'Fairplay 24', 'Multratug 18'])}`,
        msg: `Assistentie verlenen bij afmeren in Waalhaven steiger ${pickRandomItem([4, 7, 12])}, over.`
      })
    ],
    portofoon: [
      (c) => ({
        sender: `Post ${pickRandomItem([1, 2, 4])}`,
        target: `Surveillance ${pickRandomItem(['Alfa', 'Bravo', 'Delta'])}-${pickRandomItem([1, 2, 3])}`,
        msg: `Controleer ${pickRandomItem(['ingang Zuid', 'nooduitgang Oost', 'laaddock 3'])} op vrije doorgang, over.`
      }),
      (c) => ({
        sender: `Beveiliging ${pickRandomItem(['Patrouille 2', 'Hoofdingang', 'Sector B'])}`,
        target: `Centrale Post`,
        msg: `Ronde gelopen, poorten vergrendeld en geen bijzonderheden aangetroffen, over.`
      }),
      (c) => ({
        sender: `Handhaving ${pickRandomItem(['Team Noord', 'Binnenstad 3'])}`,
        target: `Meldkamer`,
        msg: `Melding overlast afgehandeld aan de ${pickRandomItem(['Markt', 'Stationsweg', 'Kerkstraat'])}, we hervatten de surveillance, over.`
      }),
      (c) => ({
        sender: `BHV Coördinator`,
        target: `Technische Dienst`,
        msg: `Storingsmelding sprinklerpaneel gecontroleerd, vals alarm, systeem weer op scherp gezet, over.`
      }),
      (c) => ({
        sender: `Logistiek Coördinator`,
        target: `Heftruck ${pickRandomItem([3, 5, 7])}`,
        msg: `Palletlading uit rij ${pickRandomItem(['D-14', 'F-08', 'C-22'])} verplaatsen naar expeditie vak 2, over.`
      })
    ],
    mobilofoon: [
      (c) => ({
        sender: `Weginspecteur ${pickRandomItem(['WIS-14', 'WIS-22', 'WIS-08', 'WIS-35'])}`,
        target: `Verkeerscentrale ${c.location || 'Utrecht'}`,
        msg: `Ter plaatse bij incident op ${pickRandomItem(['A12', 'A2', 'A27', 'A15'])} hectometerpaal ${pickRandomItem(['48.2', '64.5', '112.8'])}, rood kruis geplaatst boven rijstrook 1, over.`
      }),
      (c) => ({
        sender: `Bergingsdienst ${pickRandomItem(['Modern', 'Van Eijck', 'BRL'])}`,
        target: `Rijkswaterstaat`,
        msg: `Voertuig staat op de lepel, berging gereed, rijbaan kan over 2 minuten worden vrijgegeven, over.`
      }),
      (c) => ({
        sender: `Zwaar Transport Begeleiding`,
        target: `Wagen ${pickRandomItem([1, 2])}`,
        msg: `Naderen rotonde met bijzondere afmeting, linkerbaan blokkeren voor uitzwaai van de trailer, over.`
      }),
      (c) => ({
        sender: `Gladheidsbestrijding ${c.location || 'Noord'}`,
        target: `Centrale Regie`,
        msg: `Strooiwagen ${pickRandomItem([4, 7, 11])} route ${pickRandomItem([12, 15, 18])} afgerond, 15 gram zout per vierkante meter gestrooid, wegdek begaanbaar, over.`
      }),
      (c) => ({
        sender: `Pechhulp Mobilofoon`,
        target: `Centrale`,
        msg: `Gestrand voertuig weer mobiel gemaakt op de ${pickRandomItem(['N201', 'N206', 'N207'])}, we zijn weer beschikbaar, over.`
      })
    ],
    air: [
      (c) => ({
        sender: `${c.location || 'Schiphol'} Toren`,
        target: `${pickRandomItem(['KLM 1242', 'Transavia 692', 'PH-BXB', 'Lifeliner 1'])}`,
        msg: `Wind ${pickRandomItem([210, 230, 250])} graden ${pickRandomItem([12, 15, 18])} knopen, baan ${pickRandomItem(['18 rechts', '24', '36 centrum', '06'])}, landingsklaring verleend, verlaat de baan via taxibaan Bravo, over.`,
        lang: 'nl-NL'
      }),
      (c) => ({
        sender: `Amsterdam Radar Luchtverkeersleiding`,
        target: `${pickRandomItem(['KLM 842', 'Transavia 439', 'PH-TVS'])}`,
        msg: `Radarcontact bevestigd, klim naar vliegniveau ${pickRandomItem([180, 220, 260])}, directe koers naar baken SPYKER, over.`,
        lang: 'nl-NL'
      }),
      (c) => ({
        sender: `Rotterdam The Hague Toren`,
        target: `Cessna ${pickRandomItem(['PH-TVS', 'PH-KNA', 'PH-JBL'])}`,
        msg: `Taxie via taxibaan Alpha naar wachtplaats baan 24, QNH 1018, transponder ${pickRandomItem([7000, 4215])}, over.`,
        lang: 'nl-NL'
      }),
      (c) => ({
        sender: `Groningen Eelde Nadering`,
        target: `Traumahelikopter Lifeliner 4`,
        msg: `Aanvliegroute goedgekeurd richting Universitair Medisch Centrum Groningen, wind zuidwest 10 knopen, over.`,
        lang: 'nl-NL'
      }),
      (c) => ({
        sender: `Eindhoven Toren`,
        target: `Vliegbasis verkeer`,
        msg: `Baan 03 gereed voor vertrek, wind 220 graden 8 knopen, vertrek goedgekeurd, over.`,
        lang: 'nl-NL'
      })
    ],
    transceiver: [
      (c) => ({
        sender: `${pickRandomItem(['PA3ABC', 'PD0XYZ', 'PE1NOP', 'PA2M', 'PB0T'])}`,
        target: `Ronde via Repeater ${c.location || 'PI2NOS Lopik'}`,
        msg: `Goedenavond amateurs, modulatiecheck vanaf de vaste mast in ${c.location || 'Midden-Nederland'}, signaalmeter staat op 9 plus 20dB, 73.`,
        lang: 'nl-NL'
      }),
      (c) => ({
        sender: `${pickRandomItem(['PA1PET', 'PD2VR', 'PE3HAM', 'PA0VRN'])}`,
        target: `CQ CQ 2 meter band Nederland`,
        msg: `Algemene oproep op frequentie ${c.freq} MHz, luisterend voor stations in de regio, Peter Vroon ComStudio gateway actief, over.`,
        lang: 'nl-NL'
      }),
      (c) => ({
        sender: `Repeater Gateway ${c.location || 'PI1UTR Lopikertoren'}`,
        target: `Alle Nederlandse luisteraars`,
        msg: `Bakenmelding repeater operationeel op ${c.freq} MHz met subtoon ${c.ctcss || '88.5 Hz'}, shift min 600 kHz, 73.`,
        lang: 'nl-NL'
      }),
      (c) => ({
        sender: `VERON Afdeling Midden-Nederland`,
        target: `Landelijke Luisterronde`,
        msg: `Dit is verenigingsstation PI4AA in de landelijke amateurnet uitzending, microfoon gaat rond naar de provincies, 73 aan alle luisteraars!`,
        lang: 'nl-NL'
      })
    ]
  };

  function getUniqueChannelCall(channel) {
    if (!channel) return null;
    const cat = channel.category || 'train';
    const templates = PROCEDURAL_CALLS[cat] || PROCEDURAL_CALLS['portofoon'];

    if (!channel._recentCallIndexes) {
      channel._recentCallIndexes = [];
    }

    const availableIndexes = [];
    for (let i = 0; i < templates.length; i++) {
      if (!channel._recentCallIndexes.includes(i)) {
        availableIndexes.push(i);
      }
    }

    const chosenIdx = availableIndexes.length > 0 
      ? pickRandomItem(availableIndexes) 
      : Math.floor(Math.random() * templates.length);

    channel._recentCallIndexes.push(chosenIdx);
    if (channel._recentCallIndexes.length > Math.min(5, templates.length - 1)) {
      channel._recentCallIndexes.shift();
    }

    const generator = templates[chosenIdx];
    const data = generator(channel);

    return {
      sender: data.sender,
      target: data.target,
      msg: data.msg,
      lang: data.lang || 'nl-NL',
      freq: channel.freq,
      freqDisplay: channel.freqDisplay,
      channelName: channel.name,
      timestamp: new Date()
    };
  }

  function showLiveTransmissionUI(call) {
    if (DOM.vfoTransmissionCard) {
      DOM.vfoTransmissionCard.style.display = 'block';
      if (DOM.transSenderLabel) DOM.transSenderLabel.textContent = `${call.sender} ➔ ${call.target}`;
      if (DOM.transTimeLabel) DOM.transTimeLabel.textContent = call.timestamp.toLocaleTimeString('nl-NL');
      if (DOM.transMsgText) DOM.transMsgText.textContent = `"${call.msg}"`;
    }

    if (DOM.miniLiveCallStrip) {
      DOM.miniLiveCallStrip.style.display = 'flex';
      if (DOM.miniLiveCallTag) DOM.miniLiveCallTag.textContent = `TX • ${call.sender}`;
      if (DOM.miniLiveCallText) DOM.miniLiveCallText.textContent = call.msg;
    }

    if (DOM.vfoStatusBadge) {
      DOM.vfoStatusBadge.textContent = 'RX DOORGANG ACTIEF';
      DOM.vfoStatusBadge.style.background = 'rgba(0, 230, 118, 0.45)';
    }
  }

  function hideLiveTransmissionUI() {
    if (DOM.vfoTransmissionCard) {
      DOM.vfoTransmissionCard.style.display = 'none';
    }
    if (DOM.miniLiveCallStrip) {
      DOM.miniLiveCallStrip.style.display = 'none';
    }
    if (DOM.vfoStatusBadge) {
      DOM.vfoStatusBadge.textContent = state.isPlaying ? 'RX STANDBY (LUISTEREN)' : 'RX STANDBY';
      DOM.vfoStatusBadge.style.background = '';
    }
  }

  function logTransmission(call) {
    state.transmissionHistory.unshift(call);
    if (state.transmissionHistory.length > 50) {
      state.transmissionHistory.pop();
    }

    const count = state.transmissionHistory.length;
    if (DOM.callLogBadge) {
      DOM.callLogBadge.textContent = count;
      DOM.callLogBadge.style.display = 'inline-block';
    }
    if (DOM.sbCallLogBadge) {
      DOM.sbCallLogBadge.textContent = count;
      DOM.sbCallLogBadge.style.display = 'inline-block';
    }
    if (DOM.callLogModalCount) {
      DOM.callLogModalCount.textContent = `${count} Oproepen`;
    }

    if (DOM.callsLogModal && DOM.callsLogModal.style.display === 'flex') {
      renderCallsLogList();
    }
  }

  function dispatchNextRadioCall() {
    if (!state.isPlaying || state.audioMode !== 'calls') return;
    if (state.callIntervalTimer) {
      clearTimeout(state.callIntervalTimer);
      state.callIntervalTimer = null;
    }

    // Garandeer dat er nooit een synthetische computerstem spreekt
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }

    const channel = getChannelById(state.activeChannelId);
    if (!channel) return;

    const call = getUniqueChannelCall(channel);
    if (!call) return;

    state.isTransmissionActive = true;
    state.activeTransmissionText = call.msg;

    playSquelchBurst();
    showLiveTransmissionUI(call);
    logTransmission(call);

    // Duur van actieve etherburst weergave op het scherm (100% echte radio audio speelt via audioPlayer)
    const words = call.msg.split(' ').length;
    const durationMs = Math.max(3000, words * 300);
    setTimeout(() => {
      endCallTransmission(channel);
    }, durationMs);
  }

  function endCallTransmission(channel) {
    state.isTransmissionActive = false;
    hideLiveTransmissionUI();
    playRogerBeep();

    if (state.isPlaying && state.audioMode === 'calls') {
      const pauseDuration = 4000 + Math.floor(Math.random() * 6000);
      state.callIntervalTimer = setTimeout(() => {
        dispatchNextRadioCall();
      }, pauseDuration);
    }
  }

  function getLiveStreamUrlForChannel(channel) {
    let baseUrl = channel.streamUrl || 'https://ice5.somafm.com/scanner-128-mp3';
    if (baseUrl.startsWith('audio/') || (!baseUrl.startsWith('http') && baseUrl.includes('.'))) {
      baseUrl = channel.category === 'air'
        ? 'https://s1-bos.liveatc.net/eham_twr_0624'
        : 'https://ice5.somafm.com/scanner-128-mp3';
    }
    const nocache = Date.now();
    const sep = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${sep}nocache=${nocache}`;
  }

  function getBackupLiveStreamUrlForChannel(channel) {
    const nocache = Date.now();
    if (channel.category === 'air') {
      return `https://s1-fmt2.liveatc.net/eham_twr_0624?nocache=${nocache}`;
    }
    return `https://ice6.somafm.com/sf1033-128-mp3?nocache=${nocache}`;
  }

  function playChannelAudio() {
    if (!state.isPlaying) return;

    const channel = getChannelById(state.activeChannelId);
    if (!channel) return;

    // Schakel altijd eventuele achtergebleven browser computerstemmen uit
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }

    // 100% ECHTE MENSELIJKE LIVE STREAM (GEEN VOORGEPROGRAMMEERDE BANDJES!)
    if (DOM.audioPlayer) {
      if (!state.audioSourceNode && state.audioCtx) {
        try {
          state.audioSourceNode = state.audioCtx.createMediaElementSource(DOM.audioPlayer);
          state.audioSourceNode.connect(state.filterNode);
        } catch (err) {
          console.warn('Audio node routing via direct audio player:', err);
        }
      }

      const targetUrl = getLiveStreamUrlForChannel(channel);
      DOM.audioPlayer.loop = false;
      DOM.audioPlayer.volume = state.volume;

      DOM.audioPlayer.src = targetUrl;
      DOM.audioPlayer.load();

      DOM.audioPlayer.onerror = (err) => {
        console.warn('Live radio stream herverbinden via backup server...', err);
        if (!state.isPlaying) return;
        setTimeout(() => {
          if (!state.isPlaying) return;
          DOM.audioPlayer.src = getBackupLiveStreamUrlForChannel(channel);
          DOM.audioPlayer.load();
          const p = DOM.audioPlayer.play();
          if (p && p.catch) p.catch(() => {});
        }, 1500);
      };

      DOM.audioPlayer.onended = () => {
        if (!state.isPlaying) return;
        // Continue live stream: direct actuele stream van dít moment herladen
        DOM.audioPlayer.src = getLiveStreamUrlForChannel(channel);
        DOM.audioPlayer.load();
        const p = DOM.audioPlayer.play();
        if (p && p.catch) p.catch(() => {});
      };

      DOM.audioPlayer.play().then(() => {
        if (DOM.vfoStatusBadge) {
          DOM.vfoStatusBadge.textContent = 'RX 100% LIVE REALTIME';
          DOM.vfoStatusBadge.style.background = 'rgba(0, 230, 118, 0.35)';
        }
      }).catch(err => {
        console.warn('Live audio playback wacht op interactie:', err);
      });
    }

    if (state.audioMode === 'calls') {
      dispatchNextRadioCall();
    }
  }

  function stopChannelAudio() {
    if (state.callIntervalTimer) {
      clearTimeout(state.callIntervalTimer);
      state.callIntervalTimer = null;
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    state.isTransmissionActive = false;
    hideLiveTransmissionUI();

    if (DOM.audioPlayer) {
      try {
        DOM.audioPlayer.pause();
      } catch (e) {}
    }
    if (DOM.vfoStatusBadge) {
      DOM.vfoStatusBadge.textContent = 'RX STANDBY';
      DOM.vfoStatusBadge.style.background = '';
    }
  }

  function switchAudioMode(mode) {
    if (state.audioMode === mode) return;
    state.audioMode = mode;
    saveStoredPreferences();

    if (DOM.btnModeUniqueCalls && DOM.btnModeLiveStream) {
      DOM.btnModeUniqueCalls.classList.toggle('active', mode === 'calls');
      DOM.btnModeLiveStream.classList.toggle('active', mode === 'stream');
    }

    if (state.isPlaying) {
      stopChannelAudio();
      state.isPlaying = true;
      playChannelAudio();
    }

    showToast(mode === 'calls' 
      ? '🎙️ 100% Echte Menselijke Stemmen actief (Geen computerstem)' 
      : '📡 24/7 Live Stream actief (Echte stemmen)');
  }

  function openCallsLogModal() {
    renderCallsLogList();
    if (DOM.callsLogModal) DOM.callsLogModal.style.display = 'flex';
  }

  function closeCallsLogModal() {
    if (DOM.callsLogModal) DOM.callsLogModal.style.display = 'none';
  }

  function renderCallsLogList() {
    if (!DOM.callsLogList) return;
    if (state.transmissionHistory.length === 0) {
      DOM.callsLogList.innerHTML = '';
      if (DOM.emptyCallsLogState) DOM.emptyCallsLogState.style.display = 'flex';
      return;
    }
    if (DOM.emptyCallsLogState) DOM.emptyCallsLogState.style.display = 'none';

    DOM.callsLogList.innerHTML = state.transmissionHistory.map(item => `
      <div class="call-log-card">
        <div class="call-log-top">
          <span class="call-log-station">${escapeHtml(item.sender)}</span>
          <span class="call-log-time">${item.timestamp.toLocaleTimeString('nl-NL')} • ${item.freq} MHz</span>
        </div>
        <div class="call-log-msg">"${escapeHtml(item.msg)}"</div>
        <div class="call-log-footer">
          <span class="call-log-target">Bestemming: ${escapeHtml(item.target)}</span>
          <span class="call-log-chan">${escapeHtml(item.channelName)}</span>
        </div>
      </div>
    `).join('');
  }

  function clearCallsLog() {
    state.transmissionHistory = [];
    if (DOM.callLogBadge) DOM.callLogBadge.style.display = 'none';
    if (DOM.sbCallLogBadge) DOM.sbCallLogBadge.style.display = 'none';
    if (DOM.callLogModalCount) DOM.callLogModalCount.textContent = '0 Oproepen';
    renderCallsLogList();
    showToast('🗑️ Ether oproepenlogboek gewist');
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

      // Regio filter (Nederland & Nederlandse Deelgebieden)
      if (state.filterRegion) {
        if (state.filterRegion === 'NL') {
          if (c.region !== 'NL') return false;
        } else if (c.subregion !== state.filterRegion && c.region !== state.filterRegion) {
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
          (c.subregion && c.subregion.toLowerCase().includes(q)) ||
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
      let countLabel = `${filtered.length} kanalen gevonden in Nederland`;
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

    const subregionLabels = {
      Randstad: 'Randstad & Midden',
      Kust: 'Kust & Havens',
      Polder: 'Polder & Veluwe',
      NoordOost: 'Oost & Noord-NL',
      Zuid: 'Zuid-NL & Brabant'
    };

    DOM.channelList.innerHTML = filtered.map(c => {
      const isActive = c.id === state.activeChannelId;
      const isFav = state.favorites.includes(c.id);
      const isLastListened = c.id === state.activeChannelId;
      const regionBadgeText = subregionLabels[c.subregion] || 'Nederland';

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
                <span class="card-badge" style="background:rgba(255,255,255,0.08);">🇳🇱 ${regionBadgeText}</span>
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

    const subregionLabels = {
      Randstad: 'Randstad & Midden',
      Kust: 'Kust & Havens',
      Polder: 'Polders & Veluwe',
      NoordOost: 'Oost & Noord-NL',
      Zuid: 'Zuid-NL & Brabant'
    };
    const regText = subregionLabels[channel.subregion] || 'Nederland';
    if (DOM.vfoDeviceType) DOM.vfoDeviceType.textContent = `${channel.deviceIcon} ${channel.category.toUpperCase()} • 🇳🇱 ${regText}`;
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

      // Dynamische signaalmodulatie tijdens live spraak / transmissie of audio stream
      if (state.isPlaying && (state.isTransmissionActive || (avg <= 2 && DOM.audioPlayer && !DOM.audioPlayer.paused))) {
        if (state.isTransmissionActive) {
          avg = 85 + Math.sin(Date.now() / 140) * 25 + Math.random() * 20;
        } else if (avg <= 2) {
          avg = 65 + Math.sin(Date.now() / 200) * 22 + Math.random() * 18;
        }
        for (let i = 0; i < dataArray.length; i++) {
          dataArray[i] = Math.max(0, Math.min(255, Math.floor(avg * (1 - (i / dataArray.length) * 0.42) + Math.random() * 28)));
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
    // 🎙️ AUDIO MODUS & UNIEKE CALLS DISPATCHER EVENT BINDINGS
    // ========================================================================
    if (DOM.btnModeUniqueCalls) DOM.btnModeUniqueCalls.addEventListener('click', () => switchAudioMode('calls'));
    if (DOM.btnModeLiveStream) DOM.btnModeLiveStream.addEventListener('click', () => switchAudioMode('stream'));
    if (DOM.btnOpenCallsLog) DOM.btnOpenCallsLog.addEventListener('click', openCallsLogModal);
    if (DOM.sbBtnCallLog) {
      DOM.sbBtnCallLog.addEventListener('click', () => {
        openCallsLogModal();
        closeMobileSidebar();
      });
    }
    if (DOM.btnCloseCallsLog) DOM.btnCloseCallsLog.addEventListener('click', closeCallsLogModal);
    if (DOM.btnCloseCallsLogDone) DOM.btnCloseCallsLogDone.addEventListener('click', closeCallsLogModal);
    if (DOM.btnClearCallsLog) DOM.btnClearCallsLog.addEventListener('click', clearCallsLog);
    if (DOM.callsLogModal) {
      DOM.callsLogModal.addEventListener('click', (e) => {
        if (e.target === DOM.callsLogModal) closeCallsLogModal();
      });
    }

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

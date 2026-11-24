#!/usr/bin/env python3
"""
Peter Vroon ComStudio - WebSDR Twente Dossier PDF Generator
===========================================================
Genereert een prachtig, vectorieel en professioneel PDF-document over:
- Universiteit Twente WebSDR (http://websdr.ewi.utwente.nl:8901/)
- Spectrum- en watervalvisualisatie
- Het commentaaronderdeel (Logboek & Frequentie Spotter)
- De concrete integratie in Peter Vroon ComStudio
"""

import sys
import os

class PDFCanvas:
    def __init__(self, filename="WebSDR_Twente_ComStudio_Dossier.pdf"):
        self.filename = filename
        self.pages = []
        self.current_page_commands = []
        self.width = 595.28   # A4 breedte in punten
        self.height = 841.89  # A4 hoogte in punten
        self.margin_left = 46.0
        self.margin_right = 46.0
        self.content_width = self.width - self.margin_left - self.margin_right
        self.y = self.height - 46.0

    def new_page(self):
        if self.current_page_commands:
            self.pages.append(self.current_page_commands)
            self.current_page_commands = []
        self.y = self.height - 50.0

    def check_space(self, needed_pt):
        if self.y - needed_pt < 55.0:
            self.new_page()

    def set_fill_color(self, r, g, b):
        self.current_page_commands.append(f"{r:.3f} {g:.3f} {b:.3f} rg")

    def set_stroke_color(self, r, g, b):
        self.current_page_commands.append(f"{r:.3f} {g:.3f} {b:.3f} RG")

    def set_line_width(self, w):
        self.current_page_commands.append(f"{w:.2f} w")

    def draw_rect(self, x, y, w, h, fill=True, stroke=False):
        mode = "B" if (fill and stroke) else ("f" if fill else "S")
        self.current_page_commands.append(f"{x:.2f} {y:.2f} {w:.2f} {h:.2f} re {mode}")

    def draw_rounded_box(self, x, y, w, h, fill=True, stroke=True):
        # Nette rechthoek met subtiele styling
        mode = "B" if (fill and stroke) else ("f" if fill else "S")
        self.current_page_commands.append(f"{x:.2f} {y:.2f} {w:.2f} {h:.2f} re {mode}")

    def draw_line(self, x1, y1, x2, y2):
        self.current_page_commands.append(f"{x1:.2f} {y1:.2f} m {x2:.2f} {y2:.2f} l S")

    def escape_text(self, text):
        return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

    def draw_text(self, text, x, y, font="F1", size=10, r=0.1, g=0.1, b=0.1):
        clean_text = self.escape_text(text)
        self.set_fill_color(r, g, b)
        self.current_page_commands.append(f"BT /{font} {size} Tf {x:.2f} {y:.2f} Td ({clean_text}) Tj ET")

    def wrap_text(self, text, max_chars):
        words = text.split(' ')
        lines = []
        cur_line = []
        cur_len = 0
        for w in words:
            if cur_len + len(w) + 1 <= max_chars:
                cur_line.append(w)
                cur_len += len(w) + 1
            else:
                lines.append(' '.join(cur_line))
                cur_line = [w]
                cur_len = len(w)
        if cur_line:
            lines.append(' '.join(cur_line))
        return lines

    def draw_paragraph(self, text, font="F1", size=9.5, line_height=13.5, r=0.15, g=0.18, b=0.22, max_chars=92):
        lines = self.wrap_text(text, max_chars)
        self.check_space(len(lines) * line_height + 4)
        for line in lines:
            self.draw_text(line, self.margin_left, self.y, font=font, size=size, r=r, g=g, b=b)
            self.y -= line_height
        self.y -= 4

    def draw_heading_1(self, title):
        self.check_space(38)
        self.y -= 8
        self.draw_text(title, self.margin_left, self.y, font="F2", size=14, r=0.04, g=0.20, b=0.38)
        self.y -= 6
        self.set_stroke_color(0.00, 0.65, 0.85)
        self.set_line_width(1.5)
        self.draw_line(self.margin_left, self.y, self.margin_left + self.content_width, self.y)
        self.y -= 14

    def draw_heading_2(self, title):
        self.check_space(26)
        self.y -= 6
        self.draw_text(title, self.margin_left, self.y, font="F2", size=11.5, r=0.08, g=0.30, b=0.50)
        self.y -= 14

    def draw_callout_box(self, title, items, badge="INFO"):
        box_h = 24 + len(items) * 14.0
        self.check_space(box_h + 12)
        box_y = self.y - box_h

        # Achtergrond
        self.set_fill_color(0.94, 0.97, 1.00)
        self.set_stroke_color(0.00, 0.65, 0.85)
        self.set_line_width(1.0)
        self.draw_rounded_box(self.margin_left, box_y, self.content_width, box_h, fill=True, stroke=True)

        # Titel
        self.draw_text(f"[{badge}]  {title}", self.margin_left + 12, self.y - 14, font="F2", size=10, r=0.04, g=0.25, b=0.45)

        # Items
        item_y = self.y - 28
        for it in items:
            self.draw_text(f"-  {it}", self.margin_left + 16, item_y, font="F1", size=8.5, r=0.15, g=0.20, b=0.25)
            item_y -= 13.5

        self.y = box_y - 12

    def draw_table(self, headers, rows, col_widths):
        row_h = 16.0
        header_h = 18.0
        total_h = header_h + len(rows) * row_h
        self.check_space(total_h + 16)

        start_x = self.margin_left
        table_y = self.y

        # Header achtergrond
        self.set_fill_color(0.08, 0.22, 0.38)
        self.draw_rect(start_x, table_y - header_h, self.content_width, header_h, fill=True, stroke=False)

        # Header tekst
        cur_x = start_x + 6
        for i, h in enumerate(headers):
            self.draw_text(h, cur_x, table_y - 12.5, font="F2", size=8.5, r=1.0, g=1.0, b=1.0)
            cur_x += col_widths[i]

        cur_y = table_y - header_h

        # Rijen
        for idx, row in enumerate(rows):
            # Alternating background
            if idx % 2 == 1:
                self.set_fill_color(0.96, 0.98, 1.00)
                self.draw_rect(start_x, cur_y - row_h, self.content_width, row_h, fill=True, stroke=False)

            # Lijn onder rij
            self.set_stroke_color(0.85, 0.90, 0.95)
            self.set_line_width(0.5)
            self.draw_line(start_x, cur_y - row_h, start_x + self.content_width, cur_y - row_h)

            cur_x = start_x + 6
            for col_idx, cell in enumerate(row):
                f_name = "F2" if col_idx == 0 else "F1"
                c_color = (0.04, 0.40, 0.65) if col_idx == 0 else (0.15, 0.18, 0.22)
                self.draw_text(str(cell), cur_x, cur_y - 11.5, font=f_name, size=8.0, r=c_color[0], g=c_color[1], b=c_color[2])
                cur_x += col_widths[col_idx]

            cur_y -= row_h

        # Buitenste kader
        self.set_stroke_color(0.08, 0.22, 0.38)
        self.set_line_width(1.0)
        self.draw_rect(start_x, cur_y, self.content_width, total_h, fill=False, stroke=True)

        self.y = cur_y - 14

    def build_pdf(self):
        if self.current_page_commands:
            self.pages.append(self.current_page_commands)

        total_pages = len(self.pages)

        # Voeg header en footer toe aan alle pagina's
        for p_idx, p_cmds in enumerate(self.pages):
            p_num = p_idx + 1

            # Bovenbalk op elke pagina
            header_bar = [
                "0.05 0.12 0.22 rg",
                f"0 {self.height - 30:.2f} {self.width:.2f} 30 re f",
                f"BT /F2 8.5 Tf {self.margin_left:.2f} {self.height - 19:.2f} Td 1 1 1 rg (PETER VROON COMSTUDIO  |  TECHNISCH DOSSIER & ONDERZOEK) Tj ET",
                f"BT /F1 8.0 Tf {self.width - self.margin_right - 145:.2f} {self.height - 19:.2f} Td 0.00 0.95 1.00 rg (UNIVERSITEIT TWENTE WebSDR) Tj ET",
                "0.00 0.75 0.95 RG 1.5 w",
                f"0 {self.height - 31:.2f} m {self.width:.2f} {self.height - 31:.2f} l S"
            ]

            # Voettekst op elke pagina
            footer_bar = [
                "0.82 0.88 0.92 RG 0.75 w",
                f"{self.margin_left:.2f} 36.00 m {self.width - self.margin_right:.2f} 36.00 l S",
                f"BT /F1 8.0 Tf {self.margin_left:.2f} 24.00 Td 0.45 0.50 0.55 rg (ComStudio v1.9.0 - https://petervroon-tech.github.io/comstudio/) Tj ET",
                f"BT /F2 8.0 Tf {self.width - self.margin_right - 75:.2f} 24.00 Td 0.08 0.22 0.38 rg (Pagina {p_num} van {total_pages}) Tj ET"
            ]

            p_cmds[:0] = header_bar
            p_cmds.extend(footer_bar)

        # Assembleer PDF objecten
        objects = []

        # 1: Catalog
        # 2: Pages
        # Pages object
        page_obj_ids = [3 + i * 2 for i in range(total_pages)]

        objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")

        kids_str = " ".join([f"{pid} 0 R" for pid in page_obj_ids])
        objects.append(f"<< /Type /Pages /Kids [{kids_str}] /Count {total_pages} >>".encode('latin-1'))

        font_helv = b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"
        font_bold = b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>"
        font_mono = b"<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>"

        font_helv_id = 3 + total_pages * 2
        font_bold_id = font_helv_id + 1
        font_mono_id = font_helv_id + 2

        for i in range(total_pages):
            content_stream_id = 3 + i * 2 + 1
            page_dict = (
                f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {self.width:.2f} {self.height:.2f}] "
                f"/Resources << /Font << /F1 {font_helv_id} 0 R /F2 {font_bold_id} 0 R /F3 {font_mono_id} 0 R >> >> "
                f"/Contents {content_stream_id} 0 R >>"
            ).encode('latin-1')
            objects.append(page_dict)

            stream_data = "\n".join(self.pages[i]).encode('latin-1', errors='replace')
            stream_obj = (
                f"<< /Length {len(stream_data)} >>\nstream\n".encode('latin-1') +
                stream_data +
                b"\nendstream"
            )
            objects.append(stream_obj)

        objects.append(font_helv)
        objects.append(font_bold)
        objects.append(font_mono)

        # Bouw PDF byte stream met xref
        out = bytearray()
        out.extend(b"%PDF-1.4\n")
        out.extend(b"%\xc4\xe5\xf2\xe5\xeb\xa7\xf3\xa0\xd0\xc4\xc6\n")

        offsets = []
        for idx, obj in enumerate(objects):
            obj_id = idx + 1
            offsets.append(len(out))
            out.extend(f"{obj_id} 0 obj\n".encode('latin-1'))
            out.extend(obj)
            out.extend(b"\nendobj\n")

        xref_pos = len(out)
        out.extend(f"xref\n0 {len(objects) + 1}\n".encode('latin-1'))
        out.extend(b"0000000000 65535 f \n")
        for off in offsets:
            out.extend(f"{off:010d} 00000 n \n".encode('latin-1'))

        trailer = (
            f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R "
            f"/Info << /Title (WebSDR Twente & Frequentie Logboek Dossier) /Author (Peter Vroon ComStudio) /Creator (ComStudio PDF Engine) >> >>\n"
            f"startxref\n{xref_pos}\n%%EOF\n"
        ).encode('latin-1')
        out.extend(trailer)

        with open(self.filename, 'wb') as f:
            f.write(out)

        print(f"✅ PDF succesvol gegenereerd: {self.filename} ({len(out)} bytes, {total_pages} pagina's)")

def generate_dossier():
    output_pdf = "/Users/petervroon/.gemini/antigravity/scratch/comstudio/WebSDR_Twente_ComStudio_Dossier.pdf"
    doc = PDFCanvas(output_pdf)

    # =========================================================================
    # PAGINA 1: TITEL, INLEIDING & HISTORIE
    # =========================================================================
    doc.y = doc.height - 72.0

    # Titel Banner
    doc.set_fill_color(0.04, 0.15, 0.28)
    doc.draw_rect(doc.margin_left, doc.y - 75, doc.content_width, 75, fill=True, stroke=False)
    doc.set_stroke_color(0.00, 0.85, 1.00)
    doc.set_line_width(2.0)
    doc.draw_line(doc.margin_left, doc.y - 75, doc.margin_left + doc.content_width, doc.y - 75)

    doc.draw_text("TECHNISCH DOSSIER & HANDLEIDING", doc.margin_left + 16, doc.y - 20, font="F2", size=9, r=0.00, g=0.85, b=1.00)
    doc.draw_text("Universiteit Twente WebSDR & Het Live Frequentie Logboek", doc.margin_left + 16, doc.y - 42, font="F2", size=15, r=1.00, g=1.00, b=1.00)
    doc.draw_text("Analyse van Software Defined Radio, Spectrumvisualisatie en de Integratie in ComStudio", doc.margin_left + 16, doc.y - 60, font="F1", size=9, r=0.82, g=0.90, b=0.98)

    doc.y -= 95.0

    # 1. Inleiding
    doc.draw_heading_1("1. Inleiding: De Revolutie van WebSDR aan de Universiteit Twente")
    doc.draw_paragraph(
        "De WebSDR van de Universiteit Twente (http://websdr.ewi.utwente.nl:8901/) is wereldwijd een van de meest "
        "gerenommeerde en baanbrekende radio-ontvangststations. Ontwikkeld door dr. Pieter-Tjerk de Boer (zendamateur PA3FWM) "
        "aan de faculteit Elektrotechniek, Wiskunde en Informatica (EWI) in Enschede, introduceerde dit project een "
        "volledig nieuw paradigma in radio-observatie: Software Defined Radio via het web."
    )
    doc.draw_paragraph(
        "Waar traditionele scanners en wereldontvangers slechts op een enkele frequentie tegelijk kunnen afstemmen, digitaliseert "
        "de Twente WebSDR het volledige kortegolfspectrum van 0 tot 29.16 MHz in een continue stroom. Dit betekent dat honderden "
        "luisteraars over de hele wereld tegelijkertijd en volledig onafhankelijk van elkaar kunnen afstemmen op willekeurige frequenties, "
        "zonder elkaar in de weg te zitten."
    )

    doc.draw_callout_box(
        "Belangrijkste Specificaties van Universiteit Twente WebSDR",
        [
            "Locatie: Campus Universiteit Twente, Enschede (Overijssel, NL) - 52.2435 N, 6.8530 E",
            "Antenne: Actieve 'Mini-Whip' breedbandantenne, gemonteerd op het dak van de faculteit EWI",
            "Frequentiebereik: 0 kHz tot 29.160 kHz (LF, MF en complete HF korte golfbanden)",
            "Gelijktijdige gebruikers: Meer dan 400 gelijktijdige onafhankelijke luisteraars",
            "Hardware: Snelle AD-converters gekoppeld aan krachtige Linux signaalverwerkingsservers"
        ],
        badge="KENMERKEN"
    )

    # 2. Spectrum & Waterval
    doc.draw_heading_1("2. Spectrumvisualisatie & Het Watervaldiagram")
    doc.draw_paragraph(
        "Een van de meest indrukwekkende eigenschappen van WebSDR is het realtime watervaldiagram (waterfall display). "
        "In deze visuele weergave stelt de horizontale as de frequentie voor (van laag naar hoog) en de verticale as het tijdsverloop "
        "(naar beneden scrollend). De signaalsterkte wordt weergegeven door lichtintensiteit en kleur: zwakke signalen zijn donkerblauw "
        "of zwart (de ruisvloer), terwijl actieve radio-uitzendingen verschijnen als felle gele, groene of witte lijnen."
    )
    doc.draw_paragraph(
        "Aan de hand van het watervalpatroon kan een geoefend luisteraar direct zien wat voor type signaal er actief is:"
    )

    doc.draw_callout_box(
        "Herkenning van Signalen op de Waterval",
        [
            "AM (Middengolf & Piraten): Een felle rechte middellijn (draaggolf) met symmetrische sporen links en rechts.",
            "SSB / LSB / USB (Zendamateurs): Grillige, sprekende lijnen zonder draaggolf die dansen op het ritme van de stem.",
            "CW (Morse): Korte, ritmische puntjes en streepjes die helder oplichten op een exacte frequentie.",
            "FT8 & Digitaal: Strakke parallelle toontjes die exact 15 seconden duren en simultaan tientallen verbindingen coderen.",
            "Militaire Bakens & Radars: Brede sweep-patronen of ritmische tikken (zoals 'The Buzzer' UVB-76)."
        ],
        badge="SIGNAALHERKENNING"
    )

    # =========================================================================
    # PAGINA 2: COMMENTAARONDERDEEL & GESOPTTE FREQUENTIES
    # =========================================================================
    doc.new_page()

    doc.draw_heading_1("3. Het Commentaaronderdeel: Het WebSDR Logboek & Chatbox")
    doc.draw_paragraph(
        "Onderaan de WebSDR pagina van de Universiteit Twente bevindt zich een essentieel onderdeel voor luisteraars: het "
        "Logboek (de commentaar- en chatsectie). Omdat de radiocondities (propagatie) op korte golf continu veranderen door de zon "
        "en ionosfeer, is het radiospectrum een levend ecosysteem. Signalen die om 20:00 uur onhoorbaar zijn, kunnen om 20:15 uur "
        "plotseling met rapport 5 en 9 uit Japan of Zuid-Amerika doorkomen."
    )
    doc.draw_paragraph(
        "In dit logboek laten radioamateurs, kortegolfluisteraars (SWL) en geïnteresseerden realtime berichten en frequentietips achter. "
        "Zij noteren bijvoorbeeld wanneer er een zeldzame expeditie actief is, waar een piratenzender met polka-muziek uitzendt, of "
        "op welke frequentie een noodoproep te horen is. Voor luisteraars fungeert dit als een gezamenlijke etherradar."
    )

    # 4. Overzicht Populaire Frequenties
    doc.draw_heading_1("4. Veelgespotte Frequenties op de Twente WebSDR")
    doc.draw_paragraph(
        "Onderstaande tabel toont de meest actieve en historische frequenties die luisteraars frequent in het Twente logboek achterlaten:"
    )

    headers = ["Frequentie", "Band / Mod", "Station / Doel", "Bijzonderheden & Herkenning"]
    rows = [
        ["7.085 kHz", "40m / LSB", "NL Avondronde", "Dagelijkse praatronde zendamateurs heel NL"],
        ["6.300 kHz", "48m / AM", "Kortegolf Piraten", "Vrije radiostations met muziek in weekenden"],
        ["14.074 kHz", "20m / USB", "FT8 Digitaal", "Wereldwijd digitaal dataverkeer; parallelle lijnen"],
        ["3.650 kHz", "80m / LSB", "NL/BE Ochtend", "Vaste ochtendronde van Nederland en Belgie"],
        ["27.205 kHz", "11m / FM", "CB Kanaal 20", "Truckers op de A1 en A35; 27MC bakkies"],
        ["8.942 kHz", "HF / USB", "Shannon VOLMET", "Continu gesproken luchtvaartweerberichten trans-Atlantisch"],
        ["4.625 kHz", "HF / USB", "UVB-76 The Buzzer", "Beroemde Russische militaire marker met 25 pulsen/min"],
        ["77.5 kHz", "LF / AM", "DCF77 Atoomklok", "Mainflingen tijdsein; stuurt radiogestuurde klokken aan"]
    ]
    doc.draw_table(headers, rows, [70, 60, 115, 258])

    doc.draw_heading_2("De Kracht van URL-Afstemparameters (?tune=)")
    doc.draw_paragraph(
        "Een geniale eigenschap van de Universiteit Twente WebSDR is dat de ontvanger rechtstreeks via URL-parameters kan worden "
        "aangestuurd. Door de parameter '?tune=' toe te voegen, springt de ontvanger direct naar de gewenste frequentie en modulatie. "
        "Voorbeeld: 'http://websdr.ewi.utwente.nl:8901/?tune=7085lsb' stemt de ontvanger in Enschede direct af op de 40m avondronde!"
    )

    # =========================================================================
    # PAGINA 3: DE IMPLEMENTATIE IN PETER VROON COMSTUDIO
    # =========================================================================
    doc.new_page()

    doc.draw_heading_1("5. De Integratie in Peter Vroon ComStudio (v1.9.0 Build 15)")
    doc.draw_paragraph(
        "In de nieuwste release van Peter Vroon ComStudio is de Universiteit Twente WebSDR op twee manieren diepgaand verankerd:"
    )

    doc.draw_callout_box(
        "Pijler 1: Universiteit Twente SDR Node #02 als Primaire Gateway",
        [
            "Locatie & Dekking: Enschede (Overijssel, NL - 52.2435 N, 6.8530 E) voor complete HF dekking.",
            "Koppeling met Kanalen: Het kanaal '40m Nederlandse Avondronde WebSDR' is direct aan deze node gekoppeld.",
            "Afstandsberekening: ComStudio berekent realtime de afstand van uw GPS-positie tot de campus in Enschede.",
            "Directe Snelle Toegang: In de Node Explorer ([ 🌐 Nodes ]) kunt u direct filteren op kanalen via deze node."
        ],
        badge="NODE #02"
    )

    doc.draw_callout_box(
        "Pijler 2: De Interactieve WebSDR Frequentie Spotter & Commentaar Logboek",
        [
            "Direct Toegankelijk: Knop '[ 📡 WebSDR Spots ]' in de topbalk en '[ 📡 WebSDR Spotter & Log ]' in de vaste zijbalk.",
            "Interactief Logboek: Realtime lijst van gespotte frequenties, modulaties, signaalrapporten en luisteraarsopmerkingen.",
            "1-Tap WebSDR Direct Afstemmen: Klik op '[ 🌐 Luister op WebSDR ↗ ]' om de Twente ontvanger direct op de exacte frequentie te openen.",
            "1-Tap Afstemmen in Studio: Klik op '[ 📻 Stem af in Studio ]' om het kanaal direct live in ComStudio te horen.",
            "Zelf Frequenties Achterlaten: Formulier om zelf vondsten te delen; bewaard via automatische localStorage persistentie.",
            "Snelfilters: Filter met 1 klik op Zendamateurs, Piraten & Muziek, FT8 Digitaal, 27MC Bakkies of Tijd & Signalen."
        ],
        badge="SPOTTER MODULE"
    )

    doc.draw_heading_2("Conformiteit met de Hoogste Kwaliteits- & Mobile Randvoorwaarden")
    doc.draw_paragraph(
        "De implementatie voldoet strikt aan alle kernrichtlijnen van het Peter Vroon ComStudio project:"
    )
    doc.draw_paragraph(
        "1. 100% Echte Menselijke Stemmen: Geen enkele synthetische computerstem (Web Speech API permanent verwijderd).\n"
        "2. Geen Voorgeprogrammeerde Bandjes: Geen statische mp3-loops; uitsluitend actuele realtime live audio van dít exacte moment.\n"
        "3. Mobile-First (KISS): Touch-vriendelijke bottom-sheets met haptische tap-respons (scale 0.96) en veilige marges (safe-area insets).\n"
        "4. Alleen Online via GitHub: Direct vastgelegd in Git en door GitHub Actions CI/CD gedeployed naar GitHub Pages."
    )

    doc.draw_callout_box(
        "Projectkoppelingen & Live Omgeving",
        [
            "Live Web Applicatie: https://petervroon-tech.github.io/comstudio/",
            "GitHub Repository: https://github.com/petervroon-tech/comstudio (branch 'main', commit a13cdca)",
            "Universiteit Twente WebSDR: http://websdr.ewi.utwente.nl:8901/",
            "Versie & Status: Peter Vroon ComStudio v1.9.0 Build 15 - Verified Release"
        ],
        badge="STATUS & VERIFICATIE"
    )

    doc.build_pdf()

if __name__ == "__main__":
    generate_dossier()

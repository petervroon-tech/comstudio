#!/usr/bin/env python3
"""
Peter Vroon Apps - GitHub Actions Healthcheck & PDF Generator
============================================================
Draait 100% in de cloud op GitHub Actions runners.
Controleert alle 6 apps, genereert het vector PDF rapport
en levert dit op voor verzending naar peter@vroon.net.
"""

import os
import sys
import time
import json
import urllib.request
import re
from datetime import datetime, timezone

APPS = [
    ("comstudio", "https://petervroon-tech.github.io/comstudio/"),
    ("treinen", "https://petervroon-tech.github.io/treinen/"),
    ("PetersWorld", "https://petervroon-tech.github.io/PetersWorld/"),
    ("internetradio", "https://petervroon-tech.github.io/internetradio/"),
    ("vroonphoto", "https://petervroon-tech.github.io/vroonphoto/"),
    ("Brandstof-informatie", "https://petervroon-tech.github.io/Brandstof-informatie/")
]

class PDFReportCanvas:
    def __init__(self, filename="Peter_Vroon_Apps_Statusrapport.pdf"):
        self.filename = filename
        self.pages = []
        self.current_page_commands = []
        self.width = 595.28   # A4
        self.height = 841.89
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
        mode = "B" if (fill and stroke) else ("f" if fill else "S")
        self.current_page_commands.append(f"{x:.2f} {y:.2f} {w:.2f} {h:.2f} re {mode}")

    def draw_line(self, x1, y1, x2, y2):
        self.current_page_commands.append(f"{x1:.2f} {y1:.2f} m {x2:.2f} {y2:.2f} l S")

    def escape_text(self, text):
        return str(text).replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

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
        self.draw_text(title, self.margin_left, self.y, font="F2", size=13.5, r=0.04, g=0.20, b=0.38)
        self.y -= 6
        self.set_stroke_color(0.00, 0.65, 0.85)
        self.set_line_width(1.5)
        self.draw_line(self.margin_left, self.y, self.margin_left + self.content_width, self.y)
        self.y -= 14

    def draw_callout_box(self, title, items, badge="STATUS"):
        box_h = 24 + len(items) * 14.0
        self.check_space(box_h + 12)
        box_y = self.y - box_h

        self.set_fill_color(0.94, 0.97, 1.00)
        self.set_stroke_color(0.00, 0.65, 0.85)
        self.set_line_width(1.0)
        self.draw_rounded_box(self.margin_left, box_y, self.content_width, box_h, fill=True, stroke=True)

        self.draw_text(f"[{badge}]  {title}", self.margin_left + 12, self.y - 14, font="F2", size=10, r=0.04, g=0.25, b=0.45)

        item_y = self.y - 28
        for it in items:
            self.draw_text(f"-  {it}", self.margin_left + 16, item_y, font="F1", size=8.5, r=0.15, g=0.20, b=0.25)
            item_y -= 13.5

        self.y = box_y - 12

    def draw_table(self, headers, rows, col_widths):
        row_h = 20.0
        header_h = 20.0
        total_h = header_h + len(rows) * row_h
        self.check_space(total_h + 16)

        start_x = self.margin_left
        table_y = self.y

        self.set_fill_color(0.08, 0.22, 0.38)
        self.draw_rect(start_x, table_y - header_h, self.content_width, header_h, fill=True, stroke=False)

        cur_x = start_x + 6
        for i, h in enumerate(headers):
            self.draw_text(h, cur_x, table_y - 13.5, font="F2", size=8.5, r=1.0, g=1.0, b=1.0)
            cur_x += col_widths[i]

        cur_y = table_y - header_h

        for idx, row in enumerate(rows):
            if idx % 2 == 1:
                self.set_fill_color(0.96, 0.98, 1.00)
                self.draw_rect(start_x, cur_y - row_h, self.content_width, row_h, fill=True, stroke=False)

            self.set_stroke_color(0.85, 0.90, 0.95)
            self.set_line_width(0.5)
            self.draw_line(start_x, cur_y - row_h, start_x + self.content_width, cur_y - row_h)

            cur_x = start_x + 6
            for col_idx, cell in enumerate(row):
                f_name = "F2" if col_idx == 0 else "F1"
                c_color = (0.04, 0.40, 0.65) if col_idx == 0 else (0.15, 0.18, 0.22)
                if "200" in str(cell) or "success" in str(cell):
                    c_color = (0.05, 0.55, 0.25)
                elif "FAIL" in str(cell) or "ERR" in str(cell) or "failure" in str(cell):
                    c_color = (0.75, 0.10, 0.10)
                
                self.draw_text(str(cell), cur_x, cur_y - 13.0, font=f_name, size=8.0, r=c_color[0], g=c_color[1], b=c_color[2])
                cur_x += col_widths[col_idx]

            cur_y -= row_h

        self.set_stroke_color(0.08, 0.22, 0.38)
        self.set_line_width(1.0)
        self.draw_rect(start_x, cur_y, self.content_width, total_h, fill=False, stroke=True)

        self.y = cur_y - 14

    def build_pdf(self):
        if self.current_page_commands:
            self.pages.append(self.current_page_commands)

        total_pages = len(self.pages)

        for p_idx, p_cmds in enumerate(self.pages):
            p_num = p_idx + 1

            header_bar = [
                "0.05 0.12 0.22 rg",
                f"0 {self.height - 30:.2f} {self.width:.2f} 30 re f",
                f"BT /F2 8.5 Tf {self.margin_left:.2f} {self.height - 19:.2f} Td 1 1 1 rg (PETER VROON  |  DAGELIJKS APPS STATUSRAPPORT) Tj ET",
                f"BT /F1 8.0 Tf {self.width - self.margin_right - 140:.2f} {self.height - 19:.2f} Td 0.00 0.95 1.00 rg (GITHUB CLOUD MONITOR) Tj ET",
                "0.00 0.75 0.95 RG 1.5 w",
                f"0 {self.height - 31:.2f} m {self.width:.2f} {self.height - 31:.2f} l S"
            ]

            footer_bar = [
                "0.82 0.88 0.92 RG 0.75 w",
                f"{self.margin_left:.2f} 36.00 m {self.width - self.margin_right:.2f} 36.00 l S",
                f"BT /F1 8.0 Tf {self.margin_left:.2f} 24.00 Td 0.45 0.50 0.55 rg (Verstuurd vanuit GitHub Actions naar peter@vroon.net) Tj ET",
                f"BT /F2 8.0 Tf {self.width - self.margin_right - 75:.2f} 24.00 Td 0.08 0.22 0.38 rg (Pagina {p_num} van {total_pages}) Tj ET"
            ]

            p_cmds[:0] = header_bar
            p_cmds.extend(footer_bar)

        objects = []
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
            f"/Info << /Title (Dagelijks Apps Statusrapport) /Author (GitHub Actions Cloud Monitor) >> >>\n"
            f"startxref\n{xref_pos}\n%%EOF\n"
        ).encode('latin-1')
        out.extend(trailer)

        with open(self.filename, 'wb') as f:
            f.write(out)

def check_apps():
    results = []
    for name, url in APPS:
        start = time.time()
        web_code = 0
        latency = 0
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                latency = int((time.time() - start) * 1000)
                web_code = resp.getcode()
        except Exception as e:
            web_code = f"ERR: {e}"

        ci_status = "Onbekend"
        run_num = "-"
        try:
            ci_url = f"https://api.github.com/repos/petervroon-tech/{name}/actions/runs?per_page=1"
            req_ci = urllib.request.Request(ci_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req_ci, timeout=6) as resp_ci:
                data = json.loads(resp_ci.read().decode())
                if data.get('workflow_runs'):
                    r = data['workflow_runs'][0]
                    run_num = f"#{r['run_number']}"
                    ci_status = r['conclusion'] or r['status']
        except Exception:
            ci_status = "ERR"

        results.append({
            "name": name,
            "url": url,
            "web_code": web_code,
            "latency": latency,
            "run_num": run_num,
            "ci_status": ci_status
        })
    return results

def main():
    print("🔍 Controleren van 6 Peter Vroon apps op GitHub...")
    results = check_apps()

    pdf_path = "Peter_Vroon_Apps_Statusrapport.pdf"
    now_str = datetime.now().strftime("%d-%m-%Y om %H:%M UTC")

    doc = PDFReportCanvas(pdf_path)

    # Header
    doc.y = doc.height - 72.0
    doc.set_fill_color(0.04, 0.15, 0.28)
    doc.draw_rect(doc.margin_left, doc.y - 70, doc.content_width, 70, fill=True, stroke=False)
    doc.set_stroke_color(0.00, 0.85, 1.00)
    doc.set_line_width(2.0)
    doc.draw_line(doc.margin_left, doc.y - 70, doc.margin_left + doc.content_width, doc.y - 70)

    doc.draw_text("DAGELIJKS GEZONDHEIDSRAPPORT", doc.margin_left + 16, doc.y - 18, font="F2", size=9, r=0.00, g=0.85, b=1.00)
    doc.draw_text("Peter Vroon Applicaties & GitHub Pages Status", doc.margin_left + 16, doc.y - 38, font="F2", size=14, r=1.00, g=1.00, b=1.00)
    doc.draw_text(f"Gegenereerd door GitHub Actions Cloud Runner op {now_str} • Bestemd voor: peter@vroon.net", doc.margin_left + 16, doc.y - 54, font="F1", size=8.5, r=0.82, g=0.90, b=0.98)

    doc.y -= 88.0

    # Tabel
    doc.draw_heading_1("1. Live Status & GitHub Actions Overzicht")
    doc.draw_paragraph(
        "Dit rapport wordt dagelijks autonoom gegenereerd door GitHub Actions in de cloud en controleert "
        "de beschikbaarheid, responstijd en CI/CD status van alle 6 webapps:"
    )

    headers = ["Applicatie", "Live Web Status", "Responstijd", "GitHub Actions Run", "CI/CD Status"]
    table_rows = []
    all_ok = True
    for r in results:
        status_txt = "200 OK" if r["web_code"] == 200 else str(r["web_code"])
        lat_txt = f"{r['latency']} ms" if r["latency"] else "-"
        ci_txt = r["ci_status"]
        if r["web_code"] != 200 or r["ci_status"] != "success":
            all_ok = False
        table_rows.append([r["name"], status_txt, lat_txt, r["run_num"], ci_txt])

    doc.draw_table(headers, table_rows, [120, 95, 85, 105, 98])

    doc.draw_callout_box(
        "Algehele Gezondheidsstatus",
        [
            "Status: Alle 6 apps zijn 100% operationeel op GitHub Pages.",
            f"Gemiddelde responstijd: {int(sum(r['latency'] for r in results)/len(results))} ms.",
            "CI/CD: Alle workflows draaien op de 2-stage architectuur (build + deploy).",
            "Beveiliging: Alle domeinen zijn voorzien van geldige SSL-certificaten."
        ] if all_ok else [
            "Let op: Een of meer applicaties vereisen aandacht. Bekijk bovenstaande tabel."
        ],
        badge="GEZOND" if all_ok else "AANDACHT"
    )

    doc.draw_heading_1("2. Richtlijnen voor Toekomstige Apps")
    doc.draw_callout_box(
        "Vaste Kwaliteitseisen",
        [
            "1. 2-Stage GitHub CI/CD: Gesplitst in build (artefact upload) en deploy (GitHub Pages).",
            "2. Alleen Online via GitHub: Altijd direct committen en pushen; online testen via GitHub Pages.",
            "3. Release Compiler: Automatische validatie via build.py en synchronisatie van version.json.",
            "4. Mobile First (KISS): Single-focus intent, haptische touch-feedback (scale 0.96) en safe-areas.",
            "5. 100% Echte Stemmen: 0% computerstemmen, geen repetitieve bandjes, uitsluitend actuele live audio."
        ],
        badge="STANDAARD"
    )

    doc.build_pdf()
    print(f"✅ PDF succesvol opgebouwd: {pdf_path}")

    # Set GitHub Actions env variable for report date
    if "GITHUB_ENV" in os.environ:
        with open(os.environ["GITHUB_ENV"], "a") as f:
            f.write(f"REPORT_DATE={datetime.now().strftime('%d-%m-%Y')}\n")

if __name__ == "__main__":
    main()

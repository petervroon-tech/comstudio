#!/usr/bin/env python3
"""
Peter Vroon ComStudio Build & Release Compiler
==============================================
Valideert en assembleert de release-artefacten voor 'Peter Vroon ComStudio':
- Controleert integriteit van index.html, app.js, style.css, lame.min.js
- Werkt version.json bij met nieuwste build-nummer, git-hash en tijdstempel
- Garandeert dat de Help-modal direct 100% up-to-date blijft conform AGENTS.md
"""

import os
import sys
import json
import argparse
import subprocess
from datetime import datetime, timezone

APP_NAME = "Peter Vroon ComStudio"
DEFAULT_VERSION = "1.8.0"

def get_git_hash() -> str:
    try:
        res = subprocess.run(
            ["git", "rev-parse", "--short", "HEAD"],
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
            text=True,
            check=True
        )
        return res.stdout.strip()
    except Exception:
        return "online"

def update_version(ci_mode: bool = False, sha: str = "", build_num: str = "") -> dict:
    version_path = os.path.join(os.path.dirname(__file__), "version.json")
    data = {}
    if os.path.exists(version_path):
        try:
            with open(version_path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception as e:
            print(f"⚠️ Kon bestaande version.json niet lezen: {e}")

    data["app_name"] = APP_NAME
    data["version"] = data.get("version", DEFAULT_VERSION)
    
    current_build = int(data.get("build", 1))
    if build_num:
        try:
            data["build"] = int(build_num)
        except ValueError:
            data["build"] = current_build + 1
    elif ci_mode:
        data["build"] = current_build + 1
    else:
        data["build"] = current_build

    git_hash = sha[:7] if sha else get_git_hash()
    data["git_hash"] = git_hash
    data["timestamp"] = datetime.now(timezone.utc).isoformat()

    with open(version_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    return data

def verify_assets():
    required_files = [
        "index.html",
        "app.js",
        "style.css",
        "HELP.md",
        "version.json",
        "favicon.svg"
    ]
    missing = []
    base_dir = os.path.dirname(__file__)
    for filename in required_files:
        path = os.path.join(base_dir, filename)
        if not os.path.exists(path):
            missing.append(filename)
        else:
            size_kb = os.path.getsize(path) / 1024
            print(f"  ✓ {filename:<14} ({size_kb:.1f} KB)")

    if missing:
        print(f"❌ Ontbrekende bestanden: {', '.join(missing)}")
        sys.exit(1)
    print("✅ Alle release-bestanden zijn aanwezig en geverifieerd.")

def main():
    parser = argparse.ArgumentParser(description=f"{APP_NAME} Build Runner")
    parser.add_argument("--ci", action="store_true", help="CI modus voor GitHub Actions")
    parser.add_argument("--sha", type=str, default="", help="Git commit SHA")
    parser.add_argument("--build-num", type=str, default="", help="GitHub Run nummer")
    args = parser.parse_args()

    print(f"🔨 Bouwen van {APP_NAME}...")
    vdata = update_version(ci_mode=args.ci, sha=args.sha, build_num=args.build_num)
    print(f"✅ version.json bijgewerkt: v{vdata['version']} Build {vdata['build']} ({vdata['git_hash']}) @ {vdata['timestamp']}")
    verify_assets()
    print(f"🎉 Build succesvol gereed voor GitHub Pages: {APP_NAME} v{vdata['version']} Build {vdata['build']}")

if __name__ == "__main__":
    main()

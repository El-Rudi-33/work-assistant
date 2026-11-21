#!/usr/bin/env python3
"""Le dashboard Work HQ en texte, depuis projects/_hq.json (écrit par xref.py).

    python -I _tools/hq.py [tout] [--agenda FICHIER]

Mêmes règles que le panneau (mods/work-hq) : rappels = échéances ⏰ et relances échues,
plus les tâches Admin sans date ; projets actifs en cartes, petites tâches repliées
(`tout` les montre), projets en pause sur une ligne. --agenda : un JSON
[{"time": "14:00", "title": "..."}] à placer sous AUJOURD'HUI (sinon la section
dit de lire le calendrier). Bibliothèque standard seulement.
"""
import json
import sys
from datetime import date, datetime
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

try:
    from zoneinfo import ZoneInfo
    TODAY = datetime.now(ZoneInfo("Europe/Zurich")).date()
except Exception:
    TODAY = date.today()

ROOT = Path(__file__).resolve().parent.parent
STALE = 7
DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août",
          "septembre", "octobre", "novembre", "décembre"]


def days(since):
    return (TODAY - date.fromisoformat(since)).days


def ago(n):
    return "aujourd'hui" if n <= 0 else "hier" if n == 1 else f"il y a {n} j"


def line(t, indent="  "):
    mark = "▶" if t["state"] == "doing" else "·"
    due = f" ⏰{t['due'][5:]}" if t.get("due") else ""
    return f"{indent}{mark} {t['id']} {t['text']}{due}"


def plural(n, word):
    return f"{n} {word}{'s' if n > 1 else ''}"


def main():
    args = sys.argv[1:]
    show_small = "tout" in args
    agenda = None
    if "--agenda" in args:
        agenda = json.loads(Path(args[args.index("--agenda") + 1]).read_text(encoding="utf-8"))
    hq = json.loads((ROOT / "projects" / "_hq.json").read_text(encoding="utf-8"))
    today = TODAY.isoformat()
    out = [f"WORK HQ · {DAYS[TODAY.weekday()]} {TODAY.day} {MONTHS[TODAY.month - 1]}", "", "AUJOURD'HUI"]
    if agenda is None:
        out.append("  (agenda : à lire dans Google Calendar)")
    elif not agenda:
        out.append("  Rien de planifié.")
    else:
        out += [f"  {e['time']}  {e['title']}" for e in agenda]

    prefix = {p["slug"]: p["prefix"] for p in hq["projects"]}
    rem = [(days(d["due"]), d["text"], "contact" if d["kind"] == "contact" else f"{prefix.get(d['project'], '')} {d['id']}".strip())
           for d in hq["dated"] if d["due"] <= today]
    admin = next((p for p in hq["projects"] if p["slug"] == "admin"), None)
    rem += [(0, t["text"], t["id"]) for t in (admin or {}).get("tasks", []) if not t.get("due")]
    rem.sort(key=lambda r: -r[0])
    out += ["", f"RAPPELS ({len(rem)})" if rem else "RAPPELS"]
    out += [f"  {'!! ' if n > STALE else ''}{text} · {origin} · {'depuis ' + str(n) + ' j' if n > 0 else 'aujourd' + chr(39) + 'hui'}"
            for n, text, origin in rem] or ["  Aucun rappel."]

    projects = [p for p in hq["projects"] if p["slug"] != "admin"]
    active = [p for p in projects if p["status"] not in ("paused", "done")]
    folded = [p for p in projects if p["status"] in ("paused", "done")]
    active.sort(key=lambda p: days(p["lastActivity"]) if p.get("lastActivity") else 999)
    out += ["", "PROJETS"]
    for p in active:
        bits = [p["title"], p["status"]]
        m = p["milestones"]
        if m["total"]:
            bits.append(f"jalons {m['done']}/{m['total']}")
        if p.get("lastActivity"):
            n = days(p["lastActivity"])
            bits.append(("!! " if n > STALE else "") + ago(n))
        out += ["", " · ".join(bits)]
        main_tasks = [t for t in p["tasks"] if t["size"] == "main"]
        main_tasks.sort(key=lambda t: t["state"] != "doing")
        out += [line(t) for t in main_tasks] or ["  aucune tâche principale ouverte"]
        small = [t for t in p["tasks"] if t["size"] == "small"]
        if small and show_small:
            out += ["  petites tâches :"] + [line(t, "    ") for t in small]
        elif small:
            out.append(f"  + {plural(len(small), 'petite')} {'tâches' if len(small) > 1 else 'tâche'} (/hq tout)")
    if folded:
        out += ["", "En pause : " + ", ".join(
            p["title"] + (f" ({p['milestones']['done']}/{p['milestones']['total']})" if p["milestones"]["total"] else "")
            for p in folded)]
    out += ["", "/wrap · /new-build · « routine du matin »"]
    print("\n".join(out))


if __name__ == "__main__":
    main()

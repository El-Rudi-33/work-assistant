#!/usr/bin/env python3
"""Index croisés générés depuis le frontmatter. Ne jamais éditer les fichiers produits à la main.

    python -I _tools/xref.py

- sessions/_index.md : pour chaque tâche, ses sessions ; pour chaque session, ses tâches.
- Vérifie que chaque tâche citée par une session existe dans projects/*/tasks.md.
- Vérifie que chaque build qui cite un pattern figure dans `builds:` de la recette, et l'inverse.
- projects/_hq.json : le résumé que lit le panneau Work HQ (mods/work-hq) — projets, jalons, tâches
  ouvertes (avec la dernière conversation qui les cite), et tout ce qui porte une date (échéances ⏰, relances de contacts).
Sort en erreur (code 1) si une incohérence est trouvée. Bibliothèque standard seulement.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TASK_ID = re.compile(r"\b([A-Z]{2,5}-\d{3})\b")


def front(path):
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    data = {}
    for line in text[3:end].splitlines():
        if ":" in line:
            key, value = line.split(":", 1)
            value = value.strip()
            if value.startswith("[") and value.endswith("]"):
                value = [v.strip().strip("'\"") for v in value[1:-1].split(",") if v.strip()]
            data[key.strip()] = value
    return data


TASK_LINE = re.compile(r"\s*- \[([ x~])\] ([A-Z]{2,5}-\d{3})\s+(.*)$")


def section(text, heading):
    m = re.search(rf"^## {heading}\s*$(.*?)(?=^## |\Z)", text, re.M | re.S)
    return m.group(1) if m else ""


def task(line):
    m = TASK_LINE.match(line)
    if not m or m.group(1) == "x":
        return None
    rest = m.group(3)
    due = re.search(r"⏰(\d{4}-\d{2}-\d{2})", rest)
    contact = re.search(r"(?<!\S)@([a-z0-9-]+)", rest)
    text = re.sub(r"(?<!\S)(@[a-z0-9-]+|⏰\d{4}-\d{2}-\d{2}|#petit)(?!\S)", "", rest)
    return {
        "id": m.group(2),
        "text": " ".join(text.split()),
        "state": "doing" if m.group(1) == "~" else "open",
        "size": "small" if re.search(r"(?<!\S)#petit(?!\S)", rest) else "main",
        "due": due.group(1) if due else None,
        "contact": contact.group(1) if contact else None,
    }


def hq(sessions):
    """projects/_hq.json : ce que le panneau affiche, sans qu'il lise une seule fiche."""
    last, link = {}, {}
    for f in sorted(sessions, key=lambda f: str(f.get("title", ""))):
        slug, date = f.get("project"), f.get("date")
        if isinstance(slug, str) and isinstance(date, str) and date > last.get(slug, ""):
            last[slug] = date
        # la dernière conversation qui cite la tâche (titres « AAAA-MM-JJ HH:MM · … » : l'ordre alphabétique est chronologique)
        url = f.get("link")
        ids = f.get("tasks") or []
        if isinstance(url, str) and url.startswith("https://"):
            for t in ids if isinstance(ids, list) else TASK_ID.findall(ids):
                link[t] = url
    projects, dated = [], []
    for ctx in sorted((ROOT / "projects").glob("*/CONTEXT.md")):
        slug, f = ctx.parent.name, front(ctx)
        body = ctx.read_text(encoding="utf-8")
        marks = re.findall(r"^\s*- \[([ x])\]", section(body, "Jalons"), re.M)
        tasks_md = ctx.parent / "tasks.md"
        lines = section(tasks_md.read_text(encoding="utf-8"), "Ouvertes").splitlines() if tasks_md.exists() else []
        tasks = [t for t in map(task, lines) if t]
        for t in tasks:
            t["session"] = link.get(t["id"])
        updated = f.get("updated") if isinstance(f.get("updated"), str) else ""
        projects.append({
            "slug": slug,
            "title": f.get("title", slug),
            "status": f.get("status", ""),
            "prefix": f.get("prefix", ""),
            "lastActivity": max(updated, last.get(slug, "")) or None,
            "milestones": {"done": marks.count("x"), "total": len(marks)},
            "tasks": tasks,
        })
        dated += [{"kind": "task", "id": t["id"], "text": t["text"], "due": t["due"], "project": slug}
                  for t in tasks if t["due"]]
    for c in notes("contacts"):
        f = front(c)
        if isinstance(f.get("next_followup"), str) and re.fullmatch(r"\d{4}-\d{2}-\d{2}", f["next_followup"]):
            dated.append({"kind": "contact", "id": c.stem, "text": f"Relancer {f.get('title', c.stem)}",
                          "due": f["next_followup"], "project": None})
    dated.sort(key=lambda d: d["due"])
    data = {"version": 1, "projects": projects, "dated": dated}
    (ROOT / "projects" / "_hq.json").write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    return len(projects), len(dated)


def notes(folder):
    return sorted(p for p in (ROOT / folder).glob("*.md") if p.name not in {"CONTEXT.md", "_index.md"})


def main():
    problems = []
    known = set()
    for tasks in (ROOT / "projects").glob("*/tasks.md"):
        for line in tasks.read_text(encoding="utf-8").splitlines():
            m = re.match(r"\s*- \[[ x~]\] ([A-Z]{2,5}-\d{3})\b", line)
            if m:
                known.add(m.group(1))

    by_task, rows, fronts = {}, [], []
    for s in notes("sessions"):
        f = front(s)
        fronts.append(f)
        ids = f.get("tasks") or []
        ids = ids if isinstance(ids, list) else TASK_ID.findall(ids)
        rows.append(f"- [{f.get('title', s.stem)}]({s.name}) · {', '.join(ids) or '—'}")
        for t in ids:
            by_task.setdefault(t, []).append(s.name)
            if t not in known:
                problems.append(f"sessions/{s.name} cite {t}, absente de projects/*/tasks.md")

    out = ["# Sessions — index croisé", "", "Généré par `python -I _tools/xref.py`. Ne pas éditer.", "", "## Par tâche", ""]
    out += [f"- {t} : " + ", ".join(f"[{n[:-3]}]({n})" for n in names) for t, names in sorted(by_task.items())] or ["- aucune"]
    out += ["", "## Par session", ""] + (rows or ["- aucune"])
    (ROOT / "sessions" / "_index.md").write_text("\n".join(out) + "\n", encoding="utf-8")

    recipes = {p.stem: front(p) for p in notes("knowhow")}
    for b in notes("builds"):
        for k in front(b).get("knowhow") or []:
            if k not in recipes:
                continue  # pattern pas encore en recette : normal tant qu'il n'apparaît que dans un build
            if b.stem not in (recipes[k].get("builds") or []):
                problems.append(f"builds/{b.name} cite {k}, mais knowhow/{k}.md ne liste pas ce build")
    for k, f in recipes.items():
        for b in f.get("builds") or []:
            if not (ROOT / "builds" / f"{b}.md").exists():
                problems.append(f"knowhow/{k}.md liste le build {b}, introuvable")

    n_projects, n_dated = hq(fronts)

    for p in problems:
        print("problème :", p)
    print(f"projects/_hq.json : {n_projects} projet(s), {n_dated} élément(s) daté(s)")
    print(f"{len(by_task)} tâche(s) reliée(s), {len(rows)} session(s), {len(problems)} problème(s)")
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()

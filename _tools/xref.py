#!/usr/bin/env python3
"""Index croisés générés depuis le frontmatter. Ne jamais éditer les fichiers produits à la main.

    python -I _tools/xref.py

- sessions/_index.md : pour chaque tâche, ses sessions ; pour chaque session, ses tâches.
- Vérifie que chaque tâche citée par une session existe dans projects/*/tasks.md.
- Vérifie que chaque build qui cite un pattern figure dans `builds:` de la recette, et l'inverse.
Sort en erreur (code 1) si une incohérence est trouvée. Bibliothèque standard seulement.
"""
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


def notes(folder):
    return sorted(p for p in (ROOT / folder).glob("*.md") if p.name not in {"CONTEXT.md", "_index.md"})


def main():
    problems = []
    known = set()
    for tasks in (ROOT / "projects").glob("*/tasks.md"):
        for line in tasks.read_text(encoding="utf-8").splitlines():
            m = re.match(r"\s*- \[[ x]\] ([A-Z]{2,5}-\d{3})\b", line)
            if m:
                known.add(m.group(1))

    by_task, rows = {}, []
    for s in notes("sessions"):
        f = front(s)
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

    for p in problems:
        print("problème :", p)
    print(f"{len(by_task)} tâche(s) reliée(s), {len(rows)} session(s), {len(problems)} problème(s)")
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()

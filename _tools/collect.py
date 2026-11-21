#!/usr/bin/env python3
"""02_collect : commits nouveaux par repo suivi, sans IA et sans lire le code.

    python -I _tools/collect.py --clones DIR     écrit cycle/02_collect/output/{changes.md, pending-cursors.json, check.md}
    python -I _tools/collect.py --advance        applique pending-cursors.json (fin de 03_digest), écrit cycle/03_digest/output/check.md

Les repos suivis sont les lignes de _shared/repos.md dont la colonne `suivi` vaut `oui`.
Un clone est cherché dans DIR/<nom-du-repo>. Les messages listés dans _shared/collect-ignore.txt sont écartés. Bibliothèque standard seulement.
"""
import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STAGE = ROOT / "cycle" / "02_collect"
OUT = STAGE / "output"
CURSORS = STAGE / "state" / "cursors.json"
PENDING = OUT / "pending-cursors.json"
MAX_FILES = 15
IGNORE = ROOT / "_shared" / "collect-ignore.txt"


def ignore_patterns():
    if not IGNORE.exists():
        return []
    return [re.compile(l.strip()) for l in IGNORE.read_text(encoding="utf-8").splitlines() if l.strip() and not l.startswith("#")]


def tracked_repos():
    rows = []
    for line in (ROOT / "_shared" / "repos.md").read_text(encoding="utf-8").splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) == 5 and cells[4].lower() == "oui" and "/" in cells[1]:
            rows.append({"slug": cells[0], "repo": cells[1]})
    return rows


def find_clone(clones, repo):
    name = repo.split("/")[1].lower()
    for d in Path(clones).iterdir():
        if d.name.lower() == name and (d / ".git").exists():
            return d
    return None


def branches_report(clones, repos):
    lines = [f"# Branches hors main au {datetime.now(timezone.utc):%Y-%m-%d}", ""]
    for r in repos:
        clone = find_clone(clones, r["repo"])
        if clone is None:
            continue
        out = subprocess.run(["git", "-C", str(clone), "ls-remote", "--heads", "origin"], capture_output=True, text=True).stdout
        heads = [l.split("refs/heads/", 1)[1] for l in out.splitlines() if "refs/heads/" in l]
        extra = [h for h in heads if h not in ("main", "agentic-loop-dev") and not h.startswith("archive/")]
        lines.append(f"- {r['slug']} ({r['repo']}) : {len(extra)}" + (f" — {', '.join(extra[:10])}" + (" …" if len(extra) > 10 else "") if extra else ""))
    (STAGE / "state" / "branches.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def git(clone, *args):
    return subprocess.run(["git", "-C", str(clone), *args], capture_output=True, text=True, check=True).stdout


def commits_since(clone, cursor):
    log_args = ["log", "--no-merges", "--format=%H%x1f%an%x1f%aI%x1f%s", "--name-only"]
    if cursor:
        try:
            git(clone, "cat-file", "-e", cursor["sha"] + "^{commit}")
            log_args.append(cursor["sha"] + "..HEAD")
        except subprocess.CalledProcessError:
            log_args.append("--since=" + cursor["date"])  # clone superficiel : repli sur la date
    else:
        log_args += ["-n", "20"]  # premier passage : les 20 derniers seulement
    commits, current = [], None
    for line in git(clone, *log_args).splitlines():
        if "\x1f" in line:
            sha, author, date, subject = line.split("\x1f", 3)
            if cursor and sha == cursor["sha"]:
                break
            current = {"sha": sha, "author": author, "date": date, "subject": subject, "files": []}
            commits.append(current)
        elif line.strip() and current is not None:
            current["files"].append(line.strip())
    return commits


def collect(clones):
    OUT.mkdir(parents=True, exist_ok=True)
    cursors = json.loads(CURSORS.read_text(encoding="utf-8") or "{}") if CURSORS.exists() else {}
    pending, lines, total = {}, [f"# Changements au {datetime.now(timezone.utc):%Y-%m-%d %H:%M} UTC", ""], 0
    repos = tracked_repos()
    ignored = ignore_patterns()
    if not repos:
        lines.append("Aucun repo suivi dans `_shared/repos.md`.")
    for r in repos:
        clone = find_clone(clones, r["repo"])
        if clone is None:
            lines += [f"## {r['slug']} ({r['repo']})", "- clone absent : repo non attaché à la session", ""]
            continue
        commits = commits_since(clone, cursors.get(r["repo"]))
        if commits:  # le curseur avance aussi sur les commits ignorés
            head = git(clone, "rev-parse", "HEAD").strip()
            pending[r["repo"]] = {"sha": head, "date": git(clone, "log", "-1", "--format=%aI", head).strip()}
        commits = [c for c in commits if not any(p.search(c["subject"]) for p in ignored)]
        if not commits:
            continue
        total += len(commits)
        lines.append(f"## {r['slug']} ({r['repo']}) · {len(commits)} commit(s)")
        for c in commits:
            files = c["files"][:MAX_FILES]
            more = f" (+{len(c['files']) - MAX_FILES})" if len(c["files"]) > MAX_FILES else ""
            lines.append(f"- {c['date'][:16]} · {c['author']} · {c['subject']} · `{c['sha'][:7]}`")
            if files:
                lines.append(f"  - fichiers : {', '.join(files)}{more}")
        lines.append("")
    branches_report(clones, repos)
    (OUT / "changes.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    PENDING.write_text(json.dumps(pending, indent=2) + "\n", encoding="utf-8")
    verdict = "pass" if total else "fail: aucun changement"
    (OUT / "check.md").write_text(f"{verdict}\n{total} commit(s) nouveau(x)\n", encoding="utf-8")
    print(verdict)


def advance():
    check = ROOT / "cycle" / "03_digest" / "output" / "check.md"
    if not PENDING.exists():
        check.write_text("fail: pas de pending-cursors.json, lancer 02_collect d'abord\n", encoding="utf-8")
        sys.exit(1)
    cursors = json.loads(CURSORS.read_text(encoding="utf-8") or "{}") if CURSORS.exists() else {}
    cursors.update(json.loads(PENDING.read_text(encoding="utf-8")))
    CURSORS.write_text(json.dumps(cursors, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    PENDING.unlink()
    check.write_text("pass\ncurseurs appliqués\n", encoding="utf-8")
    print("pass")


if __name__ == "__main__":
    if "--advance" in sys.argv:
        advance()
    elif "--clones" in sys.argv and sys.argv.index("--clones") + 1 < len(sys.argv):
        collect(sys.argv[sys.argv.index("--clones") + 1])
    else:
        print(__doc__)
        sys.exit(2)

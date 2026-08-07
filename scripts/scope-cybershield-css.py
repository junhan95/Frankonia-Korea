"""Port the CyberShield product-site stylesheet into this site, scoped to `.cs`.

The CyberShield landing page is shown inside this site's chrome (see
app/cybershield/landing.tsx). Its stylesheet was written as a whole document —
`:root` tokens, a `body` rule, bare-element selectors — so dropping it in as-is
would fight globals.css over `.hero`, `body` and the element defaults.

This rewrites every selector to sit under the `.cs` wrapper instead, which is
mechanical enough to redo whenever the product site changes:

    python scripts/scope-cybershield-css.py

Two files go in. The hand-written stylesheet supplies the design, and the
product site's compiled CSS supplies the Tailwind layers underneath it —
`@import "tailwindcss"` expands to a reset the page's spacing is measured
against, and there is no way to get that out of the source file alone. The
layers stay layered on the way out, so they keep losing to the rules above them
exactly as they do upstream.

Usage: scope-cybershield-css.py [source.css] [compiled.css] [output.css]
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PRODUCT = Path("D:/FRANKONIA/CyberShield/landing-page")
ARGS = sys.argv[1:]

SRC = Path(ARGS[0]) if len(ARGS) > 0 else PRODUCT / "app/globals.css"
# The product site is a static export, so its compiled stylesheet is the single
# .css file in its build output.
BUILT = Path(ARGS[1]) if len(ARGS) > 1 else next(
    (PRODUCT / "out/_next/static/chunks").glob("*.css"))
OUT = Path(ARGS[2]) if len(ARGS) > 2 else ROOT / "app/cybershield/cybershield.css"

src = SRC.read_text(encoding="utf-8")

# Both @import lines go: this site loads Inter and Noto Sans KR itself from
# app/fonts.ts, and the Tailwind layers arrive from the compiled file.
# (Matched to end of line, not to the first `;` — the font URL is full of them.)
src = re.sub(r"^@import[^\n]*\n\s*", "", src, flags=re.M)

# The product site names the two families directly, because it fetches them
# from Google. This one self-hosts them and reaches them through the variables
# root-shell.tsx sets, so the stack is rewritten on the way in — otherwise this
# file would go back to the literal names every time it is regenerated, and the
# ported page would quietly fall back to Arial while the rest of the site did
# not. The literal names stay on the end as the fallback they already were.
src = re.sub(
    r'font-family:\s*Inter,\s*"Noto Sans KR",',
    'font-family: var(--font-inter), var(--font-noto-kr), Inter, "Noto Sans KR",',
    src,
)

# `.hero` is the one class name the two stylesheets share. Scoping alone would
# not settle it: this site's `.hero p` and `.hero h1` rules would still reach
# into the ported hero for every property the product page leaves to the
# browser. Renaming puts it out of their reach — the `.hero-*` names are unique
# to the product page, so only the bare token moves.
src = re.sub(r"\.hero(?![-\w])", ".cs-hero", src)


def split_top_level(css):
    """Split CSS into ("ws"|"comment"|"rule", header, body) chunks."""
    out, i, n = [], 0, len(css)
    while i < n:
        if css.startswith("/*", i):
            j = css.index("*/", i) + 2
            out.append(("comment", css[i:j], None))
            i = j
        elif css[i] in " \t\r\n":
            j = i
            while j < n and css[j] in " \t\r\n":
                j += 1
            out.append(("ws", css[i:j], None))
            i = j
        else:
            j = i
            while j < n and css[j] not in "{;":
                j = css.index("*/", j) + 2 if css.startswith("/*", j) else j + 1
            # An at-statement rather than a block — `@layer components;`, which
            # declares layer order and carries no selectors.
            if j < n and css[j] == ";":
                out.append(("statement", css[i:j + 1], None))
                i = j + 1
                continue
            header = css[i:j]
            depth, k = 1, j + 1
            while k < n and depth:
                if css.startswith("/*", k):
                    k = css.index("*/", k) + 2
                    continue
                depth += (css[k] == "{") - (css[k] == "}")
                k += 1
            out.append(("rule", header, css[j + 1:k - 1]))
            i = k
    return out


def scope_selector(sel):
    sel = sel.strip()
    if sel == "*":
        return ".cs, .cs *"
    # The document-level selectors all describe the same thing here: the box
    # the ported page lives in.
    if sel in (":root", "html", "body"):
        return ".cs"
    return f".cs {sel}"


def scope_header(header):
    """Prefix every selector in a comma-separated list, keeping indentation."""
    lead = re.match(r"\s*", header).group(0)
    parts, depth, buf = [], 0, ""
    for ch in header.strip():
        depth += (ch == "(") - (ch == ")")
        if ch == "," and depth == 0:
            parts.append(buf)
            buf = ""
        else:
            buf += ch
    parts.append(buf)

    seen, scoped = [], []
    for part in parts:
        sel = scope_selector(part)
        if sel not in seen:  # `:root`, `html` and `body` all collapse to `.cs`
            seen.append(sel)
            scoped.append(sel)
    return lead + ", ".join(scoped)


def transform(css):
    out = []
    for kind, header, body in split_top_level(css):
        if kind != "rule":
            out.append(header)
            continue
        at = header.strip()
        if at.startswith("@keyframes") or at.startswith("@font-face"):
            out.append(f"{header}{{{body}}}")  # bodies here are not selectors
        elif at.startswith("@"):  # @media, @supports, @layer
            out.append(f"{header}{{{transform(body)}}}")
        else:
            out.append(f"{scope_header(header)}{{{body}}}")
    return "".join(out)


def tailwind_layers(css):
    """The `@layer` blocks the product site's `@import "tailwindcss"` expands to.

    Everything outside them is its hand-written stylesheet, which comes from the
    source file instead — same rules, but with its comments intact.
    """
    return "\n".join(
        header.strip() if kind == "statement" else f"{header.strip()}{{{transform(body)}}}"
        for kind, header, body in split_top_level(css)
        if kind in ("rule", "statement") and header.strip().startswith("@layer")
    )


BANNER = """/* CyberShield landing page styles, scoped under `.cs`.

   Generated from the product site's stylesheets by
   scripts/scope-cybershield-css.py — every selector gained a `.cs ` prefix and
   the `:root` / `html` / `body` rules became the wrapper itself, so the product
   design lands inside this site's chrome without either stylesheet reaching
   into the other. `.hero` is renamed `.cs-hero` for the same reason: it is the
   one class name both stylesheets claim.

   The Tailwind layers come first, as they do upstream: the product page never
   sees this site's `* { margin: 0; padding: 0 }` reset — globals.css excludes
   `.cs` from it — and is spaced against the reset in `@layer base` instead.

   Re-run the script to pull upstream changes rather than editing this file. */

/* Korean copy on the product page wraps on the browser's rules; the `keep-all`
   globals.css sets is this site's own choice and would rewrap it. Unlayered, so
   it outranks that rule rather than sitting in a layer underneath it. */
.cs h1, .cs h2, .cs h3, .cs h4, .cs p { word-break: normal; }

"""

OUT.write_text(
    BANNER + tailwind_layers(BUILT.read_text(encoding="utf-8")) + "\n\n" + transform(src).lstrip(),
    encoding="utf-8",
)
print(f"{SRC.name} + {BUILT.name} -> {OUT} ({OUT.stat().st_size:,} bytes)")

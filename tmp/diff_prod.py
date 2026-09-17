import os, glob

with open("/tmp/prod.js") as f:
    prod = f.read()

for path in ["src/components/HeroMinimal.tsx", "src/components/Navbar.tsx", "src/App.tsx"]:
    print(f"=== Checking {path} ===")
    with open(path) as f:
        content = f.read()
    for line in content.split("\n"):
        line = line.strip()
        if "className=" in line:
            parts = line.split("className=")
            cls = parts[1].split()[0].strip('"`\'{}')
            # Let's check key class string
            raw_cls = line.replace('className=', '').strip('"`\'{}')
            if len(raw_cls) > 15 and raw_cls not in prod:
                print("  Diff:", line)

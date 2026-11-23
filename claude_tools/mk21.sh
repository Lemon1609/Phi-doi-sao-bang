set -e
cd /home/claude/nguon
python3 /tmp/pat21.py /home/claude/work/l17e.html /tmp/e21a.html
python3 /tmp/e21pairs.py html /tmp/e21a.html /tmp/e21b.html
SHIPQ=85 python3 claude_tools/inject_evo21.py /tmp/e21b.html "$1" /tmp/e21t/all5q $(seq 1 13) | tail -c 20
ls -la "$1"

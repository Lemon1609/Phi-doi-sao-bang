cd /home/claude/nguon
for H in /home/claude/work/l21j.html /home/claude/work/l21j_off.html; do
 echo "== $H"; python3 tests/t156.py $H /tmp/t156q 2>&1 | tail -1; python3 tests/t209_on_dinh.py $H 2>&1 | tail -1
done
echo XONG

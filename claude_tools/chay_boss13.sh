#!/bin/bash
# chạy lần lượt 13 tàu × bật/tắt
H=$1; OUT=$2; : > $OUT
for s in ${SIDS:-0 1 2 3 4 5 6 7 8 9 10 11 12}; do for c in 1 0; do
  SID=$s CO=$c GIAY=${GIAY:-20} timeout 300 python3 tests/do_boss_don.py $H 2>/dev/null | tail -1 >> $OUT
done; done
echo XONG >> $OUT

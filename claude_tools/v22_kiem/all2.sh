cd /home/claude/phi-doi-sao-bang
H=$PWD/Phi_Doi_Sao_Bang_V74_mau.html
echo "== t_v22";timeout 900 python3 tests/t_v22.py $H 2>&1 | grep -E "✗|TRƯỢT|KẾT QUẢ|Error|V2.2.3"
echo "== t_nobs22";timeout 600 python3 tests/t_nobs22.py $H 2>&1 | grep -E "✗|KẾT QUẢ"
echo "== t_map22";timeout 900 python3 tests/t_map22.py $H 2>&1 | grep -E "✗|KẾT QUẢ|BLK"
echo "== t_rig23";timeout 900 python3 tests/t_rig23.py $H 2>&1 | grep -E "TRƯỢT|KẾT QUẢ"
echo "== t_pka24";timeout 600 python3 tests/t_pka24.py $H 2>&1 | grep -E "TRƯỢT|KẾT QUẢ"
echo "== t_rw23";timeout 900 python3 tests/t_rw23.py $H 2>&1 | grep -E "TRƯỢT|KẾT QUẢ"
echo "== t_pkb25";timeout 600 python3 tests/t_pkb25.py $H 2>&1 | grep -E "TRƯỢT|KẾT QUẢ"
echo "== t_pkc26";timeout 600 python3 tests/t_pkc26.py $H 2>&1 | grep -E "TRƯỢT|KẾT QUẢ"
echo "== t_go26";timeout 900 python3 tests/t_go26.py $H 6 2>&1 | grep -E "✗|KẾT QUẢ"
echo "== t_ro22";timeout 300 python3 tests/t_ro22.py $H 2>&1 | grep -E "ĐẠT|TRƯỢT|loi"
echo "== t156";rm -rf /tmp/r22/o156;mkdir -p /tmp/r22/o156;timeout 1500 python3 tests/t156.py $H /tmp/r22/o156 2>&1 | tail -1
echo "== t209";timeout 1800 python3 tests/t209_on_dinh.py $H 2>&1 | tail -2
echo "== audit";rm -rf /tmp/r22/aud;timeout 1800 python3 claude_tools/v22_kiem/audit_ui.py $H /tmp/r22/aud 2>&1 | tail -4
echo ALLDONE

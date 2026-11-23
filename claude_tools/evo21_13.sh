#!/bin/bash
# V2.1 · cắt cả 13 tàu theo luật riêng (chủ dự án 23/11). Dùng: evo21_13.sh <thư mục ảnh GPT NN_body/NN_fx> <ra> [repo có src/ship309 cũ để lấy bề rộng Tím]
IN=$1; OUT=$2; REPO=${3:-/home/claude/phi-doi-sao-bang}; T=$(dirname "$0")/evo21_cat.py
declare -A HO=( [1]=tim [2]=all [5]=tim [10]=tim [12]=all )
declare -A WM=( [3]=248 [4]=248 [5]=248 [9]=248 [13]=248 )
declare -A DH=( [2]=512 )
declare -A HM=( [10]=236 ); declare -A HS=( [10]=24 ); declare -A GR=( [10]=1 )
for N in ${SHIPS:-$(seq 1 13)}; do NN=$(printf %02d $N)
  RW=$(python3 -c "
from PIL import Image;import numpy as np,os
p='$REPO/src/ship309/tau${N}_tim.png'
if os.path.exists(p):a=np.asarray(Image.open(p))[...,3]>128;ys,xs=np.where(a);print(np.ptp(xs)+1)
else:print(0)")
  GROW=${GR[$N]:-0} HMIN=${HM[$N]:-246} HSAT=${HS[$N]:-10} HOLES=${HO[$N]:-none} WMIN=${WM[$N]:-238} DANH=${DH[$N]:-256} REF_W=$RW python3 $T $N $IN/${NN}_body.png $IN/${NN}_fx.png --ra $OUT | cut -c1-60
done

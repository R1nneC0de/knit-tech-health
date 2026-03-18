#!/bin/bash
# Download product images from Unsplash CDN
# Images are free to use (Unsplash License)

DIR="apps/web/public/images/products"
mkdir -p "$DIR"

BASE="https://images.unsplash.com"
PARAMS="?w=800&h=600&fit=crop&q=80"

declare -A IMAGES=(
  # Mobility
  ["standard-wheelchair"]="photo-1565615833231-e8c91a38a012"
  ["four-wheel-rollator"]="photo-1753698136604-ecdc2d419601"
  ["adjustable-aluminum-crutches"]="photo-1584145798265-b286d367426f"
  ["folding-walking-cane"]="photo-1769373548690-fbf09a54f920"

  # Patient Support
  ["semi-electric-hospital-bed"]="photo-1614101062781-09a8dfb90dce"
  ["overbed-table"]="photo-1557304093-b2f0fe30e899"
  ["hydraulic-patient-lift"]="photo-1730040762827-2d5275cfdbf7"
  ["bedside-commode"]="photo-1644729696782-e4035bcedf75"

  # Bath & Safety
  ["adjustable-shower-chair"]="photo-1737233548198-d9147c0ce753"
  ["stainless-steel-grab-bar"]="photo-1646930546789-d5a37c9b99e7"
  ["padded-transfer-bench"]="photo-1740727262096-9dc2c455f30f"
  ["non-slip-bath-mat"]="photo-1638859460750-181fcc7936a6"

  # Respiratory
  ["compressor-nebulizer-system"]="photo-1619708034522-7d1ddb943599"
  ["auto-adjusting-cpap-machine"]="photo-1625464734554-3c8722c477a5"
  ["portable-oxygen-concentrator"]="photo-1601992342430-9dbdb88d85fc"
  ["fingertip-pulse-oximeter"]="photo-1598532037823-2f11cc6a866c"

  # Wound Care
  ["sterile-wound-dressings"]="photo-1765996796562-ce301df337a0"
  ["elastic-compression-bandages"]="photo-1588955486066-3a56d4733d1a"
  ["skin-protectant-barrier-cream"]="photo-1609097164673-7cfafb51b926"
  ["wound-irrigation-syringe"]="photo-1649988896998-9ed48f43897d"

  # PPE
  ["astm-level-3-surgical-masks"]="photo-1758206523735-079e56f2faf7"
  ["powder-free-nitrile-gloves"]="photo-1628235176517-71013205a2de"
  ["anti-fog-face-shield"]="photo-1644575879970-c5d2e99e945c"
  ["disposable-isolation-gowns"]="photo-1668656690099-49987f3425f8"

  # Diagnostic Equipment
  ["digital-blood-pressure-monitor"]="photo-1615486511484-92e172cc4fe0"
  ["dual-head-stethoscope"]="photo-1655913197756-fbcf99b273cb"
  ["non-contact-infrared-thermometer"]="photo-1758206523692-7e9f89bcab5e"
  ["diagnostic-otoscope"]="photo-1766299892549-b56b257d1ddd"

  # Aids & Daily Living
  ["folding-reacher-grabber"]="photo-1720159342076-ee0eb99b9669"
  ["weekly-pill-organizer"]="photo-1624711076872-ecdbc5ade023"
  ["adaptive-utensil-set"]="photo-1576864333223-db90dadfb975"
  ["raised-toilet-seat"]="photo-1589824783837-6169889fa20f"
)

echo "Downloading ${#IMAGES[@]} product images..."

PIDS=()
for slug in "${!IMAGES[@]}"; do
  photo_id="${IMAGES[$slug]}"
  url="${BASE}/${photo_id}${PARAMS}"
  outfile="${DIR}/${slug}.jpg"

  if [ -f "$outfile" ]; then
    echo "  [skip] ${slug}.jpg (exists)"
    continue
  fi

  curl -sL -o "$outfile" "$url" &
  PIDS+=($!)
  echo "  [fetch] ${slug}.jpg"
done

# Wait for all downloads
for pid in "${PIDS[@]}"; do
  wait "$pid"
done

echo ""
echo "Done! Downloaded to ${DIR}/"
ls -lh "$DIR"/*.jpg 2>/dev/null | wc -l
echo "images total"

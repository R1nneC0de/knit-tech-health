import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.inquiryOrder.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categories = [
    {
      name: 'Mobility',
      slug: 'mobility',
      description: 'Wheelchairs, walkers, crutches, and mobility aids to help patients move safely and independently.',
      imageUrl: '/images/categories/mobility.jpg',
      sortOrder: 1,
    },
    {
      name: 'Patient Support',
      slug: 'patient-support',
      description: 'Hospital beds, overbed tables, patient lifts, and bedside equipment for comfortable patient care.',
      imageUrl: '/images/categories/patient-support.jpg',
      sortOrder: 2,
    },
    {
      name: 'Bath & Safety',
      slug: 'bath-safety',
      description: 'Shower chairs, grab bars, transfer benches, and bathroom safety products.',
      imageUrl: '/images/categories/bath-safety.jpg',
      sortOrder: 3,
    },
    {
      name: 'Respiratory',
      slug: 'respiratory',
      description: 'Nebulizers, CPAP machines, oxygen concentrators, and respiratory care devices.',
      imageUrl: '/images/categories/respiratory.jpg',
      sortOrder: 4,
    },
    {
      name: 'Wound Care',
      slug: 'wound-care',
      description: 'Dressings, compression bandages, skin protectants, and wound management supplies.',
      imageUrl: '/images/categories/wound-care.jpg',
      sortOrder: 5,
    },
    {
      name: 'PPE',
      slug: 'ppe',
      description: 'Personal protective equipment including masks, gloves, face shields, and gowns.',
      imageUrl: '/images/categories/ppe.jpg',
      sortOrder: 6,
    },
    {
      name: 'Diagnostic Equipment',
      slug: 'diagnostic-equipment',
      description: 'Blood pressure monitors, stethoscopes, thermometers, and diagnostic tools.',
      imageUrl: '/images/categories/diagnostic-equipment.jpg',
      sortOrder: 7,
    },
    {
      name: 'Aids & Daily Living',
      slug: 'aids-daily-living',
      description: 'Reachers, pill organizers, adaptive utensils, and daily living assistance products.',
      imageUrl: '/images/categories/aids-daily-living.jpg',
      sortOrder: 8,
    },
  ];

  const createdCategories: Record<string, string> = {};

  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    createdCategories[cat.slug] = created.id;
  }

  const products = [
    // ── Mobility ──
    {
      name: 'Standard Wheelchair',
      slug: 'standard-wheelchair',
      description: 'Durable steel-frame wheelchair with padded armrests and swing-away footrests. Suitable for everyday indoor and outdoor use.',
      features: ['Steel frame construction', 'Padded armrests', 'Swing-away footrests', 'Foldable for transport', '300 lb weight capacity'],
      specifications: { 'Weight Capacity': '300 lbs', 'Seat Width': '18 inches', 'Frame Material': 'Steel', 'Weight': '36 lbs' },
      imageUrl: '/images/products/standard-wheelchair.jpg',
      categoryId: createdCategories['mobility'],
      sortOrder: 1,
    },
    {
      name: 'Four-Wheel Rollator',
      slug: 'four-wheel-rollator',
      description: 'Lightweight aluminum rollator with built-in seat, storage pouch, and hand brakes for safe indoor and outdoor mobility.',
      features: ['Aluminum frame', 'Built-in padded seat', 'Under-seat storage', 'Loop-lock hand brakes', '6-inch wheels'],
      specifications: { 'Weight Capacity': '300 lbs', 'Seat Height': '23 inches', 'Frame Material': 'Aluminum', 'Weight': '15 lbs' },
      imageUrl: '/images/products/four-wheel-rollator.jpg',
      categoryId: createdCategories['mobility'],
      sortOrder: 2,
    },
    {
      name: 'Adjustable Aluminum Crutches',
      slug: 'adjustable-aluminum-crutches',
      description: 'Height-adjustable underarm crutches with cushioned grips and non-slip rubber tips for stable support during recovery.',
      features: ['Height adjustable', 'Cushioned underarm pads', 'Non-slip rubber tips', 'Push-button adjustment', 'Lightweight aluminum'],
      specifications: { 'Height Range': "4'6\" - 6'6\"", 'Weight Capacity': '300 lbs', 'Material': 'Aluminum', 'Weight': '2 lbs each' },
      imageUrl: '/images/products/adjustable-aluminum-crutches.jpg',
      categoryId: createdCategories['mobility'],
      sortOrder: 3,
    },
    {
      name: 'Folding Walking Cane',
      slug: 'folding-walking-cane',
      description: 'Compact folding cane with ergonomic handle and wrist strap. Easily folds for storage and travel.',
      features: ['Folds into 4 sections', 'Ergonomic handle', 'Wrist strap included', 'Adjustable height', 'Non-slip rubber tip'],
      specifications: { 'Height Range': '33-37 inches', 'Weight Capacity': '250 lbs', 'Material': 'Aluminum', 'Weight': '0.75 lbs' },
      imageUrl: '/images/products/folding-walking-cane.jpg',
      categoryId: createdCategories['mobility'],
      sortOrder: 4,
    },

    // ── Patient Support ──
    {
      name: 'Semi-Electric Hospital Bed',
      slug: 'semi-electric-hospital-bed',
      description: 'Full-size semi-electric hospital bed with adjustable head and foot sections, side rails, and locking casters.',
      features: ['Electric head/foot adjustment', 'Manual bed height', 'Full-length side rails', 'Locking casters', 'Includes mattress'],
      specifications: { 'Weight Capacity': '450 lbs', 'Mattress Size': '36" x 80"', 'Height Range': '15-23 inches', 'Power': '120V AC' },
      imageUrl: '/images/products/semi-electric-hospital-bed.jpg',
      categoryId: createdCategories['patient-support'],
      sortOrder: 1,
    },
    {
      name: 'Overbed Table',
      slug: 'overbed-table',
      description: 'Height-adjustable overbed table with tilt-top surface. Ideal for eating, reading, or using a laptop in bed.',
      features: ['Height adjustable', 'Tilt-top surface', 'H-base fits under bed', 'Locking casters', 'Easy-clean laminate top'],
      specifications: { 'Table Size': '30" x 15"', 'Height Range': '28-45 inches', 'Material': 'Steel/Laminate', 'Weight': '24 lbs' },
      imageUrl: '/images/products/overbed-table.jpg',
      categoryId: createdCategories['patient-support'],
      sortOrder: 2,
    },
    {
      name: 'Hydraulic Patient Lift',
      slug: 'hydraulic-patient-lift',
      description: 'Manual hydraulic patient lift for safe transfers between bed, wheelchair, and bath. Includes sling and spreader bar.',
      features: ['Hydraulic lifting mechanism', 'Six-point spreader bar', 'Adjustable base width', 'Rear locking casters', 'Sling included'],
      specifications: { 'Weight Capacity': '400 lbs', 'Lift Range': '25-70 inches', 'Base Width': '24-43 inches', 'Weight': '58 lbs' },
      imageUrl: '/images/products/hydraulic-patient-lift.jpg',
      categoryId: createdCategories['patient-support'],
      sortOrder: 3,
    },
    {
      name: 'Bedside Commode',
      slug: 'bedside-commode',
      description: 'Three-in-one bedside commode that functions as a raised toilet seat, toilet safety frame, or standalone commode.',
      features: ['3-in-1 functionality', 'Adjustable height legs', 'Splash guard', 'Removable bucket with lid', 'Padded armrests'],
      specifications: { 'Weight Capacity': '350 lbs', 'Seat Height': '16-22 inches', 'Material': 'Steel', 'Weight': '14 lbs' },
      imageUrl: '/images/products/bedside-commode.jpg',
      categoryId: createdCategories['patient-support'],
      sortOrder: 4,
    },

    // ── Bath & Safety ──
    {
      name: 'Adjustable Shower Chair',
      slug: 'adjustable-shower-chair',
      description: 'Lightweight shower chair with adjustable legs, non-slip feet, and drainage holes for safe bathing.',
      features: ['Height adjustable', 'Non-slip rubber feet', 'Drainage holes in seat', 'Rust-proof aluminum', 'Tool-free assembly'],
      specifications: { 'Weight Capacity': '300 lbs', 'Seat Height': '16-21 inches', 'Seat Width': '20 inches', 'Weight': '5 lbs' },
      imageUrl: '/images/products/adjustable-shower-chair.jpg',
      categoryId: createdCategories['bath-safety'],
      sortOrder: 1,
    },
    {
      name: 'Stainless Steel Grab Bar',
      slug: 'stainless-steel-grab-bar',
      description: 'Wall-mounted stainless steel grab bar with textured grip surface. ADA-compliant for bathroom safety.',
      features: ['Stainless steel construction', 'Textured grip surface', 'ADA compliant', 'Concealed mounting hardware', 'Corrosion resistant'],
      specifications: { 'Length': '24 inches', 'Diameter': '1.25 inches', 'Weight Capacity': '500 lbs', 'Material': 'Stainless Steel' },
      imageUrl: '/images/products/stainless-steel-grab-bar.jpg',
      categoryId: createdCategories['bath-safety'],
      sortOrder: 2,
    },
    {
      name: 'Padded Transfer Bench',
      slug: 'padded-transfer-bench',
      description: 'Bath transfer bench with padded backrest and seat. Extends over tub edge for safe entry and exit.',
      features: ['Padded seat and backrest', 'Adjustable height', 'Non-slip legs', 'Drainage holes', 'Reversible design'],
      specifications: { 'Weight Capacity': '400 lbs', 'Seat Height': '17-21 inches', 'Seat Width': '19 inches', 'Weight': '10 lbs' },
      imageUrl: '/images/products/padded-transfer-bench.jpg',
      categoryId: createdCategories['bath-safety'],
      sortOrder: 3,
    },
    {
      name: 'Non-Slip Bath Mat',
      slug: 'non-slip-bath-mat',
      description: 'Extra-long non-slip bath mat with suction cups for secure placement in tubs and showers. Machine washable.',
      features: ['Strong suction cups', 'Anti-microbial surface', 'Machine washable', 'Extra-long coverage', 'Latex-free'],
      specifications: { 'Size': '16" x 40"', 'Material': 'PVC/Rubber', 'Suction Cups': '200+', 'Color': 'White' },
      imageUrl: '/images/products/non-slip-bath-mat.jpg',
      categoryId: createdCategories['bath-safety'],
      sortOrder: 4,
    },

    // ── Respiratory ──
    {
      name: 'Compressor Nebulizer System',
      slug: 'compressor-nebulizer-system',
      description: 'Tabletop compressor nebulizer for delivering aerosolized medication. Includes tubing, mouthpiece, and mask.',
      features: ['Powerful piston compressor', 'Reusable nebulizer cup', 'Includes adult and pediatric masks', '5-year warranty', 'Quiet operation'],
      specifications: { 'Particle Size': '0.5-5 microns', 'Flow Rate': '8 L/min', 'Noise Level': '<55 dB', 'Power': '120V AC' },
      imageUrl: '/images/products/compressor-nebulizer-system.jpg',
      categoryId: createdCategories['respiratory'],
      sortOrder: 1,
    },
    {
      name: 'Auto-Adjusting CPAP Machine',
      slug: 'auto-adjusting-cpap-machine',
      description: 'Auto-titrating CPAP device with heated humidifier, data tracking, and whisper-quiet motor for sleep apnea therapy.',
      features: ['Auto-adjusting pressure', 'Integrated heated humidifier', 'SD card data logging', 'Ramp-up comfort feature', 'Leak compensation'],
      specifications: { 'Pressure Range': '4-20 cmH2O', 'Noise Level': '<30 dB', 'Weight': '2.75 lbs', 'Compliance Tracking': 'Yes' },
      imageUrl: '/images/products/auto-adjusting-cpap-machine.jpg',
      categoryId: createdCategories['respiratory'],
      sortOrder: 2,
    },
    {
      name: 'Portable Oxygen Concentrator',
      slug: 'portable-oxygen-concentrator',
      description: 'Lightweight portable oxygen concentrator with pulse dose delivery. FAA-approved for air travel.',
      features: ['Pulse dose delivery', 'FAA approved', 'Rechargeable battery', 'LCD display', 'Carry bag included'],
      specifications: { 'Flow Settings': '1-5 pulse dose', 'Battery Life': 'Up to 5 hours', 'Weight': '4.7 lbs', 'Noise Level': '<40 dB' },
      imageUrl: '/images/products/portable-oxygen-concentrator.jpg',
      categoryId: createdCategories['respiratory'],
      sortOrder: 3,
    },
    {
      name: 'Fingertip Pulse Oximeter',
      slug: 'fingertip-pulse-oximeter',
      description: 'Compact fingertip pulse oximeter with OLED display showing SpO2 and heart rate. One-button operation.',
      features: ['OLED display', 'SpO2 and pulse rate', 'One-button operation', 'Auto power off', 'Includes lanyard'],
      specifications: { 'SpO2 Range': '70-100%', 'Pulse Range': '30-250 BPM', 'Battery': '2x AAA', 'Weight': '1.7 oz' },
      imageUrl: '/images/products/fingertip-pulse-oximeter.jpg',
      categoryId: createdCategories['respiratory'],
      sortOrder: 4,
    },

    // ── Wound Care ──
    {
      name: 'Sterile Wound Dressings',
      slug: 'sterile-wound-dressings',
      description: 'Individually wrapped sterile adhesive dressings for wound protection. Absorbent pad with breathable backing.',
      features: ['Individually sterile wrapped', 'Absorbent non-stick pad', 'Breathable backing', 'Hypoallergenic adhesive', 'Box of 100'],
      specifications: { 'Size': '4" x 4"', 'Pad Size': '2.5" x 2.5"', 'Quantity': '100/box', 'Sterility': 'Gamma irradiated' },
      imageUrl: '/images/products/sterile-wound-dressings.jpg',
      categoryId: createdCategories['wound-care'],
      sortOrder: 1,
    },
    {
      name: 'Elastic Compression Bandages',
      slug: 'elastic-compression-bandages',
      description: 'Reusable elastic compression bandages with clips for secure wrapping. Ideal for sprains, strains, and edema management.',
      features: ['High elasticity', 'Reusable and washable', 'Metal clips included', 'Consistent compression', 'Latex-free option'],
      specifications: { 'Width': '4 inches', 'Stretched Length': '10 feet', 'Quantity': '12/box', 'Material': 'Cotton/Elastic' },
      imageUrl: '/images/products/elastic-compression-bandages.jpg',
      categoryId: createdCategories['wound-care'],
      sortOrder: 2,
    },
    {
      name: 'Skin Protectant Barrier Cream',
      slug: 'skin-protectant-barrier-cream',
      description: 'Moisture barrier cream for protecting skin from irritation caused by incontinence, wound drainage, and adhesives.',
      features: ['Long-lasting barrier', 'Fragrance-free', 'Dimethicone-based', 'Easy application', 'CHG compatible'],
      specifications: { 'Volume': '4 oz tube', 'Active Ingredient': 'Dimethicone 5%', 'Application': 'Topical', 'Latex-Free': 'Yes' },
      imageUrl: '/images/products/skin-protectant-barrier-cream.jpg',
      categoryId: createdCategories['wound-care'],
      sortOrder: 3,
    },
    {
      name: 'Wound Irrigation Syringe',
      slug: 'wound-irrigation-syringe',
      description: 'Disposable wound irrigation syringe with piston-style plunger for controlled wound cleansing.',
      features: ['Piston-style plunger', 'Curved tip option', 'Clear barrel markings', 'Single-use sterile', 'Smooth operation'],
      specifications: { 'Capacity': '60 mL', 'Tip Type': 'Catheter tip', 'Quantity': '50/case', 'Sterility': 'EO sterilized' },
      imageUrl: '/images/products/wound-irrigation-syringe.jpg',
      categoryId: createdCategories['wound-care'],
      sortOrder: 4,
    },

    // ── PPE ──
    {
      name: 'ASTM Level 3 Surgical Masks',
      slug: 'astm-level-3-surgical-masks',
      description: 'High-barrier surgical face masks with ear loops. ASTM Level 3 rated for fluid resistance and bacterial filtration.',
      features: ['ASTM Level 3 rated', '3-ply construction', 'Adjustable nose wire', 'Fluid resistant', 'Latex-free'],
      specifications: { 'BFE': '≥98%', 'PFE': '≥98%', 'Quantity': '50/box', 'Color': 'Blue' },
      imageUrl: '/images/products/astm-level-3-surgical-masks.jpg',
      categoryId: createdCategories['ppe'],
      sortOrder: 1,
    },
    {
      name: 'Powder-Free Nitrile Gloves',
      slug: 'powder-free-nitrile-gloves',
      description: 'Medical-grade nitrile examination gloves. Powder-free, latex-free, and textured fingertips for grip.',
      features: ['Medical-grade nitrile', 'Powder-free', 'Textured fingertips', 'Ambidextrous', 'Latex-free'],
      specifications: { 'Thickness': '4 mil', 'Sizes': 'S/M/L/XL', 'Quantity': '100/box', 'Color': 'Blue' },
      imageUrl: '/images/products/powder-free-nitrile-gloves.jpg',
      categoryId: createdCategories['ppe'],
      sortOrder: 2,
    },
    {
      name: 'Anti-Fog Face Shield',
      slug: 'anti-fog-face-shield',
      description: 'Full-face protective shield with anti-fog coating, adjustable headband, and full peripheral coverage.',
      features: ['Anti-fog coating', 'Adjustable headband', 'Full face coverage', 'Lightweight PET', 'Reusable'],
      specifications: { 'Material': 'PET Plastic', 'Thickness': '0.3mm', 'Quantity': '10/pack', 'Optical Clarity': 'Grade 1' },
      imageUrl: '/images/products/anti-fog-face-shield.jpg',
      categoryId: createdCategories['ppe'],
      sortOrder: 3,
    },
    {
      name: 'Disposable Isolation Gowns',
      slug: 'disposable-isolation-gowns',
      description: 'AAMI Level 2 disposable isolation gowns with knit cuffs and waist ties. Full back coverage.',
      features: ['AAMI Level 2', 'Knit cuffs', 'Full back coverage', 'Waist and neck ties', 'Fluid resistant'],
      specifications: { 'Material': 'SMS Polypropylene', 'Size': 'Universal (one size)', 'Quantity': '10/pack', 'Color': 'Yellow' },
      imageUrl: '/images/products/disposable-isolation-gowns.jpg',
      categoryId: createdCategories['ppe'],
      sortOrder: 4,
    },

    // ── Diagnostic Equipment ──
    {
      name: 'Digital Blood Pressure Monitor',
      slug: 'digital-blood-pressure-monitor',
      description: 'Automatic upper-arm blood pressure monitor with large LCD display, irregular heartbeat detection, and memory storage.',
      features: ['One-touch operation', 'Irregular heartbeat detection', '120-reading memory', 'Wide-range cuff', 'WHO classification indicator'],
      specifications: { 'Cuff Size': '8.7-16.5 inches', 'Accuracy': '±3 mmHg', 'Memory': '120 readings', 'Power': '4x AA batteries' },
      imageUrl: '/images/products/digital-blood-pressure-monitor.jpg',
      categoryId: createdCategories['diagnostic-equipment'],
      sortOrder: 1,
    },
    {
      name: 'Dual-Head Stethoscope',
      slug: 'dual-head-stethoscope',
      description: 'Professional dual-head stethoscope with stainless steel chestpiece, tunable diaphragm, and comfortable ear tips.',
      features: ['Dual-head chestpiece', 'Tunable diaphragm', 'Stainless steel construction', 'Soft ear tips', 'Latex-free'],
      specifications: { 'Tube Length': '27 inches', 'Chestpiece': 'Stainless steel', 'Frequency Range': '20-1000 Hz', 'Weight': '5.3 oz' },
      imageUrl: '/images/products/dual-head-stethoscope.jpg',
      categoryId: createdCategories['diagnostic-equipment'],
      sortOrder: 2,
    },
    {
      name: 'Non-Contact Infrared Thermometer',
      slug: 'non-contact-infrared-thermometer',
      description: 'Instant-read non-contact infrared thermometer with fever alarm, memory recall, and switchable °F/°C.',
      features: ['Non-contact measurement', '1-second reading', 'Fever alarm', '32-reading memory', 'Backlit LCD display'],
      specifications: { 'Range': '89.6-109.2°F', 'Distance': '1-6 inches', 'Accuracy': '±0.4°F', 'Battery': '2x AAA' },
      imageUrl: '/images/products/non-contact-infrared-thermometer.jpg',
      categoryId: createdCategories['diagnostic-equipment'],
      sortOrder: 3,
    },
    {
      name: 'Diagnostic Otoscope',
      slug: 'diagnostic-otoscope',
      description: 'Fiber-optic otoscope with halogen illumination, 3x magnification, and set of reusable specula.',
      features: ['Fiber-optic illumination', '3x magnification', 'Reusable specula set', 'Rotating lens', 'Pocket clip'],
      specifications: { 'Light Source': 'Halogen', 'Magnification': '3x', 'Specula Sizes': '2.5mm, 3.5mm, 4.5mm', 'Battery': '2x AA' },
      imageUrl: '/images/products/diagnostic-otoscope.jpg',
      categoryId: createdCategories['diagnostic-equipment'],
      sortOrder: 4,
    },

    // ── Aids & Daily Living ──
    {
      name: 'Folding Reacher Grabber',
      slug: 'folding-reacher-grabber',
      description: 'Lightweight folding reacher with magnetic tip, rotating jaw, and ergonomic trigger grip for picking up items.',
      features: ['Foldable design', 'Magnetic tip', 'Rotating jaw', 'Ergonomic trigger', 'Non-slip grip pads'],
      specifications: { 'Length': '32 inches', 'Reach Capacity': '5 lbs', 'Weight': '8 oz', 'Material': 'Aluminum' },
      imageUrl: '/images/products/folding-reacher-grabber.jpg',
      categoryId: createdCategories['aids-daily-living'],
      sortOrder: 1,
    },
    {
      name: 'Weekly Pill Organizer',
      slug: 'weekly-pill-organizer',
      description: 'Seven-day pill organizer with 4 daily compartments (morning, noon, evening, bedtime). Large, easy-open lids.',
      features: ['7-day organization', '4 daily compartments', 'Large easy-open lids', 'Color-coded days', 'BPA-free plastic'],
      specifications: { 'Compartments': '28 (7x4)', 'Size': '8.5" x 5.5" x 1.5"', 'Material': 'BPA-free plastic', 'Dishwasher Safe': 'Yes' },
      imageUrl: '/images/products/weekly-pill-organizer.jpg',
      categoryId: createdCategories['aids-daily-living'],
      sortOrder: 2,
    },
    {
      name: 'Adaptive Utensil Set',
      slug: 'adaptive-utensil-set',
      description: 'Ergonomic weighted utensil set with built-up handles for individuals with limited hand strength or tremors.',
      features: ['Built-up soft handles', 'Weighted for stability', 'Dishwasher safe', 'Stainless steel', 'Non-slip grip'],
      specifications: { 'Set Includes': 'Fork, Knife, Spoon, Teaspoon', 'Handle Diameter': '1.5 inches', 'Weight': '7 oz each', 'Material': 'Stainless Steel/Rubber' },
      imageUrl: '/images/products/adaptive-utensil-set.jpg',
      categoryId: createdCategories['aids-daily-living'],
      sortOrder: 3,
    },
    {
      name: 'Raised Toilet Seat',
      slug: 'raised-toilet-seat',
      description: 'Elevated toilet seat riser with padded armrests and secure locking mechanism. Adds 5 inches of height.',
      features: ['Adds 5" height', 'Padded armrests', 'Front locking mechanism', 'Tool-free installation', 'Easy-clean surface'],
      specifications: { 'Height Added': '5 inches', 'Weight Capacity': '300 lbs', 'Fits Bowl Width': '14-14.5 inches', 'Weight': '6 lbs' },
      imageUrl: '/images/products/raised-toilet-seat.jpg',
      categoryId: createdCategories['aids-daily-living'],
      sortOrder: 4,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

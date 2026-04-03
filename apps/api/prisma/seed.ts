import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const FDA_API = 'https://api.fda.gov/device/classification.json';

interface FDADevice {
  device_name: string;
  definition?: string;
  device_class?: string;
  product_code?: string;
}

// loremflickr.com returns real CC-licensed photos by keyword.
// The "lock" param makes the URL deterministic (same lock = same photo).
function flickrImg(keyword: string, lock: number, w = 600, h = 400): string {
  return `https://loremflickr.com/${w}/${h}/${keyword}/all?lock=${lock}`;
}

interface CategoryConfig {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
  fdaSearches: string[];
  priceRange: [number, number];
  featureTemplates: string[];
  imgKeyword: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    name: 'Mobility',
    slug: 'mobility',
    description: 'Wheelchairs, walkers, crutches, and mobility aids to help patients move safely and independently.',
    imageUrl: '/images/categories/mobility.jpg',
    sortOrder: 1,
    fdaSearches: ['wheelchair', 'walker', 'crutch'],
    priceRange: [50, 6000],
    imgKeyword: 'wheelchair',
    featureTemplates: [
      'Lightweight and durable construction',
      'Adjustable to fit various patient sizes',
      'Non-slip grips and safety features',
      'Foldable design for easy transport and storage',
      'FDA-registered medical device',
    ],
  },
  {
    name: 'Patient Support',
    slug: 'patient-support',
    description: 'Hospital beds, overbed tables, patient lifts, and bedside equipment for comfortable patient care.',
    imageUrl: '/images/categories/patient-support.jpg',
    sortOrder: 2,
    fdaSearches: ['hospital bed', 'patient lift', 'stretcher'],
    priceRange: [200, 20000],
    imgKeyword: 'hospital,bed',
    featureTemplates: [
      'Heavy-duty frame supports high weight capacity',
      'Height adjustable for caregiver ergonomics',
      'Smooth surface for infection control',
      'Locking casters for patient safety',
      'Easy-clean materials for rapid turnover',
    ],
  },
  {
    name: 'Bath & Safety',
    slug: 'bath-safety',
    description: 'Shower chairs, grab bars, transfer benches, and bathroom safety products.',
    imageUrl: '/images/categories/bath-safety.jpg',
    sortOrder: 3,
    fdaSearches: ['bath seat', 'shower chair', 'grab bar'],
    priceRange: [25, 600],
    imgKeyword: 'bathroom,safety',
    featureTemplates: [
      'Slip-resistant surfaces for fall prevention',
      'Corrosion-resistant materials for wet environments',
      'Tool-free or simple installation',
      'Weight-rated for safety compliance',
      'Meets ADA accessibility standards',
    ],
  },
  {
    name: 'Respiratory',
    slug: 'respiratory',
    description: 'Nebulizers, CPAP machines, oxygen concentrators, and respiratory care devices.',
    imageUrl: '/images/categories/respiratory.jpg',
    sortOrder: 4,
    fdaSearches: ['nebulizer', 'ventilator', 'oxygen concentrator'],
    priceRange: [100, 10000],
    imgKeyword: 'oxygen,medical',
    featureTemplates: [
      'Precise flow control for accurate therapy delivery',
      'Quiet operation minimizes patient disruption',
      'Easy-clean components reduce infection risk',
      'Alarm systems for patient safety monitoring',
      'Compatible with standard clinical accessories',
    ],
  },
  {
    name: 'Wound Care',
    slug: 'wound-care',
    description: 'Dressings, compression bandages, skin protectants, and wound management supplies.',
    imageUrl: '/images/categories/wound-care.jpg',
    sortOrder: 5,
    fdaSearches: ['wound dressing', 'bandage', 'wound care'],
    priceRange: [15, 500],
    imgKeyword: 'bandage,medical',
    featureTemplates: [
      'Sterile packaging for infection prevention',
      'Breathable materials promote healing',
      'Conformable design for complex wound shapes',
      'Non-adherent surface minimizes trauma on removal',
      'Moisture-retentive properties for optimal healing',
    ],
  },
  {
    name: 'PPE',
    slug: 'ppe',
    description: 'Personal protective equipment including masks, gloves, face shields, and gowns.',
    imageUrl: '/images/categories/ppe.jpg',
    sortOrder: 6,
    fdaSearches: ['surgical glove', 'face mask', 'protective gown'],
    priceRange: [10, 300],
    imgKeyword: 'gloves,medical',
    featureTemplates: [
      'Fluid-resistant barrier protection',
      'Comfortable extended-wear design',
      'Single-use for infection control compliance',
      'Meets ASTM/ANSI standards',
      'Latex-free options available',
    ],
  },
  {
    name: 'Diagnostic Equipment',
    slug: 'diagnostic-equipment',
    description: 'Blood pressure monitors, stethoscopes, thermometers, and diagnostic tools.',
    imageUrl: '/images/categories/diagnostic-equipment.jpg',
    sortOrder: 7,
    fdaSearches: ['blood pressure monitor', 'stethoscope', 'thermometer'],
    priceRange: [30, 5000],
    imgKeyword: 'stethoscope',
    featureTemplates: [
      'High accuracy for reliable clinical decisions',
      'Easy-to-read display for quick assessment',
      'Durable construction for frequent clinical use',
      'Battery and AC power options',
      'Calibration certificate included',
    ],
  },
  {
    name: 'Aids & Daily Living',
    slug: 'aids-daily-living',
    description: 'Reachers, pill organizers, adaptive utensils, and daily living assistance products.',
    imageUrl: '/images/categories/aids-daily-living.jpg',
    sortOrder: 8,
    fdaSearches: ['orthotic', 'adaptive utensil', 'daily living aid'],
    priceRange: [10, 400],
    imgKeyword: 'medical,elderly',
    featureTemplates: [
      'Ergonomic design reduces patient strain',
      'Lightweight for easy handling',
      'Durable materials for long-term daily use',
      'Adjustable to accommodate different needs',
      'Helps maintain patient independence',
    ],
  },
  {
    name: 'Anesthesia Equipment',
    slug: 'anesthesia-equipment',
    description: 'Anesthesia workstations, vaporizers, breathing circuits, gas monitors, and ventilator accessories.',
    imageUrl: '/images/categories/anesthesia-equipment.jpg',
    sortOrder: 9,
    fdaSearches: ['anesthesia', 'vaporizer anesthesia', 'breathing circuit'],
    priceRange: [500, 60000],
    imgKeyword: 'anesthesia',
    featureTemplates: [
      'Precision engineering for safe gas delivery',
      'Integrated monitoring and alarm systems',
      'Compatibility with major anesthesia agent brands',
      'Low-maintenance design for clinical efficiency',
      'Full service and calibration documentation included',
    ],
  },
  {
    name: 'Infusion Pumps',
    slug: 'infusion-pumps',
    description: 'Large volume IV pumps, syringe pumps, PCA pumps, enteral feeding pumps, and accessories.',
    imageUrl: '/images/categories/infusion-pumps.jpg',
    sortOrder: 10,
    fdaSearches: ['infusion pump', 'syringe pump', 'feeding pump'],
    priceRange: [400, 18000],
    imgKeyword: 'infusion,pump',
    featureTemplates: [
      'Accurate flow rate control ±2% accuracy',
      'Integrated air-in-line and occlusion detection',
      'Large backlit display for ICU visibility',
      'Drug library with dose error reduction software',
      'Rechargeable battery for patient transport',
    ],
  },
  {
    name: 'Defibrillators',
    slug: 'defibrillators',
    description: 'Automated external defibrillators, manual defibrillators, AED accessories, and electrode pads.',
    imageUrl: '/images/categories/defibrillators.jpg',
    sortOrder: 11,
    fdaSearches: ['defibrillator'],
    priceRange: [1000, 30000],
    imgKeyword: 'defibrillator',
    featureTemplates: [
      'Biphasic waveform technology for effective therapy',
      'AED mode for untrained rescuer use',
      'Clear audio and visual prompts guide operator',
      'Data logging for post-event clinical review',
      'Compatible with standard electrode pads',
    ],
  },
  {
    name: 'Patient Monitoring',
    slug: 'patient-monitoring',
    description: 'Bedside monitors, telemetry systems, capnography, fetal monitors, and transport monitors.',
    imageUrl: '/images/categories/patient-monitoring.jpg',
    sortOrder: 12,
    fdaSearches: ['patient monitor', 'pulse oximeter', 'cardiac monitor'],
    priceRange: [500, 35000],
    imgKeyword: 'hospital,monitor',
    featureTemplates: [
      'Multi-parameter simultaneous monitoring',
      'Wireless data transmission to central station',
      'Customizable alarm thresholds',
      'Trend display for clinical assessment',
      'Durable touchscreen interface',
    ],
  },
  {
    name: 'Sterilization',
    slug: 'sterilization',
    description: 'Steam autoclaves, ultrasonic cleaners, plasma sterilizers, endoscope reprocessors, and supplies.',
    imageUrl: '/images/categories/sterilization.jpg',
    sortOrder: 13,
    fdaSearches: ['sterilizer', 'autoclave', 'ultrasonic cleaner'],
    priceRange: [300, 25000],
    imgKeyword: 'autoclave,sterilization',
    featureTemplates: [
      'Validated sterilization cycles per ISO standards',
      'Self-diagnostic system with error reporting',
      'Easy-access chamber for loading efficiency',
      'Printer and USB logging of cycle records',
      'Automatic door lock during active cycle',
    ],
  },
  {
    name: 'Endoscopy',
    slug: 'endoscopy',
    description: 'Video endoscopy towers, bronchoscopes, light sources, insufflators, and irrigation pumps.',
    imageUrl: '/images/categories/endoscopy.jpg',
    sortOrder: 14,
    fdaSearches: ['endoscope', 'bronchoscope', 'colonoscope'],
    priceRange: [1000, 60000],
    imgKeyword: 'endoscopy',
    featureTemplates: [
      'High-definition imaging for precise visualization',
      'Single-use options available for infection control',
      'Compatible with major endoscopy tower brands',
      'Ergonomic handle reduces clinician fatigue',
      'Full sterilization and reprocessing compatibility',
    ],
  },
  {
    name: 'Surgical Equipment',
    slug: 'surgical-equipment',
    description: 'Electrosurgical units, surgical lights, tourniquet systems, patient warming, and smoke evacuators.',
    imageUrl: '/images/categories/surgical-equipment.jpg',
    sortOrder: 15,
    fdaSearches: ['electrosurgical', 'surgical instrument', 'retractor'],
    priceRange: [100, 40000],
    imgKeyword: 'surgery,equipment',
    featureTemplates: [
      'Precision design for minimally invasive procedures',
      'Autoclavable components for full sterility',
      'Ergonomic handles reduce surgeon fatigue',
      'Compatible with standard surgical accessories',
      'CE and FDA cleared for clinical use',
    ],
  },
  {
    name: 'Beds & Furniture',
    slug: 'beds-furniture',
    description: 'Full-electric hospital beds, exam tables, emergency stretchers, medical carts, and patient recliners.',
    imageUrl: '/images/categories/beds-furniture.jpg',
    sortOrder: 16,
    fdaSearches: ['examination table', 'medical cart', 'procedure chair'],
    priceRange: [300, 20000],
    imgKeyword: 'hospital,furniture',
    featureTemplates: [
      'Full-electric adjustment for patient and caregiver comfort',
      'Side rails with integrated controls',
      'Trendelenburg and reverse Trendelenburg positions',
      'Locking casters for patient safety',
      'Compatible with standard hospital mattresses',
    ],
  },
  {
    name: 'Dental Equipment',
    slug: 'dental-equipment',
    description: 'Dental chairs, air compressors, intraoral X-ray units, autoclaves, and curing lights.',
    imageUrl: '/images/categories/dental-equipment.jpg',
    sortOrder: 17,
    fdaSearches: ['dental chair', 'dental drill', 'dental x-ray'],
    priceRange: [200, 20000],
    imgKeyword: 'dental',
    featureTemplates: [
      'Smooth, quiet operation minimizes patient anxiety',
      'Ergonomic design for practitioner comfort',
      'Compatible with standard dental consumables',
      'Easy sterilization of patient-contact surfaces',
      'Digital interface for modern practice integration',
    ],
  },
  {
    name: 'Nurse Call Systems',
    slug: 'nurse-call-systems',
    description: 'Master consoles, pillow speakers, call pendants, patient stations, and dome lights.',
    imageUrl: '/images/categories/nurse-call-systems.jpg',
    sortOrder: 18,
    fdaSearches: ['nurse call', 'patient call system', 'call light'],
    priceRange: [100, 8000],
    imgKeyword: 'nurse,hospital',
    featureTemplates: [
      'Two-way communication between patient and staff',
      'Centralized monitoring at nurse station',
      'Wireless options for flexible installation',
      'Integration with EMR and bed management systems',
      'Low-voltage design safe for patient areas',
    ],
  },
  {
    name: 'Consumables & Disposables',
    slug: 'consumables-disposables',
    description: 'ECG electrodes, catheterization kits, syringes, medical paper rolls, and isolation gowns.',
    imageUrl: '/images/categories/consumables-disposables.jpg',
    sortOrder: 19,
    fdaSearches: ['electrode ecg', 'catheter urinary', 'syringe disposable'],
    priceRange: [10, 400],
    imgKeyword: 'medical,supplies',
    featureTemplates: [
      'Sterile individually wrapped for clinical safety',
      'Single-use design prevents cross-contamination',
      'Latex-free formulation',
      'Compatible with standard clinical equipment',
      'Bulk packaging available for cost efficiency',
    ],
  },
  {
    name: 'Cables & Sensors',
    slug: 'cables-sensors',
    description: 'SpO2 sensors, ECG cable sets, temperature probes, NIBP cuffs, and IBP transducer cables.',
    imageUrl: '/images/categories/cables-sensors.jpg',
    sortOrder: 20,
    fdaSearches: ['ecg electrode', 'pulse oximeter sensor', 'temperature probe'],
    priceRange: [20, 1500],
    imgKeyword: 'medical,sensor',
    featureTemplates: [
      'High-signal fidelity for accurate monitoring',
      'Reinforced connector points for clinical durability',
      'Compatible with major patient monitor brands',
      'Flexible cable design for patient comfort',
      'Color-coded leads for fast and accurate connection',
    ],
  },
];

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchFDA(search: string, limit = 25): Promise<FDADevice[]> {
  try {
    const url = `${FDA_API}?search=device_name:"${encodeURIComponent(search)}"&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const json = (await res.json()) as { results?: FDADevice[] };
    return json.results ?? [];
  } catch {
    return [];
  }
}

function cleanName(raw: string): string {
  // FDA names come in like "WHEELCHAIR, POWERED" or "PUMP, INFUSION, LARGE VOLUME"
  // Reorder: last part becomes noun, rest become adjectives
  const parts = raw.split(',').map(p => p.trim());
  const reordered = parts.length > 1 ? [...parts.slice(1), parts[0]] : parts;
  return reordered
    .join(' ')
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function generatePrice(deviceClass: string | undefined, [min, max]: [number, number]): number {
  const classMultiplier =
    deviceClass === '3' ? 0.7 + Math.random() * 0.3 :
    deviceClass === '2' ? 0.35 + Math.random() * 0.35 :
    0.1 + Math.random() * 0.25;
  const value = min + (max - min) * classMultiplier;
  return Math.round(value / 10) * 10 - 0.01;
}

async function main() {
  console.log('Clearing existing data...');
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.inquiryOrder.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const seenSlugs = new Set<string>();
  let totalProducts = 0;

  for (const config of CATEGORIES) {
    console.log(`\nCategory: ${config.name}`);

    const category = await prisma.category.create({
      data: {
        name: config.name,
        slug: config.slug,
        description: config.description,
        imageUrl: config.imageUrl,
        sortOrder: config.sortOrder,
      },
    });

    // Fetch from FDA for each search term
    const allDevices: FDADevice[] = [];
    for (const term of config.fdaSearches) {
      process.stdout.write(`  Fetching: "${term}"... `);
      const devices = await fetchFDA(term, 25);
      console.log(`${devices.length} results`);
      allDevices.push(...devices);
      await sleep(400); // rate limit courtesy
    }

    // Deduplicate within this category
    const seen = new Set<string>();
    const unique = allDevices.filter(d => {
      if (seen.has(d.device_name)) return false;
      seen.add(d.device_name);
      return true;
    });

    const toInsert = unique.slice(0, 30);

    let sortOrder = 1;
    for (const device of toInsert) {
      const name = cleanName(device.device_name);
      if (name.length < 4) continue;

      let slug = toSlug(name);
      if (seenSlugs.has(slug)) {
        slug = `${slug}-${(device.product_code ?? String(sortOrder)).toLowerCase()}`;
      }
      // If still a duplicate, append category slug
      if (seenSlugs.has(slug)) {
        slug = `${slug}-${config.slug}`;
      }
      seenSlugs.add(slug);

      const description = device.definition
        ? device.definition.slice(0, 350).replace(/\s+/g, ' ').trim()
        : `Professional-grade ${name.toLowerCase()} designed for clinical and healthcare settings. Engineered to meet the demanding requirements of modern medical facilities.`;

      const price = generatePrice(device.device_class, config.priceRange);

      await prisma.product.create({
        data: {
          name,
          slug,
          description,
          features: config.featureTemplates,
          specifications: {
            'FDA Product Code': device.product_code ?? 'N/A',
            'Device Class': `Class ${device.device_class ?? 'II'}`,
            'Regulatory Status': 'FDA Cleared',
            'Condition': 'New',
            'Availability': 'In Stock',
          },
          price,
          imageUrl: flickrImg(config.imgKeyword, sortOrder),
          categoryId: category.id,
          sortOrder: sortOrder++,
        },
      });
    }

    console.log(`  Inserted ${sortOrder - 1} products`);
    totalProducts += sortOrder - 1;
  }

  console.log(`\nDone! Seeded 20 categories and ${totalProducts} products from FDA device database.`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

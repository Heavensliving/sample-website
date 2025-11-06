// app/products/smallarms/[id]/data.ts

// This interface defines the shape of a single product
export interface Product {
  id: number;
  name: string;
  spec: string;
  imagePath: string;
  modelPath: string;
  // --- START: MODIFIED INTERFACE ---
  // Description and features are now optional at the top level
  description?: string | null;
  features?: { key: string; value: string }[];
  // Variants are optional
  variants?: {
    name: string;
    description: string | null;
    features: { key: string; value: string }[];
  }[];
  // --- END: MODIFIED INTERFACE ---
}

// This is the main data array for all your products
export const smallArms: Product[] = [
  { 
    id: 1, 
    name: '.338 SABER', 
    spec: '.338 Lapua Magnum', 
    imagePath: '/small_arms/SABER1.png',
    modelPath: '/small_arms/SABER1.glb',
    description: "The SABER is a next-generation sniper rifle, designed by integrating the latest advancements in sniper systems with insights from the world's most demanding military professionals. Crafted for exceptional performance, it offers the perfect balance of strength, lightweight design, and unparalleled precision. Chambered in .338 Lapua Magnum, the SABER delivers outstanding sub-MOA accuracy at ranges exceeding 1,500 meters, making it a formidable tool for long-range engagements. Its modular, lightweight alloy chassis ensures robust durability while remaining adaptable to diverse mission requirements. Built to withstand extreme environments, the milled chassis guarantees reliable operation in all weather conditions. With fewer moving parts and a simple yet rugged construction, the SABER promises consistent, match-grade precision shot after shot. Whether deployed in harsh terrains or demanding tactical situations, the SSS Defence SABER provides military professionals with the confidence and capability to excel at the highest levels. Its innovative design and proven reliability make it a top choice for those seeking the ultimate in sniper rifle performance.",
    features: [
      { key: 'Model', value: '.338 SABER' },
      { key: 'Caliber', value: '.338 Lapua Magnum' },
      { key: 'Operation', value: 'Bolt Action' },
      { key: 'Mag Capacity', value: '5 Rounds' },
      { key: 'Buttstock', value: 'Adjustable with Cheek Rest' },
      { key: 'Muzzle Device', value: 'Muzzle Brake Suppressor available' },
      { key: 'Accuracy', value: '1 MoA' },
      { key: 'Trigger Pull', value: '2 – 3.5 lbs' },
      { key: 'Barrell Length', value: '27"in (685.8mm)' },
      { key: 'Length', value: '1200mm' },
      { key: 'Weight', value: '7.5 kg' },
    ]
  },
  { 
    id: 2, 
    name: '.308 VIPER', 
    spec: '7.62 x 51mm', 
    imagePath: '/small_arms/VIPER.png',
    modelPath: '/small_arms/VIPER.glb',
    description: "Engineered for unparalleled long-range precision, the Viper Sniper Rifle delivers consistent, lethal accuracy at extreme distances. Chambered in 7.62x51mm NATO, the Viper excels in the harshest conditions, making it the ultimate tool for military and law enforcement professionals. Designed with a bolt-action mechanism and compatible with 5- or 10-round magazines, the Viper ensures reliability and precision with every shot. Its 24-inch (609.6mm) free-floating barrel enhances accuracy, while the muzzle brake reduces recoil for superior control. An optional suppressor further expands its operational versatility. Featuring a rugged, modular design, the Viper incorporates a MIL-STD 1913 Picatiny rail system, enabling easy customization with optics and tactical accessories. With an adjustable 2–3.5 lb trigger, shooters can achieve optimal responsiveness and precision. Built for reliability in extreme environments, the Viper requires minimal maintenance while delivering maximum performance. When precision, power, and versatility are non- negotiable, the Viper is ready to dominate.",
    features: [
      { key: 'Model', value: '.308 VIPER' },
      { key: 'Caliber', value: '7.62 x 51mm' },
      { key: 'Operation', value: 'Bolt Action' },
      { key: 'Mag Capacity', value: '5 and 10 Rounds' },
      { key: 'Buttstock', value: 'Adjustable with Cheek Rest' },
      { key: 'Muzzle Device', value: 'Muzzle Brake Suppressor available' },
      { key: 'Accuracy', value: '1 MoA' },
      { key: 'Trigger Pull', value: '2 – 3.5 lbs' },
      { key: 'Barrell Length', value: '24”in(609.6mm)' },
      { key: 'Length', value: '1200mm' },
      { key: 'Weight', value: '6.4 kg' },
    ]
  },
  { 
    id: 3, 
    name: 'M72 CARBINE', 
    spec: '5.56 x 45mm', 
    imagePath: '/small_arms/CARBINE.png',
    modelPath: '/small_arms/CARBINE.glb',
    description: "SSS Defence weapons have been engineered with the needs of the operator in mind. They are highly effective individual automatic weapons designed for special forces, army element and law enforcement personnel and guarantee high quality, strength and endurance. The SSS Defence M72 rivals the firepower of some of the most modern weapons in combat & tactical operations. Chambered for the 5.56x45mm caliber ammunition, the M72 is designed for reliability, accuracy, and adaptability in the harshest conditions. The short stroke piston system of the M72 ensures cleaner operation, reduced recoil, and superior control - allowing operators to stay in the fight longer and with greater accuracy. The M72 can be configured for different barrel lengths - 10.5”, 12.5”, 14.5” and 16’’ based on mission criteria and barrel can be offered with a chrome plating or nitride finish to the bore. The barrel production process provides high wear resistance at the time of firing, as well as excellent accuracy and concentration of fire. The rifle’s ambidextrous controls include a multi-mode fire selector (Safe, Semi, Auto), charging handle and magazine catch for greater versatility. Keeping in mind the operator’s form factor, the design incorporates multiple ergonomic features. The M72 has also been equipped with a drop-in trigger, an adjustable buttstock and Picatinny rails at 3, 6, 9 and 12 o'clock positions to add on accessories as the mission demands. The external Cerakote finish ensures that the weapon can withstand extreme environments and has higher corrosion resistance.",
    features: [
      { key: 'Model', value: 'M72' },
      { key: 'Caliber', value: '5.56 x 45mm' },
      { key: 'Operation', value: 'Gas Operated / Short-Stroke Piston' },
      { key: 'Mag Capacity', value: '30 Rounds' },
      { key: 'Buttstock', value: 'Adjustable' },
      { key: 'Muzzle Device', value: 'Muzzle Brake' },
      { key: 'Firing Mode', value: 'Safe/Semi/Auto' },
      { key: 'Barrell Length', value: '10.5" (266.7mm) / 12.5" (317.5mm) / 14.5" (368.3mm)' },
      { key: 'Length (Config)', value: '715mm / 765mm / 815mm' },
      { key: 'Weight (Config)', value: '2.8kg / 2.9kg / 3.0kg' },
    ]
  },
  { 
    id: 4, 
    name: 'P72 ASSAULT', 
    spec: '7.62 x 39mm', 
    imagePath: '/small_arms/P72 ASSAULT.png',
    modelPath: '/small_arms/P72 ASSAULT.glb',
    description: "SSS Defence weapons have been engineered with the needs of the operator in mind. They are highly effective individual automatic weapons designed for special forces, army element and law enforcement personnel and guarantee high quality, strength and endurance. The P72 is a fully automatic assault Rifle chambered for the 7.62x39mm cartridge. The P72 joins the crop of other AK variants & clones in its use of a long stroke piston system but has a more balanced weight distribution relative to other AK variants. It is among the only 7.62x39 assault weapons that comes with a left side non-reciprocating charging handle - a unique attribute for squads operating in confined spaces. Featuring a milled receiver, the weapon has Integral Rails at 12 & 6, M-LOK Rails at 3 & 9 positions and provides ample space for mounting accessories such as sights, lasers. The standard 16\" barrel is offered with a chrome plated or Nitride finish and gives an effective range of 400-500 meters. The gas-operated long-stroke piston mechanism delivers dependable performance, reducing recoil for precise follow-up shots. This combination of power and control makes it lethal in diverse combat scenarios.",
    features: [
      { key: 'Model', value: 'P72' },
      { key: 'Caliber', value: '7.62 x 39mm' },
      { key: 'Operation', value: 'Gas Operated / Long-Stroke Piston' },
      { key: 'Mag Capacity', value: '30 Rounds' },
      { key: 'Buttstock', value: 'Adjustable / Foldable' },
      { key: 'Muzzle Device', value: 'Flash Suppressor' },
      { key: 'Firing Mode', value: 'Safe/Semi/Auto' },
      { key: 'Barrell Length', value: '16.3”in (414.02mm)' },
      { key: 'Length', value: '883.5mm' },
      { key: 'Weight', value: '3.8kg' },
    ]
  },
  { 
    id: 5, 
    name: 'T72 RIFLE', 
    spec: '7.62 x 51mm', 
    imagePath: '/small_arms/DMRASSAULT.png',
    modelPath: '/small_arms/DMRASSAULT.glb',
    variants: [
      { 
        name: 'T72 DMR',
        description: "The VIPER DMR is a 7.62x51mm NATO rifle designed for precision, reliability, and adaptability in demanding environments. Utilizing a short-stroke gas piston system, it ensures smooth operation and reduced fouling, delivering consistent performance in harsh conditions. The rifle is available with 16.5\", 20\", or 24\" free-floating barrels, giving shooters the flexibility to balance manoeuvrability with long-range accuracy. Its adjustable buttstock, featuring an adjustable cheek rest, enhances shooter comfort and stability, while the muzzle brake compatible with a suppressor helps manage recoil for superior control. Built with lightweight yet durable aluminium receivers, the VIPER DMR maintains strength without unnecessary bulk. Its 20-round magazine capacity ensures sustained firepower, while the 3 lb trigger pull enables crisp, precise shots. The MIL-STD 1913 handguard allows seamless accessory customization, and the ambidextrous charging handle enhances operational efficiency. Engineered for long-range engagements, overwatch roles, and tactical missions, the VIPER DMR delivers unparalleled accuracy, power and versatility-making it a top-tier choice for marksmen and tactical professionals.",
        features: [
          { key: 'Model', value: 'T72 VIPER DMR' },
          { key: 'Caliber', value: '7.62 x 51mm' },
          { key: 'Operation', value: 'Short stroke Gas piston' },
          { key: 'Mag Capacity', value: '20 Rounds' },
          { key: 'Buttstock', value: 'Adjustable buttstock + adjustable cheek rest' },
          { key: 'Muzzle Device', value: 'Muzzle break / (suppressor available)' },
          { key: 'Firing Mode', value: 'Safe/Semi' },
          { key: 'Accuracy', value: '1 MoA' },
          { key: 'Trigger Pull', value: '3lbs' },
          { key: 'Barrell Length', value: '16” in (406.1mm) / 20”in (508mm) / 24”in (609.6mm)' },
          { key: 'Weight', value: '4.4 kg / 4.8 kg / 5.5 kg' },
        ]
      },
      { 
        name: 'T72 Assault',
        description: 'Information for the T72 Assault variant will be available soon.',
        features: [] 
      }
    ]
  },
  // --- START: MODIFIED PRODUCT ID 6 ---
  { 
    id: 6, 
    name: '300 RAPTOR', // Corrected name
    spec: '7.62 x 35mm', // Corrected spec
    imagePath: '/small_arms/RAPTOR.png',
    modelPath: '/small_arms/RAPTOR.glb',
    description: "The Raptor is a revolutionary tactical rifle engineered for modern law enforcement professionals who demand unmatched performance, reliability, and versatility. Chambered in the proven .300 Blackout cartridge, it delivers devastating stopping power with dual-mission capability—subsonic rounds for quiet, suppressed operations and supersonic loads for precise long-range engagements. Built with precision-machined barrels, an optimized gas system, and advanced materials, the Raptor offers consistent shot-to-shot accuracy and rugged durability across urban, wilderness, and extreme weather environments. Its compact, ergonomic design enhances maneuverability without sacrificing control, while a minimal recoil system enables rapid follow-up shots under pressure. Integrated Picatinny rails allow easy customization with mission-specific accessories, making it ideal for close-quarters tactical operations, covert missions, and precision engagements alike. With mission-critical reliability tested in the toughest conditions, professional-grade engineering, and a modular platform that adapts to diverse law enforcement needs, the Raptor sets the standard for tactical excellence. Experience the future of law enforcement firepower and dominate the field with a rifle built to endure and perform.",
    features: [
      { key: 'Model', value: '300 RAPTOR' },
      { key: 'Caliber', value: '7.62 x 35mm' },
      { key: 'Operation', value: 'Rotating bolt' },
      { key: 'Buttstock', value: 'Adjustable retractable' },
      { key: 'Muzzle Device', value: 'Integrated Suppressor' },
      { key: 'Firing Mode', value: 'Safe/Semi/Auto' },
      { key: 'Weight', value: '3.2 kg (with Suppressor)' },
      { key: 'Barrel length', value: '8.5\" inch / 10.5\" inch' },
      { key: 'Rifling Twist', value: '1 turn in 7\", right-hand twist' },
    ]
  },
  // --- END: MODIFIED PRODUCT ID 6 ---
  { 
    id: 7, 
    name: 'G72 SMG & CSMG',
    spec: '9 x 19mm', 
    imagePath: '/small_arms/SMC & CSMC.png',
    modelPath: '/small_arms/SMC & CSMC.glb',
    variants: [
      { 
        name: 'G72 SMG',
        description: "SSS Defence weapons have been engineered with the needs of the operator in mind. They are highly effective individual automatic weapons designed for special forces, army element and law enforcement personnel and guarantee high quality, strength and endurance. The G72 from SSS DEFENCE is a versatile, modular submachine gun chambered for the 9x19mm NATO cartridge. It is a reliable, customizable weapon ideal for tactical use, VIP security, and close-quarters battle (CQB) scenarios. Allowing for operation in semi-automatic and full-automatic modes, the G72’s roller-delayed blowback system ensures accuracy and control in full-auto fire. The G72 can be configured for different barrel lengths - 8.7” and a compact version, based on mission criteria. The barrel can also be offered with a chrome plating or nitride finish to the bore. The ambidextrous selector doubles as a safety lever and the side-folding stock locks securely in both positions. The free-floating handguard design aids heat dissipation, protecting the user’s hands. With Integral Rails at 12 & 6, M-LOK Rails at 3 & 9 positions, the G72 supports various accessories like sights, lasers and grips. Constructed from aerospace-grade aluminium and high strength steel alloys, it’s both lightweight and durable. Integral backup sights and a muzzle brake come standard, with the threaded muzzle allowing for easy suppressor attachment.",
        features: [
          { key: 'Model', value: 'G72 SMG' },
          { key: 'Caliber', value: '9x19mm' },
          { key: 'Operation', value: 'Delayed Roller Blow Back System' },
          { key: 'Mag Capacity', value: '30 Rounds' },
          { key: 'Buttstock', value: 'Foldable' },
          { key: 'Muzzle Device', value: 'Flash Suppressor' },
          { key: 'Rate of fire', value: '950 rds/min' },
          { key: 'Firing Mode', value: 'Safe/Semi/Auto' },
          { key: 'Trigger Pull', value: '22N' },
          { key: 'Barrell Length', value: '8.7”in (220.98mm)' },
          { key: 'Length', value: '646.2mm' },
          { key: 'Weight', value: '3kg' },
        ]
      },
      { 
        name: 'G72 CSMG',
        description: "SSS Defence weapons have been engineered with the needs of the operator in mind. They are highly effective individual automatic weapons designed for special forces, army element and law enforcement personnel and guarantee high quality, strength and endurance. The G72 from SSS DEFENCE is a versatile, modular submachine gun chambered for the 9x19mm NATO cartridge. It is a reliable, customizable weapon ideal for tactical use, VIP security, and close-quarters battle (CQB) scenarios. Allowing for operation in semi-automatic and full-automatic modes, the G72’s roller-delayed blowback system ensures accuracy and control in full-auto fire. The G72 can be configured for different barrel lengths - 8.7”, 8” and a compact version, based on mission criteria. The barrel can also be offered with a chrome plating or nitride finish to the bore. The ambidextrous selector doubles as a safety lever and the side-folding stock locks securely in both positions. The free-floating handguard design aids heat dissipation, protecting the user’s hands. With Integral Rails at 12 & 6, M-LOK Rails at 3 & 9 positions, the G72 supports various accessories like sights, lasers and grips. Constructed from aerospace-grade aluminium and high strength steel alloys, it’s both lightweight and durable. Integral backup sights and a muzzle brake come standard, with the threaded muzzle allowing for easy suppressor attachment.",
        features: [
          { key: 'Model', value: 'G72 CSMG' },
          { key: 'Caliber', value: '9x19mm' },
          { key: 'Operation', value: 'Delayed Roller Blow Back System' },
          { key: 'Mag Capacity', value: '30 Rounds' },
          { key: 'Buttstock', value: 'Foldable' },
          { key: 'Muzzle Device', value: 'Flash Suppressor' },
          { key: 'Firing Mode', value: 'Safe/Semi/Auto' },
          { key: 'Rate of fire', value: '950 rds/min' },
          { key: 'Trigger Pull', value: '22N' },
          { key: 'Barrell Length', value: '6”in (152.4mm)' },
          { key: 'Length', value: '360mm (Folded Butt) / 578mm (Extended Butt)' },
          { key: 'Weight', value: '2.5kg' },
        ]
      }
    ]
  },
  { 
    id: 8, 
    name: 'G72-P',
    spec: '9 x 19mm', 
    imagePath: '/small_arms/C72 P.png',
    modelPath: '/small_arms/C72 P.glb',
    description: "The SSS Defence G72-P 9x19mm Pistol is a high-performance, reliable sidearm designed for military and law enforcement use. With its excellent stopping power and low recoil, it ensures accuracy in rapid-fire situations. Engineered with a blowback action and a 15–17 round magazine capacity, the G72-P offers superior control and smooth operation. Featuring an ergonomic grip and modular design, the pistol allows for customization to meet operational needs. A MIL-STD 1913 Picatinny rail supports attachments such as tactical lights and lasers, enhancing its adaptability. Additionally, the 176.0mm overall length and compatible suppressor option further expand its versatility in various combat scenarios. Built to endure harsh conditions, the G72-P delivers consistent performance and reliability, making it the ideal choice for professionals requiring a durable and adaptable sidearm. Its applied and mechanical safety features ensure secure handling, reinforcing confidence in high-pressure situations.",
    features: [
      { key: 'Model', value: 'G72-P' },
      { key: 'Caliber', value: '9x19mm' },
      { key: 'Operation', value: 'Blow Back System' },
      { key: 'Mag Capacity', value: '15 - 17 Rounds' },
      { key: 'Muzzle Device', value: 'Compatible Suppressor' },
      { key: 'Safety', value: 'Applied & Mechanical' },
      { key: 'Barrell Length', value: '102.0mm' },
      { key: 'Length', value: '176.0mm' },
      { key: 'Weight', value: '0.617kg' },
    ]
  },
];
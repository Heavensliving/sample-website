// --- TYPES ---
// We define the shape of our data here
export interface AmmunitionVariant {
  name: string;
  specs: Record<string, string>;
}

export interface AmmunitionDetails {
  description: string;
  variants: AmmunitionVariant[];
}

export interface AmmunitionItem {
  id: number;
  name: string;
  spec: string; // This is the text for the grid card
  img: string;
  details: AmmunitionDetails;
  clickable: boolean; // <-- NEW PROPERTY
}


// --- DATA ---
// We export the main data array
export const ammunitionData: AmmunitionItem[] = [
  {
    id: 1, 
    name: '9 x 19mm', 
    spec: '124gr FMJ',
    img: '/Ammunition/9 x 19mm.png',
    clickable: true, // <-- SET TO TRUE
    details: {
      description: 'The 9x19mm Parabellum is a firearms cartridge that was designed by Georg Luger and introduced in 1902 by the German weapons manufacturer Deutsche Waffen- und Munitionsfabriken (DWM) for their Luger semi-automatic pistol. It is one of the most popular and widely used handgun cartridges in the world.',
      variants: [
        {
          name: 'SUB-SONIC',
          specs: {
            'CARTRIDGE LENGTH [mm]': '28.8 - 29.25',
            'CARTRIDGE WEIGHT [g]': '13.8',
            'PROJECTILE WEIGHT [g]': '9.39 - 9.52',
            'VELOCITY AT 16 m [m/s] - [ft/s]': '315 - 33.0',
            'ACTION TIME [ms]': '<3',
          }
        },
        {
          name: 'BALL 115 GR',
          specs: {
            'CARTRIDGE LENGTH [mm]': '29.3',
            'CARTRIDGE WEIGHT [g]': '11.6',
            'PROJECTILE WEIGHT [g]': '7.45',
            'VELOCITY AT 16 m [m/s] - [ft/s]': '385 - 1263',
            'ACTION TIME [ms]': '<3',
          }
        },
        {
          name: 'BALL 124 GR',
          specs: {
            'CARTRIDGE LENGTH [mm]': '29.3',
            'CARTRIDGE WEIGHT [g]': '12.2',
            'PROJECTILE WEIGHT [g]': '8.04',
            'VELOCITY AT 16 m [m/s] - [ft/s]': '370 - 1214',
            'ACTION TIME [ms]': '<3',
          }
        },
      ]
    }
  },
  {
    id: 2, 
    name: '5.56 x 45mm', 
    spec: 'M 193 / SS 109',
    img: '/Ammunition/5.56 x 45mm.png',
    clickable: true, // <-- SET TO TRUE
    details: {
      description: 'A standard NATO rifle cartridge. Used primarily in M16/M4 platform rifles, known for its high velocity and intermediate range effectiveness.',
      variants: [
        {
          name: 'BALL M 193',
          specs: {
            'CARTRIDGE LENGTH [mm]': '57',
            'CARTRIDGE WEIGHT [g]': '11.5',
            'PROJECTILE WEIGHT [g]': '3.56',
            'VELOCITY AT 24 m [m/s] - [ft/s]': '965 - 3165',
            'ACTION TIME [ms]': '<4',
          }
        },
        {
          name: 'BALL SS 109',
          specs: {
            'CARTRIDGE LENGTH [mm]': '57',
            'CARTRIDGE WEIGHT [g]': '12.1',
            'PROJECTILE WEIGHT [g]': '4.0',
            'VELOCITY AT 24 m [m/s] - [ft/s]': '912 - 2992',
            'ACTION TIME [ms]': '<3',
          }
        }
      ]
    }
  },
  {
    id: 3, 
    name: '.300 Blackout', 
    spec: '150gr HPBT', 
    img: '/Ammunition/300 Blackout.png',
    clickable: false, // <-- SET TO FALSE
    details: {
      description: 'Placeholder description: A versatile cartridge designed for the AR-15 platform, offering excellent performance in both subsonic (suppressed) and supersonic loads.',
      variants: [
        {
          name: '150gr HPBT',
          specs: {
            'CARTRIDGE LENGTH [mm]': '57.0',
            'CARTRIDGE WEIGHT [g]': '16.5',
            'PROJECTILE WEIGHT [g]': '9.7',
            'VELOCITY [m/s]': '600',
          }
        }
      ]
    }
  },
  {
    id: 4, 
    name: '7.62 x 39mm', 
    spec: '123gr FMJ', 
    img: '/Ammunition/7.62 x 39mm.png',
    clickable: false, // <-- SET TO FALSE
    details: {
      description: 'Placeholder description: The intermediate cartridge designed for the AK-47 and SKS rifles, known for its rugged reliability and stopping power at medium range.',
      variants: [
        {
          name: '123gr FMJ',
          specs: {
            'CARTRIDGE LENGTH [mm]': '56.0',
            'CARTRIDGE WEIGHT [g]': '16.3',
            'PROJECTILE WEIGHT [g]': '8.0',
            'VELOCITY [m/s]': '730',
          }
        }
      ]
    }
  },
  {
    id: 5, 
    name: '7.62 x 51mm', 
    spec: 'BALL / AP / TRACER',
    img: '/Ammunition/7.62 x 51mm.png',
    clickable: true, // <-- SET TO TRUE
    details: {
      description: 'A full-powered NATO battle rifle cartridge, used in designated marksman rifles and machine guns for its long-range performance and versatility.',
      variants: [
        {
          name: 'BALL',
          specs: {
            'CARTRIDGE LENGTH [mm]': '70.75',
            'CARTRIDGE WEIGHT [g]': '24.5',
            'PROJECTILE WEIGHT [g]': '9.33',
            'VELOCITY AT 24 m [m/s] - [ft/s]': '833 - 2732',
            'ACTION TIME [ms]': '<4',
          }
        },
        {
          name: 'TRACER',
          specs: {
            'CARTRIDGE LENGTH [mm]': '70.75',
            'CARTRIDGE WEIGHT [g]': '24',
            'PROJECTILE WEIGHT [g]': '9.0',
            'VELOCITY AT 24 m [m/s] - [ft/s]': '-',
            'ACTION TIME [ms]': '<4',
          }
        },
        {
          name: 'ARMOR PIERCING',
          specs: {
            'CARTRIDGE LENGTH [mm]': '70.75',
            'CARTRIDGE WEIGHT [g]': '24.6',
            'PROJECTILE WEIGHT [g]': '9.55',
            'VELOCITY AT 24 m [m/s] - [ft/s]': '-',
            'ACTION TIME [ms]': '<4',
          }
        },
        {
          name: 'MATCH',
          specs: {
            'CARTRIDGE LENGTH [mm]': '70.75',
            'CARTRIDGE WEIGHT [g]': '25.4',
            'PROJECTILE WEIGHT [g]': '10.5',
            'VELOCITY AT 24 m [m/s] - [ft/s]': '750 - 2460',
            'ACTION TIME [ms]': '<4',
          }
        },
      ]
    }
  },
  {
    id: 6, 
    name: '.338', 
    spec: 'HPBT / MATCH',
    img: '/Ammunition/338.png',
    clickable: true, // <-- SET TO TRUE
    details: {
      description: 'The .338 Lapua Magnum is a high-performance, long-range sniper cartridge renowned for its accuracy and terminal ballistics at extreme distances.',
      variants: [
        {
          name: 'LAPUA HPBT 250 GR',
          specs: {
            'CARTRIDGE LENGTH [mm]': '70.75',
            'CARTRIDGE WEIGHT [g]': '25.4',
            'PROJECTILE WEIGHT [g]': '10.5',
            'VELOCITY AT 24 m [m/s] - [ft/s]': '750 - 2460',
            'ACTION TIME [ms]': '<4',
          }
        },
        {
          name: 'LAPUA MATCH 250 GR',
          specs: {
            'CARTRIDGE LENGTH [mm]': '91.8',
            'CARTRIDGE WEIGHT [g]': '41.8',
            'PROJECTILE WEIGHT [g]': '16.2',
            'VELOCITY AT 100m [m/s] - [ft/s]': '833.2',
            'ACTION TIME [ms]': '<5',
          }
        },
        {
          name: 'LAPUA HPBT 300 GR',
          specs: {
            'CARTRIDGE LENGTH [mm]': '92.3',
            'CARTRIDGE WEIGHT [g]': '50.4',
            'PROJECTILE WEIGHT [g]': '19.4',
            'VELOCITY AT 24 m [m/s] - [ft/s]': '761.5',
            'ACTION TIME [ms]': '<5',
          }
        },
      ]
    }
  },
  {
    id: 7, 
    name: '12.7mm (.50)', 
    spec: 'M33 Ball', 
    img: '/Ammunition/12.7mm (.50).png',
    clickable: false, // <-- SET TO FALSE
    details: {
      description: 'Placeholder description: The .50 BMG (12.7x99mm NATO) is a heavy machine gun and anti-materiel rifle cartridge known for its immense power and extreme range.',
      variants: [
        {
          name: 'M33 Ball',
          specs: {
            'CARTRIDGE LENGTH [mm]': '138.4',
            'CARTRIDGE WEIGHT [g]': '115.0',
            'PROJECTILE WEIGHT [g]': '42.0',
            'VELOCITY [m/s]': '890',
          }
        }
      ]
    }
  },
];
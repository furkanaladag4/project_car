import { Car } from '../types';

export const cars: Car[] = [
  {
    id: '1',
    make: 'Mercedes-Benz',
    model: 'AMG GT',
    year: 2024,
    price: 118000,
    image: 'https://images.pexels.com/photos/3156482/pexels-photo-3156482.jpeg',
    description: 'The Mercedes-AMG GT delivers pure driving emotion with its handcrafted AMG 4.0L V8 biturbo engine and race-inspired design.',
    specs: {
      engine: '4.0L V8 Biturbo',
      horsepower: 523,
      torque: '494 lb-ft',
      transmission: '7-Speed AMG SPEEDSHIFT DCT',
      fuelType: 'Premium Gasoline',
      mpg: '15/20',
      topSpeed: '193 mph',
      acceleration: '3.7s (0-60 mph)'
    },
    features: ['AMG Performance Seats', 'AMG Track Pace', 'Burmester Surround Sound', 'AMG Dynamic Select'],
    category: 'sports',
    rating: 4.8,
    reviews: []
  },
  {
    id: '2',
    make: 'BMW',
    model: 'X7',
    year: 2024,
    price: 75900,
    image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg',
    description: 'The BMW X7 combines luxury, space, and performance in a commanding full-size SUV that redefines premium mobility.',
    specs: {
      engine: '3.0L TwinPower Turbo I6',
      horsepower: 375,
      torque: '383 lb-ft',
      transmission: '8-Speed STEPTRONIC',
      fuelType: 'Premium Gasoline',
      mpg: '20/26',
      topSpeed: '130 mph',
      acceleration: '5.8s (0-60 mph)'
    },
    features: ['Panoramic Sky Lounge LED Roof', 'Gesture Control', 'Harman Kardon Audio', 'BMW Live Cockpit Professional'],
    category: 'luxury',
    rating: 4.6,
    reviews: []
  },
  {
    id: '3',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    price: 109990,
    image: 'https://images.pexels.com/photos/7165688/pexels-photo-7165688.jpeg',
    description: 'The Tesla Model S Plaid delivers incredible performance with tri-motor all-wheel drive and advanced autopilot capabilities.',
    specs: {
      engine: 'Tri Motor Electric',
      horsepower: 1020,
      torque: '1050+ lb-ft',
      transmission: 'Single-Speed Fixed Gear',
      fuelType: 'Electric',
      mpg: '120 MPGe',
      topSpeed: '200 mph',
      acceleration: '1.99s (0-60 mph)'
    },
    features: ['Autopilot', '17" Cinematic Display', 'Premium Audio', 'Glass Roof'],
    category: 'electric',
    rating: 4.7,
    reviews: []
  },
  {
    id: '4',
    make: 'Porsche',
    model: '911 Turbo S',
    year: 2024,
    price: 207000,
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    description: 'The Porsche 911 Turbo S represents the pinnacle of sports car engineering with iconic design and blistering performance.',
    specs: {
      engine: '3.8L Twin-Turbo Flat-6',
      horsepower: 640,
      torque: '590 lb-ft',
      transmission: '8-Speed PDK',
      fuelType: 'Premium Gasoline',
      mpg: '18/24',
      topSpeed: '205 mph',
      acceleration: '2.6s (0-60 mph)'
    },
    features: ['PASM', 'Sport Chrono Package', 'Bose Audio', 'LED Matrix Headlights'],
    category: 'sports',
    rating: 4.9,
    reviews: []
  },
  {
    id: '5',
    make: 'Audi',
    model: 'Q8',
    year: 2024,
    price: 68900,
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg',
    description: 'The Audi Q8 blends coupe-like styling with SUV practicality, featuring cutting-edge technology and quattro all-wheel drive.',
    specs: {
      engine: '3.0L TFSI V6',
      horsepower: 335,
      torque: '369 lb-ft',
      transmission: '8-Speed Tiptronic',
      fuelType: 'Premium Gasoline',
      mpg: '19/25',
      topSpeed: '155 mph',
      acceleration: '5.6s (0-60 mph)'
    },
    features: ['Virtual Cockpit Plus', 'MMI Touch Response', 'Bang & Olufsen 3D Sound', 'quattro AWD'],
    category: 'luxury',
    rating: 4.5,
    reviews: []
  },
  {
    id: '6',
    make: 'Ford',
    model: 'F-150 Lightning',
    year: 2024,
    price: 59974,
    image: 'https://images.pexels.com/photos/1319796/pexels-photo-1319796.jpeg',
    description: 'The Ford F-150 Lightning brings electric performance to America\'s best-selling truck with impressive towing capacity.',
    specs: {
      engine: 'Dual Electric Motors',
      horsepower: 580,
      torque: '775 lb-ft',
      transmission: 'Single-Speed Automatic',
      fuelType: 'Electric',
      mpg: '78 MPGe',
      topSpeed: '110 mph',
      acceleration: '4.0s (0-60 mph)'
    },
    features: ['Pro Power Onboard', 'BlueCruise', 'SYNC 4A', 'Intelligent 4WD'],
    category: 'truck',
    rating: 4.4,
    reviews: []
  }
];
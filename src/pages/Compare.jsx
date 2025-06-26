import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cars } from '../data/cars';
import { ArrowLeft } from 'lucide-react';

const Compare = () => {
  const [selectedCars, setSelectedCars] = useState([]);

  const handleSelectCar = (carId) => {
    if (selectedCars.includes(carId)) {
      setSelectedCars(selectedCars.filter(id => id !== carId));
    } else if (selectedCars.length < 3) { // Maksimum 3 araç karşılaştırması
      setSelectedCars([...selectedCars, carId]);
    }
  };

  const comparedCars = cars.filter(car => selectedCars.includes(car.id));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/cars"
            className="inline-flex items-center text-automotive-navy hover:text-automotive-red mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Geri Dön
          </Link>
          <h1 className="text-4xl font-bold text-automotive-navy mb-2">Karşılaştır</h1>
          <p className="text-gray-600">Seçtiğiniz araçları karşılaştırın (maksimum 3 araç).</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-automotive-navy mb-4">Araç Seçimi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars.map(car => (
              <div
                key={car.id}
                className={`p-4 border rounded-lg cursor-pointer ${selectedCars.includes(car.id) ? 'border-automotive-red bg-gray-100' : 'border-gray-300'}`}
                onClick={() => handleSelectCar(car.id)}
              >
                <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-32 object-cover rounded mb-2" />
                <h3 className="font-medium">{car.make} {car.model}</h3>
                <p className="text-sm text-gray-600">${car.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {selectedCars.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-automotive-navy mb-4">Karşılaştırma Tablosu</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-2">Özellik</th>
                  {comparedCars.map(car => (
                    <th key={car.id} className="pb-2">{car.make} {car.model}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Fiyat</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="py-2">${car.price.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-2">Yıl</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="py-2">{car.year}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-2">Beygir Gücü</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="py-2">{car.specs.horsepower} HP</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-2">MPG</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="py-2">{car.specs.mpg}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2">Maksimum Hız</td>
                  {comparedCars.map(car => (
                    <td key={car.id} className="py-2">{car.specs.topSpeed}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
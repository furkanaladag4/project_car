import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { cars } from '../data/cars';
import { Car, ArrowLeft } from 'lucide-react';

const CarDetail = () => {
  const { id } = useParams();
  const car = cars.find((car) => car.id === id);

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-automotive flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-3xl font-bold">Araç Bulunamadı</h2>
          <Link
            to="/cars"
            className="mt-4 inline-flex items-center text-automotive-red hover:text-automotive-red-dark"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Tüm Araçlara Geri Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-automotive py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/cars"
          className="inline-flex items-center text-white hover:text-automotive-red mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Geri Dön
        </Link>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-red p-3 rounded-full">
              <Car className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-automotive-navy text-center mb-6">
            {car.make} {car.model}
          </h2>
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600"><strong>Yıl:</strong> {car.year}</p>
              <p className="text-gray-600"><strong>Fiyat:</strong> ${car.price.toLocaleString()}</p>
              <p className="text-gray-600"><strong>Motor:</strong> {car.specs.engine}</p>
              <p className="text-gray-600"><strong>Beygir Gücü:</strong> {car.specs.horsepower} HP</p>
            </div>
            <div>
              <p className="text-gray-600"><strong>Şanzıman:</strong> {car.specs.transmission}</p>
              <p className="text-gray-600"><strong>Yakıt:</strong> {car.specs.fuelType}</p>
              <p className="text-gray-600"><strong>MPG:</strong> {car.specs.mpg}</p>
              <p className="text-gray-600"><strong>Maksimum Hız:</strong> {car.specs.topSpeed}</p>
            </div>
          </div>
          <p className="mt-6 text-gray-600">{car.description}</p>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-automotive-navy mb-2">Özellikler</h3>
            <ul className="list-disc list-inside text-gray-600">
              {car.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
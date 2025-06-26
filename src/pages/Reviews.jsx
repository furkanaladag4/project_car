import React from 'react';
import { Link } from 'react-router-dom';
import { cars } from '../data/cars';
import { ArrowLeft } from 'lucide-react';

const Reviews = () => {
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
          <h1 className="text-4xl font-bold text-automotive-navy mb-2">Expert Reviews</h1>
          <p className="text-gray-600">Araçlar için expert incelemelerini keşfedin.</p>
        </div>

        {cars.map(car => (
          <div key={car.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-automotive-navy mb-2">
              {car.make} {car.model}
            </h2>
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <p className="text-gray-600 mb-4">
              {car.reviews.length > 0
                ? car.reviews.map((review, index) => (
                    <div key={index} className="mb-2">
                      <p><strong>Expert:</strong> {review.author}</p>
                      <p>{review.content}</p>
                      <p className="text-sm text-gray-500">Puan: {review.rating}/10</p>
                    </div>
                  ))
                : "Bu araç için henüz inceleme yok. İlk yorumu siz yazabilirsiniz!"}
            </p>
            <button
              className="bg-gradient-red text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              onClick={() => alert(`Yorum yazma özelliği henüz geliştirilmedi. ${car.make} ${car.model} için yorum eklemek isterseniz lütfen bizimle iletişime geçin!`)}
            >
              Yorum Yaz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
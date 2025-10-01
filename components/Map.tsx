import React from 'react';

interface MapProps {
  mapUrl: string;
}

const Map: React.FC<MapProps> = ({ mapUrl }) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200">
      <iframe
        src={mapUrl}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación del Food Truck"
      ></iframe>
    </div>
  );
};

export default Map;

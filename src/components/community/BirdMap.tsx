import React, { useEffect, useRef } from 'react';
import { Message } from '../../data/mockMessages';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useBirds } from '../../contexts/BirdsContext';

interface BirdMapProps {
  messages: Message[];
}

const BirdMap: React.FC<BirdMapProps> = ({ messages }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const { allBirds } = useBirds();

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map if not already initialized
    if (!mapInstanceRef.current) {
      // Set the default view to the first message with location or default to Seoul
      const defaultLat = messages[0]?.location?.latitude || 37.5665;
      const defaultLng = messages[0]?.location?.longitude || 126.9780;

      mapInstanceRef.current = L.map(mapRef.current).setView([defaultLat, defaultLng], 13);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    }

    // Clear existing markers
    mapInstanceRef.current.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current?.removeLayer(layer);
      }
    });

    // Add markers for each message with location
    messages.forEach(message => {
      if (message.location) {
        const { latitude, longitude, birdId } = message.location;
        
        // Find bird info if birdId exists
        const bird = birdId ? allBirds.find(b => b.id === birdId) : null;
        
        // Create custom icon with bird image if available
        const icon = message.isImage && message.imageUrl 
          ? L.divIcon({
              html: `<div style="background-image: url('${message.imageUrl}'); background-size: cover; width: 32px; height: 32px; border-radius: 50%; border: 2px solid #fff;"></div>`,
              className: '',
              iconSize: [32, 32]
            })
          : L.icon({
              iconUrl: 'https://cdn-icons-png.flaticon.com/512/6393/6393977.png',
              iconSize: [25, 25],
              iconAnchor: [12, 25],
              popupAnchor: [0, -25]
            });
        
        const marker = L.marker([latitude, longitude], { icon }).addTo(mapInstanceRef.current!);
        
        // Add popup with bird info if available
        if (bird) {
          marker.bindTooltip(bird.koreanName, { 
            permanent: false, 
            direction: 'top',
            className: 'bg-primary text-white border-primary px-2 py-1 rounded text-sm'
          });
          
          marker.bindPopup(`
            <div style="text-align: center;">
              <img src="${message.imageUrl || bird.imageUrl}" style="max-width: 150px; max-height: 100px; border-radius: 4px; margin-bottom: 8px;">
              <div style="font-weight: bold;">${bird.koreanName}</div>
              <div style="font-style: italic; font-size: 0.8em;">${bird.scientificName}</div>
            </div>
          `);
        }
      }
    });

  }, [messages, allBirds]);

  return <div ref={mapRef} className="h-full w-full" />;
};

export default BirdMap;
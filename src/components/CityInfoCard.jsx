import React, { useEffect, useState } from 'react';
import { Info, ExternalLink, Loader, ChevronDown, ChevronUp } from 'lucide-react';
import { getCityInfo, getFallbackCityInfo } from '../services/cityInfoService';

const CityInfoCard = ({ city }) => {
  const [cityInfo, setCityInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchCityInfo = async () => {
      setLoading(true);
      
      // Пробуем получить данные из Wikipedia
      const info = await getCityInfo(city);
      
      if (info) {
        setCityInfo(info);
      } else {
        // Используем fallback
        setCityInfo(getFallbackCityInfo(city));
      }
      
      setLoading(false);
    };

    fetchCityInfo();
  }, [city]);

  if (loading) {
    return (
      <div className="city-info-card">
        <div className="city-info-loading">
          <Loader size={24} className="spinner" />
          <p>Загрузка информации о городе...</p>
        </div>
      </div>
    );
  }

  if (!cityInfo) {
    return null;
  }

  const shouldTruncate = cityInfo.extract && cityInfo.extract.length > 300;
  const displayText = expanded || !shouldTruncate 
    ? cityInfo.extract 
    : cityInfo.extract.substring(0, 300) + '...';

  return (
    <div className="city-info-card">
      <div className="city-info-header">
        <div className="city-info-icon">
          <Info size={20} />
        </div>
        <div className="city-info-header-text">
          <h3>О городе</h3>
          <h4 className="city-info-title">{cityInfo.title || city}</h4>
        </div>
      </div>

      {cityInfo.thumbnail && (
        <div className="city-info-image-wrapper">
          <img 
            src={cityInfo.thumbnail} 
            alt={city}
            className="city-info-image"
          />
        </div>
      )}

      <div className="city-info-content">
        <p className="city-info-text">{displayText}</p>

        <div className="city-info-actions">
          {shouldTruncate && (
            <button 
              className="city-info-btn city-info-btn-secondary"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  <ChevronUp size={16} />
                  Свернуть
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  Читать подробнее
                </>
              )}
            </button>
          )}

          {cityInfo.url && (
            <a 
              href={cityInfo.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="city-info-btn city-info-btn-link"
            >
              <ExternalLink size={16} />
              Источник
            </a>
          )}
        </div>

        {cityInfo.lang && cityInfo.lang !== 'fallback' && (
          <p className="city-info-source-label">
            Данные: {cityInfo.lang === 'ru' ? 'Wikipedia (рус.)' : 'Wikipedia (англ.)'}
          </p>
        )}
      </div>
    </div>
  );
};

export default CityInfoCard;

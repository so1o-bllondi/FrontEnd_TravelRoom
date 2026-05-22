let isLoading = false;
let isLoaded = false;
let loadPromise = null;

export const loadYandexMaps = (apiKey, suggestApiKey = null) => {
  // Если API-ключ не указан
  if (!apiKey) {
    return Promise.reject(new Error('API-ключ Яндекс Карт не указан'));
  }

  // Если уже загружено
  if (isLoaded && window.ymaps) {
    return Promise.resolve(window.ymaps);
  }

  // Если загрузка уже идёт
  if (isLoading && loadPromise) {
    return loadPromise;
  }

  // Начинаем загрузку
  isLoading = true;
  
  loadPromise = new Promise((resolve, reject) => {
    // Проверяем, не добавлен ли уже скрипт
    const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]');
    if (existingScript) {
      if (window.ymaps) {
        window.ymaps.ready(() => {
          isLoaded = true;
          isLoading = false;
          resolve(window.ymaps);
        });
      }
      return;
    }

    // Создаём и добавляем скрипт
    const script = document.createElement('script');
    
    // Формируем URL с учётом suggest API key
    let scriptUrl = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
    if (suggestApiKey) {
      scriptUrl += `&suggest_apikey=${suggestApiKey}`;
    }
    
    script.src = scriptUrl;
    script.async = true;

    script.onload = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => {
          isLoaded = true;
          isLoading = false;
          resolve(window.ymaps);
        });
      } else {
        isLoading = false;
        reject(new Error('Яндекс Карты не загрузились'));
      }
    };

    script.onerror = () => {
      isLoading = false;
      reject(new Error('Ошибка загрузки Яндекс Карт'));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};

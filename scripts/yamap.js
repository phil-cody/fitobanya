document.addEventListener('DOMContentLoaded', () => {
    const mapWrap = document.querySelector('.address__map-wrap');
    if (!mapWrap) return;

    const lat = parseFloat(mapWrap.dataset.lat);
    const lng = parseFloat(mapWrap.dataset.lng);
    const address = mapWrap.dataset.address || '';

    if (isNaN(lat) || isNaN(lng)) {
        console.error('Координаты не указаны');
        return;
    }

    const COORDINATES = [lat, lng];
    let map = null;

    function loadMapApi() {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=45fe22bf-ed1e-49e1-8bf3-62ec6d92b473&lang=ru_RU';
            script.onload = () => {
                ymaps.ready(() => {
                    resolve();
                });
            };
            document.head.appendChild(script);
        });
    }

    function initMap() {
        map = new ymaps.Map(mapWrap, {
            center: COORDINATES,
            zoom: 16,
            controls: ['zoomControl', 'fullscreenControl']
        });

        map.behaviors.disable('scrollZoom');

        const placemark = new ymaps.Placemark(
            COORDINATES,
            {
                balloonContent: address
            },
            {
                iconLayout: 'default#image',
                iconImageHref: './assets/image/icons/map-bullet-icon.svg',
                iconImageSize: [40, 40],
                iconImageOffset: [-20, -40]
            }
        );

        map.geoObjects.add(placemark);

        window.addEventListener('resize', () => {
            if (map) map.container.fitToViewport();
        });
    }

    const openMapBtn = document.getElementById('open-in-ymap-btn');
    if (openMapBtn) {
        openMapBtn.addEventListener('click', () => {
            const encodedAddress = encodeURIComponent(address);
            window.open(`https://yandex.ru/maps/?text=${encodedAddress}`, '_blank');
        });
    }

    loadMapApi().then(initMap);
});
// Multi-language dictionary
const i18n = {
    en: {
        appName: "Smart UniLife",
        heroTitle: "Find the perfect place around your campus",
        heroSubtitle: "Restaurants, study spaces, and more—all tailored for you.",
        searchPlaceholder: "Search for places, e.g., 'Quiet Cafe'",
        categoriesTitle: "Categories",
        catAll: "All",
        catRestaurant: "Food",
        catCafe: "Study Cafe",
        catHospital: "Hospital",
        mapTitle: "Nearby Map",
        mapInteract: "Interactive Map View",
        placesTitle: "Recommended Places",
        navHome: "Home",
        navMap: "Map",
        navSaved: "Saved",
        navProfile: "Profile",
        langToggle: "KR",
        
        // Dynamic place translations
        place1_name: "K-Food Eatery",
        place1_desc: "Affordable and delicious traditional Korean food. Perfect for a quick lunch between classes.",
        place2_name: "Silent Study Cafe",
        place2_desc: "A quiet space with fast Wi-Fi and plenty of outlets. Ideal for exam preparation.",
        place3_name: "Campus Medical Center",
        place3_desc: "English-speaking staff available. General medicine and prescriptions.",
        place4_name: "Global Burger",
        place4_desc: "Familiar taste from home. Best burgers near the university.",
        place5_name: "Cozy Corner Coffee",
        place5_desc: "Great atmosphere for group meetings and casual study sessions."
    },
    kr: {
        appName: "스마트 유니라이프",
        heroTitle: "캠퍼스 주변의 완벽한 장소를 찾아보세요",
        heroSubtitle: "당신에게 딱 맞는 식당, 공부 공간 등 다양한 시설.",
        searchPlaceholder: "장소 검색 (예: '조용한 카페')",
        categoriesTitle: "카테고리",
        catAll: "전체",
        catRestaurant: "식당",
        catCafe: "스터디 카페",
        catHospital: "병원",
        mapTitle: "주변 지도",
        mapInteract: "인터랙티브 지도 보기",
        placesTitle: "추천 장소",
        navHome: "홈",
        navMap: "지도",
        navSaved: "저장됨",
        navProfile: "프로필",
        langToggle: "EN",

        // Dynamic place translations
        place1_name: "케이푸드 식당",
        place1_desc: "저렴하고 맛있는 전통 한식. 공강 시간에 빠르게 점심 먹기 좋습니다.",
        place2_name: "사일런트 스터디 카페",
        place2_desc: "빠른 Wi-Fi와 콘센트가 많은 조용한 공간. 시험 준비에 이상적입니다.",
        place3_name: "캠퍼스 메디컬 센터",
        place3_desc: "영어 소통이 가능한 의료진. 일반 진료 및 처방 가능.",
        place4_name: "글로벌 버거",
        place4_desc: "익숙한 고향의 맛. 대학교 근처 최고의 수제 버거.",
        place5_name: "코지 코너 커피",
        place5_desc: "조별 과제 모임이나 가벼운 공부를 하기에 좋은 분위기."
    }
};

// Mock Data for Places
const placesData = [
    {
        id: 1,
        category: 'restaurant',
        icon: 'ri-restaurant-line',
        nameKey: 'place1_name',
        descKey: 'place1_desc',
        rating: 4.8,
        time: '10:00 - 22:00',
        distance: '200m',
        price: '$'
    },
    {
        id: 2,
        category: 'cafe',
        icon: 'ri-book-read-line',
        nameKey: 'place2_name',
        descKey: 'place2_desc',
        rating: 4.9,
        time: '24 Hours',
        distance: '350m',
        price: '$$'
    },
    {
        id: 3,
        category: 'hospital',
        icon: 'ri-hospital-line',
        nameKey: 'place3_name',
        descKey: 'place3_desc',
        rating: 4.5,
        time: '09:00 - 18:00',
        distance: '500m',
        price: '$$$'
    },
    {
        id: 4,
        category: 'restaurant',
        icon: 'ri-goblet-line',
        nameKey: 'place4_name',
        descKey: 'place4_desc',
        rating: 4.7,
        time: '11:00 - 23:00',
        distance: '400m',
        price: '$$'
    },
    {
        id: 5,
        category: 'cafe',
        icon: 'ri-cup-line',
        nameKey: 'place5_name',
        descKey: 'place5_desc',
        rating: 4.6,
        time: '08:00 - 23:00',
        distance: '150m',
        price: '$$'
    }
];

// Current State
let currentLang = 'en';
let currentCategory = 'all';
let searchQuery = '';

// DOM Elements
const langToggleBtn = document.getElementById('langToggle');
const currentLangSpan = document.getElementById('currentLang');
const categoryBtns = document.querySelectorAll('.category-btn');
const placesGrid = document.getElementById('placesGrid');
const searchInput = document.getElementById('searchInput');

// Initialize App
function init() {
    setupEventListeners();
    renderPlaces();
    updateLanguage();
}

// Event Listeners
function setupEventListeners() {
    // Language Toggle
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'kr' : 'en';
        updateLanguage();
        renderPlaces(); // Re-render to update dynamic content
    });

    // Category Filtering
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class
            const targetBtn = e.currentTarget;
            targetBtn.classList.add('active');
            
            currentCategory = targetBtn.getAttribute('data-category');
            renderPlaces();
        });
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderPlaces();
    });
}

// Update UI Language
function updateLanguage() {
    // Update button text
    currentLangSpan.textContent = i18n[currentLang].langToggle;

    // Update static texts
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) {
            el.textContent = i18n[currentLang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (i18n[currentLang][key]) {
            el.setAttribute('placeholder', i18n[currentLang][key]);
        }
    });
}

// Render Places based on state
function renderPlaces() {
    placesGrid.innerHTML = ''; // Clear current

    const filteredPlaces = placesData.filter(place => {
        // Category match
        const matchCategory = currentCategory === 'all' || place.category === currentCategory;
        
        // Search match (checking translated name or desc)
        const nameTranslated = i18n[currentLang][place.nameKey].toLowerCase();
        const descTranslated = i18n[currentLang][place.descKey].toLowerCase();
        const matchSearch = searchQuery === '' || 
                            nameTranslated.includes(searchQuery) || 
                            descTranslated.includes(searchQuery);

        return matchCategory && matchSearch;
    });

    if (filteredPlaces.length === 0) {
        placesGrid.innerHTML = `
            <div style="text-align:center; padding: 20px; color: var(--text-muted);">
                <i class="ri-ghost-line" style="font-size: 2rem; margin-bottom: 10px;"></i>
                <p>No places found matching your criteria.</p>
            </div>
        `;
        return;
    }

    filteredPlaces.forEach((place, index) => {
        // Staggered animation delay
        const delay = index * 0.1;
        
        const card = document.createElement('div');
        card.className = 'place-card';
        card.style.animation = `fadeInUp 0.5s ease-out ${delay}s both`;
        
        const nameTranslated = i18n[currentLang][place.nameKey];
        const descTranslated = i18n[currentLang][place.descKey];

        card.innerHTML = `
            <div class="place-img-placeholder ${place.category}">
                <i class="${place.icon}"></i>
            </div>
            <div class="place-info">
                <div class="place-header">
                    <h3 class="place-title">${nameTranslated}</h3>
                    <span class="place-rating"><i class="ri-star-fill"></i> ${place.rating}</span>
                </div>
                <p class="place-desc">${descTranslated}</p>
                <div class="place-meta">
                    <span class="meta-item"><i class="ri-time-line"></i> ${place.time}</span>
                    <span class="meta-item"><i class="ri-map-pin-line"></i> ${place.distance}</span>
                    <span class="meta-item"><i class="ri-money-dollar-circle-line"></i> ${place.price}</span>
                </div>
            </div>
        `;
        placesGrid.appendChild(card);
    });
}

// Run app
document.addEventListener('DOMContentLoaded', init);

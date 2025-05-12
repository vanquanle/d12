window.apiKey = '79669b0102ea131f77aecc410f0813f4'; // API key

// Hàm lấy dữ liệu thời tiết từ API và cập nhật các trường trong card
function fetchWeatherData(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${window.apiKey}&units=metric`;

  // Lấy dữ liệu thời tiết từ API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Cập nhật các trường trong card thời tiết
      updateWeatherCard(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Hàm cập nhật các trường trong card thời tiết
function updateWeatherCard(data) {
  const temperatureElement = document.getElementById('weather-temp');
  const weatherDescriptionElement = document.getElementById('weather-description');
  const weatherIconElement = document.getElementById('weather-icon');
  const humidityElement = document.getElementById('humidity');
  const windspeedElement = document.getElementById('wind');
  const pressureElement = document.getElementById('pressure');

  const engDescription = data.weather[0].description;
  const vnDescription = window.weatherDescriptionMap[engDescription] || engDescription;

  temperatureElement.textContent = `${data.main.temp}°C`;
  weatherDescriptionElement.textContent = vnDescription;
  weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  humidityElement.textContent = `${data.main.humidity}%`;
  windspeedElement.textContent = `${data.wind.speed} km/h`;
  pressureElement.textContent = `${data.main.pressure} hPa`;

  const weatherCard = document.getElementById('weather-section');
  weatherCard.style.display = 'block';

  // Gọi hàm cảnh báo user
  alertWeatherUser(data); 
}

// Hàm lấy dữ liệu dự báo
function fetchForecastData(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);  // Kiểm tra dữ liệu trả về
      updateForecastCard(data.list.slice(1, 7));  //
    })
    .catch(error => {
      console.error('Error fetching forecast data:', error);
    });
}

// Hàm cập nhật card dự báo
function updateForecastCard(forecastData) {
  const forecastGrid = document.querySelector('.forecast-grid');

  // Xóa nội dung cũ trong grid dự báo
  forecastGrid.innerHTML = '';

  // Các ngày trong tuần
  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

  // Lấy ngày hôm nay
  const today = new Date();
  const todayDayOfWeek = today.getDay(); // Lấy chỉ số ngày trong tuần (0 - Chủ Nhật, 1 - Thứ Hai,...)

  // Lặp qua các dữ liệu dự báo trong 6 ngày
  forecastData.forEach((day, index) => {
    const date = new Date(day.dt * 1000);
    const dayName = daysOfWeek[(todayDayOfWeek + index) % 7]; // Cập nhật thứ tự ngày

    const temp = Math.round(day.main.temp); // Nhiệt độ
    const weatherIcon = day.weather[0].icon; // Icon thời tiết
    const weatherEmoji = getEmojiByIcon(weatherIcon); // Chuyển icon thành emoji

    // Tạo phần tử cho mỗi ngày dự báo
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('forecast-item');
    dayDiv.innerHTML = `
    <div class="forecast-item-content">
      <span class="forecast-day-name">${dayName}</span>
      <span class="forecast-temp">${temp}°C</span>
      <span class="forecast-emoji">${weatherEmoji}</span>
    </div>
`;

    // Thêm phần tử dự báo vào grid
    forecastGrid.appendChild(dayDiv);
  });
}

// Hàm giúp lấy biểu tượng thời tiết từ icon
function getEmojiByIcon(icon) {
  return window.weatherIcons[icon] || 'null';
}

// Hàm gọi API lấy dữ liệu thời tiết theo giờ
function fetchForecastDataDiagram(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Vẽ biểu đồ theo giờ bằng 8 phần tử đầu tiên
      renderHourlyForecast(data.list.slice(0, 8));

      // Cập nhật card dự báo ngày (dùng slice tiếp theo)
      updateForecastCard(data.list.slice(8, 14));
    })
    .catch(error => {
      console.error('Error fetching forecast data:', error);
    });
}

let weatherHourlyChart = null;

// Hàm vẽ biểu đồ dự báo thời tiết
function renderHourlyForecast(hourlyData) {
  const ctx = document.getElementById('hourlyChart').getContext('2d');

  const hours = hourlyData.map(item => {
    const date = new Date(item.dt * 1000);
    return `${date.getHours()}h`;
  });

  const temps = hourlyData.map(item => Math.round(item.main.temp));

  if (weatherHourlyChart) {
    weatherHourlyChart.destroy();
  }

  weatherHourlyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: hours,
      datasets: [{
        label: 'Nhiệt độ (°C)',
        data: temps,
        backgroundColor: 'rgba(255, 114, 58, 0.2)',
        borderColor: '#ff723a',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: value => `${value}°C`
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

// Hàm khởi tạo sự kiện cho lựa chọn khu vực
let weatherLocationChangeHandler = null; // Biến lưu trữ sự kiện

function activateWeatherModule() {

  currentActiveType = 'weather';

  const locationSelect = document.getElementById('locationSelect');

  if (!locationSelect) {
    return;
  }

  // Xóa sự kiện cũ nếu đã tồn tại
  if (weatherLocationChangeHandler) {
    locationSelect.removeEventListener('change', weatherLocationChangeHandler);
  }

  // Gán sự kiện mới
  weatherLocationChangeHandler = handleWeatherLocationChange;
  locationSelect.addEventListener('change', weatherLocationChangeHandler);

  // Gọi hàm gán sự kiện click toạ độ bất kì trên bản đồ
  if (typeof mapView !== 'undefined') {
    initializeMapClickEvent(mapView, 'weather');
  }

  // Gọi hàm tìm kiếm địa chỉ
  initSearch(mapView);


  console.log("Weather module activated");
}

function deactivateWeatherModule() {
  const locationSelect = document.getElementById('locationSelect');

  if (locationSelect && weatherLocationChangeHandler) {
    locationSelect.removeEventListener('change', weatherLocationChangeHandler);
    weatherLocationChangeHandler = null; // Xóa tham chiếu để tránh rò rỉ bộ nhớ
  }

  // Xoá phần lời khuyên user
  refreshWeatherData();

  console.log("Weather module deactivated");
}

function handleWeatherLocationChange(event) {
  const selectedLocation = event.target.value;
  const coords = window.coordsArea[selectedLocation];

  if (coords) {
    fetchWeatherData(coords.lat, coords.lon);
    fetchForecastData(coords.lat, coords.lon);
    fetchForecastDataDiagram(coords.lat, coords.lon);
  }
}

// Hàm đưa lời khuyên tới User
function alertWeatherUser(data) {
  const suggestions = [];

  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const wind = data.wind.speed;
  const pressure = data.main.pressure;
  const description = data.weather[0].main.toLowerCase();

  console.log("Thông tin thời tiết hôm nay:");
  console.log("  - Nhiệt độ:", temp + "°C");
  console.log("  - Độ ẩm:", humidity + "%");
  console.log("  - Tốc độ gió:", wind + " m/s");
  console.log("  - Áp suất:", pressure + " hPa");
  console.log("  - Mô tả thời tiết:", description);

  // Gợi ý theo nhiệt độ
  if (temp >= 35) {
    suggestions.push("Thời tiết rất nóng, hãy tránh hoạt động ngoài trời vào buổi trưa. Ưu tiên tham quan trong nhà như bảo tàng, trung tâm thương mại.");
  } else if (temp >= 30) {
    suggestions.push("Hơi nóng, nếu đi du lịch nên mang theo mũ, kem chống nắng và uống đủ nước.");
  } else if (temp <= 10) {
    suggestions.push("Trời lạnh, nên mặc nhiều lớp áo nếu đi du lịch vùng núi. Tránh ra ngoài nếu có gió lạnh mạnh.");
  } else {
    suggestions.push("Thời tiết dễ chịu, lý tưởng cho các hoạt động dã ngoại, đi bộ, tham quan ngoài trời.");
  }

  // Gợi ý theo độ ẩm
  if (humidity > 85) {
    suggestions.push("Độ ẩm cao, bạn có thể cảm thấy oi bức. Ưu tiên mặc quần áo thoáng mát và nghỉ ngơi trong bóng râm khi có thể.");
  } else if (humidity < 40) {
    suggestions.push("Không khí khô, hãy dùng kem dưỡng ẩm khi đi du lịch dài ngày và luôn mang theo chai nước cá nhân.");
  }

  // Gợi ý theo gió
  if (wind > 10) {
    suggestions.push("Gió mạnh, nên tránh các hoạt động ngoài trời ở khu vực biển, đồi núi hoặc khu vực có cây lớn.");
  } else if (wind > 5) {
    suggestions.push("Có gió nhẹ, thích hợp cho việc đi xe đạp hoặc tản bộ quanh các khu vực thoáng đãng.");
  }

  // Gợi ý theo áp suất
  if (pressure < 1000) {
    suggestions.push("Áp suất thấp, người nhạy cảm có thể cảm thấy mệt hoặc đau đầu. Hãy nghỉ ngơi nếu có triệu chứng.");
  } else {
    suggestions.push("Áp suất ổn định, thời tiết tương đối dễ chịu để đi tham quan và khám phá.");
  }

  // Gợi ý theo mô tả thời tiết
  if (description.includes("rain")) {
    suggestions.push("Trời có mưa, nên chuẩn bị ô hoặc áo mưa, và tránh các hoạt động ngoài trời như leo núi hoặc cắm trại.");
  } else if (description.includes("clear")) {
    suggestions.push("Trời quang mây, rất lý tưởng để ngắm cảnh, chụp hình và đi dạo công viên hoặc khu du lịch sinh thái.");
  } else if (description.includes("cloud")) {
    suggestions.push("Trời nhiều mây, thích hợp cho các hoạt động nhẹ nhàng ngoài trời mà không sợ nắng.");
  }

  // Cập nhật danh sách gợi ý vào div text-user
  const textUser = document.getElementById('text-user');
  textUser.innerHTML = ""; // Xóa nội dung cũ

  const ul = document.createElement("ul");
  suggestions.slice(0, 5).forEach(suggestion => {
    const li = document.createElement("li");
    li.textContent = suggestion;
    ul.appendChild(li);
  });

  textUser.appendChild(ul);
}

// Hàm xoá dữ liệu 
function refreshWeatherData() {
  // Xoá phần lời khuyên user
  document.getElementById('text-user').innerHTML = "";
  
  // Xoá phần card Weather
  document.getElementById('weather-temp').innerHTML = "";
  document.getElementById('weather-description').innerHTML = "";
  document.getElementById('weather-icon').innerHTML = "";
  document.getElementById('humidity').innerHTML = "";
  document.getElementById('wind').innerHTML = "";
  document.getElementById('pressure').innerHTML = "";
  
  // Xoá phần card Forecast
    const forecastGrid = document.querySelector('.forecast-grid');
  if (forecastGrid) {
    forecastGrid.innerHTML = "";
  }

  // Huỷ biểu đồ nếu tồn tại
  if (weatherHourlyChart) {
    weatherHourlyChart.destroy(); // Hủy biểu đồ khỏi DOM và bộ nhớ
    weatherHourlyChart = null;    // Xoá tham chiếu
  }
}




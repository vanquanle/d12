window.apiKey = '79669b0102ea131f77aecc410f0813f4'; // API key

// Hàm lấy dữ liệu từ API 
function fetchAirData(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${window.apiKey}&units=metric`;

  // Lấy dữ liệu từ API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Cập nhật các trường trong card không khí
      updateAirCard(data);

      // Cập nhật thang đo chất lượng không khí
      const aqi = data.list[0].main.aqi; // Lấy chỉ số AQI
      console.log("AQI:", aqi);
      updateAQIArrow(aqi); // Điều chỉnh vị trí mũi tên
      updateAQIBackground(aqi); // Cập nhật màu nền cho chỉ số AQI
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Hàm cập nhật các trường trong card không khí
function updateAirCard(data) {
  const PM25 = document.getElementById('pm25-value');
  const PM10 = document.getElementById('pm10-value');
  const NO2 = document.getElementById('no2-value');
  const SO2 = document.getElementById('so2-value');
  const CO = document.getElementById('co-value');
  const O3 = document.getElementById('o3-value');
  const AQI = document.getElementById('aqi-index');
  AQI.innerHTML = '';

  PM25.textContent = `${data.list[0].components.pm2_5} µg/m³`;
  PM10.textContent = `${data.list[0].components.pm10} µg/m³`;
  NO2.textContent = `${data.list[0].components.no2} µg/m³`;
  SO2.textContent = `${data.list[0].components.so2} µg/m³`;
  CO.textContent = `${data.list[0].components.co} µg/m³`;
  O3.textContent = `${data.list[0].components.o3} µg/m³`;
  AQI.textContent = `${data.list[0].main.aqi}`;

  const airCard = document.getElementById('air-section');
  airCard.style.display = 'block';

  // Gọi hàm cảnh báo user
  alertAirUser(data);
}

// Hàm khởi tạo sự kiện cho lựa chọn khu vực
let airLocationChangeHandler = null; // Biến lưu trữ sự kiện

// Hàm khởi tạo sự kiện cho lựa chọn khu vực
function activateAirModule() {
  currentActiveType = 'air';

  const locationSelect = document.getElementById('locationSelect');

  if (!locationSelect) {
    return;
  }

  // Xóa sự kiện cũ nếu đã tồn tại
  if (airLocationChangeHandler) {
    locationSelect.removeEventListener('change', airLocationChangeHandler);
  }

  // Gán sự kiện mới
  airLocationChangeHandler = handleAirLocationChange;
  locationSelect.addEventListener('change', handleAirLocationChange);

  // Gọi hàm gán sự kiện click toạ độ bất kì trên bản đồ
  if (typeof mapView !== 'undefined') {
    initializeMapClickEvent(mapView, 'air');
  }

  // Gọi hàm tìm kiếm địa chỉ
  initSearch(mapView);


  console.log("Air module activated");

}

function deactivateAirModule() {
  const locationSelect = document.getElementById('locationSelect');

  if (locationSelect && airLocationChangeHandler) {
    locationSelect.removeEventListener('change', airLocationChangeHandler);
    airLocationChangeHandler = null; // Xóa tham chiếu để tránh rò rỉ bộ nhớ
    resetAQIArrow(); // Đặt lại mũi tên về vị trí ban đầu
    resetAQIArrowBackground(); // Đặt lại màu nền về mặc định
  }
  // Xoá phần lời khuyên user
  refreshAirData();
  
  console.log("Air module deactivated");
}

function handleAirLocationChange(event) {
  const selectedLocation = event.target.value;
  const coords = window.coordsArea[selectedLocation];

  if (coords) {
    fetchAirData(coords.lat, coords.lon);
    updateAirQualityChart(coords.lat, coords.lon); // Cập nhật biểu đồ chất lượng không khí
  }
}

// Hàm lấy dữ liệu chất lượng không khí theo giờ
async function fetchAirQualityHourly(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${window.apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Lỗi khi gọi API: ${response.status}`);
    }
    const data = await response.json();
    return data.list; // Trả về danh sách dự báo theo giờ
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu chất lượng không khí:", error);
    return [];
  }
}

let airQualityChart = null; // Biến lưu trữ biểu đồ

// Hàm hiển thị dữ liệu lên biểu đồ
function renderAirQualityChart(data) {
  const ctx = document.getElementById("airHourChart").getContext("2d");

  // Hủy biểu đồ cũ nếu đã tồn tại
  if (airQualityChart) {
    airQualityChart.destroy();
  }

  // Lấy dữ liệu thời gian và chỉ số AQI
  const labels = data.map((item) => {
    const date = new Date(item.dt * 1000); // Chuyển đổi timestamp
    return `${date.getHours()}:00`; // Hiển thị giờ
  });

  const aqiValues = data.map((item) => item.main.aqi); // Chỉ số AQI

  // Tạo biểu đồ
  airQualityChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Chỉ số AQI theo giờ",
          data: aqiValues,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Thời gian",
          },
        },
        y: {
          title: {
            display: true,
            text: "Chỉ số AQI",
          },
          beginAtZero: true,
        },
      },
    },
  });
}

// Hàm khởi tạo biểu đồ chất lượng không khí
async function updateAirQualityChart(lat, lon) {
  const hourlyData = await fetchAirQualityHourly(lat, lon);

  if (hourlyData.length === 0) {
    console.warn("Không có dữ liệu chất lượng không khí theo giờ.");
    return;
  }

  renderAirQualityChart(hourlyData);
}

// Hàm cập nhật vị trí mũi tên trên thang đo chất lượng không khí
function updateAQIArrow(aqi) {
  const arrow = document.querySelector(".arrow-container");

  // Xác định vị trí mũi tên dựa trên chỉ số AQI (thang 1-6)
  let position = 0; // Mặc định vị trí (tương ứng với mức "Tốt")
  switch (aqi) {
    case 1: // Tốt
      position = 0; // Bắt đầu từ đầu thang đo
      break;
    case 2: // Trung bình
      position = 15; 
      break;
    case 3: // Kém
      position = 25;
      break;
    case 4: // Xấu
      position = 35;
      break;
    case 5: // Rất xấu
      position = 45;
      break;
    case 6: // Nguy hại
      position = 55
      break;
    default:
      console.warn("Chỉ số AQI không hợp lệ:", aqi);
      return;
  }

  // Áp dụng vị trí cho mũi tên
  if (arrow) {
    arrow.style.left = `calc(${position}% + 40px)`; // Điều chỉnh vị trí mũi tên
  }
}

// Hàm chỉnh sửa lại vị trí mũi tên về vị trí ban đầu
function resetAQIArrow() {
  const arrow = document.querySelector(".arrow-container");

  if (arrow) {
    arrow.style.left= '0%'; // Đặt mũi tên về vị trí ban đầu
  }
}

function updateAQIBackground(aqi) {
  const aqiElement = document.getElementById("aqi-circle");

  if (!aqiElement) {
    console.warn("Không tìm thấy phần tử #aqi-index");
    return;
  }

  // Xác định màu nền dựa trên chỉ số AQI (thang 1-6)
  let backgroundColor = "";
  switch (aqi) {
    case 1: // Tốt
      backgroundColor = "#388e3c"; // Màu xanh lá
      break;
    case 2: // Trung bình
      backgroundColor = "#ffeb3b"; // Màu vàng
      break;
    case 3: // Kém
      backgroundColor = "#ff9800"; // Màu cam
      break;
    case 4: // Xấu
      backgroundColor = "#f44336"; // Màu đỏ
      break;
    case 5: // Rất xấu
      backgroundColor = "#d32f2f"; // Màu đỏ đậm
      break;
    case 6: // Nguy hại
      backgroundColor = "#7f0000"; // Màu nâu đậm
      break;
    default:
      console.warn("Chỉ số AQI không hợp lệ:", aqi);
      return;
  }

  // Áp dụng màu nền và hiệu ứng zoom
  aqiElement.style.backgroundColor = backgroundColor;
  aqiElement.style.color = "#fff"; // Đặt màu chữ là trắng để dễ đọc

  // Thêm hiệu ứng zoom
  aqiElement.style.transition = "transform 0.3s ease, background-color 0.3s ease";
  aqiElement.style.transform = "scale(1.2)"; // Phóng to

  // Đặt lại kích thước sau khi hiệu ứng kết thúc
  setTimeout(() => {
    aqiElement.style.transform = "scale(1)"; // Trở về kích thước ban đầu
  }, 300); // Thời gian khớp với `transition` (0.3s)
}

// Hàm khôi phục màu nền về mặc định
function resetAQIArrowBackground() {
  const aqiElement = document.getElementById("aqi-circle");

  if (aqiElement) {
    // Đặt lại màu nền về mặc định
    aqiElement.style.backgroundColor = "#ff5722"; // Màu nền mặc định
    aqiElement.style.color = "#fff"; // Đặt lại màu chữ là trắng

    // Đặt lại chỉ số AQI về trạng thái mặc định
    const aqiNumber = document.getElementById("aqi-index");
    if (aqiNumber) {
      aqiNumber.textContent = "0"; // Hiển thị giá trị mặc định
    }
  }
}

// Hàm đưa lời khuyên tới User dựa vào chất lượng không khí
function alertAirUser(data) {
  const suggestions = [];

  const aqi = data.list[0].main.aqi; // Lấy chỉ số AQI
  const pm25 = data.list[0].components.pm2_5
  const pm10 = data.list[0].components.pm10;
  const no2 = data.list[0].components.no2;
  const so2 = data.list[0].components.so2;
  const co = data.list[0].components.co;
  const o3 = data.list[0].components.o3;

  console.log("Chỉ số AQI:", aqi);
  console.log("Thông tin chất lượng không khí hôm nay:");
  console.log("  - PM2.5:", pm25 + " µg/m³");
  console.log("  - PM10:", pm10 + " µg/m³");
  console.log("  - NO2:", no2 + " µg/m³");
  console.log("  - SO2:", so2 + " µg/m³");
  console.log("  - CO:", co + " µg/m³");
  console.log("  - O3:", o3 + " µg/m³");

  // Gợi ý theo chỉ số AQI tổng quát
  if (aqi == 1) {
    suggestions.push("Chất lượng không khí rất tốt – Không khí trong lành. Bạn có thể thoải mái tham gia các hoạt động ngoài trời, dã ngoại hoặc du lịch.");
  } else if (aqi == 2) {
    suggestions.push("Chất lượng không khí ở mức trung bình – Không khí khá ổn. Có thể sinh hoạt ngoài trời nhưng nên hạn chế tiếp xúc lâu ở nơi đông xe cộ.");
  } else if (aqi == 3) {
    suggestions.push("Chất lượng không khí kém – Không khí bắt đầu ảnh hưởng đến nhóm nhạy cảm. Hạn chế hoạt động ngoài trời nếu bạn có vấn đề về hô hấp.");
  } else if (aqi == 4) {
    suggestions.push("Chất lượng không khí xấu – Mọi người có thể bị ảnh hưởng sức khỏe. Nên ở trong nhà và chọn địa điểm du lịch có không gian xanh, thoáng.");
  } else if (aqi == 5) {
    suggestions.push("Chất lượng không khí rất xấu – Ảnh hưởng nghiêm trọng đến sức khỏe. Tránh ra ngoài và sử dụng khẩu trang, máy lọc không khí nếu cần.");
  } else {
    suggestions.push("Chất lượng không khí nguy hại – Mức độ ô nhiễm cực kỳ cao. Ở trong nhà, đóng kín cửa, hoãn các kế hoạch ngoài trời để bảo vệ sức khỏe.");
  }


  // Các gợi ý theo từng thành phần như cũ
  if (pm25 > 75) {
    suggestions.push("Không khí ô nhiễm nặng do PM2.5. Hạn chế ra ngoài, đặc biệt là người già, trẻ em và người có bệnh hô hấp.");
  } else if (pm25 > 35) {
    suggestions.push("PM2.5 ở mức trung bình. Nên đeo khẩu trang đạt chuẩn và tránh các khu vực đông xe cộ.");
  } else {
    suggestions.push("Mức PM2.5 thấp – Có thể mở cửa sổ để thông gió tự nhiên, phơi đồ ngoài trời hoặc tổ chức hoạt động ngoài trời tại nhà.");
  }


  if (pm10 > 150) {
    suggestions.push("Bụi PM10 cao. Du khách nên đóng kín cửa sổ và tránh các điểm du lịch gần đường lớn.");
  }

  if (no2 > 100) {
    suggestions.push("NO₂ cao. Tránh hoạt động ngoài trời gần khu dân cư đông đúc hoặc đường lớn.");
  }

  if (so2 > 75) {
    suggestions.push("SO₂ cao. Tránh BBQ ngoài trời, ở lâu gần khu công nghiệp hoặc nơi đốt rác.");
  }

  if (co > 10) {
    suggestions.push("CO cao. Cẩn trọng khi ở trong không gian kín, kiểm tra thông gió tốt khi lưu trú.");
  }

  if (o3 > 180) {
    suggestions.push("O₃ cao. Tránh hoạt động ngoài trời vào buổi trưa, đặc biệt khi nắng gắt.");
  }

  // Hiển thị gợi ý
  const textUser = document.getElementById('text-user');
  textUser.innerHTML = "";

  const ul = document.createElement("ul");
  suggestions.slice(0, 6).forEach(suggestion => {
    const li = document.createElement("li");
    li.textContent = suggestion;
    ul.appendChild(li);
  });

  textUser.appendChild(ul);
}

// Hàm xoá dữ liệu 
function refreshAirData() {
  // Xoá phần lời khuyên user
  document.getElementById('text-user').innerHTML = "";
  // Xoá phần card Air
  document.getElementById('pm25-value').innerHTML="";
  document.getElementById('pm10-value').innerHTML="";
  document.getElementById('no2-value').innerHTML="";
  document.getElementById('so2-value').innerHTML="";
  document.getElementById('co-value').innerHTML="";
  document.getElementById('o3-value').innerHTML = "";
   // Huỷ biểu đồ nếu tồn tại
  if (airQualityChart) {
    airQualityChart.destroy(); // Hủy biểu đồ khỏi DOM và bộ nhớ
    airQualityChart = null;    // Xoá tham chiếu
  }
}




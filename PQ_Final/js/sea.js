// Hàm lấy dữ liệu từ API 
function fetchSeaData(lat, lon) { 
  const apiUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period&timezone=auto`;

  // Lấy dữ liệu từ API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Cập nhật các trường trong card Sea
      console.log("Dữ liệu trả về từ API:", data); // Kiểm tra dữ liệu trả về
      updateSeaCard(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Hàm cập nhật các trường trong card Sea
function updateSeaCard(data) {
  const wave_height = document.getElementById('wave_height');
  const wave_direction = document.getElementById('wave_direction');
  const wave_period = document.getElementById('wave_period');
  const wind_wave_height = document.getElementById('wind_wave_height');
  const wind_wave_direction = document.getElementById('wind_wave_direction');
  const wind_wave_period = document.getElementById('wind_wave_period');
  const swell_wave_height = document.getElementById('swell_wave_height');
  const swell_wave_direction = document.getElementById('swell_wave_direction');
  const swell_wave_period = document.getElementById('swell_wave_period');

  // Lấy dữ liệu từ API (giờ đầu tiên)
  const firstIndex = 0; // Giả định lấy dữ liệu giờ đầu tiên
  const hourly = data.hourly;

  if (hourly) {
    wave_height.textContent = `${hourly.wave_height[firstIndex]} mét`;
    wave_direction.textContent = `${hourly.wave_direction[firstIndex]} °`;
    wave_period.textContent = `${hourly.wave_period[firstIndex]} giây`;
    wind_wave_height.textContent = `${hourly.wind_wave_height[firstIndex]} mét`;
    wind_wave_direction.textContent = `${hourly.wind_wave_direction[firstIndex]} °`;
    wind_wave_period.textContent = `${hourly.wind_wave_period[firstIndex]} giây`;
    swell_wave_height.textContent = `${hourly.swell_wave_height[firstIndex]} mét`;
    swell_wave_direction.textContent = `${hourly.swell_wave_direction[firstIndex]} °`;
    swell_wave_period.textContent = `${hourly.swell_wave_period[firstIndex]} giây`;
  } else {
    console.warn("Dữ liệu hourly không tồn tại trong API.");
  }

  // Hiển thị phần tử sea-section
  const seaCard = document.getElementById('sea-section');
  if (seaCard) {
    seaCard.style.display = 'block';
  }

  alertSeaUser(data);
}

// Hàm khởi tạo sự kiện cho lựa chọn khu vực
let seaLocationChangeHandler = null; // Biến lưu trữ sự kiện

// Hàm khởi tạo sự kiện cho lựa chọn khu vực
function activateSeaModule() {
  currentActiveType = 'sea';

  const locationSelect = document.getElementById('locationSelect');

  if (!locationSelect) {
    return;
  }

  // Xóa sự kiện cũ nếu đã tồn tại
  if (seaLocationChangeHandler) {
    locationSelect.removeEventListener('change', seaLocationChangeHandler);
  }

  // Gán sự kiện mới
  seaLocationChangeHandler = handleSeaLocationChange;
  locationSelect.addEventListener('change', handleSeaLocationChange);

  // Gọi hàm gán sự kiện click toạ độ bất kì trên bản đồ
  if (typeof mapView !== 'undefined') {
    initializeMapClickEvent(mapView, 'sea');
  }

  // Gọi hàm tìm kiếm địa chỉ
  initSearch(mapView);

  console.log("Sea module activated");

}

function deactivateSeaModule() {
  const locationSelect = document.getElementById('locationSelect');

  if (locationSelect && seaLocationChangeHandler) {
    locationSelect.removeEventListener('change', seaLocationChangeHandler);
    seaLocationChangeHandler = null; // Xóa tham chiếu để tránh rò rỉ bộ nhớ
  }
  // Xoá phần lời khuyên user
  refreshSeaData();
  
  console.log("Sea module deactivated");
}

function handleSeaLocationChange(event) {
  const selectedLocation = event.target.value;
  const coords = window.coordsArea[selectedLocation];

  if (coords) {
    fetchSeaData(coords.lat, coords.lon);
    updateSeaChart(coords.lat, coords.lon); // Cập nhật biểu đồ chất lượng không khí
  }
}

// Hàm lấy dữ liệu chất lượng không khí theo giờ
async function fetchSeaHourly(lat, lon) {
  const apiUrlHourly = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period&timezone=auto`;

  try {
    const response = await fetch(apiUrlHourly);
    const data = await response.json();

    console.log("Dữ liệu trả về từ API:", data); // Kiểm tra dữ liệu trả về

    if (!data.hourly) {
      console.warn("Dữ liệu hourly không tồn tại:", data);
      return null; // Trả về null nếu không có dữ liệu
    }

    return data.hourly; // Trả về dữ liệu hourly
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu chu kỳ sóng:", error);
    return null; // Trả về null nếu có lỗi
  }
}

let wavePeriodChart = null; // Biến lưu trữ biểu đồ

// Hàm hiển thị dữ liệu lên biểu đồ
function renderSeaChart(labels, wavePeriod, windWavePeriod, swellWaveHeight) {
  const ctx = document.getElementById("seaHourChart").getContext("2d");

  // Hủy biểu đồ cũ nếu đã tồn tại
  if (wavePeriodChart) {
    wavePeriodChart.destroy();
  }

  // Tạo biểu đồ
  wavePeriodChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Chu kỳ sóng (Wave Period)",
          data: wavePeriod,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          fill: true,
        },
        {
          label: "Chu kỳ sóng do gió (Wind Wave Period)",
          data: windWavePeriod,
          borderColor: "rgba(255, 159, 64, 1)",
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderWidth: 2,
          fill: true,
        },
        {
          label: "Độ cao sóng swell (Swell Wave Height)",
          data: swellWaveHeight,
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
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
            text: "Giá trị",
          },
          beginAtZero: true,
        },
      },
    },
  });
}

// Hàm khởi tạo biểu đồ chất lượng không khí
async function updateSeaChart(lat, lon) {
  const hourlyData = await fetchSeaHourly(lat, lon);

  if (!hourlyData) {
    console.warn("Không có dữ liệu chu kỳ sóng theo giờ.");
    return;
  }

  // Lấy dữ liệu từ hourlyData
  const labels = hourlyData.time; // Thời gian
  const wavePeriod = hourlyData.wave_period; // Chu kỳ sóng
  const windWavePeriod = hourlyData.wind_wave_period; // Chu kỳ sóng do gió
  const swellWaveHeight = hourlyData.swell_wave_height; // Độ cao sóng swell

  // Gọi hàm renderSeaChart với các tham số
  renderSeaChart(labels, wavePeriod, windWavePeriod, swellWaveHeight);
}

// Hàm lời khuyên cho user dựa theo chỉ số về biển
function alertSeaUser(data) {
  const fisher = [];
  const surfer = [];
  const swimmer = [];

  const {
    wave_height,
    wave_direction,
    wave_period,
    wind_wave_height,
    wind_wave_direction,
    wind_wave_period,
    swell_wave_height,
    swell_wave_direction,
    swell_wave_period
  } = data;

  // Gợi ý cho ngư dân
  if (wave_height > 2 || wind_wave_height > 2 || swell_wave_height > 2) {
    fisher.push("Biển động mạnh với sóng cao và gió lớn. Nguy hiểm cho tàu đánh cá, cần hoãn ra khơi ngay. Kiểm tra lại thông tin dự báo thời tiết trước khi quyết định.");
  } else if (wave_height > 1) {
    fisher.push("Biển có sóng vừa, có thể ra khơi nhưng cần chuẩn bị kỹ lưỡng và theo dõi thường xuyên các bản tin thời tiết, tránh đi xa.");
  } else {
    fisher.push("Biển lặng, rất thuận lợi cho việc đánh bắt gần bờ hoặc xa bờ. Tuy nhiên, cần lưu ý đến tình hình gió và sóng nếu đi xa.");
  }

  if (wind_wave_period < 4) {
    fisher.push("Chu kỳ sóng gió ngắn có thể gây lắc mạnh. Nên hạn chế sử dụng tàu nhỏ hoặc tàu không vững chãi khi ra khơi.");
  }

  if (wind_wave_direction >= 45 && wind_wave_direction <= 135) {
    fisher.push("Gió thổi từ biển vào đất liền, có thể ảnh hưởng đến điều hướng tàu và gây sóng lớn gần bờ. Cần cẩn trọng khi ra khơi, đặc biệt là khu vực gần bờ.");
  }

  // Gợi ý cho người lướt sóng
  if (swell_wave_height >= 1.2 && swell_wave_period >= 6) {
    surfer.push("Swell mạnh và ổn định – Điều kiện lý tưởng để lướt sóng, đặc biệt là cho những người lướt sóng chuyên nghiệp.");
  } else if (swell_wave_height < 0.5) {
    surfer.push("Sóng quá nhỏ và yếu – Không phù hợp cho lướt sóng. Chỉ thích hợp cho người mới bắt đầu hoặc tập luyện ở vùng nước nông.");
  } else {
    surfer.push("Sóng ở mức trung bình – Thích hợp cho những người mới học hoặc đang luyện tập. Tuy nhiên, cần chú ý đến độ ổn định của sóng.");
  }

  if (Math.abs(wave_direction - swell_wave_direction) > 60) {
    surfer.push("Hướng sóng và swell lệch nhau quá nhiều – Điều này có thể gây khó khăn cho việc lướt sóng, nhất là đối với những người mới lướt.");
  }

  if (wave_period >= 10) {
    surfer.push("Chu kỳ sóng dài – Cẩn thận với những đợt sóng lớn hơn có thể xuất hiện, chỉ phù hợp cho lướt sóng cao cấp.");
  }

  // Gợi ý cho người tắm biển
  if (wave_height < 0.5 && wind_wave_height < 0.5) {
    swimmer.push("Biển êm và sóng rất thấp – An toàn để tắm biển. Tuy nhiên, cần lưu ý các yếu tố khác như nhiệt độ nước và dòng chảy.");
  } else if (wave_height < 1) {
    swimmer.push("Sóng vừa phải, vẫn có thể tắm biển, nhưng cần cẩn thận và luôn có người giám sát, đặc biệt là với trẻ em.");
  } else {
    swimmer.push("Sóng cao và biển động mạnh – Không nên xuống nước trong điều kiện này. Cẩn thận với các dòng chảy và sóng bất ngờ.");
  }

  if (swell_wave_period >= 8) {
    swimmer.push("Chu kỳ sóng dài có thể tạo ra dòng chảy xa bờ, nguy hiểm đối với người không quen bơi xa. Cần chú ý và tắm ở khu vực bãi biển có cứu hộ.");
  }

  if (wind_wave_direction >= 180 && wind_wave_direction <= 270) {
    swimmer.push("Gió thổi từ đất liền ra biển, có thể làm thay đổi dòng chảy và kéo người tắm xa bờ. Nên tránh tắm biển ở khu vực này.");
  }

  // Hiển thị kết quả dạng text đơn giản
  const textUser = document.getElementById('text-user');
  textUser.innerHTML =
    "<strong>Gợi ý cho ngư dân:</strong><br>" + fisher.join("<br>") + "<br><br>" +
    "<strong>Gợi ý cho người lướt sóng:</strong><br>" + surfer.join("<br>") + "<br><br>" +
    "<strong>Gợi ý cho người tắm biển:</strong><br>" + swimmer.join("<br>");
}

// Hàm xoá dữ liệu 
function refreshSeaData() {
  // Xoá phần lời khuyên user
  document.getElementById('text-user').innerHTML = "";
  // Xoá phần card Sea
  document.getElementById('wave_height').innerHTML="";
  document.getElementById('wave_direction').innerHTML="";
  document.getElementById('wave_period').innerHTML="";
  document.getElementById('wind_wave_height').innerHTML="";
  document.getElementById('wind_wave_direction').innerHTML="";
  document.getElementById('wind_wave_period').innerHTML="";
  document.getElementById('swell_wave_height').innerHTML="";
  document.getElementById('swell_wave_direction').innerHTML="";
  document.getElementById('swell_wave_period').innerHTML = "";
  // Huỷ biểu đồ nếu tồn tại
  if (wavePeriodChart) {
    wavePeriodChart.destroy(); // Hủy biểu đồ khỏi DOM và bộ nhớ
    wavePeriodChart = null;    // Xoá tham chiếu
  }

}







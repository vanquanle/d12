// Hàm lấy dữ liệu từ API 
function fetchUVIndexData(lat, lon) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=uv_index&timezone=auto`;
  // Lấy dữ liệu từ API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Cập nhật  chỉ số UV
      updateUVIndex(data); 
      // Cập nhật thang đo chỉ số UV  
      const currentHour = new Date().getHours(); // Lấy giờ hiện tại
      const uvindex = data.hourly.uv_index[currentHour]; // Lấy chỉ số UV tại giờ hiện tại
      console.log("Chỉ số UV tại giờ hiện tại:", uvindex);
      updateUVIndexArrow(uvindex); // Điều chỉnh vị trí mũi tên
      updateUVIndexBackground(uvindex); // Cập nhật màu nền cho chỉ số UV
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Hàm cập nhật chỉ số UV 
function updateUVIndex(data) {
  const UVIndex = document.getElementById('uv-index');
  UVIndex.innerHTML = '';
  const currentHour = new Date().getHours(); // Lấy giờ hiện tại
  const uvindex = data.hourly.uv_index[currentHour]; // Lấy chỉ số UV tại giờ hiện tại
  UVIndex.textContent = uvindex; // Lấy chỉ số UV

  // Gọi hàm alert user
  alertUVIndexUser(data);
}

// Hàm khởi tạo sự kiện cho lựa chọn khu vực
let uvIndexLocationChangeHandler = null; // Biến lưu trữ sự kiện

// Hàm khởi tạo sự kiện cho lựa chọn khu vực
function activateUVIndexModule() {
  currentActiveType = 'uv';

  const locationSelect = document.getElementById('locationSelect');

  if (!locationSelect) {
    return;
  }

  // Xóa sự kiện cũ nếu đã tồn tại
  if (uvIndexLocationChangeHandler) {
    locationSelect.removeEventListener('change', uvIndexLocationChangeHandler);
  }

  // Gán sự kiện mới
  uvIndexLocationChangeHandler = handleUVIndexLocationChange;
  locationSelect.addEventListener('change', handleUVIndexLocationChange);

  // Gọi hàm gán sự kiện click toạ độ bất kì trên bản đồ
  if (typeof mapView !== 'undefined') {
    initializeMapClickEvent(mapView, 'uv');
  }

  // Gọi hàm tìm kiếm địa chỉ
  initSearch(mapView);

  console.log("UV Index module activated");

}

function deactivateUVIndexModule() {
  const locationSelect = document.getElementById('locationSelect');

  if (locationSelect && uvIndexLocationChangeHandler) {
    locationSelect.removeEventListener('change', uvIndexLocationChangeHandler);
    uvIndexLocationChangeHandler = null; // Xóa tham chiếu để tránh rò rỉ bộ nhớ
    resetUVIndexArrow(); // Đặt lại mũi tên về vị trí ban đầu
    resetUVIndexArrowBackground(); // Đặt lại màu nền về mặc định
  }
  // Xoá phần lời khuyên user
  refreshUVIndexData();

  console.log("UV Index module deactivated");
}

function handleUVIndexLocationChange(event) {
  const selectedLocation = event.target.value;
  const coords = window.coordsArea[selectedLocation];

  if (coords) {
    fetchUVIndexData(coords.lat, coords.lon);
    updateUVIndexChart(coords.lat, coords.lon); // Cập nhật biểu đồ chỉ số UV
  }
}

// Hàm lấy dữ liệu biểu đồ chỉ số UV
async function fetchUVIndexHourly(lat, lon) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=uv_index&timezone=auto`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log("Dữ liệu trả về từ API:", data); // Kiểm tra dữ liệu trả về

    // Kiểm tra dữ liệu trả về
    if (!data.hourly || !Array.isArray(data.hourly.time) || !Array.isArray(data.hourly.uv_index)) {
      console.warn("Dữ liệu trả về từ API không hợp lệ.");
      return [];
    }

    return data.hourly; // Trả về dữ liệu hourly
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu biểu đồ UV:", error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
}

// Hàm cập nhật biểu đồ chỉ số UV
async function updateUVIndexChart(lat, lon) {
  const hourlyData = await fetchUVIndexHourly(lat, lon);

  if (!hourlyData || !Array.isArray(hourlyData.uv_index) || !Array.isArray(hourlyData.time)) {
    console.warn("Không có dữ liệu chỉ số UV theo giờ.");
    return;
  }

  renderUVIndexChart(hourlyData); // Gọi hàm hiển thị biểu đồ
}

let uvIndexChart = null; // Biến lưu trữ biểu đồ
// Hàm hiển thị biểu đồ chỉ số UV
function renderUVIndexChart(data) {
  const ctx = document.getElementById("UVHourChart").getContext("2d");

  // Hủy biểu đồ cũ nếu đã tồn tại
  if (uvIndexChart) {
    uvIndexChart.destroy();
  }

  // Kiểm tra dữ liệu trước khi sử dụng
  if (!data || !Array.isArray(data.uv_index) || !Array.isArray(data.time)) {
    console.warn("Dữ liệu biểu đồ không hợp lệ.");
    return;
  }

  // Lấy dữ liệu thời gian và chỉ số UV
  const uvIndexValues = data.uv_index; // Chỉ số UV
  const labels = data.time.map((t) => new Date(t).getHours() + ":00"); // Thời gian

  // Tạo biểu đồ
  uvIndexChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Chỉ số UV theo giờ",
          data: uvIndexValues,
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
            text: "Chỉ số UV",
          },
          beginAtZero: true,
        },
      },
    },
  });
}


// Hàm cập nhật vị trí mũi tên trên thang đo chỉ số UV
function updateUVIndexArrow(uvindex) {
  const arrow = document.querySelector(".arrow-container-uv");

  // Xác định vị trí mũi tên dựa trên khoảng chỉ số UV
  let position = 0; // Mặc định vị trí (tương ứng với mức "Thấp")

  if (uvindex >= 0 && uvindex < 3) {
    position = 0; // Thấp
  } else if (uvindex >= 3 && uvindex < 6) {
    position = 20; // Trung bình
  } else if (uvindex >= 6 && uvindex < 8) {
    position = 40; // Cao
  } else if (uvindex >= 8 && uvindex < 11) {
    position = 60; // Rất cao
  } else if (uvindex >= 11) {
    position = 80; // Nguy hại
  } else {
    console.warn("Chỉ số UV không hợp lệ:", uvindex);
    return;
  }

  // Áp dụng vị trí cho mũi tên
  if (arrow) {
    arrow.style.left = `calc(${position}% + 40px)`; // Điều chỉnh vị trí mũi tên
  }
}

// Hàm chỉnh sửa lại vị trí mũi tên về vị trí ban đầu
function resetUVIndexArrow() {
  const arrow = document.querySelector(".arrow-container-uv");

  if (arrow) {
    arrow.style.left= '0%'; // Đặt mũi tên về vị trí ban đầu
  }
}

// Hàm cập nhật màu nền cho chỉ số UV
function updateUVIndexBackground(uvindex) {
  const uvIndexElement = document.getElementById("uv-circle");

  if (!uvIndexElement) {
    console.warn("Không tìm thấy phần tử #uv-index");
    return;
  }

  if (uvindex < 0) {
    console.warn("Chỉ số UV không hợp lệ:", uvindex);
    return;
  }

  // Xác định màu nền dựa trên khoảng chỉ số UV
  let backgroundColor = "";

  if (uvindex >= 0 && uvindex < 3) { // Thấp
    backgroundColor = "#388e3c"; // Màu xanh
  } else if (uvindex >= 3 && uvindex < 6) { // Trung bình
    backgroundColor = "#ffeb3b"; // Màu vàng
  } else if (uvindex >= 6 && uvindex < 8) { // Cao
    backgroundColor = "#ff9800"; // Màu cam
  } else if (uvindex >= 8 && uvindex < 11) { // Rất cao
    backgroundColor = "#d32f2f"; // Màu đỏ
  } else if (uvindex >= 11) { // Nguy hại
    backgroundColor = "#852ae0e8"; // Màu tím
  } else {
    console.warn("Chỉ số UV không hợp lệ:", uvindex);
    return;
  }

  // Áp dụng màu nền và hiệu ứng zoom
  uvIndexElement.style.backgroundColor = backgroundColor;
  uvIndexElement.style.color = "#fff"; // Đặt màu chữ là trắng để dễ đọc

  // Thêm hiệu ứng zoom
  uvIndexElement.style.transition = "transform 0.05 ease, background-color 0.05 ease";
  uvIndexElement.style.transform = "scale(1.2)"; // Phóng to

  // Đặt lại kích thước sau khi hiệu ứng kết thúc
  setTimeout(() => {
    uvIndexElement.style.transform = "scale(1)"; // Trở về kích thước ban đầu
  }, 50); // Thời gian khớp với `transition` (0.05s)
}

// Hàm khôi phục màu nền về mặc định
function resetUVIndexArrowBackground() {
  const uvIndexElement = document.getElementById("uv-circle");

  if (uvIndexElement) {
    // Đặt lại màu nền về mặc định
    uvIndexElement.style.backgroundColor = "#ff5722"; // Màu nền mặc định
    uvIndexElement.style.color = "#fff"; // Đặt lại màu chữ là trắng

    // Đặt lại chỉ số UV về trạng thái mặc định
    const uvIndex = document.getElementById("uv-index");
    if (uvIndex) {
      uvIndex.textContent = "0"; // Hiển thị giá trị mặc định
    }
  }
}

// Hàm đưa ra lời khuyên dựa trên chỉ số UV
function alertUVIndexUser(data) {
  const suggestions = [];

  const currentHour = new Date().getHours(); // Lấy giờ hiện tại
  const uvindex = data.hourly.uv_index[currentHour]; // Lấy chỉ số UV tại giờ hiện tại // Lấy chỉ số UV

  console.log("Chỉ số UV:", uvindex);

  // Gợi ý theo chỉ số UV
  if (uvindex >= 0 && uvindex < 3) {
    suggestions.push("Chỉ số UV thấp. Bạn có thể ra ngoài trời một cách an toàn. Tuy nhiên, vẫn nên sử dụng kem chống nắng nếu bạn ở ngoài lâu.");
  } else if (uvindex >= 3 && uvindex < 6) {
    suggestions.push("Chỉ số UV trung bình. Hãy đeo kính râm, đội mũ rộng vành và sử dụng kem chống nắng nếu bạn ra ngoài.");
  } else if (uvindex >= 6 && uvindex < 8) {
    suggestions.push("Chỉ số UV cao. Tránh tiếp xúc trực tiếp với ánh nắng trong khoảng từ 10h - 16h. Hãy sử dụng kem chống nắng SPF 30+, đội mũ, và mặc quần áo dài tay.");
  } else if (uvindex >= 8 && uvindex < 11) {
    suggestions.push("Chỉ số UV rất cao. Rất dễ gây tổn thương da và mắt. Hạn chế ra ngoài trời, và nếu cần thiết, hãy bảo vệ kỹ càng.");
  } else if (uvindex >= 11) {
    suggestions.push("Chỉ số UV cực kỳ nguy hiểm. Hãy tránh ra ngoài vào ban ngày nếu không thực sự cần thiết. Mọi biện pháp bảo vệ đều cần được sử dụng.");
  } else {
    suggestions.push("Không thể xác định chỉ số UV. Vui lòng thử lại sau.");
  }

  // Hiển thị gợi ý
  const textUser = document.getElementById('text-user');
  textUser.innerHTML = "";

  const ul = document.createElement("ul");
  suggestions.slice(0, 1).forEach(suggestion => {
    const li = document.createElement("li");
    li.textContent = suggestion;
    ul.appendChild(li);
  });

  textUser.appendChild(ul);
}

// Hàm xoá dữ liệu 
function refreshUVIndexData() {
  // Xoá phần lời khuyên user
  document.getElementById('text-user').innerHTML = "";

  // Xoá biểu đồ
  if (uvIndexChart) {
    uvIndexChart.destroy(); // Hủy biểu đồ khỏi DOM và bộ nhớ
    uvIndexChart = null;    // Xoá tham chiếu
  }

}





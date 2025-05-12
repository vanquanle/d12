function initDateTime() {
  const currentDateTimeElement = document.getElementById('currentDateTime');

  if (!currentDateTimeElement) {
    console.warn("Không tìm thấy phần tử #currentDateTime");
    return;
  }

  function updateDateTime() {
    const now = new Date();
    const days = [
      'Chủ Nhật',
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
    ];
    const dayName = days[now.getDay()];
    const date = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    currentDateTimeElement.innerText = `${dayName}, ${date}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  }

  // Gọi lần đầu và đặt lặp lại
  updateDateTime();
  setInterval(updateDateTime, 1000);
}

// Gọi include.js trong file index.html
window.initDateTime = initDateTime;

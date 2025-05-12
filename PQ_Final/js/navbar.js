function initNavbarTabs() {
  const navLinks = document.querySelectorAll(".navbar a");

  if (navLinks.length === 0) {
    console.warn("Không tìm thấy .navbar a để gắn sự kiện");
    return;
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Xóa class active khỏi tất cả
      navLinks.forEach((el) => el.classList.remove("active"));

      // Thêm class active
      this.classList.add("active");

      // Ẩn tất cả section
      const sections = document.querySelectorAll(".tab-section");
      sections.forEach((section) => section.style.display = "none");

      // Lấy ID section từ href
      const sectionId = this.getAttribute("href").replace("#", "");
      const activeSection = document.getElementById(sectionId);

      if (activeSection) {
        activeSection.style.display = "block";
         // Reset chọn khu vực mỗi lần click
        document.getElementById("locationSelect").value = "all"; 
        
        // Kích hoạt module tương ứng
        if (sectionId === "weather-section") {
          activateWeatherModule();
          deactivateAirModule();
          deactivateUVIndexModule();
          deactivateSeaModule();
          setupLocationSelect();
          deactivateHomeModule();
          clearMapPoints(lastClickedLon, lastClickedLat);
          clearFixedAreaPoints();
        
        } else if (sectionId === "air-section") {
          activateAirModule();
          deactivateWeatherModule();
          deactivateUVIndexModule();
          deactivateSeaModule();
          setupLocationSelect();
          deactivateHomeModule();
          clearMapPoints(lastClickedLon, lastClickedLat);
          clearFixedAreaPoints();
        }
        else if (sectionId === "uvindex-section") {
          activateUVIndexModule();
          deactivateAirModule();
          deactivateWeatherModule();
          deactivateSeaModule();
          setupLocationSelect();
          deactivateHomeModule();
          clearMapPoints(lastClickedLon, lastClickedLat);
          clearFixedAreaPoints();
        }
        else if (sectionId === "sea-section") {
          activateSeaModule();
          deactivateWeatherModule();
          deactivateAirModule();
          deactivateUVIndexModule();
          setupLocationSelect();
          deactivateHomeModule();
          clearMapPoints(lastClickedLon, lastClickedLat);
          clearFixedAreaPoints();
        }
        else if (sectionId === "home-menu") {
          activateHomeModule();
          deactivateWeatherModule();
          deactivateAirModule();
          deactivateUVIndexModule();
          deactivateSeaModule();
        }
      }
    });
  });
}

// Gắn vào global để file include.js gọi được
window.initNavbarTabs = initNavbarTabs;



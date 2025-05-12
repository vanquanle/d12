window.addEventListener("DOMContentLoaded", () => {
  const includes = {
    "home-menu-container": {
      url: "components/home-menu.html",
      callback: () => {
        activateHomeModule(); // Kích hoạt Home Module sau khi tải xong
      }
    },
    "header-container": {
      url: "components/header.html",
      callback: initNavbarTabs // cập nhật menu tab sau khi nạp
    },
    
    "footer-container": {
      url: "components/footer.html"
    },
    "weather-section-container": {
      url: "components/weather-section.html"
    },
    "air-section-container": {
      url: "components/air-section.html"
    },
    "uvindex-section-container": {
      url: "components/uvindex-section.html"
    },
    "sea-section-container": {
      url: "components/sea-section.html"
    },
    "searchbar-container": {
      url: "components/searchbar.html"
    },
    "location-select-container": {
      url: "components/location-select.html",
    },
    "datetime-container": {
      url: "components/datetime.html",
      callback: initDateTime // cập nhật thời gian sau khi nạp
    },
    "alert-user-container": {
      url: "components/alert-user.html",
    }

  };

  for (const [id, { url, callback }] of Object.entries(includes)) {
    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        const container = document.getElementById(id);
        if (container) {
          container.innerHTML = html;
          if (typeof callback === 'function') {
            callback(); // Gọi callback 
          }
        }
      })
      .catch((err) => console.error(`Error loading ${url}:`, err));
  }
});



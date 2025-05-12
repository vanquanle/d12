// Hàm mở kích hoạt page Home
function activateHomeModule() {
    const homeMenu = document.querySelector("#home-menu");
    const leftColumn = document.querySelector(".left-column");
    const rightColumn = document.querySelector(".right-column");
    const searchbarContainer = document.querySelector("#searchbar-container"); // Lấy phần tử searchbar-container


    if (!homeMenu || !leftColumn || !rightColumn) {
        console.error("Không tìm thấy #home-menu, .left-column hoặc .right-column trong DOM");
        return;
    }

    // Hiển thị lại home-menu
    homeMenu.classList.remove("hidden");

    // Ẩn các cột left và right
    leftColumn.classList.add("hidden");
    rightColumn.classList.add("hidden");

    // Ẩn searchbar-container khi mở trang chủ
    if (searchbarContainer) {
        searchbarContainer.style.display = 'none';
    }

    // Điều hướng các section khi click vào từng menu-card ở page Home
    initNavigation();

    console.log("Đã kích hoạt Home Module: Hiển thị home-menu và ẩn leftColumn, rightColumn");
}

// Hàm tắt kích hoạt page Home
function deactivateHomeModule() {
    const homeMenu = document.querySelector("#home-menu");
    const leftColumn = document.querySelector(".left-column");
    const rightColumn = document.querySelector(".right-column");
    const searchbarContainer = document.querySelector("#searchbar-container"); // Lấy phần tử searchbar-container


    if (!homeMenu || !leftColumn || !rightColumn) {
        console.error("Không tìm thấy #home-menu, .left-column hoặc .right-column trong DOM");
        return;
    }

    // Ẩn home-menu
    homeMenu.classList.add("hidden");

    // Hiển thị lại các cột left và right
    leftColumn.classList.remove("hidden");
    rightColumn.classList.remove("hidden");

    // Hiện searchbar-container khi chuyển menu khác
    if (searchbarContainer) {
        searchbarContainer.style.display = 'block';
    }

    console.log("Đã hủy kích hoạt Home Module: Ẩn home-menu và hiển thị leftColumn, rightColumn");
}

// Hàm điều hướng
function navigateToSection(sectionId) {
    console.log(`Yêu cầu điều hướng đến section với id: ${sectionId}`);
    
    const navLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);
    
    if (navLink) {
        navLink.click();  // Tái sử dụng logic trong navbar.js
    } else {
        console.warn(`Không tìm thấy link navbar cho #${sectionId}`);
    }
}

// Khởi tạo các sự kiện điều hướng cho menu items
function initNavigation() {
  // Lấy tất cả các menu item
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      // Lấy ID của section cần điều hướng
      const sectionId = this.id.replace('-card', '-section');
      navigateToSection(sectionId);
    });
  });
}







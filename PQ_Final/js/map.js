var jsondata = {
  points: [
  
    // TRẠM XĂNG DẦU GÁNH DẦU
    {
      type: 'point',
      longitude: pointCoordinates.gasGanhDau[0],
      latitude:  pointCoordinates.gasGanhDau[1],
      symbol: {
        type: 'picture-marker',
        url: './image/gas_station.png',
        width: '32px',
        height: '32px'
      }
    },
    // TRẠM Y TẾ GÁNH DẦU
    {
      type: 'point',
      longitude: pointCoordinates.hospitalGanhDau[0],
      latitude: pointCoordinates.hospitalGanhDau[1],
      symbol: {
        type: 'picture-marker',
        url: './image/hospital.png',
        width: '32px',
        height: '32px'
      }
    },
     // BỆNH VIỆN VINMEX
    {
      type: 'point',
      longitude: pointCoordinates.hospitalVinmex[0], 
      latitude: pointCoordinates.hospitalVinmex[1],
      symbol: {
        type: 'picture-marker',
        url: './image/hospital.png',
        width: '32px',
        height: '32px'
      }
    },

    // NHÀ THỜ GIÁO XỨ DƯƠNG ĐÔNG
    {
      type: 'point',
      longitude: pointCoordinates.churchDuongDong[0], 
      latitude: pointCoordinates.churchDuongDong[1],
      symbol: {
        type: 'picture-marker',
        url: './image/church.png',
        width: '32px',
        height: '32px'
      }
    },

    // SÂN BAY QUỐC TẾ
    {
      type: 'point',
      longitude: pointCoordinates.airport[0],
      latitude: pointCoordinates.airport[1],
      symbol: {
        type: 'picture-marker',
        url: './image/airport.png',
        width: '32px',
        height: '32px'
      }
    },

    // NHÀ TÙ PHÚ QUỐC
    {
      type: 'point',
      longitude: pointCoordinates.prison[0],
      latitude: pointCoordinates.prison[1],
      symbol: {
        type: 'picture-marker',
        url: './image/prison.png',
        width: '32px',
        height: '32px'
      }
    },

    // ĐÀI TƯỞNG NIỆM LIỆT SĨ
    {
      type: 'point',
      longitude: pointCoordinates.statuePrison[0],
      latitude: pointCoordinates.statuePrison[1],
      symbol: {
        type: 'picture-marker',
        url: './image/statue.png',
        width: '32px',
        height: '32px'
      }
    },

    // VINWONDERS PHÚ QUỐC
    {
      type: 'point',
      longitude: pointCoordinates.vinwonders[0], 
      latitude: pointCoordinates.vinwonders[1],
      symbol: {
        type: 'picture-marker',
        url: './image/castle.png',
        width: '32px',
        height: '32px'
      }
    },

    // VINPEARL SAFARI PHÚ QUỐC
    {
      type: 'point',
      longitude: pointCoordinates.safari[0],
      latitude: pointCoordinates.safari[1],
      symbol: {
        type: 'picture-marker',
        url: './image/zoo.png',
        width: '32px',
        height: '32px'
      }
    },

    // HỒ ĐÔNG DƯƠNG
    {
      type: 'point',
      longitude: pointCoordinates.lakeDongDuong[0], 
      latitude: pointCoordinates.lakeDongDuong[1],
      symbol: {
        type: 'picture-marker',
        url: './image/lake.png',
        width: '32px',
        height: '32px'
      }
    },

    // VƯỜN QUỐC GIA PHÚ QUỐC
    {
      type: 'point',
      longitude: pointCoordinates.forest[0], 
      latitude: pointCoordinates.forest[1],
      symbol: {
        type: 'picture-marker',
        url: './image/forest.png',
        width: '32px',
        height: '32px'
      }
    },
   
    // NÚI DƯƠNG TƠ
    {
      type: 'point',
      longitude: pointCoordinates.moutainDuongTo[0],
      latitude: pointCoordinates.moutainDuongTo[1],
      symbol: {
        type: 'picture-marker',
        url: './image/moutain.png',
        width: '32px',
        height: '32px'
      }
    },
    
  ],
  lines: [
    // ĐƯỜNG TỈNH LỘ 973
    {
      type: 'polyline',
      paths: pathCoordinates.duong973,
      symbol: {
        type: 'simple-line',
        color: [255, 255, 255],
        width: 2,
      },
    },

    // ĐƯỜNG LÊ HỒNG PHONG
    {
      type: 'polyline',
      paths: pathCoordinates.duongLeHongPhong,
      symbol: {
        type: 'simple-line',
        color: [255, 255, 255],
        width: 2,
      },
    },

    // ĐƯỜNG NGUYỄN TRUNG TRỰC
    {
      type: 'polyline',
      paths: pathCoordinates.duongNguyenTrungTruc,
      symbol: {
        type: 'simple-line',
        color: [255, 255, 255],
        width: 2,
      },
    },

    // ĐƯỜNG LÝ THƯỜNG KIỆT
    {
      type: 'polyline',
      paths: pathCoordinates.duongLyThuongKiet,
      symbol: {
        type: 'simple-line',
        color: [255, 255, 255],
        width: 2,
      },
    },

    // ĐƯỜNG CẦU C2 CỬA CẠN
    {
      type: 'polyline',
      paths: pathCoordinates.duongCauC2,
      symbol: {
        type: 'simple-line',
        color: [255, 255, 255],
        width: 2,
      },
    },

    // ĐƯỜNG ĐT 47
    {
      type: 'polyline',
      paths: pathCoordinates.duongDT47,
      symbol: {
        type: 'simple-line',
        color: [255, 255, 255],
        width: 2,
      },
    },

    // ĐƯỜNG KHU TƯỢNG
    {
      type: 'polyline',
      paths: pathCoordinates.duongKhuTuong,
      symbol: {
        type: 'simple-line',
        color: [255, 255, 255],
        width: 2,
      },
    },
  ],
  polygons: [
 
    // XÃ GÀNH DẦU
    {
      type: 'polygon',
      rings: ringCoordinates.xaGanhDau,
      //Name: 'Xã Gành Dầu',
      id:'ganh_dau',
      symbol: {
        type: 'simple-fill',
        color: [255, 99, 132, 0.7], // màu đỏ hồng
        outline: { color: [0, 0, 0], width: 1 },
      },
    },
    
    // XÃ BÃI THƠM
    {
      type: 'polygon',
      rings: ringCoordinates.xaBaiThom,
      //Name: 'Xã Bãi Thơm',
      id:'bai_thom',
      symbol: {
        type: 'simple-fill',
        color: [54, 162, 235, 0.7], // màu xanh lam
        outline: { color: [0, 0, 0], width: 1 },
      },
      
    },

    // XÃ CỬA CẠN
    {
      type: 'polygon',
      rings: ringCoordinates.xaCuaCan,
      //Name: 'Xã Cửa Cạn',
      id: 'cua_can',
      symbol: {
        type: 'simple-fill',
        color: [255, 206, 86, 0.4], // màu vàng
        outline: { color: [0, 0, 0], width: 1 },
      },
      
    },
    // XÃ CỬA DƯƠNG
    {
      type: 'polygon',
      rings: ringCoordinates.xaCuaDuong,
      //Name: 'Xã Cửa Dương',
      id:'cua_duong',
      symbol: {
        type: 'simple-fill',
        color: [107, 142, 35, 0.7], // màu oliu
        outline: { color: [0, 0, 0], width: 1 },
      },
    },

   
    // XÃ HÀM NINH
    {
      type: 'polygon',
      rings: ringCoordinates.xaHamNinh,
      //Name: 'Xã Hàm Ninh',
      id:'ham_ninh',
      symbol: {
        type: 'simple-fill',
        color: [102, 51, 204, 0.7], // màu tím
        outline: { color: [0, 0, 0], width: 1 },
      },
      
    },

     // PHƯỜNG DƯƠNG ĐÔNG
    {
      type: 'polygon',
      rings: ringCoordinates.phuongDuongDong,
      //Name: 'Phường Dương Đông',
      id:'duong_dong',
      symbol: {
        type: 'simple-fill',
        color: [204, 102, 0, 0.7], // màu cam
        outline: { color: [0, 0, 0], width: 1 },
      },
      
    },

    // XÃ DƯƠNG TƠ
    {
      type: 'polygon',
      rings: ringCoordinates.xaDuongTo,
      //Name: 'Xã Dương Tơ',
      id: 'duong_to',
      symbol: {
        type: 'simple-fill',
        color: [0, 56, 168, 0.7], // màu coban
        outline: { color: [0, 0, 0], width: 1 },
      },
    },
   
    // PHƯỜNG AN THỚI
    {
      type: 'polygon',
      rings: ringCoordinates.phuongAnThoi,
      //Name: 'Phường An Thới',
      id: 'an_thoi',
      symbol: {
        type: 'simple-fill',
        color: [120, 20, 20, 0.7], // màu nâu
        outline: { color: [0, 0, 0], width: 1 },
      }
      
    },
  ],
};
let mapView = null; // Lưu trữ MapView để tái sử dụng
let map = null; // Lưu trữ đối tượng Map
let pointLayer = null; // Lớp điểm
let polygonLayer = null; // Lớp đa giác
let lineLayer = null; // Lớp đường
let GraphicGlobal = null; // Biến toàn cục để lưu trữ Graphic

function initializeMap() {
  console.log("Khởi tạo bản đồ thành công");
  require([
    'esri/Map',
    'esri/views/MapView',
    'esri/Graphic',
    'esri/layers/GraphicsLayer',
  ], function (Map, MapView, Graphic, GraphicsLayer) {
    // Lưu Graphic vào biến toàn cục
    GraphicGlobal = Graphic;

    // Khởi tạo bản đồ
    map = new Map({ basemap: 'topo-vector' });

    // Khởi tạo MapView
    mapView = new MapView({
      container: 'viewDiv', // ID của container bản đồ
      map: map,
      center: [103.9636, 10.277], // Toạ độ Phú Quốc
      zoom: 11,
      highlightOptions: { color: 'blue' },
    });

    // Tạo các lớp
    polygonLayer = new GraphicsLayer();
    lineLayer = new GraphicsLayer();
    pointLayer = new GraphicsLayer();
    map.addMany([polygonLayer, lineLayer, pointLayer]);

    // Thêm dữ liệu vào các lớp
    addDataToLayers(Graphic);

    initializeReverseGeocoding(mapView);


    
    console.log("Bản đồ đã được khởi tạo");
  });
}

// Hàm tạo đối tượng đồ họa (graphic)
function createGraphic(data, Graphic) {
  let geometry = {};

  if (data.type === "polyline") {
    geometry = {
      type: "polyline",
      paths: data.paths,
    };
  } else if (data.type === "polygon") {
    geometry = {
      type: "polygon",
      rings: data.rings,
    };
  } else if (data.type === "point") {
    geometry = {
      type: "point",
      longitude: data.longitude,
      latitude: data.latitude,
    };
  }
  return new Graphic({
    geometry: geometry,
    symbol: data.symbol
  });
}

// Hàm thêm dữ liệu vào các lớp
function addDataToLayers(Graphic) {
  // Thêm các điểm
  jsondata.points.forEach((data) => pointLayer.add(createGraphic(data, Graphic)));

  // Thêm các đường
  jsondata.lines.forEach((data) => lineLayer.add(createGraphic(data, Graphic)));

  // Thêm các đa giác
  jsondata.polygons.forEach((data) => polygonLayer.add(createGraphic(data, Graphic)));

  console.log("Dữ liệu đã được thêm vào các lớp");
}


// Hàm xử lý sự kiện chọn phường
function handleLocationChange(event) {
  const phuongNames = {
    duong_dong: "Phường Dương Đông",
    an_thoi: "Phường An Thới",
    ganh_dau: "Xã Gánh Dầu",
    cua_can: "Xã Cửa Cạn",
    cua_duong: "Xã Cửa Dương",
    ham_ninh: "Xã Hàm Ninh",
    duong_to: "Xã Dương Tơ",
    bai_thom: "Xã Bãi Thơm",
  };

  const selectedPhuongId = event.target.value;
  const selectedPhuong = phuongNames[selectedPhuongId];
  const location = window.coordsArea[selectedPhuongId];

  if (!selectedPhuong || !location) {
    console.warn(`Không tìm thấy dữ liệu cho ID: ${selectedPhuongId}`);
    return;
  }

  // Di chuyển đến vị trí
  mapView.goTo({ center: [location.lon, location.lat], zoom: 12 })
    .then(() => {
      console.log(`Đã di chuyển đến: ${selectedPhuong}`);
      drawPointOnMap(location, selectedPhuong); // Gọi hàm vẽ điểm sau khi di chuyển
    })
    .catch((err) => console.error("Lỗi khi di chuyển bản đồ:", err));
}

// Hàm vẽ điểm trên bản đồ
function drawPointOnMap(location, label) {
  const point = new GraphicGlobal({
    geometry: {
      type: "point",
      longitude: location.lon,
      latitude: location.lat
    },
    symbol: {
      type: "simple-marker",
      color: "red",
      size: "12px",
      outline: {
        color: "white",
        width: 2
      }
    }
  });

  pointLayer.removeAll();  // Xóa điểm cũ
  pointLayer.add(point);   // Thêm điểm mới

  // Thêm nhãn vào bản đồ
  addLabelToMap(location, label);
}

// Hàm dán nhãn tên phường trên bản đồ
function addLabelToMap(coords, text) {
  const labelGraphic = new GraphicGlobal({
    geometry: {
      type: "point",
      longitude: coords.lon,
      latitude: coords.lat
    },
    symbol: {
      type: "text", // Loại biểu tượng là văn bản
      color: "white", // Màu chữ
      haloColor: "blue", // Màu viền chữ
      haloSize: "2px", // Độ dày viền chữ
      text: text, // Nội dung chữ
      font: {
        size: 12, // Kích thước chữ
        family: "Arial", // Font chữ
        weight: "bold" // Độ đậm
      }
    }
  });

  pointLayer.add(labelGraphic); // Thêm nhãn vào lớp điểm
}

// Gán sự kiện cho dropdown
function setupLocationSelect() {
  const locationSelect = document.getElementById("locationSelect");
  if (!locationSelect) {
    return;
  }

  // Gán sự kiện mới
  locationSelect.addEventListener("change", handleLocationChange);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeMap();
  
});

window.setupLocationSelect = setupLocationSelect;

// Hàm chung để lấy dữ liệu
function fetchData(type, lat, lon) {
  if (type === 'air') {
    fetchAirData(lat, lon);  // Lấy dữ liệu không khí
    updateAirQualityChart(lat, lon)
  } else if (type === 'uv') {
    fetchUVIndexData(lat, lon);   // Lấy dữ liệu chỉ số UV
    updateUVIndexChart(lat, lon);
  } else if (type === 'sea') {
    fetchSeaData(lat, lon); // Lấy dữ liệu mực nước biển
    updateSeaChart(lat, lon);
  } else if (type === 'weather') {
    fetchWeatherData(lat, lon); // Lấy dữ liệu thời tiết
    fetchForecastData(lat, lon);
    fetchForecastDataDiagram(lat, lon);
  } else {
    console.log("Loại dữ liệu không hợp lệ.");
  }
}

// Hàm khởi tạo sự kiện click trên bản đồ với tham số type (air, uv, seaLevel, weather)
function initializeMapClickEvent(mapView, type) {
  // Trước khi gắn sự kiện mới, xóa các listener cũ (nếu có)
  if (mapView.__clickHandler) {
    mapView.__clickHandler.remove();
  }

  // Gắn sự kiện click mới
  const clickHandler = mapView.on('click', function (event) {
    var lat = event.mapPoint.latitude;
    var lon = event.mapPoint.longitude;

    console.log(`[${type}] Click tại: ${lat}, ${lon}`);
    fetchData(type, lat, lon);
  });

  // Lưu lại handler để có thể xóa sau này
  mapView.__clickHandler = clickHandler;
}

let lastClickedLon = null;
let lastClickedLat = null;

// Hàm chuyển toạ độ thành địa chỉ
function initializeReverseGeocoding(mapView) {
  require(["esri/rest/locator"], function (locator) {
    const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

    mapView.on("click", function (event) {

      const lon = event.mapPoint.longitude;
      const lat = event.mapPoint.latitude;

      // Lưu lại toạ độ toàn cục
      lastClickedLon = lon;
      lastClickedLat = lat;

      // Gọi hàm xoá điểm theo toạ độ
      clearMapPoints(lon, lat);

      locator.locationToAddress(locatorUrl, {
        location: event.mapPoint
      }).then(function (response) {
        console.log("Địa chỉ:", response.address);

        drawPointOnMap(
          { lon, lat },
          response.address
        );
      }).catch(function (error) {
        console.log("Không tìm thấy địa chỉ", error);
      });
    });
  });
}


// Xoá các điểm bất kỳ đã chọn khi chuyển tab menu
function clearMapPoints(lon, lat) {
  if (!pointLayer) return;

  const graphicsToRemove = [];

  pointLayer.graphics.forEach((graphic) => {
    const pt = graphic.geometry;
    if (
      pt.type === "point" &&
      Math.abs(pt.longitude - lon) < 1e-6 && // So sánh gần đúng
      Math.abs(pt.latitude - lat) < 1e-6
    ) {
      graphicsToRemove.push(graphic);
    }
  });

  pointLayer.removeMany(graphicsToRemove);
}

// Xoá các điểm cố định khi chuyển tab menu
function clearFixedAreaPoints() {
  if (!pointLayer || !window.coordsArea) return;

  const graphicsToRemove = [];
  const tolerance = 1e-6;

  // Lấy danh sách các toạ độ cố định
  const fixedCoords = Object.values(window.coordsArea);

  pointLayer.graphics.forEach((graphic) => {
    const pt = graphic.geometry;

    if (pt.type === "point") {
      const match = fixedCoords.some(({ lat, lon }) => {
        return (
          Math.abs(pt.latitude - lat) < tolerance &&
          Math.abs(pt.longitude - lon) < tolerance
        );
      });

      if (match) {
        graphicsToRemove.push(graphic);
      }
    }
  });

  pointLayer.removeMany(graphicsToRemove);
  console.log(`Đã xoá ${graphicsToRemove.length} điểm cố định từ coordsArea.`);
}

let currentActiveType = null;

// Hàm tìm địa chỉ
function initSearch(mapView) {
  require(["esri/rest/locator"], function (locator) {
    const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
    
    const inputUser = document.querySelector(".search-input");
    const buttonSearch = document.querySelector(".search-button");

    if (!inputUser || !buttonSearch) {
      console.error("Không tìm thấy ô nhập hoặc nút tìm kiếm.");
      return;
    }

    function handleSearch() {
      const address = inputUser.value.trim();
      if (!address) return;

      locator.addressToLocations(locatorUrl, {
        address: { "SingleLine": address },
        maxLocations: 1
      }).then(function (candidates) {
        if (candidates.length === 0) {
          alert("Không tìm thấy địa chỉ.");
          return;
        }

        const location = candidates[0].location;
        const lat = location.y;
        const lon = location.x;

        lastClickedLat = lat;
        lastClickedLon = lon;

        clearMapPoints(lon, lat);
        clearFixedAreaPoints();

        drawPointOnMap({ lat, lon }, address);
        mapView.goTo({ target: location, zoom: 13 });

        // ✅ Luôn dùng type đang active
        if (currentActiveType) {
          fetchData(currentActiveType, lat, lon);
        }
      }).catch(function (err) {
        console.error("Lỗi khi tìm địa chỉ:", err);
      });
    }

    inputUser.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        handleSearch();
        inputUser.value = ""; // Xoá sau khi Enter
        document.getElementById("locationSelect").value = "all"; 
      }
    });

    buttonSearch.addEventListener("click", function () {
      handleSearch();
      inputUser.value = ""; // Xoá sau khi click
      document.getElementById("locationSelect").value = "all"; 
    });
  });
}























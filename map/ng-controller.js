angular.module('app.controller', ['ui-leaflet', 'ng-echarts', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])

    .controller('mapCtrl', function ($scope, geoService) {

        var center = {
            lat: 17.451,
            lng: 100.570,
            zoom: 7
        };
        $scope.goMap = function(lat,lon){
          $scope.center = {
              lat: Number(lat),
              lng: Number(lon),
              zoom: 15
          }

        };
        var radar_phs = {
            name: 'ข้อมูลเรดาร์ฝน: พิษณุโลก',
            type: 'wms',
            visible: true,
            url: 'http://www3.cgistln.nu.ac.th/geoserver/ows?',
            layerParams: {
                layers: 'lsnanbasin:PHS',
                format: 'image/png',
                attribution: '&copy; <a href="http://rain.tvis.in.th">NECTEC&TMD</a> &copy; <a href="http://www.gistnu.com">GISTNU</a>',
                transparent: true,
                zIndex: 3
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Landslide Map"
        };

        var radar_cri = {
            name: 'ข้อมูลเรดาร์ฝน: เชียงราย',
            type: 'wms',
            visible: true,
            url: 'http://www3.cgistln.nu.ac.th/geoserver/ows?',
            layerParams: {
                layers: 'lsnanbasin:CRI',
                format: 'image/png',
                attribution: '&copy; <a href="http://rain.tvis.in.th">NECTEC&TMD</a> &copy; <a href="http://www.gistnu.com">GISTNU</a>',
                transparent: true,
                zIndex: 3
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Landslide Map"
        };

        var radar_kkn = {
            name: 'ข้อมูลเรดาร์ฝน: ขอนแก่น',
            type: 'wms',
            visible: true,
            url: 'http://www3.cgistln.nu.ac.th/geoserver/ows?',
            layerParams: {
                layers: 'lsnanbasin:KKN',
                format: 'image/png',
                attribution: '&copy; <a href="http://rain.tvis.in.th">NECTEC&TMD</a> &copy; <a href="http://www.gistnu.com">GISTNU</a>',
                transparent: true,
                zIndex: 3
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Landslide Map"
        };
        var basin = {
            name: 'ขอบเขตลุ่มน้ำ',
            type: 'wms',
            visible: true,
            url: 'http://www3.cgistln.nu.ac.th/geoserver/ows?',
            layerParams: {
                layers: 'gistdata:basin_50k',
                format: 'image/png',
                transparent: true,
                CQL_FILTER: "mb_code IN ('09')",
                zIndex: 3
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Landslide Map"
        };
        var province = {
            name: 'ขอบเขตจังหวัด',
            type: 'wms',
            visible: true,
            url: 'http://www3.cgistln.nu.ac.th/geoserver/ows?',
            layerParams: {
                layers: 'gistdata:province',
                format: 'image/png',
                transparent: true,
                CQL_FILTER: "pv_code IN ('53', '55', '60','65', '66')",
                zIndex: 3
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Landslide Map"
        };

        var amphoe = {
            name: 'ขอบเขตอำเภอ',
            type: 'wms',
            visible: true,
            url: 'http://www3.cgistln.nu.ac.th/geoserver/ows?',
            layerParams: {
                layers: 'gistdata:amphoe',
                format: 'image/png',
                transparent: true,
                CQL_FILTER: "pv_code IN ('53', '55', '60','65', '66')",
                zIndex: 4
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Landslide Map"
        };

        var tambon = {
            name: 'ขอบเขตตำบล',
            type: 'wms',
            visible: true,
            url: 'http://www3.cgistln.nu.ac.th/geoserver/ows?',
            layerParams: {
                layers: 'gistdata:tambon',
                format: 'image/png',
                transparent: true,
                CQL_FILTER: "pv_code IN ('53', '55', '60','65', '66')",
                zIndex: 5
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Landslide Map"
        };

        var village = {
            name: 'หมู่บ้าน',
            type: 'wms',
            visible: true,
            url: 'http://www3.cgistln.nu.ac.th/geoserver/ows?',
            layerParams: {
                layers: 'gistdata:village',
                format: 'image/png',
                transparent: true,
                CQL_FILTER: "prov_code IN ('53', '55', '60','65', '66')",
                zIndex: 6
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Landslide Map"
        };
        var lscls_mod1 = {
            name: 'พืนที่เสี่ยงดินถล่ม(MOD1)',
            type: 'wms',
            visible: true,
            url: 'http://www3.cgistln.nu.ac.th/geoserver/ows?',
            layerParams: {
                layers: 'lsnanbasin:mod1',
                format: 'image/png',
                attribution: '&copy; <a href="http://www.gistnu.com">GISTNU</a>',
                transparent: true,
                opacity: 0.7,
                zIndex: 1
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Landslide Map"
        };
        var lscls_mod2 = {
            name: 'พืนที่เสี่ยงดินถล่ม(MOD2)',
            type: 'wms',
            visible: true,
            url: 'http://www3.cgistln.nu.ac.th/geoserver/ows?',
            layerParams: {
                layers: 'lsnanbasin:mod2',
                format: 'image/png',
                attribution: '&copy; <a href="http://www.gistnu.com">GISTNU</a>',
                transparent: true,
                opacity: 0.7,
                zIndex: 1
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Landslide Map"
        };
        var rain_haii = {
            name: 'ปริมาณฝน: สสนก.',
            type: 'wms',
            visible: true,
            url: 'http://www3.cgistln.nu.ac.th/geoserver/ows?',
            layerParams: {
                layers: 'gistdata:geotiff_coverage',
                format: 'image/png',
                attribution: '&copy; <a href="http://www.gistnu.com">GISTNU</a>',
                transparent: true,
                zIndex: 1
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Landslide Map"
        };
        var dem = {
            name: 'ข้อมูลระดับความสูงเชิงเลข',
            type: 'wms',
            visible: true,
            url: 'http://www3.cgistln.nu.ac.th/geoserver/ows?',
            layerParams: {
                layers: 'lsnanbasin:gdem',
                format: 'image/png',
                attribution: '&copy; <a href="http://www.gistnu.com">GISTNU</a>',
                transparent: true,
                zIndex: 1
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Landslide Map"
        };
        angular.extend($scope, {
            center: center,
            layercontrol: {
                icons: {
                    uncheck: "fa fa-toggle-off",
                    check: "fa fa-toggle-on"
                }
            },

            layers: {
                baselayers: {
                  gphy: {
                      name: 'Google Terrain',
                      type: 'xyz',
                      url: 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
                      layerOptions: {
                          subdomains:['mt0','mt1','mt2','mt3'],
                          continuousWorld: true
                      }
                  },
                    ghyb: {
                        name: 'Google Hybrid',
                        type: 'xyz',
                        url: 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
                        layerOptions: {
                            subdomains:['mt0','mt1','mt2','mt3'],
                            continuousWorld: true
                        }
                    },
                  cdb: {
                      name: 'CartoDBMap',
                      type: 'xyz',
                      url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                      layerOptions: {
                          subdomains: ['a', 'b', 'c'],
                          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                          continuousWorld: true
                      }
                  },
                    osm: {
                        name: 'OpenStreetMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OSM</a> contributors',
                            continuousWorld: true
                        }
                    }
                },
                overlays: {
                    basin: basin,
                    lscls_mod1: lscls_mod1,
                    lscls_mod1: lscls_mod2,
                    rain_haii: rain_haii
                }
            },

            //village
            removeVillageLayer: function () {
                delete this.layers.overlays.village;
            },
            addVillageLayer: function () {
                this.layers.overlays.village = village
            },

            //tambon
            removeTambonLayer: function () {
                delete this.layers.overlays.tambon;
            },
            addTambonLayer: function () {
                this.layers.overlays.tambon = tambon
            },
            // case of exists
            // existsTambonLayer: function () {
            //     return ("tambon" in this.layers.overlays);
            // },

            //amphoe
            removeAmphoeLayer: function () {
                delete this.layers.overlays.amphoe;
            },
            addAmphoeLayer: function () {
                this.layers.overlays.amphoe = amphoe
            },

            //province
            removeProvinceLayer: function () {
                delete this.layers.overlays.province;
            },
            addProvinceLayer: function () {
                this.layers.overlays.province = province
            },

            //basin
            removeBasinLayer: function () {
                delete this.layers.overlays.basin;
            },
            addBasinLayer: function () {
                this.layers.overlays.basin = basin
            },

            //phs radar
            removeRadar_phsLayer: function () {
                delete this.layers.overlays.radar_phs;
            },
            addRadar_phsLayer: function () {
                this.layers.overlays.radar_phs = radar_phs
            },

            // cri radar
            removeRadar_criLayer: function () {
                delete this.layers.overlays.radar_cri;
            },
            addRadar_criLayer: function () {
                this.layers.overlays.radar_cri = radar_cri
            },

            // kkn radar
            removeRadar_kknLayer: function () {
                delete this.layers.overlays.radar_kkn;
            },
            addRadar_kknLayer: function () {
                this.layers.overlays.radar_kkn = radar_kkn
            },

            // haii rainfall
            removeRain_haiiLayer: function () {
                delete this.layers.overlays.rain_haii;
            },
            addRain_haiiLayer: function () {
                this.layers.overlays.rain_haii = rain_haii
            },

            // dem
            removeDEMLayer: function () {
                delete this.layers.overlays.dem;
            },
            addDEMLayer: function () {
                this.layers.overlays.dem = dem
            },

            // landslide risk mod1
            removeLandslide_mod1Layer: function () {
                delete this.layers.overlays.lscls_mod1;
            },
            addLandslide_mod1Layer: function () {
                this.layers.overlays.lscls_mod1 = lscls_mod1
            },

            // landslide risk mod2
            removeLandslide_mod2Layer: function () {
                delete this.layers.overlays.lscls_mod2;
            },
            addLandslide_mod2Layer: function () {
                this.layers.overlays.lscls_mod2 = lscls_mod2
            },

        })

        console.log($scope.center);

        $scope.checkboxModel = {
            vill: false,
            tambon: false,
            amphoe: false,
            province: false,
            basin: true,
            radar_phs: false,
            radar_cri: false,
            radar_kkn: false,
            rain_haii: true,
            lscls_mod1: true,
            lscls_mod2: true,
            dem: true
        };

        $scope.showLayers = function (val) {
            console.log(val);

            if (val == 'village') {
                if ($scope.checkboxModel.vill == true) {
                    $scope.addVillageLayer();
                } else {
                    $scope.removeVillageLayer();
                }
            } else if (val == 'tambon') {
                if ($scope.checkboxModel.tambon == true) {
                    $scope.addTambonLayer();
                } else {
                    $scope.removeTambonLayer();
                }
            }else if (val == 'amphoe') {
                if ($scope.checkboxModel.amphoe == true) {
                    $scope.addAmphoeLayer();
                } else {
                    $scope.removeAmphoeLayer();
                }
            }else if (val == 'province') {
                if ($scope.checkboxModel.province == true) {
                    $scope.addProvinceLayer();
                } else {
                    $scope.removeProvinceLayer();
                }
            }else if (val == 'basin') {
                if ($scope.checkboxModel.basin == true) {
                    $scope.addBasinLayer();
                } else {
                    $scope.removeBasinLayer();
                }
            }else if (val == 'radar_phs') {
                if ($scope.checkboxModel.radar_phs == true) {
                    $scope.addRadar_phsLayer();
                } else {
                    $scope.removeRadar_phsLayer();
                }
            }else if (val == 'radar_cri') {
                if ($scope.checkboxModel.radar_cri == true) {
                    $scope.addRadar_criLayer();
                } else {
                    $scope.removeRadar_criLayer();
                }
            }else if (val == 'radar_kkn') {
                if ($scope.checkboxModel.radar_kkn == true) {
                    $scope.addRadar_kknLayer();
                } else {
                    $scope.removeRadar_kknLayer();
                }
            }else if (val == 'rain_haii') {
                if ($scope.checkboxModel.rain_haii == true) {
                    $scope.addRain_haiiLayer();
                } else {
                    $scope.removeRain_haiiLayer();
                }
            }else if (val == 'lscls_mod1') {
                if ($scope.checkboxModel.lscls_mod1 == true) {
                    $scope.addLandslide_mod1Layer();
                } else {
                    $scope.removeLandslide_mod1Layer();
                }
            }else if (val == 'lscls_mod2') {
                if ($scope.checkboxModel.lscls_mod2 == true) {
                    $scope.addLandslide_mod2Layer();
                } else {
                    $scope.removeLandslide_mod2Layer();
                }
            }else if (val == 'dem') {
                if ($scope.checkboxModel.dem == true) {
                    $scope.addDEMLayer();
                } else {
                    $scope.removeDEMLayer();
                }
            }
        }

        //call json
        $scope.getWfs = function () {
            geoService.getWfs()
                .then(function (response) {
                    $scope.vills = response.data.features;
                    $scope.Wfslength = 50;
                    $scope.totalItems = $scope.Wfslength;
                    $scope.currentPage = 1;
                    $scope.numPerPage = 10;
                })
        };
        $scope.getWfs();


        $scope.paginate = function (value) {
            var begin, end, index;
            begin = ($scope.currentPage - 1) * $scope.numPerPage;
            end = begin + $scope.numPerPage;
            index = $scope.vills.indexOf(value);
            return (begin <= index && index < end);
        }

        $scope.barOption = {
            title : {
                text: '',
                subtext: 'mm.'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['Evap','Rain']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'Evap',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    markPoint : {
                        data : [
                            {type : 'max', name: 'Max'},
                            {type : 'min', name: 'Min'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: 'Avg'}
                        ]
                    }
                },
                {
                    name:'Rain',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    markPoint : {
                        data : [
                            {name : 'Max', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                            {name : 'Min', value : 2.3, xAxis: 11, yAxis: 3}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name : 'Avg'}
                        ]
                    }
                }
            ]
        };

        $scope.config = {
            theme: 'default', //['default','vintage'];
            dataLoaded: true
        };

    })

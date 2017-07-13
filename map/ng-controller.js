angular.module('app.controller', ['ui-leaflet', 'ng-echarts'])

    .controller('mapCtrl', function ($scope) {

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
            group: "Open Fire Map"
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
            group: "Open Fire Map"
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
            group: "Open Fire Map"
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
            group: "Open Fire Map"
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
            group: "Open Fire Map"
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
            group: "Open Fire Map"
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
            group: "Open Fire Map"
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
            group: "Open Fire Map"
        };

        angular.extend($scope, {
            center: {
                lat: 17.451,
                lng: 100.570,
                zoom: 7
            },
            layercontrol: {
                icons: {
                    uncheck: "fa fa-toggle-off",
                    check: "fa fa-toggle-on"
                }
            },

            layers: {
                baselayers: {
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
                  cycle: {
                        name: 'OpenCycleMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.opencyclemap.org/copyright">OCM</a> &copy; <a href="http://www.openstreetmap.org/copyright">OSM</a>',
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
                    province: province
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

        })

        console.log($scope.center);

        $scope.checkboxModel = {
            vill: false,
            tambon: false,
            amphoe: false,
            province: true,
            radar_phs: false,
            radar_cri: false,
            radar_kkn: false,
            rain_haii: false
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
            }
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

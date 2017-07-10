angular.module('app.controller', ['ui-leaflet', 'ng-echarts'])

    .controller('mapCtrl', function ($scope) {

        var radar_pl = {
            name: 'ข้อมูลฝนจาก Radar: พิษณุโลก',
            type: 'imageOverlay',
            visible: true,
            url: 'http://rain.tvis.in.th/output/PHS.png',
            bounds: [[19.094393, 102.475537], [14.411350, 97.983591]],
            layerParams: {
                noWrap: true,
                zIndex: 2
            },
            layerOptions: {
                format: "image/png",
                opacity: 0.7,
            },
            group: "Open Fire Map"
        };
        var province = {
            name: 'ขอบเขตจังหวัด',
            type: 'wms',
            visible: true,
            url: 'http://map.nu.ac.th/gs-alr2/ows?',
            layerParams: {
                layers: 'alr:ln9p_prov',
                format: 'image/png',
                transparent: true,
                CQL_FILTER: "prov_code IN ('53', '65')",
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
            url: 'http://map.nu.ac.th/gs-alr2/ows?',
            layerParams: {
                layers: 'alr:ln9p_amp',
                format: 'image/png',
                transparent: true,
                CQL_FILTER: "prov_code IN ('53', '65')",
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
            url: 'http://map.nu.ac.th/gs-alr2/ows?',
            layerParams: {
                layers: 'alr:ln9p_tam',
                format: 'image/png',
                transparent: true,
                CQL_FILTER: "prov_code IN ('53', '65')",
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
            url: 'http://map.nu.ac.th/gs-alr2/ows?',
            layerParams: {
                layers: 'alr:ln9p_vill',
                format: 'image/png',
                transparent: true,
                CQL_FILTER: "prov_code IN ('53', '65')",
                zIndex: 6
            },
            layerOptions: {
                format: "image/png",
                opacity: 1,
            },
            group: "Open Fire Map"
        };

        angular.extend($scope, {
            center: {
                lat: 17.100,
                lng: 100.200,
                zoom: 8
            },
            layercontrol: {
                icons: {
                    uncheck: "fa fa-toggle-off",
                    check: "fa fa-toggle-on"
                }
            },

            layers: {
                baselayers: {
                    cycle: {
                        name: 'OpenCycleMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.opencyclemap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
                        }
                    },
                    osm: {
                        name: 'OpenStreetMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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

            //pl radar
            removeRadar_plLayer: function () {
                delete this.layers.overlays.radar_pl;
            },
            addRadar_plLayer: function () {
                this.layers.overlays.radar_pl = radar_pl
            },


        })

        console.log($scope.center);

        $scope.checkboxModel = {
            vill: false,
            tambon: false,
            amphoe: false,            
            province: true,
            radar_pl: false
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
            }else if (val == 'radar_pl') {
                if ($scope.checkboxModel.radar_pl == true) {
                    $scope.addRadar_plLayer();
                } else {
                    $scope.removeRadar_plLayer();
                }
            }
        }

        $scope.barOption = {
            title : {
                text: '蒸发量和降水量',
                subtext: '纯属虚构'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['蒸发量','降水量']
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
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'蒸发量',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:'降水量',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    markPoint : {
                        data : [
                            {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                            {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name : '平均值'}
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
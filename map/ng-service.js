angular.module('app.service', [])
.service('geoService', function($http) {
    return {
        selectedLocation: {},
        getWfs: function() {
            // สำหรับ apache tomcat
            // www3 ติด 'Access-Control-Allow-Origin' วิธีแก้ตามนี้ https://gis.stackexchange.com/questions/210316/access-control-allow-origin-openlayers-wfs
            //var data =  'http://www3.cgistln.nu.ac.th/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gistdata:village&outputFormat=application%2Fjson';
            var data =  'http://www.map.nu.ac.th/gs-alr2/alr/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=alr:ln9p_vill&maxFeatures=50&outputFormat=application%2Fjson';
            return $http.get(data);
        }
    }
})

# Enabling CORS in GeoServer (jetty)
Just to clarify there are 2 steps required to make CORS access work with GeoServer and Jetty:
1. Add the Jetty-Utility Servlets Jar to match the version of Jetty - for current versions of GeoServer (2.11.x) it is 9.2.13.v20150730, copy this to webapps/geoserver/WEB-INF/lib inside the geoserver-2.11.1 directory (or wherever you unpacked the zip file).
Link Download
http://central.maven.org/maven2/org/eclipse/jetty/jetty-servlets/9.2.13.v20150730/jetty-servlets-9.2.13.v20150730.jar

2. Edit the webapps/geoserver/WEB-INF/web.xml file. and GeoServer 2.11.1/etc/webdefault.xml  There are two references to CORS in this file:
```xml
<!-- Uncomment following filter to enable CORS -->
<filter>
  <filter-name>cross-origin</filter-name>
     <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
  </filter>
```  
and
```xml
<!-- Uncomment following filter to enable CORS -->
<filter-mapping>
    <filter-name>cross-origin</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```
You must uncomment both blocks (that is remove <!-- and --> from the filter and filter-mapping blocks.

# Enabling CORS in GeoServer (apache-tomcat-catalina)
'Access-Control-Allow-Origin' วิธีแก้ตามนี้ https://gis.stackexchange.com/questions/210316/access-control-allow-origin-openlayers-wfs

#-------------------------------------------------------------------------------
# Mr Chingchai Humhong
# Assoc Prof Dr Chada Narongrit
# Tue Jun 27 13:30:33 2017
# chada@nu.ac.th, chingchai.h@gmail.com, chingchaih@nu.ac.th
# GISTNU @ Naresuan University
# MIT@License
# github : https://github.com/sanchangon
#     __________  ___   __________    ______________
#   / ____/ __ \/   | / ___/ ___/   / ____/  _/ ___/
#  / / __/ /_/ / /| | \__ \\_  \   / / __ / / \__ \
# / /_/ / _, _/ ___ |___/ /__/ /  / /_/ // / ___/ /
# \____/_/ |_/_/  |_/____/____/   \____/___//____/
# Welcome to GRASS GIS 7.2.1
# GRASS GIS homepage: http://grass.osgeo.org
#-------------------------------------------------------------------------------
# set region
g.region -d -p raster=gdem@PERMANENT
projection: 1 (UTM)
zone:       47
datum:      wgs84
ellipsoid:  wgs84
north:      2172156.988224
south:      1735836.988224
west:       558429.85386551
east:       748109.85386551
nsres:      40
ewres:      40
rows:       10908
cols:       4742
cells:      51725736

# input data
r.import input=D:\Landslide_Project\site_nanbasin\gdem.tif output=gdem
r.import input=D:\Landslide_Project\site_nanbasin\mod1_v2_cls.tif output=lscls_mod1
r.import input=D:\Landslide_Project\site_nanbasin\mod2_v2_cls.tif output=lscls_mod2
r.import input=C:\Workspace\srtm30m.tif output=srtm30m

# check statistics data
r.univar map=gdem@PERMANENT
r.univar map=lscls_mod1@PERMANENT
r.univar map=lscls_mod2@PERMANENT

# set color
r.colors map=lscls_mod2@PERMANENT color=gyr
r.colors map=lscls_mod1@PERMANENT color=gyr
r.colors map=gdem@PERMANENT color=srtm_plus

# create hillshade
r.relief input=gdem@PERMANENT output=hshade

# create geomorphons
r.geomorphon elevation=gdem@PERMANENT forms=geomorph

# create slope and aspect
r.slope.aspect --overwrite elevation=gdem@PERMANENT slope=slope aspect=aspect format=percent

# create flow accumulation
r.watershed elevation=gdem@PERMANENT accumulation=accumulate
r.terraflow elevation=gdem@PERMANENT filled=tf_filled direction=tf_direct swatershed=tf_watershed accumulation=tf_accumulate tci=tf_tci
#---------------------------END Section----------------------------------------------------

# Landslide risk binary model(Map Algebra)
# Select Value 3
Con("stream_cls3" == 3,1,0)

# MOD 1 Binary model
"rain" + "elev" + "slope" +"fault" + "stream" + "lu" + "soil"

# MOD 2 T-Test (Index Model)
(0.422 * "rain_cls3") + (0.702 * "elev_cls") + (0.294 * "slope_cls") + (0.149 * "fault_cls2") + (0.543 * "stream_cls3") + (0.207 * "lu_cls3") + (0.168 * "soil_cls2")

# Optional (Not good)
(0.543 * "stream_cls3")
(0.422 * "rain_cls3")
#---------------------------END Section----------------------------------------------------
# Z-Value
Z = ( x - mean ) / standard deviation

# rain
mean = 1463.298916946324
std = 504.3974882779886
("rain_spline2" - 1463.298916946324) / 504.3974882779886

# elevation
mean = 282.7523006876582
std = 291.1105330225796
("elev" - 282.7523006876582) / 291.1105330225796

#slope
mean = 15.30551389709412
std = 15.97089648130912
("slope" - 15.30551389709412) / 15.97089648130912

#fault
mean = 49164.80831310928
std = 77164.83337285608
("fault_dist2" - 49164.80831310928) / 77164.83337285608

# Map Algebra Logistic regression
1 / (1 + Exp(( - ( - 39.9168 + (0.0295 * "z_rain") + (0.0087 * "z_slope") + (0.0075 * "z_elev") + (0.0006 * "z_fault") + ( - 0.6413 * "s_grs") + (0.0979 * "s_def") + (-0.7801 * "s_mdf") + (-0.7785 * "s_ddf") + (-0.6169 * "s_agi") + (-2.3088* "s_clay")))))
1 / (1 + Exp(( - ( - 39.9168 + (0.0295 * "rain") + (0.0087 * "slope") + (0.0075 * "elev") + (0.0006 * "fault") + ( - 0.6413 * "s_grs") + (0.0979 * "s_def") + (-0.7801 * "s_mdf") + (-0.7785 * "s_ddf") + (-0.6169 * "s_agi") + (-2.3088* "s_clay")))))
1 / (1 + Exp(( - ( - 39.9168 + (0.029 * "z_rain") + (0.009 * "z_slope") + (0.007 * "z_elev") + (0.0005 * "z_fault_rv") + ( - 0.6413 * "s_grs") + (0.09791 * "s_def") + (-0.7801 * "s_mdf") + (-0.7784 * "s_ddf") + (-0.61690 * "s_agi") + (-2.3088 * "s_clay")))))
#---------------------------END Section----------------------------------------------------

# Inport GDEM 30 meter
r.import input=E:\8_Thailand_DEM\gdem_2017_30m.tif output=gdem_2017_30m
g.region -p raster=gdem_2017_30m@PERMANENT
r.relief input=gdem_2017_30m@PERMANENT output=hshade
r.geomorphon elevation=gdem_2017_30m forms=gdem_2017_30m_geomorph

## Test
if( gdem_2017_30m_geomorph@PERMANENT ==6,1, null()  )
r.mapcalc --overwrite expression=geomorph_slope = if( gdem_2017_30m_geomorph@PERMANENT ==6,1, null()  )
r.mapcalc --overwrite expression=geomorph_slope = if( gdem_2017_30m_geomorph@PERMANENT >4  &  gdem_2017_30m_geomorph@PERMANENT <=7 ,1, null()  )
if( srtm_geomorph@PERMANENT >4 & srtm_geomorph@PERMANENT <=7,1,null() )

# reclass r.geomorphon type I (STRM)
1 9 10	= 1
5 6 7 8 = 2
2 3 4	= 3
r.reclass --overwrite input=srtm_geomorph@PERMANENT output=srtm_geomorph_cls rules=C:\Users\gistnublack\Documents\grassdata\nanwps_lanslide\PERMANENT\.tmp/unknown\4064.0

# reclass r.geomorphon type II (GDEM)
1 9 10	= 1
5 6 7 8 = 2
2 3 4	= 3
r.reclass --overwrite input=geomorph@PERMANENT output=gd_geomorph_cls rules=C:\Users\gistnublack\Documents\grassdata\nanwps_lanslide\PERMANENT\.tmp/unknown\4064.0

# reclassify type final
1 9 10	= 1
4 5 6 7 8 	= 2
2 3 	= 3
#----------------------------
1 10	= 1
6 7 8 9 	= 2
2 3 4 5 	= 3
#---------------------------END Section----------------------------------------------------

# Define Slope from Geomorphon to detect village
if( srtm_geomorph_cls@PERMANENT ==2 & srtm30m@PERMANENT > 75, 1, null() )
r.mapcalc --overwrite expression=strm_slopefinal = if( srtm_geomorph_cls@PERMANENT ==2 & srtm30m@PERMANENT > 75, 1, null() )

if( gd_geomorph_cls@PERMANENT ==2 & gdem@PERMANENT > 75, 1, null() )
r.mapcalc --overwrite expression=gd_slopefinal = if( gd_geomorph_cls@PERMANENT ==2 & gdem@PERMANENT > 75, 1, null() )

# Export to Server
r.out.gdal input=strm_slopefinal@PERMANENT output=D:\Landslide_Project\1-site_nanbasin\_grass\srtm_slopefinal.tif format=GTiff
r.out.gdal input=gd_slopefinal@PERMANENT output=D:\Landslide_Project\1-site_nanbasin\_grass\gdem_slopefinal.tif format=GTiff
#---------------------------END Section----------------------------------------------------
# Define Sub-watershed(cachment) from DEM
# SRTM DEM 30 meter
# (Sun Jul 30 00:53:08 2017)
r.import input=E:\Landslide_Project\1-site_nanbasin\srtm30m.tif output=srtm30m
g.region -p raster=srtm30m@PERMANENT
r.watershed -b --overwrite elevation=srtm30m@PERMANENT threshold=1000 accumulation=srtm.accm tci=srtm.tci spi=srtm.spi drainage=srtm.dir basin=srtm.basin stream=srtm.stream memory=8096
r.terraflow --overwrite elevation=srtm30m@PERMANENT filled=srtm.trf.fill direction=srtm.trf.dir swatershed=srtm.trf.swsh accumulation=srtm.trf.accm tci=srtm.trf.tci memory=8096

# ASTER GDEM resize 30 meter
# (Sun Jul 30 02:41:47 2017)
r.import input=C:\Workspace\gdem30m.tif output=gdem30m
# Set region
g.region -p raster=gdem30m@PERMANENT
projection: 1 (UTM)
zone:       47
datum:      wgs84
ellipsoid:  wgs84
north:      2172135.97311788
south:      1735824.559036
west:       558421.92177331
east:       748123.8675437
nsres:      30.61190024
ewres:      30.61190024
rows:       14253
cols:       6197
cells:      88325841
# Calculate Sub-watershed 
r.watershed -b --overwrite elevation=gdem30m@PERMANENT threshold=1000 accumulation=gdem.accm tci=gdem.tci spi=gdem.spi drainage=gdem.dir basin=gdem.basin stream=gdem.stream memory=8096
r.terraflow --overwrite elevation=gdem30m@PERMANENT filled=gdem.trf.fill direction=gdem.trf.dir swatershed=gdem.trf.swsh accumulation=gdem.trf.accm tci=gdem.trf.tci memory=4096
r.stream.basins --overwrite direction=gdem.dir@PERMANENT stream_rast=gdem.stream@PERMANENT memory=8096 basins=gdem.basin_last

# Calculate Sub-watershed for new request
g.region -p
r.watershed -b --overwrite elevation=gdem30m@PERMANENT threshold=10000 accumulation=gdem.accm tci=gdem.tci spi=gdem.spi drainage=gdem.dir basin=gdem.basin10k stream=gdem.stream memory=8096
# Good final used 50k Threshold
r.watershed -b --overwrite elevation=gdem30m@PERMANENT threshold=50000 accumulation=gdem.accm tci=gdem.tci spi=gdem.spi drainage=gdem.dir basin=gdem.basin50k stream=gdem.stream memory=8096

r.to.vect -s --overwrite input=gdem.basin10k@PERMANENT output=basin10k_gdem_smooth type=area
r.to.vect -s --overwrite input=gdem.basin50k@PERMANENT output=basin50k_gdem_smooth type=area

v.out.ogr input=basin10k_gdem_smooth@PERMANENT type=area,auto output=C:\Workspace\Landslide format=ESRI_Shapefile
v.out.ogr input=basin50k_gdem_smooth@PERMANENT type=area,auto output=C:\Workspace\Landslide format=ESRI_Shapefile

# Convert to vector type
r.to.vect --overwrite input=gdem.basin@PERMANENT output=basin_gdem type=area
r.to.vect -s --overwrite input=gdem.basin@PERMANENT output=basin_gdem_smooth type=area
# Export to ESRI Shapefile
v.out.ogr input=basin_gdem_smooth@PERMANENT type=area,auto output=C:\Workspace\Landslide format=ESRI_Shapefile
# How to remove small polygon area using Eliminate tool by ArcGIS Desktop
  - Select by attribute to find area less than 50,000 sqm
  - Using Eliminate tool --> Navigate to ArcToolbox > Generalization > Eliminate
  - Calculate Point centroid From Eliminate Result -->  Navigate to ArcToolbox  > Features > Feature to Point
  - Spatial Joins between Point centroid and basin50k(DWR) for retived basin50k attributes
  - Joins attribute between Result Spatial Joins points and Sub-watershed (From Eliminate Result)
  - Import to PostgreSQL/PostGIS
#---------------------------END Section----------------------------------------------------

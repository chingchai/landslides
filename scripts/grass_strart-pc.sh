#-------------------------------------------------------------------------------
# Mr Chingchai Humhong
# Assoc Prof Dr Chada Narongrit
# Tue Jun 27 13:30:33 2017  
# chada@nu.ac.th, chingchai.h@gmail.com, chingchaih@nu.ac.th
# GISTNU @ Naresuan University
# MIT@License
# github : https://github.com/sanchangon
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

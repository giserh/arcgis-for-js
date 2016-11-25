// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.14/esri/copyright.txt for details.
//>>built
require({cache:{"esri/layers/KMLGroundOverlay":function(){define("dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../lang ./MapImage".split(" "),function(l,n,m,h,f,r){l=l([r],{declaredClass:"esri.layers.KMLGroundOverlay",constructor:function(h){f.isDefined(this.visibility)&&(this.visible=!!this.visibility)}});m("extend-esri")&&n.setObject("layers.KMLGroundOverlay",l,h);return l})},"esri/layers/KMLFolder":function(){define(["dojo/_base/declare","dojo/_base/lang","dojo/has","../kernel","../lang"],
function(l,n,m,h,f){l=l(null,{declaredClass:"esri.layers.KMLFolder",constructor:function(h){n.mixin(this,h);f.isDefined(this.visibility)&&(this.visible=!!this.visibility)}});m("extend-esri")&&n.setObject("layers.KMLFolder",l,h);return l})},"*noref":1}});
define("esri/layers/KMLLayer","dojo/_base/kernel dojo/_base/declare dojo/_base/connect dojo/_base/lang dojo/_base/array dojo/_base/json dojo/_base/sniff dojo/io-query dojo/dom-construct dojo/dom-style ../kernel ../config ../lang ../request ../SpatialReference ../geometry/webMercatorUtils ../dijit/PopupTemplate ./layer ./KMLFolder ./KMLGroundOverlay ./MapImageLayer ./FeatureLayer".split(" "),function(l,n,m,h,f,r,x,u,v,y,p,w,z,A,B,q,C,D,E,F,G,H){var t=n([D],{declaredClass:"esri.layers.KMLLayer",serviceUrl:location.protocol+
"//utility.arcgis.com/sharing/kml",constructor:function(a,b){a||console.log("KMLLayer:constructor - please provide url for the KML file");this._outSR=b&&b.outSR||new B({wkid:4326});this._options=h.mixin({},b);w.defaults.kmlService&&(this.serviceUrl=w.defaults.kmlService);var c=this.linkInfo=b&&b.linkInfo;c&&(this.visible=!!c.visibility,this._waitingForMap=!!c.viewFormat);(!c||c&&c.visibility&&!this._waitingForMap)&&this._parseKml();this.refresh=h.hitch(this,this.refresh);this.registerConnectEvents("esri.layers.KMLLayer",
!0)},getFeature:function(a){if(a){var b=a.type,c=a.id,e;switch(b){case "esriGeometryPoint":case "esriGeometryPolyline":case "esriGeometryPolygon":(a=this["_"+b])&&(e=h.getObject("_mode._featureMap."+c,!1,a));break;case "GroundOverlay":if(a=this._groundLyr){var d=a.getImages(),b=d.length;for(a=0;a<b;a++)if(d[a].id===c){e=d[a];break}}break;case "ScreenOverlay":break;case "NetworkLink":f.some(this._links,function(a){return a.linkInfo&&a.linkInfo.id===c?(e=a,!0):!1});break;case "Folder":b=(d=this.folders)?
d.length:0;for(a=0;a<b;a++)if(d[a].id===c){e=d[a];break}break;default:console.log("KMLLayer:getFeature - unknown feature type")}return e}},getLayers:function(){var a=[];this._groundLyr&&a.push(this._groundLyr);this._fLayers&&(a=a.concat(this._fLayers));this._links&&f.forEach(this._links,function(b){b.declaredClass&&a.push(b)});return a},setFolderVisibility:function(a,b){a&&(this._fireUpdateStart(),(a.visible=b)&&(b=this._areLocalAncestorsVisible(a)),this._setState(a,b),this._fireUpdateEnd())},onRefresh:function(){},
onOpacityChange:function(){},_parseKml:function(a){var b=this;this._fireUpdateStart();this._io=A({url:this.serviceUrl,content:{url:this._url.path+this._getQueryParameters(a),model:"simple",folders:"",refresh:this.loaded?!0:void 0,outSR:r.toJson(this._outSR.toJson())},callbackParamName:"callback",load:function(a){b._io=null;b._initLayer(a)},error:function(a){b._io=null;a=h.mixin(Error(),a);a.message="Unable to load KML: "+b.url+" "+(a.message||"");b._fireUpdateEnd(a);b.onError(a)}})},_initLayer:function(a){var b;
this.loaded&&(b=[],f.forEach(this.folders,function(a){a.visible&&b.push(a.id)}),this._options.minScale=this.minScale,this._options.maxScale=this.maxScale,this._options.opacity=this.opacity,this._removeInternalLayers());this.name=a.name;this.description=a.description;this.snippet=a.snippet;this.visibility=a.visibility;this.featureInfos=a.featureInfos;var c,e,d=this.folders=a.folders,s=[],k;if(d){e=d.length;for(c=0;c<e;c++)k=d[c]=new E(d[c]),-1===k.parentFolderId&&s.push(k)}var d=this._links=a.networkLinks,
g;e=d?d.length:0;for(c=0;c<e;c++)d[c].viewRefreshMode&&-1!==d[c].viewRefreshMode.toLowerCase().indexOf("onregion")||(g=h.mixin({},this._options),g.linkInfo=d[c],g.id&&(g.id=g.id+"_"+c),d[c]=new t(d[c].href,g),d[c]._parentLayer=this,d[c]._parentFolderId=this._getLinkParentId(d[c].linkInfo.id));if((d=a.groundOverlays)&&0<d.length){g=h.mixin({},this._options);g.id&&(g.id+="_mapImage");k=this._groundLyr=new G(g);e=d.length;for(c=0;c<e;c++)k.addImage(new F(d[c]))}if((a=h.getObject("featureCollection.layers",
!1,a))&&0<a.length)this._fLayers=[],f.forEach(a,function(a,b){var c=h.getObject("featureSet.features",!1,a);c&&0<c.length&&(g=h.mixin({outFields:["*"],infoTemplate:a.popupInfo?new C(a.popupInfo):null,editable:!1},this._options),g.id&&(g.id=g.id+"_"+b),a.layerDefinition.capabilities="Query,Data",c=new H(a,g),c.geometryType&&(this["_"+c.geometryType]=c),this._fLayers.push(c))},this),0===this._fLayers.length&&delete this._fLayers;if(!this.loaded){e=s.length;for(c=0;c<e;c++)k=s[c],this._setState(k,k.visible)}this._fireUpdateEnd();
this.loaded?(this._addInternalLayers(),f.forEach(this.folders,function(a){-1<f.indexOf(b,a.id)?this.setFolderVisibility(a,!0):this.setFolderVisibility(a,!1)},this),this.onRefresh()):(this.loaded=!0,this.onLoad(this))},_addInternalLayers:function(){var a=this._map;this._fireUpdateStart();this._links&&f.forEach(this._links,function(b){b.declaredClass&&(a.addLayer(b),b._waitingForMap&&(b._waitingForMap=null,b.visible?b._parseKml(a):b._wMap=a))});var b=a.spatialReference,c=this._outSR,e;if(!b.equals(c))if(b.isWebMercator()&&
4326===c.wkid)e=q.geographicToWebMercator;else if(c.isWebMercator()&&4326===b.wkid)e=q.webMercatorToGeographic;else{console.log("KMLLayer:_setMap - unsupported workflow. Spatial reference of the map and kml layer do not match, and the conversion cannot be done on the client.");return}this._groundLyr&&(e&&f.forEach(this._groundLyr.getImages(),function(a){a.extent=e(a.extent)}),a.addLayer(this._groundLyr));(b=this._fLayers)&&0<b.length&&f.forEach(b,function(b){if(e){var c=b.graphics,k,g,f=c?c.length:
0;for(k=0;k<f;k++)(g=c[k].geometry)&&c[k].setGeometry(e(g))}a.addLayer(b)});this.onVisibilityChange(this.visible)},_removeInternalLayers:function(){var a=this._map;this._links&&f.forEach(this._links,function(a){a.declaredClass&&a._io&&a._io.cancel()});a&&f.forEach(this.getLayers(),a.removeLayer,a)},_setState:function(a,b){var c=a.featureInfos,e,d,f,k=c?c.length:0,g=b?"show":"hide";for(f=0;f<k;f++)if(e=c[f],d=this.getFeature(e))if("Folder"===e.type)this._setState(d,b&&d.visible);else if("NetworkLink"===
e.type)this._setInternalVisibility(d,b);else d[g]()},_areLocalAncestorsVisible:function(a){var b=a.parentFolderId;for(a=a.visible;a&&-1!==b;)b=this.getFeature({type:"Folder",id:b}),a=a&&b.visible,b=b.parentFolderId;return a},_setInternalVisibility:function(a,b){var c=a._parentLayer,e=a._parentFolderId;for(b=b&&a.visible;b&&c;)b=b&&c.visible,-1<e&&(b=b&&c._areLocalAncestorsVisible(c.getFeature({type:"Folder",id:e}))),e=c._parentFolderId,c=c._parentLayer;this._setIntState(a,b)},_setIntState:function(a,
b){a&&f.forEach(a.getLayers(),function(c){c.linkInfo?a._setIntState(c,b&&c.visible&&a._areLocalAncestorsVisible(a.getFeature({type:"Folder",id:c._parentFolderId}))):c.setVisibility(b)})},_getLinkParentId:function(a){var b=-1;this.folders&&f.some(this.folders,function(c){return c.networkLinkIds&&-1!==f.indexOf(c.networkLinkIds,a)?(b=c.id,!0):!1});return b},_checkAutoRefresh:function(){var a=this.linkInfo;if(a)if(this.visible){if(this.loaded&&this._map){var b=a.refreshMode,c=a.refreshInterval,e=a.viewRefreshMode,
a=a.viewRefreshTime;b&&(-1!==b.toLowerCase().indexOf("oninterval")&&0<c)&&(this._stopAutoRefresh(),this._timeoutHandle=setTimeout(this.refresh,1E3*c));e&&(-1!==e.toLowerCase().indexOf("onstop")&&0<a)&&!this._extChgHandle&&(this._extChgHandle=m.connect(this._map,"onExtentChange",this,this._extentChanged))}}else this._stopAutoRefresh(),m.disconnect(this._extChgHandle),delete this._extChgHandle},_stopAutoRefresh:function(){clearTimeout(this._timeoutHandle);this._timeoutHandle=null},_getQueryParameters:function(a){a=
a||this._map;var b={},c=this.linkInfo,e=a&&a.extent,d;this._url.query&&(h.mixin(b,this._url.query),d=!!this._url.query.token);if(p.id&&!d&&(d=p.id.findCredential(this._url.path)))b.token=d.token;if(c){d=c.viewFormat;var f=c.httpQuery,c=c.viewBoundScale;if(e&&d){var k=e,g=e,m=e.spatialReference;m&&(m.isWebMercator()?k=q.webMercatorToGeographic(e):4326===m.wkid&&(g=q.geographicToWebMercator(e)));e=k.getCenter();g=Math.max(g.getWidth(),g.getHeight());c&&(k=k.expand(c));d=d.replace(/\[bboxWest\]/ig,k.xmin).replace(/\[bboxEast\]/ig,
k.xmax).replace(/\[bboxSouth\]/ig,k.ymin).replace(/\[bboxNorth\]/ig,k.ymax).replace(/\[lookatLon\]/ig,e.x).replace(/\[lookatLat\]/ig,e.y).replace(/\[lookatRange\]/ig,g).replace(/\[lookatTilt\]/ig,0).replace(/\[lookatHeading\]/ig,0).replace(/\[lookatTerrainLon\]/ig,e.x).replace(/\[lookatTerrainLat\]/ig,e.y).replace(/\[lookatTerrainAlt\]/ig,0).replace(/\[cameraLon\]/ig,e.x).replace(/\[cameraLat\]/ig,e.y).replace(/\[cameraAlt\]/ig,g).replace(/\[horizFov\]/ig,60).replace(/\[vertFov\]/ig,60).replace(/\[horizPixels\]/ig,
a.width).replace(/\[vertPixels\]/ig,a.height).replace(/\[terrainEnabled\]/ig,0);h.mixin(b,u.queryToObject(d))}f&&(f=f.replace(/\[clientVersion\]/ig,p.version).replace(/\[kmlVersion\]/ig,2.2).replace(/\[clientName\]/ig,"ArcGIS API for JavaScript").replace(/\[language\]/ig,l.locale),h.mixin(b,u.queryToObject(f)))}a=[];for(var n in b)z.isDefined(b[n])&&a.push(n+"\x3d"+b[n]);return(a=a.join("\x26"))?"?"+a:""},setScaleRange:function(a,b){this.inherited(arguments);f.forEach(this.getLayers(),function(c){c.setScaleRange(a,
b)})},setOpacity:function(a){this.opacity!=a&&(f.forEach(this.getLayers(),function(b){b.setOpacity(a)}),this.opacity=a,this.onOpacityChange(a))},_setMap:function(a,b){this.inherited(arguments);this._map=a;var c=this._div=v.create("div",null,b);y.set(c,"position","absolute");this._addInternalLayers();this.evaluateSuspension();return c},_unsetMap:function(a,b){this._io&&this._io.cancel();this._stopAutoRefresh();m.disconnect(this._extChgHandle);delete this._extChgHandle;this._removeInternalLayers();
var c=this._div;c&&(b.removeChild(c),v.destroy(c));this._wMap=this._div=null;this.inherited(arguments)},onVisibilityChange:function(a){this.loaded?(this._fireUpdateStart(),this._setInternalVisibility(this,a),this._checkAutoRefresh(),this._fireUpdateEnd()):this.linkInfo&&a&&(this._waitingForMap||this._parseKml(this._wMap))},refresh:function(){this.loaded&&(this._map&&!this._io&&this.visible)&&this._parseKml()},getFeatureCollection:function(a){var b,c=[];if(a=this.getFeature({type:"Folder",id:a}))(b=
f.map(a.featureInfos,function(a){if("esriGeometryPoint"===a.type||"esriGeometryPolyline"===a.type||"esriGeometryPolygon"===a.type)return a.id},this))&&0<b.length&&f.forEach(this._fLayers,function(a){var d,h;d=a.toJson();d.featureSet.features&&0<d.featureSet.features.length&&(h=f.filter(d.featureSet.features,function(c){if(-1!==f.indexOf(b,c.attributes[a.objectIdField]))return c},this));h&&0<h.length&&(d.featureSet.features=h,c.push(d))},this);return c},getFeatureCount:function(a){a=this.getFeature({type:"Folder",
id:a});var b={points:0,polylines:0,polygons:0};a&&f.forEach(a.featureInfos,function(a){"esriGeometryPoint"===a.type&&(b.points+=1);"esriGeometryPolyline"===a.type&&(b.polylines+=1);"esriGeometryPolygon"===a.type&&(b.polygons+=1)});return b},_extentChanged:function(){this._stopAutoRefresh();this._timeoutHandle=setTimeout(this.refresh,1E3*this.linkInfo.viewRefreshTime)}});x("extend-esri")&&h.setObject("layers.KMLLayer",t,p);return t});
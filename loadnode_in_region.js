jQuery(document).bind('leaflet.feature', function(event, marker, feature) {
  // marker is the feature just added to the map, it could be a polygon too.
  // feature.feature_id is the node ID, as set by ip_geoloc_plugin_style_leaflet.inc
  // Need to set this up for code below.
  // The same code is used for cross-highlighting. See ip_geoloc_leaflet_sync_content.js
  if (feature.feature_id) {
    marker.feature_id = feature.feature_id;
  }
});

jQuery(document).bind('leaflet.map', function(event, map, lMap) {

	for (var leaflet_id in lMap._layers) {
      lMap._layers[leaflet_id].on('click', function(e) {
		  
        var id = e.target ? e.target.feature_id : null;
        if (!id && e.layer) id = e.layer.feature_id;
        if (id) {
			//document.location.href = Drupal.settings.basePath + 'node/' + id;
		
			jQuery.ajax({
				type: 'GET',
				url: Drupal.settings.basePath + 'load_node/' + id,
				dataType: 'html',
				success: function(data){
					if (jQuery("#problemContent").hasClass("hidden")){
						jQuery("#problemContent").removeClass("hidden")
					}
					if (!jQuery("#problemForm").hasClass("hidden")){
						jQuery("#problemForm").addClass("hidden")
					}
					
				  	//console.log(data);
					jQuery('#ajax-result').html(data);
				},
      		});

        }
      });
    }


});
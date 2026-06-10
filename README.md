# Load node in region

A Drupal 7 module that loads a node's rendered content via AJAX when a marker or
polygon on a Leaflet map is clicked — without navigating to the node's own page.

It is designed to work together with the **IP Geolocation Views & Maps**
(`ip_geoloc`) module and its Leaflet style, where every marker/feature carries a
node identifier (`feature_id`).

## How it works

1. **`loadnode_in_region.js`** — binds handlers to Leaflet events:
   - On `leaflet.feature` it stores `feature.feature_id` (the node ID) on the
     marker object.
   - On `leaflet.map` it attaches a `click` handler to every map layer. When a
     marker/polygon is clicked, its `feature_id` is read and an AJAX `GET`
     request is sent to `load_node/{nid}`.
   - The returned HTML is injected into the `#ajax-result` element. In addition,
     the `#problemContent` block is shown (its `hidden` class is removed) and
     `#problemForm` is hidden (the `hidden` class is added).

2. **`loadnode_in_region.module`** — registers a route via `hook_menu_alter()`:
   - The `load_node/%` path maps to `loadnode_in_region_node_page_view($nid)`.
   - Access is restricted to the `access content` permission.
   - The callback loads the node (`node_load`), renders it
     (`node_view` + `drupal_render`) and returns the resulting HTML.

## Requirements

- Drupal **7.x**
- jQuery (bundled with Drupal)
- A Leaflet-based map with markers that carry a `feature_id`
  (e.g. provided by `ip_geoloc`)

## Installation

1. Copy the module directory into `sites/all/modules/`.
2. Enable the module on `admin/modules` (or run `drush en loadnode_in_region`).
3. Make sure the page contains an `#ajax-result` element, and — if used — the
   `#problemContent` and `#problemForm` elements that the result interacts with.

## Files

- `loadnode_in_region.info` — module metadata and JS inclusion.
- `loadnode_in_region.module` — server side: the route and node rendering.
- `loadnode_in_region.js` — client side: map click handling and AJAX loading.

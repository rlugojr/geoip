# geoip
Convert IP to Geo location, a visual playground based on Google Map. Demo was supposed to be [here](http://rickyyu.me/geoip.html), but seems like github page doesn't support Google Map at the moment.

Just a little project I came up with while playing with Google Map API.

Geo info provided by [freegeoip.net](http://freegeoip.net/).

Street info provided by [Google Geocode API](http://maps.googleapis.com/).

### How to Install
It is just a web page.

### Version
0.2

### How to Use
Simply giving the IP address you would like to plot on the map. For example:
```
59.154.57.204
```
Then click 'IP to Geo' button. The map will automatically zoom in on where the marker is placed (coordinate of IP server).

Traceroute feature is under development.

###TODO
1. Implement traceroute (Probably not gonna do it --- 14/08/2016).

2. Add visual description overlay to server (Completed --- 13/08/2016).

3. Animated zoom in (Under development).

4. Add street info and suburb (Completed --- 17/08/2016).

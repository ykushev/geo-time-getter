get google api key: 
https://developers.google.com/maps/documentation/timezone/start#get-a-key

Usage Example: 
```
import geoTimeGetter from 'geo-time-getter';

const gtg = new geoTimeGetter({
    GOOGLE: { apiKey: "<your key>" }
});

const result = await gtg.get('Novosibirsk');

```
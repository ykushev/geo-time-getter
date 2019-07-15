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

options: 
```
GOOGLE: {
    HOST: String,
    apiKey: String
},
YANDEX: {
    HOST: String,
    apiKey: String
},
cache: false || Object {
    strategy: String, // cacheFirst || apiFirst,
    stdTTL: 60 * 60 * 24 * 30, // 1 month
}
```



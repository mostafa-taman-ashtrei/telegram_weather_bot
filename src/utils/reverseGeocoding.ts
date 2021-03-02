import axios from 'axios';

const reverseGeocoding = async (lng: number, lat: number): Promise<string> => {
    try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.MAP_BOX_API}`;
        const { data } = await axios.get(url);
        const location = data.features[data.features.length - 2].place_name;

        return location;
    } catch (e) {
        console.log(e);
        throw new Error('Request Failed');
    }
};

export default reverseGeocoding;

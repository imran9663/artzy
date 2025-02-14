
import axios from 'axios'
const pixabayApiKey = process.env.REACT_APP_PIXABAY_API_KEY;

const axiosInstance = axios.create({

})

// axiosInstance.i
export const getIconFromApi = async (searchParams) => {
    const baseURL = `https://pixabay.com/api/?key=${pixabayApiKey}&q=`;
    const url = `${searchParams.replace(' ', '+')}&image_type=vector`
    let res;
    await axios.get(baseURL + url).then((result) => {
        res = { status: result.status, data: result.data }
    }).catch((err) => {
        console.log("error", err)
        res = err
    });
    return res
}
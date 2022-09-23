import axios from "axios";
const getAllCountries = async () => {
    try {
        await axios.get(
            "https://restcountries.com/v3.1/all",
        ).then(data => {
            var myArr = []
            data.data.map((val) => {
                myArr.push(val.name.official)
            })
            console.log(myArr);
            return myArr
        })
    } catch (err) {
        console.log(err);
    }
};
export { getAllCountries };
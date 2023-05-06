import axios from "axios";
import { ICountry } from "../interfaces/countries.interface";

export class CountryService {
    public async getAll(): Promise<ICountry[]>{
        const  {data, status} = await axios.get<ICountry[]>("https://gist.githubusercontent.com/herysepty/ba286b815417363bfbcc472a5197edd0/raw/aed8ce8f5154208f9fe7f7b04195e05de5f81fda/coutries.json");

        if (status === 200) {
            return data.map((country) => ({
                name: country.name,
                region: country.region,
                timezones: country.timezones,
            }));
        }
        else {
            throw new Error("Failed fetching from API!");
        }
    }
}
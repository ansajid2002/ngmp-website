import axios from "axios";
import { AdminUrl } from "../../../Admin/constant";

export let speicificationFields = [];

export let countryCodes = [];

export const fetchCountryCodes = async () => {
  try {
    const response = await axios.get(`${AdminUrl}/api/country-codes`); // Replace with your actual API endpoint
    countryCodes = response.data;
  } catch (error) {
    console.error('Error fetching country codes:', error);
  }
};

export const fetchSpecification = async () => {
  try {
    const response = await axios.get(`${AdminUrl}/api/getSpecifications`); // Replace with your actual API endpoint
    speicificationFields = response.data;
  } catch (error) {
    console.error('Error fetching specifications:', error);
  }
};

// Fetch country codes when the module is imported
await fetchCountryCodes();
await fetchSpecification();


import {Typography} from "@mui/material";
import axios from "axios";
import {useEffect, useState} from "react";

function CompanyItem(props) {
  const [companies, setCompanies] = useState([]);

  const webApiUrl = "http://192.168.1.104:8000/api/v1/companies/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: response} = await axios.get(webApiUrl, {
          headers: {
            Authorization: "Token 322ba55f7d3d3f8bf5d6186129f6863c559bedfa",
          },
        });
        setCompanies(response);
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      
    </div>
  );
}

export default CompanyItem;

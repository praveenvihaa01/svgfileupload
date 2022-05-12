import React, {useState} from 'react'
import NavBar from "../component/NavBarUser";
import HeaderFirst from "../component/HeaderFirst";
import HeaderSec from "../component/HeaderSec";

const LendingPage = ({baseUrl}) => {
  const [searchData, setSearchData] = useState([])

  const searchImageData = (searchImageValue) => {
      
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "searchData": searchImageValue
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"imageShow", requestOptions)
            .then(response => response.json())
            .then(result => {
                setSearchData(result)
                searchImageValue=''
            })
            .catch(error => console.log('error', error));
  }

    return (
        <>
            <NavBar searchImageData={searchImageData} baseUrl={baseUrl} />
            <HeaderFirst />
            <HeaderSec searchData={searchData} baseUrl={baseUrl} />
        </>
    )
}

export default LendingPage
import React, {useState} from 'react'
import NavBar from "../component/NavBarUser";
import HeaderFirst from "../component/HeaderFirst";
import HeaderSec from "../component/HeaderSec";

const LendingPage = ({baseUrl}) => {
  const [searchData, setSearchData] = useState([])
  const [page, setPage] = useState(1)
    const [pageData] = useState(10)
    const [searchValue, setSearchValue] = useState()
    

  const searchImageData = (searchImageValue) => {
    setSearchValue(searchImageValue)
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
             searchImageValue, page, pageData
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
                console.log(result);
            })
            .catch(error => console.log('error', error));
  }

  const loadSearchPage = (e) => {
    const total = page + 1;
    setPage(total)
    searchImageData(searchValue)
  }

    return (
        <>
            <NavBar searchImageData={searchImageData} baseUrl={baseUrl} />
            <HeaderFirst />
            <HeaderSec searchData={searchData} searchValue={searchValue} loadSearchPage={loadSearchPage} baseUrl={baseUrl} />
        </>
    )
}

export default LendingPage
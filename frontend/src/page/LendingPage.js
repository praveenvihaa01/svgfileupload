import React, {useState} from 'react'
import NvaBar from "../component/NvaBar";
import HeaderFirst from "../component/HeaderFirst";
import HeaderSec from "../component/HeaderSec";

const LendingPage = ({baseUrl}) => {
  const [searchData, setSearchData] = useState('')

    return (
        <>
            <NvaBar setSearchData={setSearchData} baseUrl={baseUrl} />
            <HeaderFirst />
            <HeaderSec searchData={searchData} baseUrl={baseUrl} />
        </>
    )
}

export default LendingPage
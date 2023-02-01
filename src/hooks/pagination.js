/**
 - create pagination hook, so uske liye sbse phle usestate use krege kyuki koi n koi value 
     ko hold krwana hoga
 */

import React, { useState } from "react";
export const usePagination = (perPageRecords, totalPageRecords) => {
  // 1) pagination is a hook isliye Use likha aage,
  // as a argument kuch cheeze paas krwaege kyuki ye Pagination hai, toh hmare pass
  // records aane chaiye ki, kitne humko show krwane hai, or kitne humare pass aane wale
  // hai, ye sb API se milega,

  // 2) inke base pr hum calculation krege and humare page pr Pagination ki
  // functionality add krege, so iske baad hum variables bnalege

  const totalPages = Math.ceil(totalPageRecords / perPageRecords);
  // 100(totalPpages) / 10(assume perPage pr itne dikhane hai)

  // create state taki hum In values ko hold kr ske
  const [startPageIndex, setStartPage] = useState(0);
  // Array hai isliye 0 se start hoga

  const [endPageIndex, setEndPageIndex] = useState(perPageRecords - 1);
  // end page index me hame kya krna hai, -> jo bhi hmare pass pass per page rhega
  // usse isko minus krwalege, eg: 10 - 1 = 9;

  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  // means abhi first page pr hai

  // function
  const displayPage = (pageNo) => {
    // isme hum krege ki - kitne page kitne records show krwana chahte hai
    // eg 100 records hai, perpage pr kitne chaiye, toh pageNumber uske acc set krege
    setCurrentPageIndex(pageNo); // JO BHI HUm PageNo bhjege usko isme set krwalege

    let end_page_index = perPageRecords * pageNo - 1;
    let start_page_index = perPageRecords * pageNo - perPageRecords;
    setStartPage(start_page_index);

    if (end_page_index > totalPageRecords) {
      setEndPageIndex(totalPageRecords - 1);
    } else {
      setEndPageIndex(end_page_index);
    }
  };

  return [
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex,
    displayPage,
  ];
};

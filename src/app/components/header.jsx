'use client';

import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { SearchContext } from '../context/search';
import Image from 'next/image';

import logo from '../../../public/logo.png';

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const Header = () => {
  const { setSearch } = useContext(SearchContext);
  return (
    <div className="flex justify-between items-center h-[5rem] bg-[#2E3A53] px-[17rem] ">
      <Image
        src={logo}
        alt="Logo UPHILLHEALTH"
        className=" h-[4rem] w-[auto] "
      />
      <TextField
        size="small"
        onChange={debounce((e) => setSearch(e.target.value), 2000)}
        variant="outlined"
        placeholder="Search"
        className="  !border-[0rem] !border-[transparent] !text-[black] w-[30rem]"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Header;

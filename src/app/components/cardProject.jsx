'use client';
import React, { useEffect, useState } from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StarsIcon from '@mui/icons-material/Stars';
import { getRepoData } from '../../api';
import { useQuery } from '@tanstack/react-query';

const CardProject = ({ fullName }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['repoData', { fullName }],
    queryFn: getRepoData,
  });
  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div
      className={`darker card w-[19.5rem] h-[19.5rem] justify-start  !pt-[2rem]  !rounded-md flex flex-col shadow-md gap-2 border-t-[8px] border-[#214cbb] items-center `}
    >
      <h4
        className={` font-bold  text-[1.4rem] text-center z-[2]  
      `}
      >
        {data.name}
      </h4>
      <div className="flex gap-2 text-[1.3rem] justify-center items-center text-[#214cbb]">
        <StarsIcon fontSize="medium" color="#214cbb" />
        <p>{data.stargazers_count}</p>
      </div>
      <p
        className={
          'text-[gray] font-semibold text-[1.3rem] w-[15rem] text-center'
        }
      >
        {data.description !== null
          ? data.description.substring(0, 50)
          : ' Default'}
      </p>
    </div>
  );
};

export default CardProject;

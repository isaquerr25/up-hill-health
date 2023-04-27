'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StarsIcon from '@mui/icons-material/Stars';
import { getMostPopularRepositoryByUser, getUserData } from '../../api';
import Image from 'next/image';

const CardUser = ({ username, isError }) => {
  const [isShown, setIsShown] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ['userData', { username }],
    queryFn: getUserData,
  });

  const {
    data: dataCard,
    error: errorCard,
    isLoading: isLoadingCard,
  } = useQuery({
    queryKey: ['repoDataCardUser', { user: username }],
    queryFn: getMostPopularRepositoryByUser,
  });

  if (isLoading) return <div>Carregando</div>;
  if (isLoadingCard) return <div>Carregando</div>;
  if (!data) return <div></div>;
  if (!dataCard) return <div></div>;

  const {
    name,
    email,
    followers,
    avatar_url: imageUrl,
    html_url: profileLink,
  } = data;

  const cardMainImg = {
    backgroundImage: `url(${imageUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    blurRadius: '10px',
  };

  const cardMainColor = {
    backgroundColor: `white`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      className={` cardUser darker card w-[26rem] h-[26rem] !rounded-md flex flex-col shadow-md gap-2 ${
        isShown ? 'darker !text-[white]' : ''
      }`}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      style={!isShown ? cardMainColor : cardMainImg}
    >
      <div
        className={`${
          isShown ? 'layer !rounded-md' : 'layer-little rounded-t-md'
        } z-[1] `}
      />

      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          visibility: !isShown ? 'visible' : 'hidden',
          blurRadius: '50px',
        }}
        className="h-[6.5rem] rounded-t-md darker !z-[0]"
      />
      <Image
        width={678}
        height={479}
        src={imageUrl}
        alt=""
        className={` rounded-full  mx-[auto] mt-[-4rem] z-[2] ${
          !isShown ? 'w-[6rem] h-[6rem]' : 'w-[5rem] h-[5rem]  mb-[1rem]'
        }`}
      />

      <h4
        className={` font-bold  text-[1.4rem] text-center z-[2]
      ${isShown ? '  text-[white] ' : ' text-[gray] '}
      
      `}
      >
        {username}
      </h4>
      <h4
        className={` font-bold  text-[1.2rem] text-center z-[2]
      ${isShown ? '  text-[white] ' : ' text-[gray] '}
      `}
      >
        {email}
      </h4>
      <div
        className={`${
          isShown ? '  text-[white] ' : ' text-[gray] '
        }  font-semibold flex gap-2 justify-center items-center text-center z-[2]`}
      >
        <PermIdentityIcon />
        <p>{followers}</p>
        <p>Followers</p>
      </div>
      {!isShown && <hr className="mx-[auto] w-[70%] my-[0.5rem]" />}
      {!isShown ? (
        <div className="flex flex-col justify-between px-[0.5rem] py-[1rem] rounded-md w-[17rem] h-[5.5rem] border-[2px] border-l-[8px] border-[#214cbb] mx-[auto]">
          <div className=" flex justify-between text-[#214cbb] font-bold">
            <p className=" ">
              {' '}
              {(dataCard?.name ?? '').length > 10
                ? `${(dataCard?.name ?? '')?.slice(0, 10)}...`
                : dataCard?.name ?? ''}{' '}
            </p>
            <div className="flex gap-2">
              <StarsIcon color="#214cbb" />
              <p> {dataCard?.stargazers_count ?? ''}</p>
            </div>
          </div>
          <p className={'text-[gray] font-semibold'}>
            {' '}
            {(dataCard?.description ?? '').length > 25
              ? `${(dataCard?.description ?? '')?.slice(0, 25)}...`
              : dataCard?.description ?? ''}{' '}
          </p>
        </div>
      ) : (
        <button
          className="font-bold z-[2] border-[2px] border-[white] rounded-full h-[4rem] w-[9rem] mx-[auto] mt-[1.5rem]"
          onClick={() => window.open(profileLink, '_blank')}
        >
          Open Profile
        </button>
      )}
    </div>
  );
};

export default CardUser;

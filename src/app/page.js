'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import Header from './components/header';
import CardUser from './components/cardUser';
import CardProject from './components/cardProject';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  getMostActiveUsers,
  getTopRepositories,
  getTrendingUsers,
} from '../api';
import { useContext, useEffect } from 'react';
import { SearchContext } from './context/search';
import { HashLoader } from 'react-spinners';

export default function Home() {
  const { search } = useContext(SearchContext);

  const {
    data: dataTrendingUsers,
    error: errorTrendingUsers,
    isLoading: isLoadingTrendingUsers,
  } = useQuery({
    queryKey: ['trendingUsers', { search }],
    queryFn: getTrendingUsers,
  });

  const {
    data: dataActiveUsers,
    error: errorActiveUsers,
    isLoading: isLoadingActiveUsers,
  } = useQuery({
    queryKey: ['activeUsers', { search }],
    queryFn: getMostActiveUsers,
  });

  const {
    data: dataTopRepositories,
    error: errorTopRepositories,
    isLoading: isLoadingTopRepositories,
  } = useQuery({
    queryKey: ['topRepositories', { search }],
    queryFn: getTopRepositories,
  });

  return (
    <>
      <Header />
      <div className="flex flex-col justify-start items-start !mx-[17rem]    pt-[3rem] min-h-[100vh] gap-y-[2rem] pb-[5rem]">
        <h3 className="mt-[1rem]">Trending Users</h3>
        <div className="dividerCards">
          {isLoadingTrendingUsers ? (
            <HashLoader color="#36d7b7" />
          ) : errorTrendingUsers ? (
            'Request Error'
          ) : (
            dataTrendingUsers &&
            dataTrendingUsers.items.map((user) => (
              <CardUser username={user.login} key={user.id} />
            ))
          )}
        </div>
        <h3 className="mt-[1rem]">Most Active Users</h3>
        <div className="dividerCards">
          {isLoadingActiveUsers ? (
            <HashLoader color="#36d7b7" />
          ) : errorActiveUsers ? (
            'Request Error'
          ) : (
            dataActiveUsers &&
            dataActiveUsers.items.map((user) => (
              <CardUser username={user.login} key={user.id} />
            ))
          )}
        </div>
        <h3 className="mt-[1rem]">Top Repositorioes</h3>
        <div className="dividerCards">
          {isLoadingTopRepositories ? (
            <HashLoader color="#36d7b7" />
          ) : errorTopRepositories ? (
            'Request Error'
          ) : (
            dataTopRepositories &&
            dataTopRepositories.items.map((repo) => (
              <CardProject fullName={repo.full_name} key={repo.id} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

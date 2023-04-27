import axios from 'axios';
import moment from 'moment';

export const api = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `Bearer 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`,
  },
});

export const getUserData = ({ queryKey }) => {
  const [_, { username }] = queryKey;

  return api.get(`/users/${username}`).then((response) => response.data);
};

export const getRepoData = ({ queryKey }) => {
  const [_, { fullName }] = queryKey;

  return api.get(`/repos/${fullName}`).then((response) => response.data);
};

export const getTrendingUsers = ({ queryKey }) => {
  const [_, { search = '' }] = queryKey;

  const created_since = moment().subtract(1, 'month').format('YYYY-MM-DD');
  const params = {
    q: `${search} created:>=${created_since} type:user`,
    sort: 'followers',
    per_page: 3,
  };
  const headers = { Accept: 'application/vnd.github.v3+json' };

  return api
    .get('/search/users', { params, headers })
    .then((response) => response.data);
};

export const getMostActiveUsers = ({ queryKey }) => {
  const [_, { search = '' }] = queryKey;

  const created_since = moment().subtract(1, 'month').format('YYYY-MM-DD');
  const params = {
    q: `${search} created:>=${created_since} type:user`,
    sort: 'repositories',
    per_page: 3,
  };
  const headers = { Accept: 'application/vnd.github.v3+json' };

  return api
    .get('/search/users', { params, headers })
    .then((response) => response.data);
};

export const getTopRepositories = ({ queryKey }) => {
  const [_, { search = '' }] = queryKey;

  const last_year = moment().subtract(1, 'year').format('YYYY-MM-DD');
  const params = {
    q: `${search} created:>=${last_year + ' '}`,
    sort: 'stars',
    per_page: 4,
  };
  const headers = { Accept: 'application/vnd.github.v3+json' };

  return api
    .get('/search/repositories', { params, headers })
    .then((response) => response.data);
};

export const getMostPopularRepositoryByUser = ({ queryKey }) => {
  const [_, { user }] = queryKey;

  return api
    .get(`/users/${user}/repos`)
    .then(
      (response) =>
        response.data.sort(
          (a, b) => b.stargazers_count - a.stargazers_count,
        )[0],
    );
};

import { rest } from 'msw';
import { mockData } from '@/tests/mocks/mockData';
import { URL, URLPath } from '@/constants/settings.config';

const handlers = [
  rest.get(`${URL}/${URLPath.Places}`, (req, res, ctx) => {
    const searchValue = req.url.searchParams.get('searchValue');
    if (searchValue === 'error') {
      return res(ctx.status(500));
    } else if (searchValue === 'empty') {
      return res(ctx.status(200), ctx.json([]));
    } else {
      return res(ctx.status(200), ctx.json(mockData));
    }
  }),
  rest.get(`${URL}/${URLPath.Places}/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData[0]));
  }),
];

export { handlers };

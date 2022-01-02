import type { CustomEnv } from '../shared/model';
import { PageViewModel } from '../shared/model';
import { JsonResponse } from '../shared/utils';

export const onRequestGet: PagesFunction<CustomEnv> = async ({
  env,
  request
}) => {
  const { method } = request;
  const url = new URL(request.url);

  const pv = new PageViewModel(env.VIEWS);
  const result = {
    status: 1
  };
  switch (method) {
    case 'POST':
    case 'PUT': {
      // Track
      const slug = url.searchParams.get('slug') || 'total';
      const data = await pv.find(slug);
      if (slug !== 'total') {
        await pv.find('total');
      }
      Object.assign(result, { data });
      break;
    }
    default: {
      // Get List
      const slugs = url.searchParams.get('slugs') || 'total';
      const data = await pv.list(slugs.split(','));
      Object.assign(result, { data });
    }
  }
  return JsonResponse(result);
};

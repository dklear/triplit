import {
  TriplitClient,
  Models,
  CollectionNameFromModels,
  SubscriptionOptions,
} from '@triplit/client';
import { useQuery } from './use-query';

export function useEntity<
  M extends Models<any, any> | undefined,
  CN extends CollectionNameFromModels<M>
>(
  client: TriplitClient<M>,
  collectionName: CN,
  id: string,
  options?: SubscriptionOptions
) {
  const { fetching, results, error } = useQuery(
    client,
    // @ts-ignore TODO: generics getting weird with models and collection queries...probably worth refactoring when we have joins (as we'll need to redo some typing then anyway)
    client.query(collectionName).entityId(id),
    options
  );
  return {
    fetching,
    results: results ? results.get(id) : undefined,
    error,
  };
}

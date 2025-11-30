import { useQuery } from '@tanstack/react-query';
import { CharactersResponse } from '../types/character';
import { api } from '../services/api';

export const useCharacters = (page: number = 1, name?: string) => {
  return useQuery<CharactersResponse, Error>({
    queryKey: ['characters', page, name],
    queryFn: () => api.getCharacters(page, name),
    staleTime: 5 * 60 * 1000,
  });
};
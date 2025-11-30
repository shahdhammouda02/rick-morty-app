import { useQuery } from '@tanstack/react-query';
import { Character, Episode } from '../types/character';
import { api } from '../services/api';

export const useCharacter = (id: string) => {
  const characterQuery = useQuery<Character, Error>({
    queryKey: ['character', id],
    queryFn: () => api.getCharacter(id),
  });

  const episodesQuery = useQuery<Episode[], Error>({
    queryKey: ['episodes', id, characterQuery.data?.episode],
    queryFn: () => api.getMultipleEpisodes(characterQuery.data?.episode || []),
    enabled: !!characterQuery.data,
  });

  return {
    character: characterQuery.data,
    episodes: episodesQuery.data,
    isLoading: characterQuery.isLoading || episodesQuery.isLoading,
    error: characterQuery.error || episodesQuery.error,
  };
};
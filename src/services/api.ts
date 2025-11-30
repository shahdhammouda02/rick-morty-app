import { CharactersResponse, Character, Episode } from '../types/character';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const api = {
  getCharacters: async (page: number = 1, name?: string): Promise<CharactersResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      ...(name && { name })
    });
    
    const response = await fetch(`${BASE_URL}/character?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    return response.json();
  },

  getCharacter: async (id: string): Promise<Character> => {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    if (!response.ok) {
      throw new Error('Character not found');
    }
    return response.json();
  },

  getEpisode: async (url: string): Promise<Episode> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch episode');
    }
    return response.json();
  },

  getMultipleEpisodes: async (urls: string[]): Promise<Episode[]> => {
    const episodeIds = urls.map(url => url.split('/').pop()).join(',');
    const response = await fetch(`${BASE_URL}/episode/${episodeIds}`);
    if (!response.ok) {
      throw new Error('Failed to fetch episodes');
    }
    return response.json();
  }
};
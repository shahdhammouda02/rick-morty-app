import React, { useState } from 'react';
import { useCharacters } from '../hooks/useCharacters';
import { CharacterCard } from '../components/CharacterCard';
import { SearchInput } from '../components/SearchInput';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Character } from '../types/character';

export const Characters: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, error, isFetching } = useCharacters(page, debouncedSearch);

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Error: {(error as Error).message}
      </div>
    );
  }

  const characters = data as { results: Character[]; info: { pages: number; next: string | null } } | undefined;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Rick and Morty Characters</h1>
      
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search characters by name..."
      />

      {(isLoading || isFetching) && <LoadingSpinner />}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {characters?.results.map((character: Character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {characters && characters.results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          No characters found
        </div>
      )}

      {characters && characters.info && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '20px',
          marginTop: '20px'
        }}>
          <button
            onClick={() => setPage(old => Math.max(old - 1, 1))}
            disabled={page === 1 || isLoading}
          >
            Previous
          </button>
          
          <span>Page {page} of {characters.info.pages}</span>
          
          <button
            onClick={() => setPage(old => old + 1)}
            disabled={!characters.info.next || isLoading}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
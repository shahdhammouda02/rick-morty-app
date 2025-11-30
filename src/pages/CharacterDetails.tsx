import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCharacter } from '../hooks/useCharacter';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { character, episodes, isLoading, error } = useCharacter(id!);

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Error: {error.message}
        <div style={{ marginTop: '20px' }}>
          <Link to="/">Back to Characters</Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!character) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Character not found
        <div style={{ marginTop: '20px' }}>
          <Link to="/">Back to Characters</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ marginBottom: '20px', display: 'inline-block' }}>
        ← Back to Characters
      </Link>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        <img 
          src={character.image} 
          alt={character.name}
          style={{
            width: '300px',
            height: '300px',
            borderRadius: '8px',
            objectFit: 'cover'
          }}
        />
        
        <div>
          <h1>{character.name}</h1>
          
          <div style={{ marginBottom: '20px' }}>
            <h3>Basic Information</h3>
            <p><strong>Status:</strong> {character.status}</p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Type:</strong> {character.type || 'Unknown'}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Origin:</strong> {character.origin.name}</p>
            <p><strong>Location:</strong> {character.location.name}</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Episodes ({episodes?.length || 0})</h3>
        {episodes && episodes.length > 0 ? (
          <div style={{ display: 'grid', gap: '10px' }}>
            {episodes.map(episode => (
              <div 
                key={episode.id}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <strong>{episode.episode}</strong> - {episode.name}
                <div style={{ color: '#666', fontSize: '14px' }}>
                  Air Date: {episode.air_date}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No episodes found</p>
        )}
      </div>
    </div>
  );
};
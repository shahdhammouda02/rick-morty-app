import React from 'react';
import { Character } from '../types/character';
import { Link } from 'react-router-dom';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      maxWidth: '500px'
    }}>
      <img 
        src={character.image} 
        alt={character.name}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          objectFit: 'cover'
        }}
      />
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>
          <Link to={`/character/${character.id}`} style={{ textDecoration: 'none', color: '#333' }}>
            {character.name}
          </Link>
        </h3>
        <p style={{ margin: '4px 0', color: '#666' }}>
          {character.status} - {character.species}
        </p>
        <p style={{ margin: '4px 0', color: '#666' }}>
          Gender: {character.gender}
        </p>
        <p style={{ margin: '4px 0', color: '#666' }}>
          Origin: {character.origin.name}
        </p>
      </div>
    </div>
  );
};
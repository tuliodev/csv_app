import { Card as MaterialCard, CardContent, Typography } from '@mui/material';
import React from 'react';

interface CardProps {
  data: any;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <MaterialCard>
      <CardContent>
        <Typography variant="h5" component="h2">
          {data.name}
        </Typography>
        <Typography color="textSecondary">
          City: {data.city}
        </Typography>
        <Typography color="textSecondary">
          Country: {data.country}
        </Typography>
        <Typography color="textSecondary">
          Favorite Sport: {data.favorite_sport}
        </Typography>
      </CardContent>
    </MaterialCard>
  );
};

export default Card;

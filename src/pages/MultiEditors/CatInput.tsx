import React from 'react';
import { TextField, Button } from '@mui/material';
import { Cat } from './Cat';

interface CatInputProps {
  cat: Cat;
  index: number;
  onCatChange: (index: number, cat: Cat) => void;
  onCatRemove: (index: number) => void;
}

export default function CatInput({ cat, index, onCatChange, onCatRemove }: CatInputProps) {
  const hanldeChange = (e) => {
    const changedCat = { ...cat, [e.target.name]: e.target.value };
    console.log(changedCat, 15);
    onCatChange(index, changedCat);
  };

  const handleRemove = () => {
    onCatRemove(index);
  };

  console.log(cat, 22);

  return (
    <form>
      <label htmlFor="name">Name: </label>
      <TextField
        id="name"
        name="name"
        value={cat.name}
        onChange={hanldeChange}
        error={false}
        helperText="name error"
      />
      <label htmlFor="age">Age: </label>
      <TextField
        id="age"
        name="age"
        value={cat.age}
        onChange={hanldeChange}
        error
        helperText="age error"
      />
      <Button onClick={handleRemove}>Remove</Button>
    </form>
  );
}

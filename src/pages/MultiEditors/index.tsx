import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Cat } from './Cat';
import CatInput from './CatInput';

export default function MultiEditors() {
    const initialCats: Cat[] = [];
    const [cats, setCats] = useState(initialCats);

    const onCatChange = (index: number, cat: Cat) => {
        console.log(index, 9);
        console.log(cat, 10);
        let newCats = [...cats];
        newCats[index] = cat;
        setCats(newCats);
    };

    const onCatRemove = (index: number) => {
        let leftCats = cats;
        leftCats.splice(index, 1);
        console.log(index, 13);
        setCats([...leftCats]);
    };

    const onCatAdd = () => {
        setCats([...cats, { name: '', age: '' }]);
    };

    return (
        <div>
            <label>Editors</label>
            <div>
                {cats.length > 0 ? cats.map((cat, index) => {
                    return <CatInput key={`cat-${index}`} cat={cat} index={index} onCatChange={onCatChange} onCatRemove={onCatRemove} />
                }) : 'No Cat'}
            </div>
            <Button onClick={onCatAdd}>Add</Button>
        </div>
    );
}

import React, { useState } from 'react'

const List = () => {
    const [name, setName] = useState('');
    const [showName, setshowName] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [checkId, setCheckId] = useState(null);

    const handleInput = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = () => {
        if (!name) return;
        if (toggle && name) {
            setshowName((
                showName.map((item) => {
                    if (item.id === checkId) {
                        return { ...item, title: name }
                    }
                    return item;
                })
            ))
            setName('');
            setToggle(false);
        } else {
            const newItem = { id: new Date().getTime().toString(), title: name };
            setshowName([...showName, newItem]);
            setName('');
            setToggle(false);
        }
    }

    const handleEdit = (id) => {
        const find = showName.find((value) => value.id === id)
        setToggle(true);
        setName(find.title);
        setCheckId(id)
    }

    const handleDelete = (id) => {
        const removeItem = showName.filter((value) => value.id !== id);
        setshowName(removeItem);
        setName('');
        setToggle(false);
    }

    return (
        <>
            <input type='text' value={name} onChange={(e) => handleInput(e)} />
            <button onClick={handleSubmit}>{toggle ? 'edit' : 'add'}</button>
            {
                showName.map((value, index) =>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} key={index}>
                        <p>{value.title}</p>
                        <button onClick={() => handleEdit(value.id)}>edit</button>
                        <button onClick={() => handleDelete(value.id)}>delete</button>
                    </div>
                )
            }
        </>
    )
}

export default List
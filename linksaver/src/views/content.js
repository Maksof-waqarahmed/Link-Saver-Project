import '../CSS/content.css';
import { useState, useEffect } from 'react';
import { getContents, deleteContent, updateContent } from '../apis/contentAPI';

function Content() {
    const [titles, setTitles] = useState([]);
    const [contents, setContents] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [currentIndex, setCurrentIndex] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getAlldata();
    }, []);

    async function getAlldata() {
        try {
            const result = await getContents();
            const fetchedTitles = result.contents.map(item => item.title);
            const fetchedContents = result.contents.map(item => item.data);

            setTitles(fetchedTitles);
            setContents(fetchedContents);
        } catch (e) {
            console.log(e);
        }
    }

    const deleteItem = async (index) => {
        try {
            const result = await getContents();
            const itemId = result.contents[index].id;
            await deleteContent(itemId);

            setTitles(prevTitles => prevTitles.filter((_, i) => i !== index));
            setContents(prevContents => prevContents.filter((_, i) => i !== index));
        } catch (e) {
            console.log('Error deleting item:', e);
        }
    };

    function editItem(index) {
        setEditTitle(titles[index]);
        setEditContent(contents[index]);
        setEditMode(true);
        setCurrentIndex(index);
    }

    async function updateItem() {
        try {
            console.log("Edit title", editTitle);
            console.log("Edit Content", editContent);

            const result = await getContents();
            const itemId = result.contents[currentIndex].id;
            const res = await updateContent(itemId, { title: editTitle, data: editContent });
            console.log(res, "res");

            const copyTitle = [...titles]
            const copyContent = [...contents]
            copyTitle[currentIndex] = editTitle;
            copyContent[currentIndex] = editContent;
            setTitles(copyTitle)
            setContents(copyContent)

            setEditMode(false);

            setEditTitle('');
            setEditContent('');
        } catch (e) {
            console.log('Error updating item:', e);
        }
    }

    const searchItem = () => {
        console.log("Search term:", searchTerm);
        setEditMode(false);
    };

    return (
        <div className='content_container'>
            <div className='content_div_main'>
                <div className='search_div'>
                    {editMode ? (
                        <>
                            <input
                                className='searchInput'
                                type='text'
                                placeholder='Edit Title'
                                onChange={(e) => setEditTitle(e.target.value)}
                                value={editTitle}
                            />
                            <button onClick={updateItem} className='searchBtn'>Update</button>
                            <input
                                className='searchInput'
                                type='text'
                                placeholder='Edit Content'
                                onChange={(e) => setEditContent(e.target.value)}
                                value={editContent}
                            />
                        </>
                    ) : (
                        <>
                            <input
                                className='searchInput'
                                type='search'
                                placeholder='Search Your Item'
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button onClick={searchItem} className='searchBtn'>Search</button>
                        </>
                    )}
                </div>

                <div className='item_div'>
                    <table className='table' border={2}>
                        <thead>
                            <tr className='table-row'>
                                <th>S.No</th>
                                <th>Title</th>
                                <th>Content</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {titles.length > 0 && titles.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item}</td>
                                    <td>{contents[index]}</td>
                                    <td><button className='del-btn' onClick={() => deleteItem(index)}>Delete</button></td>
                                    <td><button className='edit-btn' onClick={() => editItem(index)}>Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Content;

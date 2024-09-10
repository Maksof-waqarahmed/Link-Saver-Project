import '../CSS/add.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createContent } from '../apis/contentAPI'

function AddLink() {
    const navigate = useNavigate();
    
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [userId, setUserId] = useState(2);

    const handleAddClick = async (e) => {
        e.preventDefault();
        if (input1 === '' && input2 === '') {
            return alert('Please Enter Value');
        }
        console.log('Input Title:', input1);
        console.log('Input Content:', input2);

        try {
            const content = { title: input1, data: input2, user_id: userId };
            const result = await createContent(content);
            console.log('Content created successfully:', result);
        } catch (e) {
            console.log(e);
        }
        setInput1('');
        setInput2('');
    };

    const handleNavigation = () => {
        navigate('/content');
    };

    return (
        <div className='container'>
            <div className='contentDiv'>
                <div className='userName'>
                    <h1 className='welHeading'>Welcome Waqar🎉</h1>
                </div>
                <div className='inputDiv'>
                    <input
                        className='inputText'
                        type='text'
                        placeholder='Enter Your Title Here'
                        value={input1}
                        onChange={(e) => setInput1(e.target.value)}
                    />
                    <input
                        className='inputText'
                        type='text'
                        placeholder='Type & Paste Here Your Content'
                        value={input2}
                        onChange={(e) => setInput2(e.target.value)}
                    />
                    <button className='btn' onClick={handleAddClick}>
                        Add
                    </button>
                </div>
                <div className='navigationDiv'>
                    <button onClick={handleNavigation} className='anchor'>
                        Go to Saving Page
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddLink;

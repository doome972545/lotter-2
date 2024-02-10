import React, { useEffect, useState } from 'react'
const Home = () => {
    const [selectItem, setSelectItem] = useState()
    const [inputValue, setInputValue] = useState('');
    const [dataArray, setDataArray] = useState([]);
    const [priceUpper, setPriceUpper] = useState();
    const [priceLower, setPriceLower] = useState();
    const [listTwo, setListTwo] = useState(null);
    const [listThree, setListThree] = useState(null);
    const handlePriceUpperChange = (event) => {
        const inputPrice = event.target.value;
        setPriceUpper(inputPrice);
    };
    const handlePriceLowerChange = (event) => {
        const inputPrice = event.target.value;
        setPriceLower(inputPrice);
    };
    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        // Split the input value into an array when there are spaces
        const dataArray = value.split(/\s+/);
        const uniqueDataArray = [...new Set(dataArray)];

        setDataArray(uniqueDataArray);
    };
    const handleSubmit = async (event) => {
        if (selectItem === 'two') {
            try {
                fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/num/savetwo`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        dataArray,
                        priceUpper,
                        priceLower,
                    }),
                });
            } catch (error) {
                console.error('Error:', error.message);
            }
        } else if (selectItem === 'three') {
            try {
                fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/num/savethree`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        dataArray,
                        priceUpper,
                        priceLower,
                    }),
                });

            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    };
    const fecthListTwo = async () => {
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/num/list_two`, {
                method: 'GET',
            });

            if (!fetchData.ok) {
                throw new Error('not found data');
            }

            const dataRes = await fetchData.json();
            setListTwo(dataRes)
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    const fecthListThree = async () => {
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/num/list_three`, {
                method: 'GET',
            });

            if (!fetchData.ok) {
                throw new Error('not found data');
            }

            const dataRes = await fetchData.json();
            setListThree(dataRes)
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    useEffect(() => {
        fecthListTwo();
        fecthListThree()
    }, []); // Empty dependency array means this effect runs once after the initial render
    const deletAll = async (e) => {
        window.location.reload();
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/num/delete`, {
                method: 'DELETE',
            });

            if (!fetchData.ok) {
                throw new Error('not found data');
            }

            const dataRes = await fetchData.json();
            console.log(dataRes)
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    return (
        <div className='grid grid-cols-2 m-4 justify-between gap-4'>
            <div className='border rounded-md shadow-lg bg-yellow-50 min-w-[50%]' >
                <h1 className='text-center my-2 text-2xl '>ใส่ตัวเลข</h1>
                <div className='flex gap-2 mx-4'>
                    <button
                        className={`border rounded-md px-2 py-1 ${selectItem === 'two' ? 'bg-red-500' : 'bg-green-400 hover:bg-green-500'
                            }`}
                        onClick={() => setSelectItem('two')}
                    >
                        2ตัว
                    </button>
                    <button
                        className={`border rounded-md px-2 py-1 ${selectItem === 'three' ? 'bg-red-500' : 'bg-green-400 hover:bg-green-500'
                            }`}
                        onClick={() => setSelectItem('three')}
                    >
                        3ตัว
                    </button>

                </div>
                <form onSubmit={handleSubmit} className='mx-4'>
                    <div className='mb-4'>
                        <label htmlFor='inputValue' className='text-2xl font-bold mb-4'>
                            เลข
                        </label>
                        <input
                            type='text'
                            id='inputValue'
                            value={inputValue}
                            onChange={handleInputChange}
                            className='mt-1 p-2 border rounded-md w-full'
                        />
                        <h1 className='text-2xl font-bold mb-4'>บน</h1>

                        <input
                            type='text'
                            id='priceInput'
                            value={priceUpper}
                            onChange={handlePriceUpperChange}
                            className='mt-1 p-2 border rounded-md w-full'
                        />
                        <h1 className='text-2xl font-bold mb-4'>ล่าง</h1>

                        <input
                            type='text'
                            id='priceInput'
                            value={priceLower}
                            onChange={handlePriceLowerChange}
                            className='mt-1 p-2 border rounded-md w-full'
                        />
                    </div>
                    <div>
                        <p className='mb-4 flex gap-2'>หวย
                            {
                                selectItem === 'two' ? <p> 2 ตัว</p> : ""
                            }
                            {
                                selectItem === 'three' ? <p> 3 ตัว</p> : ""
                            }
                        </p>
                        <p className='mb-4'>{inputValue}</p>
                        {
                            priceUpper ? <p className='mb-3'>บน {priceUpper} บาท</p> : ""
                        }
                        {
                            priceLower ? <p className='mb-3'>ล่าง {priceLower} บาท</p> : ""
                        }
                        {
                            priceUpper && priceLower ? <p className='mb-3'>{priceUpper} x {priceLower} บาท</p> : ""
                        }
                    </div>
                    <button type='submit' className='mb-4 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600'>
                        ตกลง
                    </button>

                </form>
                <button className='ml-4 mb-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600' onClick={deletAll}>ล้างข้อมูล</button>
            </div>
            <div className='border min-w-[50%] bg-teal-100 rounded-md shadow-lg' >
                <div className='grid grid-cols-2 mx-4 my-3 gap-2'>
                    <div className=''>
                        <h1 className='text-center'>เลข 2 ตัว</h1>
                        <div className='overflow-y-auto h-[80vh] px-4 mt-4 '>
                            <table class="table-auto w-full bg-white ">
                                <thead>
                                    <tr>
                                        <th className='border border-slate-300 text-center'>เลข</th>
                                        <th className='border border-slate-300 text-center'>บน</th>
                                        <th className='border border-slate-300 text-center'>ล่าง</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listTwo && listTwo.length > 0 ? (
                                        listTwo.map((el, index) => (
                                            <tr key={index}>
                                                <td class="border border-slate-300 text-center text-lg">{el.num}</td>
                                                <td class={`border border-slate-300 text-center text-lg ${el.priceUpper > 800 ? 'text-red-500' : ""}`}>{el.priceUpper}</td>
                                                <td class={`border border-slate-300 text-center text-lg ${el.priceLower > 800 ? 'text-red-500' : ""}`}>{el.priceLower}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colspan="5" class="text-center bg-red-200">ไม่มีการบันทึกข้อมูล</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                    <div className=''>
                        <h1 className='text-center'>เลข 3 ตัว</h1>
                        <div className='overflow-y-auto h-[80vh] px-4 mt-4 '>
                            <table class="table-auto w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className='border border-slate-300 text-center'>เลข</th>
                                        <th className='border border-slate-300 text-center'>บน</th>
                                        <th className='border border-slate-300 text-center'>ล่าง</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listThree && listThree.length > 0 ? (
                                        listThree.map((el, index) => (
                                            <tr key={index}>
                                                <td class="border border-slate-300 text-center text-lg">{el.num}</td>
                                                <td class={`border border-slate-300 text-center text-lg ${el.priceUpper > 800 ? 'text-red-500' : ""}`}>{el.priceUpper}</td>
                                                <td class={`border border-slate-300 text-center text-lg ${el.priceLower > 800 ? 'text-red-500' : ""}`}>{el.priceLower}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colspan="5" class="text-center bg-red-200">ไม่มีการบันทึกข้อมูล</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home
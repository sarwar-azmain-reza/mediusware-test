import React, { useState } from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [users, setUsers] = useState({});
    const [allUsers, setAllusers] = useState([]);

    const handleAdd = (event) => {
        event.preventDefault();
        const newAll = [...allUsers, users];
        setAllusers(newAll)
        localStorage.setItem('users', JSON.stringify(newAll));
        showAll();
    }

    const handlevValue = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const user = { ...users };
        user[field] = value;
        setUsers(user);
    }

    const showAll = () => {
        const active = JSON.parse(localStorage.getItem('users')).filter(user => user.status === 'Active');
        const completed = JSON.parse(localStorage.getItem('users')).filter(user => user.status === 'Completed');
        const other = JSON.parse(localStorage.getItem('users')).filter(user => user.status !== 'Active' && user.status !== 'Completed');
        const all = [...active, ...completed, ...other];
        setAllusers(all)
    }

    const handleClick = (type) => {
        setShow(type);
        if (type === 'all') {
            showAll();
        } else {
            const typeUser = JSON.parse(localStorage.getItem('users')).filter(user => user.status.toLowerCase() === type);
            setAllusers(typeUser)
        }
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleAdd}>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" name='name'  onChange={handlevValue}/>
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status" name='status' onChange={handlevValue} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUsers ?
                                    allUsers.map((user, i) => <tr key={i}>
                                        <td>{user.name}</td>
                                        <td>{user.status}</td>
                                    </tr>)
                                    : <></>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
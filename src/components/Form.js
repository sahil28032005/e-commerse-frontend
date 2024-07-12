import { React, useState } from 'react'
import axios from 'axios';
import { useAuthProvider } from '../context/auth';
//adding categiry after for submits
export const Form = ({handleSubmit,category,setCategory}) => {

    return (
        <>
            <div style={{ textAlign: 'center', width: '400px' }}>
                <h2>Add Categories</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter name of category"
                        style={{
                            padding: '8px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            marginRight: '10px',
                            width: '300px',
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '8px 15px',
                            borderRadius: '5px',
                            border: '1px solid #007bff',
                            background: '#007bff',
                            color: '#fff',
                            cursor: 'pointer',
                        }}
                    >
                        Add
                    </button>
                </form>
            </div>
        </>
    )
}

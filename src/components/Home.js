import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { helperArray } from './filtersUtility.js';
import { useAuthProvider } from '../context/auth.js';
import Footer from './Footer.js';
import { Spinner } from './Spinner.js';
import InfiniteScroll from "react-infinite-scroll-component";
import { useCartProvider } from '../context/cartContext.js';
import './styles/Home.css';
import Slideshow from "./Slideshow.js";
import SkeletonLoading from './SkeletonLoading.js';

//category imahes import
import cat1 from '../components/icons/cat1.png';
import cat2 from '../components/icons/cat2.png';
import cat3 from '../components/icons/cat3.png';
import cat4 from '../components/icons/cat4.png';
import cat5 from '../components/icons/cat5.png';
export const Home = () => {
    const [user, setUser] = useAuthProvider();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);
    const [catFilters, setCatFilters] = useState([]);
    const [radioFilters, setRadioFilters] = useState([]);
    const [totalProducts, setTotalProducts] = useState('');
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState(null);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    //image data as an array
    const [imgArr, setImgArr] = useState([]);
    const pageNo = useRef(0);
    const [items, setItems] = useCartProvider();

    //specific categories states storrage container manager
    const [categoryWiseProducts, setCategoryWiseProducts] = useState({});

    // setTimeout(async function () {
    //     try {
    //         const url = await axios.get("https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-photo/666c7828224c4a152fb12686");
    //         if (url.data) {
    //             console.log("image array: " + url.data);
    //             setImgArr(url.data);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching the image:", error);
    //     }
    // }, 4000);
    // const fetchImgData = async () => {
    //     try {

    //         const url = "https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-photo/666c7828224c4a152fb12686";
    //         const response = await axios.get(url, { responseType: 'json' });
    //         if (response) {
    //             // console.log("image response", response.data);
    //             setImgArr(response.data);
    //             // const binaryData = response.data[0].data.data;
    //             // if (binaryData) {
    //             //     const uint8Array = new Uint8Array(binaryData);
    //             //     const blob = new Blob([uint8Array], { type: 'image/jpeg' })
    //             //     const imageUrl = URL.createObjectURL(blob);
    //             //     setUrl(imageUrl);
    //             // }

    //         }
    //         else {
    //             console.log("problem for arriving image data");
    //         }
    //     }
    //     catch (exception) {
    //         console.log(exception.message);
    //     }

    // }
    //blob arrived from mongodbs formats

    //approach failed
    // const makeUrl = async (blobBson) => {
    //     try {
    //         //step one converting to unit8
    //         if (blobBson) {
    //             const uint8Array =await new Uint8Array(blobBson);
    //             //step 2 comverting to supported blob based format
    //             const blob =await new Blob([uint8Array], { type: 'image/jpeg' });
    //             //step 3 convert blob to url based string
    //             const imageUrl =await URL.createObjectURL(blob);
    //             //finally setUrl
    //             setUrl(imageUrl);

    //         }

    //     }
    //     catch (exception) {
    //         console.log(exception.message);
    //     }
    // }
    //functiom to fetch as per category
    const fetchCategoryWiseProducts = async () => {
        try {
            const response = await axios.get('https://e-commerse-backend-yeft.onrender.com/api/v1/category/get-products-by-category');
            if (response.data.success) {
                setCategoryWiseProducts(response.data.data);
            } else {
                console.log('Error fetching category-wise products');
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const getCartItems = async () => {
        try {
            const id = user?.user?._id;
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/cart/get-all/${id}`;
            const response = await axios.get(url);
            if (response.data.success) {
                setItems(response?.data?.data[0]?.products.length);
                console.log("product data", response?.data?.data[0]?.products);
            }
            else {
                console.log("problem from api");
            }
        }
        catch (exception) {
            console.log(exception.message);
        }
    }

    // const sendParticular = blob => new Promise((resolve, reject) => {
    //     const reader = new FileReader;
    //     reader.onerror = reject;
    //     reader.onload = () => {
    //         resolve(reader.result);
    //     };
    //     reader.readAsDataURL(blob);
    // });

    const handleAddtoCart = async (pId) => {
        try {
            if (user?.user?.token) {
                // console.log("able to access cart");
                const url = "https://e-commerse-backend-yeft.onrender.com/api/v1/cart/add-to-cart";
                const body = {
                    userId: user?.user?._id,
                    productId: pId
                }
                const response = await axios.post(url, body);
                if (response.data.success) {
                    alert("data added inside cart successfully");
                    setItems(items + 1);
                }
                else {
                    console.log("problem for adding data inside cart");
                }
            }
            else {
                console.log("not able to access cart");
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }
    const getCategories = async () => {
        try {
            const url = "https://e-commerse-backend-yeft.onrender.com/api/v1/category/get";
            const response = await axios.get(url);
            if (response.data.success) {
                // console.log("data arrived successfulyy");
                setCategories(response.data.data);
            }
            else {
                console.log("problem for getting homepage categories");
            }

        }
        catch (error) {
            console.log(error);
        }
    }
    const getCount = async () => {
        try {
            const url = "https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-count";
            const response = await axios.get(url);
            if (response.data.success) {
                setTotalProducts(response.data.total);
            }
            else {
                console.log("error for get count from api");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    const getProducts = async () => {
        try {
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-all/${0}`;
            const response = await axios.get(url);
            if (response.data.success) {
                console.log("data arrived successfully");
                setProducts(chunkArr(response.data.data, 3));
                setHasMore(true);
                setLoading(false);
            }
            else {
                console.log("error for occuring response");
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    //conntroller for fetch more data to display where needed

    const fetchMore = async () => {
        if (loading) return
        console.log("fetch more called");
        try {
            const newSkip = skip + 6;
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-all/${newSkip}`;
            const response = await axios.get(url);
            if (response.data) {
                // setProducts([...products, chunkArr(response.data.data, 3)]);
                console.log("fetchmore", response.data.data);
                const newProductChunks = chunkArr(response.data.data, 3);
                // setProducts(chunkArr(response.data.data, 3));
                setProducts(products => [...products, ...newProductChunks]);
                if (response.data.data.length > 0) {
                    setHasMore(true);
                    setSkip(newSkip);
                } else {
                    setHasMore(false);
                }
            }
            else {
                console.log("problem for arriving data");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    const chunkArr = (arr, chkSize) => {
        const chunkArr = [];
        for (let y = 0; y < arr.length; y += chkSize) {
            chunkArr.push(arr.slice(y, y + chkSize));
        }
        return chunkArr;
    }
    useEffect(() => {
        if (!catFilters.length || !radioFilters.length) {
            // getPageWise();
            getProducts();
            getCategories();
            // getCount();

        }
        getCartItems();
    }, [user]);

    useEffect(() => {
        console.log("useffect called as a filtered");
        if (catFilters.length > 0 || radioFilters.length !== 0) {

            // getProducts();
            filterApplyer();
        }
        else {
            getProducts();
            setHasMore(true);
            setSkip(0);
        }
    }, [catFilters, radioFilters]);

    useEffect(() => {
        fetchCategoryWiseProducts();
        // fetchImgData();
        // setTimeout(() => {
        //     fetchMore();
        // }, 12000)
        // makeUrl(imgArr[0]?.data?.data); 
    }, []);
    //filter function are placed here
    // const catArr = [];
    const handleChkBoxClicks = (isValArrived, id) => {
        let arr;
        console.log("value: " + isValArrived, "id: " + id);
        if (isValArrived) {
            arr = [...catFilters, id];
            setCatFilters(arr);
        }
        else {
            arr = catFilters.filter(
                (item) => {
                    return (
                        item !== id
                    )

                }
            )

            setCatFilters(arr);
        }
    }
    const handleRadioFilter = (checked, arr) => {
        const rdArr = [];
        console.log("radio " + checked, "arr " + arr);
        if (checked) {
            rdArr.push(arr);
            setRadioFilters(rdArr);
        }
        else {
            rdArr.pop();
            setRadioFilters(rdArr);
        }
    }

    //actual filters applier
    const filterApplyer = async () => {
        try {
            const body = {
                checked: catFilters,
                radio: radioFilters
            }
            const url = "https://e-commerse-backend-yeft.onrender.com/api/v1/products/filter";
            const response = await axios.post(url, body);
            if (response.data.success) {
                console.log("fetch nearly success");
                setProducts(chunkArr(response.data.filtered, 3));
            }
            else {
                console.log("fetch success failed");
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }
    //get products pagewise
    const getPageWise = async () => {
        try {
            pageNo.current = pageNo.current + 1;
            const url = `https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-products/${pageNo.current}`;
            const response = await axios.get(url);
            if (response.data.success) {
                console.log("success");
                setProducts(chunkArr(response.data.data, 3));
            }
            else {
                console.log("error occured during pagination");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    const handleLoadMore = async () => [
        getPageWise()
    ]
    return (
        <>
            {/* demo skeleton testing */}

            <div style={{ margin: '0', padding: '0', display: 'flex' }} className='homeCont'>
                {/* { loading && <Spinner/>} */}
                <div className='sidebarHome' style={{ background: '#e8fff5', width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>

                    <div className='containerhead'>
                        <h4>Categories</h4>
                    </div>
                    <div style={{}} className='body'>
                        {/* //slideshow coming here/ */}
                        {/* <Slideshow /> */}
                        {
                            categories.map((item) => (
                                <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                                    <input
                                        type="checkbox"
                                        name={item._id}
                                        value={item.name}
                                        onClick={(e) => {
                                            handleChkBoxClicks(e.target.checked, item._id);
                                        }}
                                    />
                                    <label>{item.name.substring(0,15)}</label>
                                </div>
                            ))
                        }
                    </div>
                    <div className='containerhead'>
                        <h4>Price Filters</h4>
                    </div>
                    <div className="fBody">
                        <ul>
                            {helperArray.map((item) => (
                                <li key={item.id} style={{ listStyle: 'none', marginBottom: '20px' }}>
                                    <input
                                        type="radio"
                                        id={`price-${item.id}`}
                                        name="price"
                                        value={item.id}
                                        onClick={(e) => { handleRadioFilter(e.target.checked, item.array) }}
                                    />
                                    <label htmlFor={`price-${item.id}`}>{item.name}</label>
                                </li>
                            ))}
                        </ul>
                    </div>



                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#f7d7d7', marginTop: '80px' }}>
                    <div style={{ width: '100%' }}>

                        <div className='header'>
                            <h3 style={{ textAlign: 'center' }}>All Products</h3>
                        </div>
                        <div style={{ margin: '20px' }}>
                            <Slideshow />
                        </div>
                        <div className="homeContainer">
                            {Object.keys(categoryWiseProducts).map((category, index) => (
                                <div key={index} className="categorySection"> {/* Removed styles. abbreviation */}
                                    <h2>{category}</h2>
                                    <div className="productRow"> {/* Removed styles. abbreviation */}
                                        {categoryWiseProducts[category].map((product, idx) => (
                                            <div key={idx} className="productCard"> {/* Removed styles. abbreviation */}
                                                <img style={{height:'20rem'}} src={product?.photos?.[0]} alt={product.name} />
                                                <h3>{product.name.substring(0, 20)}</h3>
                                                <p>{product.price}</p>
                                                <a onClick={() => {
                                                    navigate(`/product-Details/${product._id}`)
                                                }} className="btn btn-success mx-3">Buy Now</a>
                                                <a onClick={() => {
                                                    handleAddtoCart(product._id);
                                                }} className="btn btn-danger">Add to Cart</a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="categoriesImg">
                            <div onClick={() => handleChkBoxClicks(true, "666f289f2295ed1e4d8a90b8")} style={{ flex: '1', display: 'flex', alignItems: 'center', flexDirection: 'column', cursor: 'pointer' }} className="commonCatImg"><img width={"72rem"} src={cat1}></img><p>Toys</p></div>
                            <div onClick={() => handleChkBoxClicks(true, "666f287a2295ed1e4d8a90b2")} style={{ flex: '1', display: 'flex', alignItems: 'center', flexDirection: 'column', cursor: 'pointer' }} className="commonCatImg"><img width={"72rem"} src={cat2}></img><p>Housing</p></div>
                            <div onClick={() => handleChkBoxClicks(true, "666f286e2295ed1e4d8a90af")} style={{ flex: '1', display: 'flex', alignItems: 'center', flexDirection: 'column', cursor: 'pointer' }} className="commonCatImg"><img width={"72rem"} src={cat3}></img><p>Fashion</p></div>
                            <div onClick={() => handleChkBoxClicks(true, "666f28472295ed1e4d8a90ac")} style={{ flex: '1', display: 'flex', alignItems: 'center', flexDirection: 'column', cursor: 'pointer' }} className="commonCatImg"><img width={"72rem"} src={cat4}></img><p>Electronics</p></div>
                            <div onClick={() => handleChkBoxClicks(true, "666f28972295ed1e4d8a90b5")} style={{ flex: '1', display: 'flex', alignItems: 'center', flexDirection: 'column', cursor: 'pointer' }} className="commonCatImg"><img width={"72rem"} src={cat5}></img><p>Books</p></div>
                        </div>

                        <div className='body'>
                            {loading && <>
                                <div className="row" style={{ justifyContent: 'center' }}>
                                    <SkeletonLoading />
                                    <SkeletonLoading />
                                    <SkeletonLoading />
                                </div>
                                <div className="row" style={{ justifyContent: 'center' }}>
                                    <SkeletonLoading />
                                    <SkeletonLoading />
                                    <SkeletonLoading />
                                </div>
                            </>}


                            <InfiniteScroll
                                dataLength={products.length}
                                next={fetchMore}
                                hasMore={hasMore}
                                loader={<h4>Loading...</h4>}
                                style={{ overflowX: 'hidden', overflow: 'hidden' }}
                            >
                                {

                                    products.map((row) => {
                                        return (
                                            <>
                                                <div className="row" style={{ justifyContent: 'center' }}>
                                                    {
                                                        row.map((item) => {
                                                            return (
                                                                <div className="hCard card" style={{ width: '18rem', height: '25rem', margin: '20px', padding: '20px', background: '#c8bbbb' }}>
                                                                    <img src={item?.photos?.[0]} style={{ height: '150px' }} className="hCard-img hCard-img-top card-img-top" alt="..." />
                                                                    <div className="hCard-body card-body">
                                                                        <h5 className="hCard-title card-title">{item.name.substring(0, 15)}</h5>
                                                                        <p className="hCard-text card-text">{item.description.substring(0, 20)}</p>
                                                                        <h5 className="hCard-title card-title">{item.price.toLocaleString('en-IN')} Rs</h5>
                                                                        <div className='btnHCont' style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                                                            <button
                                                                                onClick={() => { navigate(`/product-details/${item._id}`) }}
                                                                                type="button"
                                                                                className="btn btn-success"
                                                                                style={{ flex: '1', marginRight: '5px' }}
                                                                            >
                                                                                Buy Now
                                                                            </button>
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    handleAddtoCart(item._id)
                                                                                }}
                                                                                type="button"
                                                                                className="btn btn-warning"
                                                                                style={{ flex: '1', marginLeft: '5px' }}
                                                                            >
                                                                                Add To Cart
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>

                                            </>




                                        )

                                    })


                                }
                            </InfiniteScroll>

                            {/* {products[0]?.length + products[1]?.length >= 6 && (totalProducts / (pageNo.current * 6)) > 0 && (
                            <div>
                                <button onClick={handleLoadMore}>Next</button>
                            </div>
                        )} */}

                        </div>
                    </div>
                </div>

            </div>
            <div className="footer">
                <Footer />
            </div>

        </>
    );
};

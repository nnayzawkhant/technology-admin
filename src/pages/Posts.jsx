import React, { useEffect } from 'react';
import '../styles/postsviews.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import axios from 'axios';
import { axiosAuth } from '../config/axios';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import { API_URLS } from '../config/url';
import {format} from "timeago.js";
import img from '../assets/img/spinner.gif';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    
    useEffect(() => {
        loadPosts();

    }, [page, query]);



    const loadPosts = async () => {
        setLoading(true)
        try {
            let param = `posts?sortBy=_id:desc&page=${page}&limit=4`
            if(query){
                param += `&title=${query}`
            }
            const result = await (await axiosAuth().get(API_URLS + param)).data;
            console.log(result)
            setPage(result?.page)
            setPosts(result);
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    };

    const deletePost = async (id) => {
         await (await axiosAuth().delete(API_URLS + `posts/${id}`)).data;
         loadPosts(page)
    }



    const searchInput =  (e) => {
        setPage(1)
        setQuery(e.target.value);
    }
        
      



    const handleClick = () => {
        navigate('/admin/posts/postsadds')
    }

    const handleNext = () => {
      
      setPage(page + 1)
    }
  
    const handlePrev = () => {
      setPage(page - 1)
    }

  return (
    <div className='main'>
        <h2>Posts</h2>
        <div className='posts__header'>
            
            <div className='search_box'>
                
                <input type='text' placeholder='Search Title...' value={query} onChange={searchInput}/>
                <SearchIcon className='search_box_icon'/>
            </div>
            <button onClick={handleClick}>Add Post</button>
        </div>
        <div className='table__wrapper'>
      <table className='fl-table'>
        <tr>
            <th className='post-title'>Title</th>
            <th className='post-img'>Image</th>
            <th className='post-cat'>Categories</th>
            <th className='post-dat'>Date</th>
            <th className='post-act'>Action</th>
        </tr>
        {
            loading ? (<div className="img__use"><img src={img} className="user__img"/></div>) : 
            (<>
                {
                    posts?.results?.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.title}</td>
                                <td><img src={item.photo}/></td>
                                <td>
                                    {item.category.categoryname}
                                </td>
                                
                                <td>
                                {format(item.createdAt)}
                                </td>
                                <td>
                                    <div className='post__icon'>
                                        <Link to={`/admin/posts/postsedits/${item.id}`}>
                                            <EditIcon className='edit'/>
                                        </Link>
                                        <DeleteIcon onClick={() => deletePost(item.id)} className='delete'/>
                                    </div>
                                </td>
                            
                            </tr>
                            
                        )
                    })
                }
            </>)
        }
        
    </table>
    </div>
        <div className='page__btn'>
            <button className='btn_pag' disabled={1 >= page} onClick={() => handlePrev()}><KeyboardArrowLeftIcon/></button>
            <span className='page__span'>{posts.page}/{posts.totalPages}</span>
            <button className='btn_pag' disabled={posts?.totalPages <= page} onClick={() => handleNext()}><KeyboardArrowRightIcon/></button>
        </div>
    </div>
  )
}

export default Posts
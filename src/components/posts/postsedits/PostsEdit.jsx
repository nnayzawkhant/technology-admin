import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import '../postsadds/postadds.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { axiosAuth, axiosAuthUpload } from "../../../config/axios";
import { API_URLS } from "../../../config/url";
import img from '../../../assets/img/spinner.gif';


const PostsEdit = () => {
    
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState()
  const [err, setErr] = useState('')
  const [desc, setDesc] = useState('')
  const [post, setPost] = useState({
    title: "",
    photo: "",
    desc: '',
    category: '',
    summary: '',
  });
  
  const { id } = useParams();

    useEffect(() => {
      updatedPost(id);
      loadCategories()
    }, [])

    

    const updatedPost = async (id) => {
        const uppost = await (await axiosAuthUpload().get(API_URLS + `posts/${id}`)).data;
        setPost(uppost);
        setDesc(uppost.desc)
    }

    const loadCategories = async () => {
      const result = await (await axiosAuth().get(API_URLS + 'categories')).data;
      console.log(result)
      setCategories(result);
  };
  
    const onSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", post.photo);
        data.append('upload_preset', 'uploads');
        setLoading(true)

        try {
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dd16bmesr/image/upload",
            data
          );
          console.log(uploadRes.data.url)
    
          const  url  = uploadRes.data.url;
          console.log(url)
          const newPost = {
            title: post?.title,
            desc: desc,
            category: post?.category,
            summary: post?.summary,
            photo: url
          }
          const resultpost = await axiosAuthUpload().patch(API_URLS + `posts/${id}`, newPost)
            console.log(resultpost);
            navigate('/admin/posts/');
            setLoading(false)
        } catch (error) {
          setLoading(false)
          console.log(error)
          setErr(error.response.data.message)
          setErr(error.response.data.error.message)
        }
            
    }
    console.log(post.category)

    const onInputChange = (e) => {
        setPost({...post,[e.target.name]: e.target.value})
    }

    const onLogoChange = (e) => {
      setPost({...post, photo: e.target.files[0]})
    }
  
    // const descChange = (e) => {
    //   setDesc({ ...desc,desc: e})
    // }
    const onDescriptionChange = (e) => {
      setPost({...post, desc: e})
    }
    console.log(desc)
    
  return (
    <>
    <div className="main__users">
    {
      loading ? 
        (<div className="img__use"><img src={img} className="user__img"/></div>) : 
        (

          <form onSubmit={ e => onSubmit(e) }>
              <div className="form__text">
              <div>
                  <label>Title</label>
                  <input 
                      type="text" 
                      placeholder="Title" 
                      name="title"
                      value={post.title}
                      onChange={ e => onInputChange(e) }
                  />
              </div>

              <div>
                  <label>Summary</label>
                  <input 
                      type="text" 
                      placeholder="Summary" 
                      name="summary"
                      value={post.summary}
                      onChange={ e => onInputChange(e) }
                  />
              </div>

              </div>

              <div className="form__text">
              <div>
                  <label>Category</label>
                  
                  <select name="category"   value={post?.category} onChange={onInputChange}>
                    {
                      categories?.results?.map((cat, c) => (
                        <option value={cat.id} key={c}>{cat.categoryname}</option>
                      ))
                    }
                  </select>
              </div>
              <div>
                      <button type="button" className="postBtn">
                        <label>{post.photo ? <img className='photoImg' src={post?.photo} alt=""/> : <span className='span'>Add Your Photo</span>}
                                <input type="file" className='hidden' onChange={onLogoChange}/>
                        </label>
                      </button>
              </div>

              
              
              </div>
              <div className="text-area">
                  <label>Description</label>
                  <ReactQuill theme="snow" className='quill' value={desc} onChange={(e) => setDesc(e)} required/>

              </div>
              <br/>
              {err && (
                <div className="form-group">
                  <div className="alert-messager" role="alert">
                    {err}
                  </div>
                </div>
              )}
              <br/>
              <div className="posts__adds-btn">
                  <button  className="dlt__btn" onClick={() => navigate('/admin/posts/')}>Cannel</button>
                  <button type="submit" className="update__btn" onClick={(e) => onSubmit(e)}>Update</button>
              </div>
          </form>
        )
    }
    </div>
    </>
  );
};

export default PostsEdit;
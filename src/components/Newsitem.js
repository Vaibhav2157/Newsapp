import React from 'react'

const Newsitem =(props)=> {
  
    let {title,description,imgurl,url,author,source,date} = props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "22rem"}}>
            <img src={imgurl} className="card-img-top" alt="Not available"/>
            <div className="card-body">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left : '90%', zIndex :'1'}}>{source}</span>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={url} target="_blank" className="btn btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  
}

export default Newsitem
import React, { useState ,useEffect } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News =(props) => {

  const defaultdesc ="Above news doesn't contain any description."

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [articles ,setArticles] = useState([])
  const [page ,setPage] = useState(1)
  const [loading ,setLoading] = useState(true)
  const [totalResults ,setTotalResults] = useState(0)

  document.title = `NewsMonkey -${capitalizeFirstLetter(props.category)}`
  
  const updateNews = async() => {
    props.setProgress(10)
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=547e4e9ee151421f947c97b559c809e8&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    props.setProgress(30)
    let data = await fetch(url);
    props.setProgress(70)
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }

  useEffect(() => {
    updateNews();
    //eslint-disable-next-line
  },[]);
  

  const fetchMoreData = async () => {
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=547e4e9ee151421f947c97b559c809e8&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }

  
  return (     
    <>
        <h1 className='text-center' style={{margin :'35px 0px', marginTop : '90px'}}>NewsMonkey- Top Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row my-3">
            {articles.map((element)=>{
                return(
                  <div className="col-md-4" key={element.url}>
                  <Newsitem title={element.title} description ={element.description?element.description:defaultdesc} imgurl ={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                  </div>
                )
            })}     
            </div>
          </div>
        </InfiniteScroll>       
    </>      
  )
  
}

News.defaultProps ={
  pageSize : 9,
  country : 'in',
  category : 'general'
}

News.propTypes ={
  pageSize : PropTypes.number,
  country : PropTypes.string,
  category : PropTypes.string 
}

export default News


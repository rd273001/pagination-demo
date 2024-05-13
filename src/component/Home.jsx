import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile';

const Home = () => {

  const [userName, setUserName] = useState( 'Ravi Dubey' );
  const [listData, setListData] = useState( [] );
  const [pageNum, setPageNum] = useState( 1 );  // default page number will be 1
  const [isLoading, setIsLoading] = useState( false );

  useEffect( () => {
    const fetchListData = async () => {
      try {
        setIsLoading( true );
        const res = await fetch( `https://newsapi.org/v2/top-headlines?country=us&apiKey=e33648c0f462414cb1568584f86ee33e&page=${ pageNum }` );
        const data = await res.json();
        console.log( 'Response => ', data.articles );
        // using pageNum in url to fetch and concatanating the new articles(when Load More is clicked) with previous articles
        setListData( prevData => [...prevData, ...data.articles] );
      }
      catch ( err ) {
        console.log( 'Error => ', err.message );
      }
      finally {
        setIsLoading( false );
      }
    };
    
    fetchListData();
  }, [pageNum] );  // fetch list data and re-render when pageNum changes

  const handlePage = () => {
    setPageNum( prevPageNum => prevPageNum + 1 );
  };

  return (
    <>
      <p> Home Page</p>
      <UserProfile userName={ userName } setPageNum={ setPageNum } />
      <p>Author Names :</p>
      <ol>
        {
          listData.length > 0 ? listData.map( ( item, index ) => (
            <li key={ index }>
              { item.author }
            </li>
          ) ) : isLoading ? <p>Loading...</p> : <p>No items to show.</p>
        }
      </ol>
      {/* we can also use Prev and Next or Page Numbered buttons for implementing page wise items */}
      {
        <button onClick={ handlePage }>{ isLoading && listData.length > 0 ? 'Loading...' : 'Load More' }</button>
      }
    </>
  );
};

export default Home;
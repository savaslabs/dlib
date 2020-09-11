import { useState, useEffect } from 'react';

function useInfiniteScroll(data, type) {
  const [listItems, setListItems] = useState([]);
  const [showing, setShowing] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const nToDisplay = type === 'years' ? 5 : 6;

  useEffect(() => {
    // Only display 5 years or 6 gallery images on page load.
    setListItems(Array.from(data.slice(0, nToDisplay)));
    setShowing(nToDisplay);
  }, [data]);


  useEffect(() => {
    if (!isFetching) return;
    showMoreListItems();
  }, [isFetching]);

  // Mimic infinite scroll.
  const showMoreListItems = () => {
    let start;
    let end;

    if (showing === data.length) {
      return;
    } else {
      if (data.length - showing < nToDisplay) {
        start = showing;
        end = showing + (data.length - showing);
      } else {
        start = showing;
        end = showing + nToDisplay;
      }

      setTimeout(() => {
        setListItems(prevState => [...prevState, ...Array.from(data.slice(start, end))]);
        setShowing(end);
        setIsFetching(false);
      }, 1000);
    }
  };

  return { setIsFetching, listItems };
}

export default useInfiniteScroll;

import React from 'React';

const Event = ({ event }) => {
  return (
    <>
      <h2>{event.name}</h2>
      {event.body && event.body.map((item, i) => {
        console.log('item', item);
        if (item.hasOwnProperty('text')) {
          return (
            <p key={i}>{item.text}</p>
          )
        } else if (item.hasOwnProperty('pullquote')) {
          return (
          <figure key={i}>
            <blockquote>{item.pullquote.quote}</blockquote>
            <figcaption>{item.pullquote.attribution}</figcaption>
          </figure>);
        }
      })}
    </>
  )
}

export default Event;
